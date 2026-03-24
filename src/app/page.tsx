import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">🎤 Idol Radar</h1>
        <p className="text-xl mb-8">Your Pulse on Idol Updates</p>
        <div className="bg-white/10 backdrop-blur rounded-lg p-8 max-w-md mx-auto">
          <p className="text-lg">Coming Soon...</p>
        </div>
      </div>
    </main>
  )
}

export default Home
