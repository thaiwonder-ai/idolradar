'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

const ChevronUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
  </svg>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
  </svg>
);

const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
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
  { rank: 1, prev: 2, name: 'TWICE', sub: 'I WANT YOU BACK', country: '🇰🇷', streams: '9.8M', image: 'https://picsum.photos/seed/twice/100/100', pct: 98 },
  { rank: 2, prev: 1, name: 'Lisa', sub: 'ROCKSTAR', country: '🇹🇭', streams: '8.2M', image: 'https://picsum.photos/seed/lisa/100/100', pct: 82 },
  { rank: 3, prev: 5, name: 'NewJeans', sub: 'Supernatural', country: '🇰🇷', streams: '7.1M', image: 'https://picsum.photos/seed/newjeans/100/100', pct: 71 },
  { rank: 4, prev: 4, name: 'imase', sub: 'NIGHT DANCER', country: '🇯🇵', streams: '4.3M', image: 'https://picsum.photos/seed/imase/100/100', pct: 43 },
  { rank: 5, prev: 3, name: 'BLACKPINK', sub: 'Pink Venom', country: '🇰🇷', streams: '3.9M', image: 'https://picsum.photos/seed/bp/100/100', pct: 39 },
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

// Reels data
const reelsData = [
  { id: '1', image: 'https://picsum.photos/seed/reel1/200/356', views: '2.1M', label: 'TWICE Dance' },
  { id: '2', image: 'https://picsum.photos/seed/reel2/200/356', views: '1.8M', label: 'Lisa Performance' },
  { id: '3', image: 'https://picsum.photos/seed/reel3/200/356', views: '956K', label: 'NewJeans MV' },
  { id: '4', image: 'https://picsum.photos/seed/reel4/200/356', views: '721K', label: 'imase Live' },
  { id: '5', image: 'https://picsum.photos/seed/reel5/200/356', views: '634K', label: 'BLACKPINK Tour' },
  { id: '6', image: 'https://picsum.photos/seed/reel6/200/356', views: '412K', label: 'aespa Karina' },
];

// TikTok cards
const tiktokCards = [
  { id: '1', name: 'TWICE', sub: '🇰🇷 K-Pop', image: 'https://picsum.photos/seed/twice/400/600', followers: '25M', likes: '9.8M', comments: '142K', shares: '89K' },
  { id: '2', name: 'Lisa', sub: '🇹🇭 K-Pop Solo', image: 'https://picsum.photos/seed/lisa/400/600', followers: '35M', likes: '12.1M', comments: '231K', shares: '198K' },
  { id: '3', name: 'NewJeans', sub: '🇰🇷 K-Pop', image: 'https://picsum.photos/seed/newjeans/400/600', followers: '15M', likes: '7.1M', comments: '98K', shares: '54K' },
  { id: '4', name: 'imase', sub: '🇯🇵 J-Pop', image: 'https://picsum.photos/seed/imase/400/600', followers: '8M', likes: '4.3M', comments: '67K', shares: '31K' },
  { id: '5', name: 'BLACKPINK', sub: '🇰🇷 K-Pop', image: 'https://picsum.photos/seed/bp2/400/600', followers: '90M', likes: '18.4M', comments: '412K', shares: '287K' },
];

// Spotify wrapped stats
const spotifyWrapped = [
  { name: 'TWICE', pct: 98, streams: '9.8M', color: '#FF2D78' },
  { name: 'Lisa', pct: 82, streams: '8.2M', color: '#BF5AF2' },
  { name: 'NewJeans', pct: 71, streams: '7.1M', color: '#00F5FF' },
  { name: 'imase', pct: 43, streams: '4.3M', color: '#30D158' },
  { name: 'BLACKPINK', pct: 39, streams: '3.9M', color: '#FF9F0A' },
];

// ========================================
// Ripple Effect Hook
// ========================================
function useRipple() {
  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-wave';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px;`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, []);
  return createRipple;
}

// ========================================
// Quick Peek Modal Component
// ========================================
interface QuickPeekProps {
  idol: { id: string; name: string; image: string; followers: number; country: string; platform: string[] } | null;
  onClose: () => void;
  lang: Language;
}

function QuickPeekModal({ idol, onClose, lang }: QuickPeekProps) {
  if (!idol) return null;
  return (
    <div className="quick-peek-overlay" onClick={onClose}>
      <div className="quick-peek-modal" onClick={e => e.stopPropagation()}>
        <div className="quick-peek-handle" />
        <div className="flex items-center gap-4 mb-6">
          <img src={idol.image} alt={idol.name} className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <h3 className="text-xl font-black text-white">{idol.name}</h3>
            <p className="text-sm text-white/50 mt-0.5">{idol.country}</p>
          </div>
          <button onClick={onClose} className="ml-auto p-2 rounded-full bg-white/8 hover:bg-white/15 transition">
            <CloseIcon />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Followers', value: formatFollowers(idol.followers) },
            { label: 'Rank Change', value: '↑3' },
            { label: 'Activity', value: 'High' },
          ].map(s => (
            <div key={s.label} className="glass-panel p-3 text-center">
              <div className="text-lg font-black gradient-text">{s.value}</div>
              <div className="text-[11px] text-white/40 mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Platforms</div>
          <div className="flex flex-wrap gap-2">
            {idol.platform.map(p => (
              <span key={p} className="px-3 py-1.5 rounded-full bg-white/6 border border-white/10 text-sm text-white/70 font-medium">{p}</span>
            ))}
          </div>
        </div>

        <div className="glass-panel p-4">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Recent Activity</div>
          <p className="text-sm text-white/65 leading-relaxed">New album dropped · Trending worldwide · Fan meetup announced</p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Main Page Component
// ========================================
export default function Home() {
  const [lang, setLang] = useState<Language>('zh-TW');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [likedIdols, setLikedIdols] = useState<Set<string>>(new Set());
  const [tiktokIndex, setTiktokIndex] = useState(0);
  const [peekIdol, setPeekIdol] = useState<typeof idols[0] | null>(null);
  const [fabOpen, setFabOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const createRipple = useRipple();

  useEffect(() => {
    setMounted(true);
    // Intersection observer for stats
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard nav for TikTok cards
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') setTiktokIndex(i => Math.max(0, i - 1));
      if (e.key === 'ArrowDown') setTiktokIndex(i => Math.min(tiktokCards.length - 1, i + 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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

  // TikTok touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) setTiktokIndex(i => Math.min(tiktokCards.length - 1, i + 1));
    if (diff < -50) setTiktokIndex(i => Math.max(0, i - 1));
  };

  const getCardState = (idx: number) => {
    if (idx === tiktokIndex) return 'active';
    if (idx < tiktokIndex) return 'prev';
    if (idx === tiktokIndex + 1) return 'next';
    return 'hidden';
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden pb-20 lg:pb-0">

      {/* Ambient Background */}
      <div className="fixed inset-0 hero-bg -z-10" />
      <div className="fixed inset-0 hero-grid -z-10" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-[140px] -z-10 animate-float" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/8 rounded-full blur-[120px] -z-10 animate-float" style={{ animationDelay: '3s' }} />
      <div className="fixed top-1/2 right-1/3 w-64 h-64 bg-cyan-400/6 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '1.5s' }} />

      {/* ========================================
           Navigation
           ======================================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-ultra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF2D78] via-[#BF5AF2] to-[#00F5FF] flex items-center justify-center shadow-lg">
                  <span className="text-lg">🎤</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF2D78] via-[#BF5AF2] to-[#00F5FF] blur-md opacity-40 -z-10" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black gradient-text tracking-tight">IdolRadar</span>
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

              {/* Language Picker — Sleek Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 hover:border-white/20 transition-all text-sm ripple-container"
                  onMouseDown={createRipple}
                >
                  <span className="text-base">{currentLangObj?.flag}</span>
                  <span className="hidden sm:inline text-white/70 text-xs font-medium">{currentLangObj?.name}</span>
                  <span className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                  </span>
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div
                      className="absolute top-full right-0 mt-2 w-56 py-2 rounded-2xl border border-white/8 shadow-2xl z-50 max-h-80 overflow-y-auto animate-scale-in"
                      style={{ background: 'rgba(18,18,26,0.97)', backdropFilter: 'blur(24px)' }}
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/6 transition-colors ${lang === l.code ? 'text-[#00F5FF]' : 'text-white/65'}`}
                        >
                          <span className="text-lg">{l.flag}</span>
                          <span className="text-sm font-medium">{l.name}</span>
                          {lang === l.code && (
                            <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-br from-[#FF2D78] to-[#00F5FF]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition ripple-container"
                onMouseDown={createRipple}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/5 animate-slide-up" style={{ background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(24px)' }}>
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map(link => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/65 hover:text-white hover:bg-white/5 transition text-sm font-medium"
                >
                  {t(lang, link.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ========================================
           Hero Section — Enhanced Parallax
           ======================================== */}
      <section id="home" className="hero-section pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 overflow-hidden">

        {/* Floating Particles */}
        {mounted && [
          { style: { top: '15%', left: '8%', width: 6, height: 6, background: '#FF2D78', '--duration': '7s', '--delay': '0s' } },
          { style: { top: '25%', right: '10%', width: 4, height: 4, background: '#00F5FF', '--duration': '9s', '--delay': '1s' } },
          { style: { top: '60%', left: '5%', width: 8, height: 8, background: '#BF5AF2', '--duration': '8s', '--delay': '2s' } },
          { style: { top: '70%', right: '7%', width: 5, height: 5, background: '#30D158', '--duration': '6s', '--delay': '0.5s' } },
          { style: { top: '40%', left: '15%', width: 3, height: 3, background: '#FF2D78', '--duration': '11s', '--delay': '3s' } },
          { style: { top: '80%', left: '25%', width: 6, height: 6, background: '#00F5FF', '--duration': '10s', '--delay': '1.5s' } },
        ].map((p, i) => (
          <div key={i} className="particle" style={p.style as React.CSSProperties} />
        ))}

        <div className="max-w-4xl mx-auto text-center relative z-10">

          {/* Live Badge */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2D78] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2D78]" />
            </span>
            <span className="text-xs sm:text-sm text-white/65 font-medium">{t(lang, 'hero.eyebrow')}</span>
          </div>

          {/* Title — 900 weight display */}
          <h1 className={`text-5xl sm:text-6xl lg:text-8xl font-black mb-5 sm:mb-7 tracking-tighter leading-[0.9] ${mounted ? 'animate-fade-in stagger-1' : 'opacity-0'}`}
              style={{ fontWeight: 900 }}>
            <span className="block text-white">{t(lang, 'hero.title1')}</span>
            <span
              className="block mt-1"
              style={{
                background: 'linear-gradient(135deg, #FF2D78 0%, #BF5AF2 50%, #00F5FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              {t(lang, 'hero.title2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg text-white/45 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed ${mounted ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            {t(lang, 'hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap gap-3 justify-center mb-10 sm:mb-12 ${mounted ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            <button
              className="btn-primary ripple-container"
              onMouseDown={createRipple}
            >
              🔥 {t(lang, 'trending')}
            </button>
            <button className="btn-secondary ripple-container" onMouseDown={createRipple}>
              {t(lang, 'featured_idols')}
            </button>
          </div>

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
              <button
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF2D78] to-[#BF5AF2] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#FF2D78]/30 transition-all whitespace-nowrap ripple-container"
                onMouseDown={createRipple}
              >
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
              <div key={s.num} className="stat-item number-pop">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
           Instagram Stories Strip — Enhanced
           ======================================== */}
      <section className="max-w-7xl mx-auto px-4 py-4 sm:py-6">

        {/* Active Story Progress Bar */}
        {activeStory && (
          <div className="flex items-center gap-1 mb-3 px-1">
            {storyIdols.filter(s => !s.isAdd).map(s => (
              <div key={s.id} className="story-progress-track">
                <div className={`story-progress-fill ${s.id === activeStory ? '' : 'w-full'}`}
                     style={s.id !== activeStory ? { animationPlayState: 'paused', width: '100%' } : {}} />
              </div>
            ))}
          </div>
        )}

        <div className="stories-container">
          {storyIdols.map(story => (
            <div
              key={story.id}
              className="story-item"
              onClick={() => !story.isAdd && setActiveStory(story.id === activeStory ? null : story.id)}
            >
              {story.isAdd ? (
                <div className="story-add">
                  <PlusIcon />
                </div>
              ) : (
                <div className={`${!story.viewed && !story.isLive ? 'story-ring-animated' : ''} ${story.viewed ? 'story-ring viewed' : story.isLive ? 'story-ring live-ring' : ''}`}
                     style={{ padding: (!story.viewed && !story.isLive) ? '0' : undefined }}>
                  <img src={story.image} alt={story.name} className="story-avatar" />
                  {story.isLive && <div className="live-badge">{t(lang, 'live')}</div>}
                </div>
              )}
              <span className="story-name">
                {story.isAdd
                  ? (lang === 'zh-TW' || lang === 'zh-CN' ? '新增' : lang === 'ja' ? '追加' : lang === 'ko' ? '추가' : 'Add')
                  : story.name}
              </span>
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
            <span className="text-[#FF2D78]"><FireIcon /></span>
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
              <span className="trending-indicator ml-1">
                <TrendingUpIcon />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================
           TikTok-style Vertical Swipe Cards
           ======================================== */}
      <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-divider" />
            <div className="section-icon-wrap bg-gradient-to-br from-[#FF2D78]/20 to-[#BF5AF2]/20 border border-[#FF2D78]/20">
              <span className="text-sm">📱</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">For You</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>↑↓ keys or swipe</span>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Card Stack */}
          <div
            className="tiktok-card-stack flex-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {tiktokCards.map((card, idx) => {
              const state = getCardState(idx);
              return (
                <div key={card.id} className={`tiktok-card ${state}`}>
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover" />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 pr-20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="trending-indicator">🔥 TRENDING</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-1" style={{ fontWeight: 900 }}>{card.name}</h3>
                    <p className="text-sm text-white/60 mb-3">{card.sub}</p>
                    <div className="flex items-center gap-3 text-sm text-white/50">
                      <span>👥 {card.followers} fans</span>
                    </div>
                  </div>

                  {/* Right side action buttons — TikTok style */}
                  <div className="tiktok-side-actions">
                    <button
                      className="tiktok-action-btn"
                      onClick={() => setLikedIdols(prev => {
                        const next = new Set(prev);
                        next.has(card.id) ? next.delete(card.id) : next.add(card.id);
                        return next;
                      })}
                    >
                      <div className={`tiktok-action-icon ${likedIdols.has(card.id) ? 'text-[#FF2D78] border-[#FF2D78]/30' : 'text-white'}`}>
                        <HeartIcon filled={likedIdols.has(card.id)} />
                      </div>
                      <span className="tiktok-action-label">{card.likes}</span>
                    </button>

                    <div className="tiktok-action-btn">
                      <div className="tiktok-action-icon text-white">
                        <CommentIcon />
                      </div>
                      <span className="tiktok-action-label">{card.comments}</span>
                    </div>

                    <div className="tiktok-action-btn">
                      <div className="tiktok-action-icon text-white">
                        <ShareIcon />
                      </div>
                      <span className="tiktok-action-label">{card.shares}</span>
                    </div>
                  </div>

                  {/* Up / Down nav */}
                  <button
                    className="tiktok-nav-btn up"
                    onClick={() => setTiktokIndex(i => Math.max(0, i - 1))}
                    style={{ display: idx === tiktokIndex && tiktokIndex > 0 ? 'flex' : 'none' }}
                  >
                    <ChevronUp />
                  </button>
                  <button
                    className="tiktok-nav-btn down"
                    onClick={() => setTiktokIndex(i => Math.min(tiktokCards.length - 1, i + 1))}
                    style={{ display: idx === tiktokIndex && tiktokIndex < tiktokCards.length - 1 ? 'flex' : 'none' }}
                  >
                    <ChevronDown />
                  </button>

                  {/* Card counter */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5">
                    {tiktokCards.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: dotIdx === tiktokIndex ? 16 : 6,
                          height: 6,
                          background: dotIdx === tiktokIndex ? '#FF2D78' : 'rgba(255,255,255,0.3)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
           Featured Idols — Instagram Grid + Quick Peek
           ======================================== */}
      <section id="idols" className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-divider" />
            <div className="section-icon-wrap bg-yellow-400/10 border border-yellow-400/20">
              <StarIcon />
            </div>
            <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'featured_idols')}</h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm text-[#00F5FF] hover:text-[#00F5FF]/75 transition font-medium">
            {t(lang, 'see_all')}
            <ChevronRight />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {idols.slice(0, 10).map((idol, i) => (
            <div
              key={idol.id}
              className={`card-idol group gradient-border-animated cursor-pointer ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => setPeekIdol(idol)}
              onContextMenu={e => { e.preventDefault(); setPeekIdol(idol); }}
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

                {/* Rank badge */}
                <div className={`absolute top-2.5 left-2.5 rank-badge ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}`}>
                  {i + 1}
                </div>

                {/* Trending badge */}
                {idol.trending && (
                  <div className="absolute top-2.5 right-2.5 trending-indicator shadow-lg">
                    🔥 HOT
                  </div>
                )}

                {/* Like button */}
                <button
                  onClick={(e) => toggleLike(idol.id, e)}
                  className={`absolute bottom-10 right-2.5 p-1.5 rounded-full transition-all ripple-container ${likedIdols.has(idol.id) ? 'text-[#FF2D78] bg-[#FF2D78]/20' : 'text-white/50 bg-black/30 hover:text-white'}`}
                  onMouseDown={createRipple}
                >
                  <HeartIcon filled={likedIdols.has(idol.id)} />
                </button>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-bold text-sm leading-tight truncate" style={{ fontWeight: 800 }}>{idol.name}</p>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {formatFollowers(idol.followers)} {t(lang, 'fans')}
                  </p>
                </div>
              </div>

              {/* Platform Tags */}
              <div className="px-3 py-2.5 flex gap-1.5 flex-wrap">
                {idol.platform.slice(0, 3).map((p, j) => (
                  <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-white/6 text-white/40 border border-white/8 font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hint text */}
        <p className="text-xs text-white/25 text-center mt-4">
          Tap any card for quick details
        </p>
      </section>

      {/* ========================================
           Spotify Wrapped Stats
           ======================================== */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-divider" />
            <div className="section-icon-wrap bg-[#30D158]/10 border border-[#30D158]/20">
              <span className="text-sm">🎵</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'hot_chart')}</h2>
              <p className="text-xs text-white/35 font-normal">Your Top Idols This Month</p>
            </div>
          </div>
          <span className="text-xs text-white/30 font-medium uppercase tracking-wide">
            {t(lang, 'hot_chart.streams')}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Spotify Wrapped Card */}
          <div
            className="glass-panel p-5"
            style={{ background: 'linear-gradient(135deg, rgba(30,215,96,0.08) 0%, rgba(18,18,26,0.9) 50%, rgba(191,90,242,0.08) 100%)', borderRadius: 24 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #30D158, #1db954)' }}>
                <span>🎧</span>
              </div>
              <div>
                <div className="font-bold text-sm">Spotify Wrapped</div>
                <div className="text-xs text-white/40">March 2026</div>
              </div>
            </div>

            <div className="space-y-4">
              {spotifyWrapped.map((item, i) => (
                <div key={item.name} className={`stat-counter`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/30 w-4">{i + 1}</span>
                      <span className="text-sm font-semibold">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: item.color }}>{item.streams}</span>
                  </div>
                  <div className="spotify-stat-bar">
                    <div
                      className="spotify-stat-fill"
                      style={{
                        width: statsVisible ? `${item.pct}%` : '0%',
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                        transitionDelay: `${i * 0.15}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Chart List */}
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
        </div>
      </section>

      {/* ========================================
           Viral Reels — Instagram Horizontal Scroll
           ======================================== */}
      <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-divider" />
            <div className="section-icon-wrap bg-[#FF2D78]/10 border border-[#FF2D78]/20">
              <span className="text-sm">🎬</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'viral_reels')}</h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm text-[#00F5FF] hover:text-[#00F5FF]/75 transition font-medium">
            {t(lang, 'see_all')}
            <ChevronRight />
          </a>
        </div>

        <div className="reels-strip">
          {reelsData.map((reel, i) => (
            <div
              key={reel.id}
              className={`reel-card ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <img src={reel.image} alt={reel.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Play button */}
              <div className="reel-play">
                <PlayIcon />
              </div>

              {/* View count badge */}
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white">
                <EyeIcon />
                {reel.views}
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-[11px] font-semibold text-white/90 truncate">{reel.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
           Latest News — Enhanced Cards
           ======================================== */}
      <section id="news" className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-divider" />
            <div className="section-icon-wrap bg-[#00F5FF]/10 border border-[#00F5FF]/20">
              <span className="text-[#00F5FF]"><NewsIcon /></span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'latest_news')}</h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm text-[#00F5FF] hover:text-[#00F5FF]/75 transition font-medium">
            {t(lang, 'view_all')}
            <ChevronRight />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {news.map((item, i) => (
            <a
              key={item.id}
              href="#"
              className={`news-card news-card-accent ${item.category} group ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
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
                <h3 className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-[#00F5FF] transition-colors leading-snug" style={{ fontWeight: 700 }}>
                  {lang === 'zh-TW' || lang === 'zh-CN' ? item.titleCn : item.title}
                </h3>
                <p className="text-xs text-white/45 mt-2 line-clamp-2 leading-relaxed">
                  {lang === 'zh-TW' || lang === 'zh-CN' ? item.summaryCn : item.summary}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: item.category === 'event' ? '#FF2D78' : item.category === 'achievement' ? '#30D158' : '#BF5AF2',
                      }}
                    />
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
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-divider" />
            <div className="section-icon-wrap bg-[#BF5AF2]/10 border border-[#BF5AF2]/20">
              <span className="text-[#BF5AF2]"><MessageIcon /></span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">{t(lang, 'nav.forum')}</h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm text-[#00F5FF] hover:text-[#00F5FF]/75 transition font-medium">
            {t(lang, 'join_discussion')}
            <ChevronRight />
          </a>
        </div>

        <div className="chart-container">
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
                  <span className="font-semibold text-sm truncate group-hover:text-[#00F5FF] transition-colors">{post.title}</span>
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-white/35">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#00F5FF]" />
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
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF2D78] via-[#BF5AF2] to-[#00F5FF] flex items-center justify-center shadow-lg">
                <span className="text-xl">🎤</span>
              </div>
              <div>
                <p className="font-black text-lg gradient-text">IdolRadar.club</p>
                <p className="text-xs text-white/35">{t(lang, 'footer.tagline')}</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              {(['footer.privacy', 'footer.terms', 'footer.contact', 'footer.support'] as const).map(key => (
                <a key={key} href="#" className="hover:text-[#00F5FF] transition">{t(lang, key)}</a>
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
                  className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FF2D78]/20 hover:scale-110 transition-all text-base"
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
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ripple-container ${lang === l.code ? 'bg-white/10 text-white border border-white/15' : 'text-white/30 hover:text-white/60'}`}
                onMouseDown={createRipple}
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
           Bottom Navigation — Enhanced
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
                <button className="bottom-nav-center-btn ripple-container" onMouseDown={createRipple}>
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
              <span className={`nav-icon text-lg leading-none ${activeNav === item.id ? 'animate-spring-bounce' : ''}`}>
                {item.icon}
              </span>
              <span className="nav-label">{t(lang, item.labelKey)}</span>
            </a>
          );
        })}
      </div>

      {/* ========================================
           Floating Action Button (FAB)
           ======================================== */}
      <div className="fab-container lg:hidden">
        {[
          { icon: '🔍', label: 'Search', delay: 0 },
          { icon: '📈', label: 'Trending', delay: 0.05 },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`fab-item ${fabOpen ? 'visible' : ''}`}
            style={{ transitionDelay: fabOpen ? `${item.delay}s` : `${(1 - i) * 0.05}s` }}
          >
            <span className="fab-item-label">{item.label}</span>
            <div className="fab-item-btn">
              <span className="text-lg">{item.icon}</span>
            </div>
          </div>
        ))}

        <button
          className={`fab-main ripple-container ${fabOpen ? 'open' : ''}`}
          onClick={() => setFabOpen(o => !o)}
          onMouseDown={createRipple}
        >
          <PlusIcon />
        </button>
      </div>

      {/* ========================================
           Quick Peek Modal
           ======================================== */}
      {peekIdol && (
        <QuickPeekModal
          idol={peekIdol}
          onClose={() => setPeekIdol(null)}
          lang={lang}
        />
      )}

    </main>
  );
}
