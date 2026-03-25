'use client';

import { useState, useEffect } from 'react';
import { languages, t, type Language } from '../i18n/translations';
import { idols, news, forumPosts, trendingTopics } from '../data/mockData';

// ========================================
// SVG Icons
// ========================================
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.017.858-4.002 2.457-5.607l.624-.381C8.605 9.347 9.682 8.5 11 8.5c1.657 0 3.156.842 4.071 2.185l.381.557C16.563 12.808 17 14.336 17 16c0 2.761-2.239 5-5 5z"/>
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
);

// ========================================
// Helpers
// ========================================
const formatFollowers = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
};

// Extended hot chart data (Spotify-style)
const hotChart = [
  { rank: 1, prev: 2, name: 'TWICE', sub: 'I WANT YOU BACK', country: '🇰🇷', streams: '9.8M', image: 'https://picsum.photos/seed/twice/100/100' },
  { rank: 2, prev: 1, name: 'Lisa', sub: 'ROCKSTAR', country: '🇹🇭', streams: '8.2M', image: 'https://picsum.photos/seed/lisa/100/100' },
  { rank: 3, prev: 5, name: 'NewJeans', sub: 'Supernatural', country: '🇰🇷', streams: '7.1M', image: 'https://picsum.photos/seed/newjeans/100/100' },
  { rank: 4, prev: 4, name: 'imase', sub: 'NIGHT DANCER', country: '🇯🇵', streams: '4.3M', image: 'https://picsum.photos/seed/imase/100/100' },
  { rank: 5, prev: 3, name: 'BLACKPINK', sub: 'Pink Venom', country: '🇰🇷', streams: '3.9M', image: 'https://picsum.photos/seed/bp/100/100' },
];

// Stories data
const storyIdols = [
  { id: 'add', name: 'Your Story', image: '', isAdd: true },
  { id: '1', name: 'TWICE', image: 'https://picsum.photos/seed/twice/100/100', isLive: true, viewed: false },
  { id: '2', name: 'Lisa', image: 'https://picsum.photos/seed/lisa/100/100', isLive: false, viewed: false },
  { id: '3', name: 'NewJeans', image: 'https://picsum.photos/seed/newjeans/100/100', isLive: false, viewed: false },
  { id: '4', name: 'imase', image: 'https://picsum.photos/seed/imase/100/100', isLive: false, viewed: true },
  { id: '5', name: 'BLACKPINK', image: 'https://picsum.photos/seed/bp/100/100', isLive: true, viewed: false },
  { id: '6', name: 'aespa', image: 'https://picsum.photos/seed/aespa/100/100', isLive: false, viewed: true },
  { id: '7', name: 'IVE', image: 'https://picsum.photos/seed/ive/100/100', isLive: false, viewed: false },
];

export default function Home() {
  const [lang, setLang] = useState<Language>('zh-TW');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => { setMounted(true); }, []);

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.idols', href: '#idols' },
    { key: 'nav.news', href: '#news' },
    { key: 'nav.forum', href: '#forum' },
    { key: 'nav.about', href: '#about' },
  ];

  const currentLangObj = languages.find(l => l.code === lang);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden pb-20 lg:pb-0">

      {/* ── Background Effects ── */}
      <div className="fixed inset-0 hero-bg -z-10" />
      <div className="fixed inset-0 hero-grid -z-10" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-[140px] -z-10 animate-float" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/8 rounded-full blur-[120px] -z-10 animate-float" style={{ animationDelay: '3s' }} />
      <div className="fixed top-1/2 right-1/3 w-64 h-64 bg-cyan-400/6 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '1.5s' }} />

      {/* ========================================
           Navigation
           ======================================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#ff006e] via-[#8338ec] to-[#00f4ff] flex items-center justify-center shadow-lg">
                  <span className="text-lg">🎤</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ff006e] via-[#8338ec] to-[#00f4ff] blur-md opacity-40 -z-10" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold gradient-text tracking-tight">IdolRadar</span>
                <span className="hidden sm:block text-[9px] text-white/30 -mt-0.5 tracking-widest uppercase">Global Fans</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.key}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {t(lang, link.key)}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">

              {/* Language Picker */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 hover:border-white/15 transition-all text-sm">
                  <span>{currentLangObj?.flag}</span>
                  <span className="hidden sm:inline text-white/70 text-xs">{currentLangObj?.name}</span>
                  <ChevronDown />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 py-1.5 rounded-2xl bg-[#181818] border border-white/8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl z-50">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors ${lang === l.code ? 'text-[#00f4ff]' : 'text-white/65'}`}
                    >
                      <span>{l.flag}</span>
                      <span className="text-sm">{l.name}</span>
                      {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00f4ff]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#080808]/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map(link => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/65 hover:text-white hover:bg-white/5 transition text-sm"
                >
                  {t(lang, link.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ========================================
           Hero Section
           ======================================== */}
      <section id="home" className="hero-section pt-24 pb-16 sm:pt-32 sm:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">

          {/* Live Badge */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff006e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff006e]" />
            </span>
            <span className="text-xs sm:text-sm text-white/65 font-medium">
              {lang === 'zh-TW' ? '全球偶像即時資訊平台' : lang === 'ja' ? 'グローバル・アイドル・プラットフォーム' : lang === 'ko' ? '글로벌 아이돌 실시간 플랫폼' : 'Global Idol Live Platform'}
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-5xl sm:text-6xl lg:text-8xl font-black mb-5 sm:mb-7 tracking-tighter leading-[0.9] ${mounted ? 'animate-fade-in stagger-1' : 'opacity-0'}`}>
            <span className="block text-white">Your</span>
            <span className="block gradient-text mt-1">Idol Hub</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg text-white/45 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed ${mounted ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {t(lang, 'hero.subtitle')}
          </p>

          {/* Search */}
          <div className={`max-w-xl mx-auto relative ${mounted ? 'animate-fade-in stagger-3' : 'opacity-0'}`}>
            <div className="search-bar flex items-center gap-2 px-5 py-1">
              <div className="glow-border" />
              <div className="text-white/35">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t(lang, 'search.placeholder')}
                className="flex-1 py-4 bg-transparent text-white placeholder-white/25 focus:outline-none text-sm sm:text-base"
              />
              <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff006e] to-[#8338ec] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#ff006e]/30 transition-all whitespace-nowrap">
                {t(lang, 'nav.home') === '首頁' ? '搜尋' : t(lang, 'nav.home') === 'ホーム' ? '検索' : t(lang, 'nav.home') === '홈' ? '검색' : 'Search'}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className={`flex flex-wrap justify-center gap-10 sm:gap-16 mt-14 sm:mt-18 ${mounted ? 'animate-fade-in stagger-4' : 'opacity-0'}`}>
            {[
              { num: '500+', label: lang === 'zh-TW' ? '活躍偶像' : lang === 'ja' ? 'アイドル' : lang === 'ko' ? '아이돌' : 'Active Idols' },
              { num: '50K+', label: lang === 'zh-TW' ? '粉絲會員' : lang === 'ja' ? 'ファン' : lang === 'ko' ? '팬 회원' : 'Fan Members' },
              { num: '10', label: lang === 'zh-TW' ? '支援語言' : lang === 'ja' ? '言語対応' : lang === 'ko' ? '지원 언어' : 'Languages' },
            ].map(s => (
              <div key={s.num} className="stat-item">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
           Stories Strip — Instagram Style
           ======================================== */}
      <section className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="stories-container">
          {storyIdols.map(story => (
            <div key={story.id} className="story-item">
              {story.isAdd ? (
                <div className="story-add">
                  <PlusIcon />
                </div>
              ) : (
                <div className={`story-ring ${story.viewed ? 'viewed' : story.isLive ? 'live-ring' : ''}`}>
                  <img src={story.image} alt={story.name} className="story-avatar" />
                  {story.isLive && <div className="live-badge">LIVE</div>}
                </div>
              )}
              <span className="story-name">{story.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
           Trending — TikTok Pills
           ======================================== */}
      <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="section-divider" />
          <div className="flex items-center gap-2">
            <span className="text-[#ff006e]"><FireIcon /></span>
            <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'trending')}</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {trendingTopics.map((topic, i) => (
            <a
              key={topic.id}
              href="#"
              className={`trending-pill ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="hashtag text-sm">#</span>
              <span className="font-semibold text-white/85 text-sm">{topic.name.replace('#', '')}</span>
              <span className="text-xs text-white/35 ml-1">{(topic.posts / 1000).toFixed(1)}K</span>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================
           Featured Idols — Instagram Grid
           ======================================== */}
      <section id="idols" className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="section-divider" />
            <div className="flex items-center gap-2">
              <span className="text-yellow-400"><StarIcon /></span>
              <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'featured_idols')}</h2>
            </div>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm text-[#00f4ff] hover:text-[#00f4ff]/75 transition font-medium">
            {lang === 'zh-TW' ? '全部' : lang === 'ja' ? 'すべて' : lang === 'ko' ? '전체' : 'See all'}
            <ChevronRight />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {idols.map((idol, i) => (
            <a
              key={idol.id}
              href="#"
              className={`card-idol group ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={idol.image}
                  alt={idol.name}
                  className="w-full h-full object-cover idol-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                {/* Play overlay */}
                <div className="play-overlay">
                  <div className="play-btn">
                    <PlayIcon />
                  </div>
                </div>

                {/* Trending */}
                {idol.trending && (
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#ff006e] text-[10px] font-black tracking-wide flex items-center gap-1 shadow-lg">
                    🔥 HOT
                  </div>
                )}

                {/* Country */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-sm text-[11px] font-medium text-white/85">
                  {idol.country}
                </div>

                {/* Bottom overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-bold text-sm leading-tight truncate">{idol.name}</p>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {formatFollowers(idol.followers)} {lang === 'zh-TW' ? '粉絲' : 'fans'}
                  </p>
                </div>
              </div>

              {/* Platform Tags */}
              <div className="px-3 py-2.5 flex gap-1.5">
                {idol.platform.slice(0, 3).map((p, j) => (
                  <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-white/6 text-white/40 border border-white/8">
                    {p}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================
           Hot Chart — Spotify Style
           ======================================== */}
      <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="section-divider" />
            <div className="flex items-center gap-2">
              <span className="text-[#1db954]"><MusicIcon /></span>
              <h2 className="text-lg sm:text-xl font-bold">
                {lang === 'zh-TW' ? '本週熱門榜' : lang === 'ja' ? '今週のホットチャート' : lang === 'ko' ? '이번 주 인기 차트' : lang === 'th' ? 'ชาร์ตยอดนิยมสัปดาห์นี้' : 'Hot Chart This Week'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-white/30 font-medium uppercase tracking-wide">
            {lang === 'zh-TW' ? '全球串流' : 'Global Streams'}
          </span>
        </div>

        <div className="chart-container">
          {hotChart.map((item, i) => {
            const trendDiff = item.prev - item.rank;
            const trendClass = trendDiff > 0 ? 'up' : trendDiff < 0 ? 'down' : 'same';
            const trendSymbol = trendDiff > 0 ? `↑${trendDiff}` : trendDiff < 0 ? `↓${Math.abs(trendDiff)}` : '—';
            return (
              <div key={item.rank} className="chart-item">
                <span className={`chart-rank ${item.rank <= 3 ? 'top-3' : ''}`}>{item.rank}</span>
                <img src={item.image} alt={item.name} className="chart-img" />
                <div className="chart-info">
                  <div className="chart-name">{item.name} <span className="text-white/40">{item.country}</span></div>
                  <div className="chart-sub">{item.sub}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:block text-xs text-white/35 font-medium">{item.streams}</span>
                  <span className={`chart-trend ${trendClass}`}>{trendSymbol}</span>
                  <div className="chart-play">
                    <PlayIcon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================
           Latest News — Magazine Cards
           ======================================== */}
      <section id="news" className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="section-divider" />
            <div className="flex items-center gap-2">
              <span className="text-[#00f4ff]"><MusicIcon /></span>
              <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'latest_news')}</h2>
            </div>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm text-[#00f4ff] hover:text-[#00f4ff]/75 transition font-medium">
            {lang === 'zh-TW' ? '全部消息' : lang === 'ja' ? 'すべて' : lang === 'ko' ? '전체 보기' : 'View all'}
            <ChevronRight />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {news.map((item, i) => (
            <a
              key={item.id}
              href="#"
              className={`news-card group ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={lang === 'zh-TW' ? item.titleCn : item.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <span className={`category-badge ${item.category}`}>
                  {item.category}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-[#00f4ff] transition-colors leading-snug">
                  {lang === 'zh-TW' ? item.titleCn : item.title}
                </h3>
                <p className="text-xs text-white/45 mt-2 line-clamp-2 leading-relaxed">
                  {lang === 'zh-TW' ? item.summaryCn : item.summary}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff006e] flex-shrink-0" />
                    {item.source}
                  </div>
                  <span className="text-xs text-white/25">{item.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================
           Forum Preview
           ======================================== */}
      <section id="forum" className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="section-divider" />
            <div className="flex items-center gap-2">
              <span className="text-[#8338ec]"><MessageIcon /></span>
              <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'nav.forum')}</h2>
            </div>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm text-[#00f4ff] hover:text-[#00f4ff]/75 transition font-medium">
            {lang === 'zh-TW' ? '加入討論' : lang === 'ja' ? '議論に参加' : lang === 'ko' ? '토론 참여' : 'Join discussion'}
            <ChevronRight />
          </a>
        </div>

        <div className="bg-[#111111] rounded-2xl border border-white/5 overflow-hidden">
          {forumPosts.map((post, i) => (
            <a
              key={post.id}
              href="#"
              className={`forum-item group ${i > 0 ? 'border-t border-white/5' : ''}`}
            >
              <div className="avatar">{post.author[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {post.pinned && <PinIcon />}
                  <span className="font-semibold text-sm truncate group-hover:text-[#00f4ff] transition-colors">{post.title}</span>
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-white/35">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#00f4ff]" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageIcon />
                    {post.replies}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <EyeIcon />
                    {post.views}
                  </span>
                </div>
              </div>
              <span className="text-xs text-white/25 flex-shrink-0 hidden sm:block">{post.date}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================
           Footer
           ======================================== */}
      <footer id="about" className="border-t border-white/5 mt-6 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff006e] via-[#8338ec] to-[#00f4ff] flex items-center justify-center shadow-lg">
                <span className="text-xl">🎤</span>
              </div>
              <div>
                <p className="font-bold text-lg gradient-text">IdolRadar.club</p>
                <p className="text-xs text-white/35">Connecting Fans Worldwide</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              {['Privacy', 'Terms', 'Contact', 'Support'].map(l => (
                <a key={l} href="#" className="hover:text-[#00f4ff] transition">{l}</a>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-2.5">
              {[
                { icon: '𝕏', label: 'Twitter' },
                { icon: '📷', label: 'Instagram' },
                { icon: '📺', label: 'YouTube' },
                { icon: '🎵', label: 'TikTok' },
              ].map(s => (
                <a
                  key={s.label}
                  href="#"
                  title={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#ff006e]/20 hover:scale-110 transition-all text-base"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Language row */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 pt-6 border-t border-white/5">
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${lang === l.code ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
              >
                {l.flag} {l.name}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-white/20 mt-6">
            © 2025 IdolRadar.club · Made with 🎵 for fans worldwide
          </p>
        </div>
      </footer>

      {/* ========================================
           Bottom Navigation — TikTok/Instagram (Mobile)
           ======================================== */}
      <div className="bottom-nav lg:hidden">
        {[
          { id: 'home', icon: '🏠', label: lang === 'zh-TW' ? '首頁' : lang === 'ja' ? 'ホーム' : lang === 'ko' ? '홈' : 'Home', href: '#home' },
          { id: 'idols', icon: '⭐', label: lang === 'zh-TW' ? '偶像' : lang === 'ja' ? 'アイドル' : lang === 'ko' ? '아이돌' : 'Idols', href: '#idols' },
          { id: 'center', icon: '', label: '', href: '#' },
          { id: 'news', icon: '📰', label: lang === 'zh-TW' ? '新聞' : lang === 'ja' ? 'ニュース' : lang === 'ko' ? '뉴스' : 'News', href: '#news' },
          { id: 'forum', icon: '💬', label: lang === 'zh-TW' ? '論壇' : lang === 'ja' ? 'フォーラム' : lang === 'ko' ? '포럼' : 'Forum', href: '#forum' },
        ].map(item => {
          if (item.id === 'center') {
            return (
              <div key="center" className="bottom-nav-center">
                <button className="bottom-nav-center-btn">
                  <PlusIcon />
                </button>
              </div>
            );
          }
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveNav(item.id)}
              className={`bottom-nav-item ${activeNav === item.id ? 'active' : ''}`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          );
        })}
      </div>

    </main>
  );
}
