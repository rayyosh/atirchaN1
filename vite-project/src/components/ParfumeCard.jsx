import React, { useState, useRef, useEffect } from 'react';

const CARD_TRANSLATIONS = {
  uz: {
    newBadge: 'YANGI',
    bestsellerBadge: 'HIT SOTUV',
    limitedBadge: 'LIMITED',
    exclusiveBadge: 'EKSKLYUZIV',
    outOfStock: 'Sotuvda yo‘q',
    inStock: 'Sotuvda mavjud',
    lowStock: 'Kam qoldi',
    addToCart: 'Savatga qo‘shish',
    addedToCart: 'Savatga qo‘shildi ✓',
    quickView: 'Batafsil ko‘rish',
    addToWishlist: 'Sevimlilarga qo‘shish',
    removeFromWishlist: 'Sevimlilardan olish',
    compare: 'Solishtirish',
    notesTitle: 'Asosiy notalar:',
    topNotes: 'Yuqori',
    heartNotes: 'O‘rta',
    baseNotes: 'Baza',
    longevity: 'Barqarorlik',
    sillage: 'Shleyf',
    concentration: 'Konsentratsiya',
    volume: 'Hajm',
    reviews: 'sharh',
    viewPyramid: 'Notalar piramidasi',
    hidePyramid: 'Yopish',
    giftWrap: 'Sovg‘a qutisi bepul',
  },
  ru: {
    newBadge: 'НОВИНКА',
    bestsellerBadge: 'ХИТ ПРОДАЖ',
    limitedBadge: 'ЛИМИТЕД',
    exclusiveBadge: 'ЭКСКЛЮЗИВ',
    outOfStock: 'Нет в наличии',
    inStock: 'В наличии',
    lowStock: 'Осталось мало',
    addToCart: 'В корзину',
    addedToCart: 'В корзине ✓',
    quickView: 'Быстрый просмотр',
    addToWishlist: 'В избранное',
    removeFromWishlist: 'Убрать из избранного',
    compare: 'Сравнить',
    notesTitle: 'Основные ноты:',
    topNotes: 'Верхние',
    heartNotes: 'Сердца',
    baseNotes: 'Базовые',
    longevity: 'Стойкость',
    sillage: 'Шлейф',
    concentration: 'Концентрация',
    volume: 'Объём',
    reviews: 'отзывов',
    viewPyramid: 'Пирамида нот',
    hidePyramid: 'Скрыть',
    giftWrap: 'Подарочная упаковка',
  },
  en: {
    newBadge: 'NEW',
    bestsellerBadge: 'BESTSELLER',
    limitedBadge: 'LIMITED',
    exclusiveBadge: 'EXCLUSIVE',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    addToCart: 'Add to Bag',
    addedToCart: 'Added to Bag ✓',
    quickView: 'Quick View',
    addToWishlist: 'Add to Wishlist',
    removeFromWishlist: 'Remove from Wishlist',
    compare: 'Compare',
    notesTitle: 'Key Notes:',
    topNotes: 'Top',
    heartNotes: 'Heart',
    baseNotes: 'Base',
    longevity: 'Longevity',
    sillage: 'Sillage',
    concentration: 'Concentration',
    volume: 'Volume',
    reviews: 'reviews',
    viewPyramid: 'Olfactory Pyramid',
    hidePyramid: 'Hide',
    giftWrap: 'Complimentary Gift Box',
  },
};

const ParfumeCard = ({
  perfume,
  lang = 'uz',
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onToggleCompare,
  isWishlisted = false,
  isCompared = false,
  index = 0,
}) => {
  const t = CARD_TRANSLATIONS[lang] || CARD_TRANSLATIONS.uz;

  const availableVolumes = perfume?.volumes || [
    { size: '50ml', multiplier: 0.65 },
    { size: '100ml', multiplier: 1 },
  ];
  const [selectedVolumeIndex, setSelectedVolumeIndex] = useState(
    availableVolumes.length > 1 ? 1 : 0
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [showNotesPyramid, setShowNotesPyramid] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!perfume) return null;

  const title =
    typeof perfume.name === 'object' ? perfume.name[lang] || perfume.name.en : perfume.name;
  const subtitle =
    typeof perfume.subtitle === 'object'
      ? perfume.subtitle[lang] || perfume.subtitle.en
      : perfume.subtitle || perfume.concentration || 'Extrait de Parfum';
  const categoryLabel =
    typeof perfume.categoryLabel === 'object'
      ? perfume.categoryLabel[lang] || perfume.categoryLabel.en
      : perfume.category;

  const activeVolume = availableVolumes[selectedVolumeIndex] || availableVolumes[0];
  const basePrice = Number(perfume.price) || 180;
  const calculatedPrice = Math.round(basePrice * (activeVolume?.multiplier || 1));
  const calculatedOldPrice = perfume.oldPrice
    ? Math.round(Number(perfume.oldPrice) * (activeVolume?.multiplier || 1))
    : null;

  const discountPercent =
    calculatedOldPrice && calculatedOldPrice > calculatedPrice
      ? Math.round(((calculatedOldPrice - calculatedPrice) / calculatedOldPrice) * 100)
      : 0;

  const stockCount = typeof perfume.stock === 'number' ? perfume.stock : 12;
  const isOutOfStock = stockCount <= 0;
  const isLowStock = stockCount > 0 && stockCount <= 4;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;

    setTiltStyle({
      transform: `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.015, 1.015, 1.015)`,
    });

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    if (onAddToCart) {
      onAddToCart({
        ...perfume,
        selectedVolume: activeVolume.size,
        finalPrice: calculatedPrice,
        cartItemId: `${perfume.id}-${activeVolume.size}`,
      });
    }

    setIsAddedFeedback(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1700);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 600);
    if (onToggleWishlist) {
      onToggleWishlist(perfume.id);
    }
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView({
        ...perfume,
        selectedVolume: activeVolume.size,
        finalPrice: calculatedPrice,
      });
    }
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    if (onToggleCompare) {
      onToggleCompare(perfume.id);
    }
  };

  const topNotesList = perfume.notes?.top?.[lang] || perfume.notes?.top || ['Bergamot', 'Saffron'];
  const heartNotesList =
    perfume.notes?.heart?.[lang] || perfume.notes?.heart || ['Damask Rose', 'Amberwood'];
  const baseNotesList =
    perfume.notes?.base?.[lang] || perfume.notes?.base || ['Oud', 'Madagascar Vanilla'];

  const ratingValue = Number(perfume.rating) || 4.9;
  const fullStars = Math.floor(ratingValue);

  return (
    <article
      ref={cardRef}
      className={`aetheria-pcard ${isHovered ? 'is-hovered' : ''} ${
        isOutOfStock ? 'is-out-of-stock' : ''
      }`}
      style={{
        ...tiltStyle,
        animationDelay: `${(index % 8) * 90}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleQuickViewClick}
    >
      <div
        className="aetheria-pcard__glare"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(212, 175, 55, ${glarePosition.opacity}), transparent 65%)`,
        }}
      />

      <div className="aetheria-pcard__border-glow" />

      <div className="aetheria-pcard__media">
        <div className="aetheria-pcard__badges">
          {perfume.isNew && (
            <span className="pcard-badge pcard-badge--new">
              <span className="badge-dot" />
              {t.newBadge}
            </span>
          )}
          {perfume.isBestseller && (
            <span className="pcard-badge pcard-badge--bestseller">{t.bestsellerBadge}</span>
          )}
          {perfume.isLimited && (
            <span className="pcard-badge pcard-badge--limited">{t.limitedBadge}</span>
          )}
          {discountPercent > 0 && (
            <span className="pcard-badge pcard-badge--discount">-{discountPercent}%</span>
          )}
        </div>

        <div className="aetheria-pcard__actions-top">
          <button
            type="button"
            className={`pcard-icon-btn ${isWishlisted ? 'is-active' : ''} ${
              heartBurst ? 'is-bursting' : ''
            }`}
            onClick={handleWishlistClick}
            title={isWishlisted ? t.removeFromWishlist : t.addToWishlist}
            aria-label={isWishlisted ? t.removeFromWishlist : t.addToWishlist}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isWishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button
            type="button"
            className="pcard-icon-btn"
            onClick={handleQuickViewClick}
            title={t.quickView}
            aria-label={t.quickView}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          {onToggleCompare && (
            <button
              type="button"
              className={`pcard-icon-btn ${isCompared ? 'is-active' : ''}`}
              onClick={handleCompareClick}
              title={t.compare}
              aria-label={t.compare}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>
          )}
        </div>

        <div className="aetheria-pcard__image-stage">
          <div
            className="aetheria-pcard__aura"
            style={{
              background:
                perfume.accentColor ||
                'radial-gradient(circle, rgba(212,175,55,0.28) 0%, rgba(10,10,12,0) 72%)',
            }}
          />
          <img
            src={perfume.image}
            alt={title}
            className="aetheria-pcard__img primary-img"
            loading="lazy"
          />
          {perfume.hoverImage && (
            <img
              src={perfume.hoverImage}
              alt={`${title} bottle detail`}
              className="aetheria-pcard__img secondary-img"
              loading="lazy"
            />
          )}
        </div>

        <div
          className={`aetheria-pcard__pyramid-drawer ${showNotesPyramid ? 'is-open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pyramid-header">
            <span className="pyramid-title">{t.viewPyramid}</span>
            <button
              type="button"
              className="pyramid-close"
              onClick={() => setShowNotesPyramid(false)}
            >
              ✕
            </button>
          </div>
          <div className="pyramid-tiers">
            <div className="pyramid-tier">
              <span className="tier-label">{t.topNotes}:</span>
              <span className="tier-values">{topNotesList.join(' • ')}</span>
            </div>
            <div className="pyramid-tier">
              <span className="tier-label">{t.heartNotes}:</span>
              <span className="tier-values">{heartNotesList.join(' • ')}</span>
            </div>
            <div className="pyramid-tier">
              <span className="tier-label">{t.baseNotes}:</span>
              <span className="tier-values">{baseNotesList.join(' • ')}</span>
            </div>
          </div>
          <div className="pyramid-metrics">
            <div className="metric-item">
              <span>{t.longevity}</span>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{ width: `${perfume.longevityPercent || 90}%` }}
                />
              </div>
            </div>
            <div className="metric-item">
              <span>{t.sillage}</span>
              <div className="metric-bar">
                <div
                  className="metric-fill"
                  style={{ width: `${perfume.sillagePercent || 85}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="aetheria-pcard__pyramid-trigger"
          onClick={(e) => {
            e.stopPropagation();
            setShowNotesPyramid((prev) => !prev);
          }}
        >
          <span className="sparkle-icon">✦</span>
          {showNotesPyramid ? t.hidePyramid : t.viewPyramid}
        </button>
      </div>

      <div className="aetheria-pcard__body">
        <div className="aetheria-pcard__meta-row">
          <span className="aetheria-pcard__brand">
            {perfume.brand || 'AETHERIA PRIVÉ'} • {categoryLabel}
          </span>
          <div className="aetheria-pcard__rating" title={`${ratingValue} / 5.0`}>
            <span className="rating-stars">
              {'★'.repeat(fullStars)}
              {fullStars < 5 ? '☆' : ''}
            </span>
            <span className="rating-score">{ratingValue.toFixed(1)}</span>
            <span className="rating-count">({perfume.reviewsCount || 48})</span>
          </div>
        </div>

        <div className="aetheria-pcard__title-group">
          <h3 className="aetheria-pcard__title">{title}</h3>
          <p className="aetheria-pcard__subtitle">{subtitle}</p>
        </div>

        <div className="aetheria-pcard__notes-pills">
          {[...topNotesList.slice(0, 1), ...heartNotesList.slice(0, 1), ...baseNotesList.slice(0, 1)].map(
            (note, idx) => (
              <span key={idx} className="note-pill">
                {note}
              </span>
            )
          )}
        </div>

        <div className="aetheria-pcard__volumes" onClick={(e) => e.stopPropagation()}>
          <span className="volume-label">{t.volume}:</span>
          <div className="volume-options">
            {availableVolumes.map((vol, idx) => (
              <button
                key={vol.size}
                type="button"
                className={`volume-btn ${selectedVolumeIndex === idx ? 'is-selected' : ''}`}
                onClick={() => setSelectedVolumeIndex(idx)}
              >
                {vol.size}
              </button>
            ))}
          </div>
        </div>

        <div className="aetheria-pcard__status-row">
          <span
            className={`stock-indicator ${
              isOutOfStock ? 'is-out' : isLowStock ? 'is-low' : 'is-in'
            }`}
          >
            <span className="status-pulse" />
            {isOutOfStock
              ? t.outOfStock
              : isLowStock
              ? `${t.lowStock} (${stockCount})`
              : t.inStock}
          </span>
          <span className="gift-tag">🎁 {t.giftWrap}</span>
        </div>

        <div className="aetheria-pcard__footer" onClick={(e) => e.stopPropagation()}>
          <div className="aetheria-pcard__price-box">
            {calculatedOldPrice && (
              <span className="price-old">${calculatedOldPrice.toLocaleString()}</span>
            )}
            <span className="price-current">${calculatedPrice.toLocaleString()}</span>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            className={`aetheria-pcard__add-btn ${isAddedFeedback ? 'is-added' : ''}`}
            onClick={handleAddClick}
          >
            <span className="btn-shimmer" />
            <span className="btn-content">
              {!isAddedFeedback && (
                <svg
                  className="btn-bag-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              )}
              <span>{isOutOfStock ? t.outOfStock : isAddedFeedback ? t.addedToCart : t.addToCart}</span>
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ParfumeCard;