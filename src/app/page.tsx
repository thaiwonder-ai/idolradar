'use client';

import { useState } from 'react';
import { languages, t, type Language } from '../i18n/translations';
import { idols, news, forumPosts, trendingTopics } from '../data/mockData';

export default function Home() {
  const [lang, setLang] = useState<Language>('zh-TW');
  const [search, setSearch] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              🎤 IdolRadar
            </h1>
            <div className="hidden md:flex gap-6 text-sm">
              <a href="#" className="hover:text-pink-400 transition">{t(lang, 'nav.home')}</a>
              <a href="#" className="hover:text-pink-400 transition">{t(lang, 'nav.idols')}</a>
              <a href="#" className="hover:text-pink-400 transition">{t(lang, 'nav.news')}</a>
              <a href="#" className="hover:text-pink-400 transition">{t(lang, 'nav.forum')}</a>
              <a href="#" className="hover:text-pink-400 transition">{t(lang, 'nav.about')}</a>
            </div>
          </div>
          
          {/* Language Selector */}
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm cursor-pointer hover:bg-white/20"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
            ))}
          </select>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {t(lang, 'hero.title')}
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          {t(lang, 'hero.subtitle')}
        </p>
        
        {/* Search Box */}
        <div className="max-w-xl mx-auto relative">
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(lang, 'search.placeholder')}
            className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full text-sm font-medium">
            🔍
          </button>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          🔥 {t(lang, 'trending')}
        </h3>
        <div className="flex flex-wrap gap-3">
          {trendingTopics.map(topic => (
            <a 
              key={topic.id} 
              href="#"
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm transition flex items-center gap-2"
            >
              <span className="text-pink-400">#</span>
              {topic.name}
              <span className="text-gray-400 text-xs">{topic.posts.toLocaleString()}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Idols */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6">⭐ {t(lang, 'featured_idols')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {idols.map(idol => (
            <a 
              key={idol.id} 
              href="#"
              className="group relative bg-white/5 rounded-2xl overflow-hidden hover:scale-105 transition duration-300"
            >
              <img 
                src={idol.image} 
                alt={idol.name}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-bold">{idol.name}</p>
                <p className="text-xs text-gray-300">{idol.country}</p>
              </div>
              {idol.trending && (
                <span className="absolute top-2 right-2 bg-pink-500 text-xs px-2 py-1 rounded-full">
                  🔥
                </span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6">📰 {t(lang, 'latest_news')}</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {news.map(item => (
            <a 
              key={item.id}
              href="#"
              className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition"
            >
              <img 
                src={item.image} 
                alt={lang === 'zh-TW' ? item.titleCn : item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs text-pink-400 uppercase">{item.category}</span>
                <h4 className="font-bold mt-2 line-clamp-2">
                  {lang === 'zh-TW' ? item.titleCn : item.title}
                </h4>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                  {lang === 'zh-TW' ? item.summaryCn : item.summary}
                </p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Forum Preview */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6">💬 {t(lang, 'nav.forum')}</h3>
        <div className="bg-white/5 rounded-2xl overflow-hidden">
          {forumPosts.slice(0, 3).map((post, i) => (
            <a 
              key={post.id}
              href="#"
              className={`flex items-center gap-4 p-4 hover:bg-white/5 transition ${i > 0 ? 'border-t border-white/5' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-sm">
                {post.author[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {post.pinned && <span className="text-yellow-400">📌</span>}
                  <span className="font-medium">{post.title}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {post.author} · {post.replies} 回覆 · {post.views} 瀏覽
                </div>
              </div>
              <span className="text-xs text-gray-500">{post.date}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 IdolRadar.club - Connecting Fans Worldwide</p>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}