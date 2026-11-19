import React, { useState, useEffect, useRef } from 'react';

const HEADER_TEXTS = {
  uz: {
    announcements: [
      '✦ Toshkent va butun O‘zbekiston bo‘ylab BEPUL kuryerlik yetkazib berish',
      '✦ Har bir 100ml atir xaridiga 2 ta bepul 5ml Discovery namuna sovg‘a',
      '✦ AETHERIA Privé 2026 yangi kolleksiyasi endi sotuvda',
    ],
    navCollection: 'Kolleksiya',
    navSets: 'Discovery Setlar',
    navFinder: 'Shaxsiy Tanlov',
    navJournal: 'Jurnal',
    navBoutiques: 'Butiklar',
    searchOpen: 'Qidirish',
    searchPlaceholder: 'Atir nomi yoki nota (Ud, Za’faron, Atirgul)...',
    popularNotes: 'Ommabop notalar:',
    compareLabel: 'Solishtirish',
    wishlistLabel: 'Sevimlilar',
    bagLabel: 'Savatcha',
    themeDark: 'Tungi rejim',
    themeLight: 'Kunduzgi rejim',
    menuTitle: 'AETHERIA NAVIGATSIYA',
    boutiqueInfo: 'Toshkent, Amir Temur shoh ko‘chasi, 108 • Har kuni 10:00 – 22:00',
  },
  ru: {
    announcements: [
      '✦ БЕСПЛАТНАЯ курьерская доставка по Ташкенту и всему Узбекистану',
      '✦ Два пробника 5мл в подарок к каждому флакону 100мл',
      '✦ Новая коллекция AETHERIA Privé 2026 уже в продаже',
    ],
    navCollection: 'Коллекция',
    navSets: 'Discovery-наборы',
    navFinder: 'Подбор аромата',
    navJournal: 'Журнал',
    navBoutiques: 'Бутики',
    searchOpen: 'Поиск',
    searchPlaceholder: 'Название аромата или нота (Уд, Шафран, Роза)...',
    popularNotes: 'Популярные ноты:',
    compareLabel: 'Сравнение',
    wishlistLabel: 'Избранное',
    bagLabel: 'Корзина',
    themeDark: 'Тёмная тема',
    themeLight: 'Светлая тема',
    menuTitle: 'НАВИГАЦИЯ AETHERIA',
    boutiqueInfo: 'Ташкент, пр-т Амира Темура, 108 • Ежедневно 10:00 – 22:00',
  },
  en: {
    announcements: [
      '✦ COMPLIMENTARY insured courier delivery across Tashkent & Uzbekistan',
      '✦ Receive two complimentary 5ml Discovery samples with every 100ml flacon',
      '✦ The new AETHERIA Privé 2026 Collection is now available',
    ],
    navCollection: 'Collection',
    navSets: 'Discovery Sets',
    navFinder: 'Scent Finder',
    navJournal: 'Journal',
    navBoutiques: 'Boutiques',
    searchOpen: 'Search',
    searchPlaceholder: 'Search fragrance or note (Oud, Saffron, Rose)...',
    popularNotes: 'Popular notes:',
    compareLabel: 'Compare',
    wishlistLabel: 'Wishlist',
    bagLabel: 'Bag',
    themeDark: 'Dark Mode',
    themeLight: 'Light Mode',
    menuTitle: 'AETHERIA NAVIGATION',
    boutiqueInfo: '108 Amir Temur Avenue, Tashkent • Open Daily 10:00 – 22:00',
  },
};

const QUICK_SEARCH_TAGS = {
  uz: ['Ud', 'Za’faron', 'Atirgul', 'Bergamot', 'Ambra', 'Vanil'],
  ru: ['Уд', 'Шафран', 'Роза', 'Бергамот', 'Амбра', 'Ваниль'],
  en: ['Oud', 'Saffron', 'Rose', 'Bergamot', 'Amber', 'Vanilla'],
};

const Header = ({
  lang = 'uz',
  setLang,
  theme = 'dark',
  setTheme,
  searchQuery = '',
  setSearchQuery,
  cartCount = 0,
  wishlistCount = 0,
  compareCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onNavigateCatalog,
  onNavigateQuiz,
}) => {
  const t = HEADER_TEXTS[lang] || HEADER_TEXTS.uz;
  const quickTags = QUICK_SEARCH_TAGS[lang] || QUICK_SEARCH_TAGS.en;

  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavHash, setActiveNavHash] = useState('collection');

  const searchInputRef = useRef(null);

  // Scroll kuzatuvchisi
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Yuqori e'lonlar karuseli
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % t.announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [t.announcements.length]);

  // Qidiruv paneli ochilganda inputga fokus berish
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleNavClick = (sectionId, callback) => {
    setActiveNavHash(sectionId);
    setIsMobileMenuOpen(false);
    if (callback) {
      callback();
      return;
    }
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickTagSelect = (tag) => {
    if (setSearchQuery) {
      setSearchQuery(tag);
    }
    if (onNavigateCatalog) {
      onNavigateCatalog();
    }
    setIsSearchExpanded(false);
  };

  return (
    <>
      <header className={`aetheria-header ${isScrolled ? 'is-scrolled' : ''}`}>
        {/* Yuqori E'lonlar Tasmasidagi Matn */}
        <div className="aetheria-topbar">
          <div className="aetheria-container aetheria-topbar__inner">
            <button
              type="button"
              className="topbar-arrow"
              onClick={() =>
                setAnnouncementIdx(
                  (prev) => (prev - 1 + t.announcements.length) % t.announcements.length
                )
              }
              aria-label="Previous announcement"
            >
              ‹
            </button>

            <p key={`${lang}-${announcementIdx}`} className="topbar-message">
              {t.announcements[announcementIdx]}
            </p>

            <button
              type="button"
              className="topbar-arrow"
              onClick={() =>
                setAnnouncementIdx((prev) => (prev + 1) % t.announcements.length)
              }
              aria-label="Next announcement"
            >
              ›
            </button>
          </div>
        </div>

        {/* Asosiy Navigatsiya Qatori */}
        <div className="aetheria-navbar">
          <div className="aetheria-container aetheria-navbar__inner">
            {/* Chap taraf: Mobil Hamburger va Brend Logotipi */}
            <div className="aetheria-navbar__left">
              <button
                type="button"
                className="mobile-menu-trigger"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <span />
                <span />
                <span />
              </button>

              <a
                href="#top"
                className="aetheria-brand-logo"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className="brand-emblem">◈</span>
                <span className="brand-wordmark">
                  <strong>AETHERIA</strong>
                  <small>HAUTE PARFUMERIE</small>
                </span>
              </a>
            </div>

            {/* Markaziy Navigatsiya Havolalari */}
            <nav className="aetheria-nav-links" aria-label="Primary Navigation">
              <button
                type="button"
                className={`nav-link-item ${activeNavHash === 'collection' ? 'is-active' : ''}`}
                onClick={() => handleNavClick('collection', onNavigateCatalog)}
              >
                {t.navCollection}
              </button>

              <button
                type="button"
                className={`nav-link-item ${activeNavHash === 'sets' ? 'is-active' : ''}`}
                onClick={() => handleNavClick('sets')}
              >
                {t.navSets}
              </button>

              <button
                type="button"
                className={`nav-link-item ${
                  activeNavHash === 'scent-finder' ? 'is-active' : ''
                }`}
                onClick={() => handleNavClick('scent-finder', onNavigateQuiz)}
              >
                <span className="nav-spark">✦</span>
                {t.navFinder}
              </button>

              <button
                type="button"
                className={`nav-link-item ${activeNavHash === 'journal' ? 'is-active' : ''}`}
                onClick={() => handleNavClick('journal')}
              >
                {t.navJournal}
              </button>

              <button
                type="button"
                className={`nav-link-item ${activeNavHash === 'footer' ? 'is-active' : ''}`}
                onClick={() => handleNavClick('footer')}
              >
                {t.navBoutiques}
              </button>
            </nav>

            {/* O'ng taraf: Qidiruv, Til, Tema, Solishtirish, Sevimlilar, Savatcha */}
            <div className="aetheria-navbar__right">
              {/* Qidiruvni ochish tugmasi */}
              <button
                type="button"
                className={`nav-icon-btn ${isSearchExpanded ? 'is-active' : ''}`}
                onClick={() => setIsSearchExpanded((prev) => !prev)}
                title={t.searchOpen}
                aria-label={t.searchOpen}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* Til Tanlash (UZ / RU / EN) */}
              <div className="lang-switcher" role="group" aria-label="Language Switcher">
                {['uz', 'ru', 'en'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`lang-btn ${lang === code ? 'is-active' : ''}`}
                    onClick={() => setLang && setLang(code)}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Dark / Light Rejim Tugmasi */}
              <button
                type="button"
                className="nav-icon-btn theme-toggle-btn"
                onClick={() => setTheme && setTheme(theme === 'dark' ? 'light' : 'dark')}
                title={theme === 'dark' ? t.themeLight : t.themeDark}
                aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
              >
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>

              {/* Solishtirish tugmasi */}
              {onOpenCompare && (
                <button
                  type="button"
                  className="nav-icon-btn hide-on-mobile"
                  onClick={onOpenCompare}
                  title={t.compareLabel}
                  aria-label={t.compareLabel}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                  </svg>
                  {compareCount > 0 && <span className="nav-badge">{compareCount}</span>}
                </button>
              )}

              {/* Sevimlilar (Wishlist) tugmasi */}
              <button
                type="button"
                className="nav-icon-btn"
                onClick={onOpenWishlist}
                title={t.wishlistLabel}
                aria-label={t.wishlistLabel}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
              </button>

              {/* Savatcha (Shopping Bag) tugmasi */}
              <button
                type="button"
                className="nav-bag-btn"
                onClick={onOpenCart}
                aria-label={t.bagLabel}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="bag-label">{t.bagLabel}</span>
                <span className="bag-count">{cartCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ochiluvchi Jonli Qidiruv Paneli */}
        <div className={`aetheria-search-dropdown ${isSearchExpanded ? 'is-open' : ''}`}>
          <div className="aetheria-container search-dropdown__inner">
            <div className="search-dropdown__input-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (onNavigateCatalog) onNavigateCatalog();
                    setIsSearchExpanded(false);
                  }
                  if (e.key === 'Escape') {
                    setIsSearchExpanded(false);
                  }
                }}
                placeholder={t.searchPlaceholder}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setSearchQuery && setSearchQuery('')}
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                className="search-close-drawer"
                onClick={() => setIsSearchExpanded(false)}
              >
                ESC
              </button>
            </div>

            <div className="search-dropdown__tags">
              <span>{t.popularNotes}</span>
              <div className="quick-tags-list">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="quick-tag-chip"
                    onClick={() => handleQuickTagSelect(tag)}
                  >
                    ✦ {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobil Navigatsiya Drawer */}
      {isMobileMenuOpen && (
        <div className="aetheria-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <aside
            className="aetheria-mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer__head">
              <span>{t.menuTitle}</span>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="mobile-drawer__links">
              <button
                type="button"
                onClick={() => handleNavClick('collection', onNavigateCatalog)}
              >
                01. {t.navCollection}
              </button>
              <button type="button" onClick={() => handleNavClick('sets')}>
                02. {t.navSets}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('scent-finder', onNavigateQuiz)}
              >
                03. {t.navFinder}
              </button>
              <button type="button" onClick={() => handleNavClick('journal')}>
                04. {t.navJournal}
              </button>
              <button type="button" onClick={() => handleNavClick('footer')}>
                05. {t.navBoutiques}
              </button>
            </nav>

            <div className="mobile-drawer__footer">
              <div className="mobile-lang-row">
                {['uz', 'ru', 'en'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`lang-btn ${lang === code ? 'is-active' : ''}`}
                    onClick={() => setLang && setLang(code)}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="mobile-boutique-note">{t.boutiqueInfo}</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;