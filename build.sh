#!/bin/bash
# 1. 強制安裝工具
npm install wrangler @opennextjs/cloudflare --legacy-peer-deps

# 2. 現場生成配置文件 (解決問答問題)
cat <<EOF > open-next.config.ts
export default {
  default: { override: { wrapper: "cloudflare-node", converter: "edge", proxyExternalRequest: "fetch", incrementalCache: "dummy", tagCache: "dummy", queue: "dummy" } },
  edgeExternals: ["node:crypto"]
};
EOF

cat <<EOF > wrangler.jsonc
{"name":"idolradar","main":".open-next/worker.js","compatibility_date":"2024-09-23","compatibility_flags":["nodejs_compat"],"assets":{"directory":".open-next/assets","binding":"ASSETS"}}
EOF

# 3. 執行編譯
npx @opennextjs/cloudflare build --dangerouslyUseUnsupportedNextVersion