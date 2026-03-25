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
    <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-1 .23-1.98.68-2.83 1.22-.86.54-1.6 1.25-2.18 2.07-.6.84-1.02 1.8-1.2 2.8-.1.5-.14 1.02-.12 1.52.03 1.2.33 2.38.91 3.4.59 1.02 1.46 1.87 2.49 2.44 1.02.56 2.17.83 3.34.78 1.17-.06 2.31-.43 3.27-1.1 1.17-.83 1.98-2.02 2.22-3.36.07-.37.1-.74.08-1.1-.01-.37-.09-.73-.2-1.08-.11-.35-.26-.7-.45-1.01z"/>
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

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
);

const NewsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
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
  { id: 'add', name: '', image: '', isAdd: true },
  { id: '1', name: 'TWICE', image: 'https://picsum.photos/seed/twice/100/100', isLive: true, viewed: false },
  { id: '2', name: 'Lisa', image: 'https://picsum.photos/seed/lisa/100/100', isLive: false, viewed: false },
  { id: '3', name: 'NewJeans', image: 'https://picsum.photos/seed/newjeans/100/100', isLive: false, viewed: false },
  { id: '4', name: 'imase', image: 'https://picsum.photos/seed/imase/100/100', isLive: false, viewed: true },
  { id: '5', name: 'BLACKPINK', image: 'https://picsum.photos/seed/bp/100/100', isLive: true, viewed: false },
  { id: '6', name: 'aespa', image: 'https://picsum.photos/seed/aespa/100/100', isLive: false, viewed: true },
  { id: '7', name: 'IVE', image: 'https://picsum.photos/seed/ive/100/100', isLive: false, viewed: false },
  { id: '8', name: 'Stray Kids', image: 'https://picsum.photos/seed/skz/100/100', isLive: false, viewed: false },
];

export default function Home() {
  const [lang, setLang] = useState<Language>('zh-TW');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [likedIdols, setLikedIdols] = useState<Set<string>>(new Set());

  useEffect(() => { setMounted(true); }, []);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setLikedIdols(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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

      {/* ── Ambient Background ── */}
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
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 hover:border-white/15 transition-all text-sm"
                >
                  <span>{currentLangObj?.flag}</span>
                  <span className="hidden sm:inline text-white/70 text-xs">{currentLangObj?.name}</span>
                  <ChevronDown />
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 w-52 py-1.5 rounded-2xl bg-[#181818] border border-white/8 shadow-2xl z-50 max-h-80 overflow-y-auto">
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors ${lang === l.code ? 'text-[#00f4ff]' : 'text-white/65'}`}
                        >
                          <span>{l.flag}</span>
                          <span className="text-sm">{l.name}</span>
                          {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00f4ff]" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
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
            <span className="text-xs sm:text-sm text-white/65 font-medium">{t(lang, 'hero.eyebrow')}</span>
          </div>

          {/* Title */}
          <h1 className={`text-5xl sm:text-6xl lg:text-8xl font-black mb-5 sm:mb-7 tracking-tighter leading-[0.9] ${mounted ? 'animate-fade-in stagger-1' : 'opacity-0'}`}>
            <span className="block text-white">{t(lang, 'hero.title1')}</span>
            <span className="block gradient-text mt-1">{t(lang, 'hero.title2')}</span>
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
                {t(lang, 'search.btn')}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className={`flex flex-wrap justify-center gap-10 sm:gap-16 mt-14 sm:mt-18 ${mounted ? 'animate-fade-in stagger-4' : 'opacity-0'}`}>
            {[
              { num: '500+', label: t(lang, 'stat.idols') },
              { num: '50K+', label: t(lang, 'stat.fans') },
              { num: '10', label: t(lang, 'stat.languages') },
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
                  {story.isLive && <div className="live-badge">{t(lang, 'live')}</div>}
                </div>
              )}
              <span className="story-name">{story.isAdd ? (lang === 'zh-TW' || lang === 'zh-CN' ? '新增' : lang === 'ja' ? '追加' : lang === 'ko' ? '추가' : 'Add') : story.name}</span>
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
            {t(lang, 'see_all')}
            <ChevronRight />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {idols.slice(0, 10).map((idol, i) => (
            <a
              key={idol.id}
              href="#"
              className={`card-idol group ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.06}s` }}
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

                {/* Trending badge */}
                {idol.trending && (
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#ff006e] text-[10px] font-black tracking-wide flex items-center gap-1 shadow-lg">
                    🔥 HOT
                  </div>
                )}

                {/* Country */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-sm text-[11px] font-medium text-white/85">
                  {idol.country}
                </div>

                {/* Like button */}
                <button
                  onClick={(e) => toggleLike(idol.id, e)}
                  className={`absolute bottom-10 right-2.5 p-1.5 rounded-full transition-all ${likedIdols.has(idol.id) ? 'text-[#ff006e] bg-[#ff006e]/20' : 'text-white/50 bg-black/30 hover:text-white'}`}
                >
                  <HeartIcon filled={likedIdols.has(idol.id)} />
                </button>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-bold text-sm leading-tight truncate">{idol.name}</p>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {formatFollowers(idol.followers)} {t(lang, 'fans')}
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
              <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'hot_chart')}</h2>
            </div>
          </div>
          <span className="text-xs text-white/30 font-medium uppercase tracking-wide">
            {t(lang, 'hot_chart.streams')}
          </span>
        </div>

        <div className="chart-container">
          {hotChart.map(item => {
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
              <span className="text-[#00f4ff]"><NewsIcon /></span>
              <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'latest_news')}</h2>
            </div>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm text-[#00f4ff] hover:text-[#00f4ff]/75 transition font-medium">
            {t(lang, 'view_all')}
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
                  alt={lang === 'zh-TW' || lang === 'zh-CN' ? item.titleCn : item.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <span className={`category-badge ${item.category}`}>
                  {item.category}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-[#00f4ff] transition-colors leading-snug">
                  {lang === 'zh-TW' || lang === 'zh-CN' ? item.titleCn : item.title}
                </h3>
                <p className="text-xs text-white/45 mt-2 line-clamp-2 leading-relaxed">
                  {lang === 'zh-TW' || lang === 'zh-CN' ? item.summaryCn : item.summary}
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
            {t(lang, 'join_discussion')}
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
                <p className="text-xs text-white/35">{t(lang, 'footer.tagline')}</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              {(['footer.privacy', 'footer.terms', 'footer.contact', 'footer.support'] as const).map(key => (
                <a key={key} href="#" className="hover:text-[#00f4ff] transition">{t(lang, key)}</a>
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
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${lang === l.code ? 'bg-white/10 text-white border border-white/15' : 'text-white/30 hover:text-white/60'}`}
              >
                {l.flag} {l.name}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-white/20 mt-6">
            {t(lang, 'footer.copyright')}
          </p>
        </div>
      </footer>

      {/* ========================================
           Bottom Navigation — TikTok/Instagram (Mobile)
           ======================================== */}
      <div className="bottom-nav lg:hidden">
        {[
          { id: 'home', icon: '🏠', labelKey: 'nav.home', href: '#home' },
          { id: 'idols', icon: '⭐', labelKey: 'nav.idols', href: '#idols' },
          { id: 'center', icon: '', labelKey: '', href: '#' },
          { id: 'news', icon: '📰', labelKey: 'nav.news', href: '#news' },
          { id: 'forum', icon: '💬', labelKey: 'nav.forum', href: '#forum' },
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
              <span className="nav-label">{t(lang, item.labelKey)}</span>
            </a>
          );
        })}
      </div>

    </main>
  );
}
