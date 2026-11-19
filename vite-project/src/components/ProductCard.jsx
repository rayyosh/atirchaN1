import React, { useState, useRef, useEffect } from 'react';

const PRODUCT_CARD_TEXTS = {
  uz: {
    addToBag: 'To‘plamni savatga qo‘shish',
    addedFeedback: 'Savatga qo‘shildi ✓',
    wishlistAdd: 'Sevimlilarga qo‘shish',
    wishlistRemove: 'Sevimlilardan olish',
    whatsInside: 'To‘plam tarkibi',
    hideInside: 'Tarkibni yopish',
    engravingToggle: 'Bepul oltin gravyura qo‘shish (Ism / Initsial)',
    engravingPlaceholder: 'Masalan: A. Karimov yoki S & M',
    giftMessageToggle: 'Sovg‘a tabriknomasi qo‘shish',
    giftMessagePlaceholder: 'Tabrik matnini yozing...',
    complimentaryShipping: 'Bepul kuryerlik yetkazib berish',
    voucherIncluded: '$50 keyingi xarid uchun vaucher ichida',
    specsTitle: 'Texnik xususiyatlar:',
    quantityLabel: 'Soni:',
    saveBadge: 'Tejash',
  },
  ru: {
    addToBag: 'Добавить набор в корзину',
    addedFeedback: 'Добавлено в корзину ✓',
    wishlistAdd: 'В избранное',
    wishlistRemove: 'Убрать из избранного',
    whatsInside: 'Состав набора',
    hideInside: 'Скрыть состав',
    engravingToggle: 'Бесплатная золотая гравировка (Имя / Инициалы)',
    engravingPlaceholder: 'Например: А. Каримов или S & M',
    giftMessageToggle: 'Добавить подарочную открытку',
    giftMessagePlaceholder: 'Введите текст поздравления...',
    complimentaryShipping: 'Бесплатная курьерская доставка',
    voucherIncluded: 'Ваучер на $50 внутри шкатулки',
    specsTitle: 'Характеристики:',
    quantityLabel: 'Кол-во:',
    saveBadge: 'Выгода',
  },
  en: {
    addToBag: 'Add Set to Bag',
    addedFeedback: 'Added to Bag ✓',
    wishlistAdd: 'Save to Wishlist',
    wishlistRemove: 'Remove from Wishlist',
    whatsInside: 'What’s Inside',
    hideInside: 'Hide Contents',
    engravingToggle: 'Add Complimentary Gold Engraving (Initials)',
    engravingPlaceholder: 'e.g. A. Karimov or S & M',
    giftMessageToggle: 'Include Handwritten Gift Card',
    giftMessagePlaceholder: 'Write your personal message...',
    complimentaryShipping: 'Complimentary Insured Courier Delivery',
    voucherIncluded: 'Includes $50 Voucher Toward Full Bottle',
    specsTitle: 'Specifications:',
    quantityLabel: 'Qty:',
    saveBadge: 'Save',
  },
};

const SET_CONTENTS_MAP = {
  'set-01': {
    uz: [
      'Oud Imperial Royale — 5ml Extrait',
      'Velvet Saffron & Gold — 5ml Extrait',
      'Rose de Grasse Mystique — 5ml EDP Intense',
      'Bergamote & Sel Marin — 5ml Cologne Absolue',
      'Ambre Sultanate Noir — 5ml Extrait',
      'Cuir de Samarcande — 5ml Extrait',
      'Jasmin Nocturne Blanc — 5ml EDP Intense',
      'Neroli Portofino Oro — 5ml Extrait',
    ],
    ru: [
      'Oud Imperial Royale — 5мл Extrait',
      'Velvet Saffron & Gold — 5мл Extrait',
      'Rose de Grasse Mystique — 5мл EDP Intense',
      'Bergamote & Sel Marin — 5мл Cologne Absolue',
      'Ambre Sultanate Noir — 5мл Extrait',
      'Cuir de Samarcande — 5мл Extrait',
      'Jasmin Nocturne Blanc — 5мл EDP Intense',
      'Neroli Portofino Oro — 5мл Extrait',
    ],
    en: [
      'Oud Imperial Royale — 5ml Extrait',
      'Velvet Saffron & Gold — 5ml Extrait',
      'Rose de Grasse Mystique — 5ml EDP Intense',
      'Bergamote & Sel Marin — 5ml Cologne Absolue',
      'Ambre Sultanate Noir — 5ml Extrait',
      'Cuir de Samarcande — 5ml Extrait',
      'Jasmin Nocturne Blanc — 5ml EDP Intense',
      'Neroli Portofino Oro — 5ml Extrait',
    ],
  },
  'set-02': {
    uz: [
      'Italiya buzoq terisidan qo‘lda tikilgan g‘ilof',
      '24K oltin suvi yugurtirilgan magnit qopqoq',
      '15ml Oud Imperial Royale to‘ldirilgan kartrij',
      'Sayohat uchun maxsus quyish voronkasi',
    ],
    ru: [
      'Футляр ручной работы из итальянской телячьей кожи',
      'Магнитная крышка с покрытием из золота 24К',
      'Сменный картридж 15мл Oud Imperial Royale',
      'Мини-воронка для перезаправки в путешествиях',
    ],
    en: [
      'Hand-stitched Italian calfskin protective case',
      '24K gold-plated magnetic atomizer cap',
      'Pre-filled 15ml Oud Imperial Royale cartridge',
      'Precision travel refill funnel & velvet pouch',
    ],
  },
  'set-03': {
    uz: [
      'Qo‘lda quyilgan 280g qora billur idish',
      '100% tabiiy kokos va asalari mumi',
      'Grass shahridan keltirilgan za’faron va ud moyi',
      'Tutunsiz yonuvchi organik paxta pilik (65 soat)',
    ],
    ru: [
      'Сосуд ручной работы из чёрного хрусталя (280г)',
      '100% натуральный кокосовый и пчелиный воск',
      'Эфирные масла шафрана и уда из Грасса',
      'Органический хлопковый фитиль (65 часов горения)',
    ],
    en: [
      'Hand-blown 280g obsidian crystal vessel',
      '100% organic coconut & beeswax blend',
      'Pure Grasse saffron & aged oud essential oils',
      'Braided unbleached cotton wick (65-hour burn)',
    ],
  },
};

const ProductCard = ({
  product,
  lang = 'uz',
  index = 0,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const t = PRODUCT_CARD_TEXTS[lang] || PRODUCT_CARD_TEXTS.uz;

  const [showContents, setShowContents] = useState(false);
  const [enableEngraving, setEnableEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [enableGiftNote, setEnableGiftNote] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const cardRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  if (!product) return null;

  const title =
    typeof product.name === 'object' ? product.name[lang] || product.name.en : product.name;
  const tagline =
    typeof product.tagline === 'object'
      ? product.tagline[lang] || product.tagline.en
      : product.tagline;
  const badgeText =
    typeof product.badge === 'object' ? product.badge[lang] || product.badge.en : product.badge;

  const contentsList =
    SET_CONTENTS_MAP[product.id]?.[lang] ||
    SET_CONTENTS_MAP[product.id]?.en ||
    product.specs ||
    [];

  const unitPrice = Number(product.price) || 120;
  const oldUnitPrice = product.oldPrice ? Number(product.oldPrice) : null;
  const savingsAmount = oldUnitPrice ? (oldUnitPrice - unitPrice) * quantity : 0;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, active: false }));
  };

  const handleAddProduct = () => {
    if (!onAddToCart) return;

    const customSuffix = [
      enableEngraving && engravingText.trim() ? `Gravyura: "${engravingText.trim()}"` : '',
      enableGiftNote && giftNoteText.trim() ? `Tabrik: "${giftNoteText.trim()}"` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    for (let i = 0; i < quantity; i += 1) {
      onAddToCart({
        ...product,
        selectedVolume: customSuffix || product.specs?.[0] || 'Coffret Set',
        finalPrice: unitPrice,
        cartItemId: `${product.id}-${customSuffix || 'standard'}`,
      });
    }

    setIsAdded(true);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <article
      ref={cardRef}
      className={`aetheria-setcard ${spotlight.active ? 'is-active' : ''}`}
      style={{ animationDelay: `${index * 110}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="aetheria-setcard__spotlight"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.16), transparent 70%)`,
        }}
      />

      <div className="aetheria-setcard__media">
        {badgeText && (
          <span className="setcard-badge">
            <span className="setcard-badge__star">✦</span>
            {badgeText}
          </span>
        )}

        {onToggleWishlist && (
          <button
            type="button"
            className={`setcard-wish-btn ${isWishlisted ? 'is-wishlisted' : ''}`}
            onClick={() => onToggleWishlist(product.id)}
            title={isWishlisted ? t.wishlistRemove : t.wishlistAdd}
            aria-label={isWishlisted ? t.wishlistRemove : t.wishlistAdd}
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
        )}

        <div className="aetheria-setcard__img-wrap">
          <img src={product.image} alt={title} loading="lazy" />
          <div className="aetheria-setcard__img-gradient" />
        </div>

        <div className={`aetheria-setcard__contents-panel ${showContents ? 'is-open' : ''}`}>
          <div className="contents-panel__head">
            <span>{t.whatsInside}</span>
            <button type="button" onClick={() => setShowContents(false)}>
              ✕
            </button>
          </div>
          <ul className="contents-panel__list">
            {contentsList.map((line, idx) => (
              <li key={idx}>
                <span className="gold-bullet">◆</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="aetheria-setcard__body">
        <div className="aetheria-setcard__top-meta">
          <span className="setcard-type">{product.type}</span>
          <button
            type="button"
            className="setcard-contents-toggle"
            onClick={() => setShowContents((prev) => !prev)}
          >
            {showContents ? t.hideInside : t.whatsInside}
            <span className={`arrow-chevron ${showContents ? 'is-up' : ''}`}>▾</span>
          </button>
        </div>

        <h3 className="aetheria-setcard__title">{title}</h3>
        <p className="aetheria-setcard__tagline">{tagline}</p>

        {product.specs && product.specs.length > 0 && (
          <div className="aetheria-setcard__specs">
            {product.specs.map((spec, idx) => (
              <span key={idx} className="setcard-spec-chip">
                {spec}
              </span>
            ))}
          </div>
        )}

        <div className="aetheria-setcard__customizer">
          <label className="customizer-checkbox">
            <input
              type="checkbox"
              checked={enableEngraving}
              onChange={(e) => setEnableEngraving(e.target.checked)}
            />
            <span className="custom-box" />
            <span className="custom-label">{t.engravingToggle}</span>
          </label>

          {enableEngraving && (
            <div className="customizer-input-wrap">
              <input
                type="text"
                maxLength={24}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder={t.engravingPlaceholder}
              />
              <small>{engravingText.length}/24</small>
            </div>
          )}

          <label className="customizer-checkbox">
            <input
              type="checkbox"
              checked={enableGiftNote}
              onChange={(e) => setEnableGiftNote(e.target.checked)}
            />
            <span className="custom-box" />
            <span className="custom-label">{t.giftMessageToggle}</span>
          </label>

          {enableGiftNote && (
            <div className="customizer-input-wrap">
              <input
                type="text"
                maxLength={80}
                value={giftNoteText}
                onChange={(e) => setGiftNoteText(e.target.value)}
                placeholder={t.giftMessagePlaceholder}
              />
            </div>
          )}
        </div>

        <div className="aetheria-setcard__perks">
          <span>✦ {t.complimentaryShipping}</span>
          {product.id === 'set-01' && <span>✦ {t.voucherIncluded}</span>}
        </div>

        <div className="aetheria-setcard__footer">
          <div className="setcard-price-row">
            <div className="setcard-prices">
              {oldUnitPrice && (
                <span className="setcard-old-price">
                  ${(oldUnitPrice * quantity).toLocaleString()}
                </span>
              )}
              <span className="setcard-current-price">
                ${(unitPrice * quantity).toLocaleString()}
              </span>
            </div>

            {savingsAmount > 0 && (
              <span className="setcard-savings-pill">
                {t.saveBadge}: ${savingsAmount}
              </span>
            )}
          </div>

          <div className="setcard-actions-row">
            <div className="setcard-qty-stepper" aria-label={t.quantityLabel}>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={`aetheria-setcard__submit ${isAdded ? 'is-added' : ''}`}
              onClick={handleAddProduct}
            >
              <span className="submit-glow" />
              <span>{isAdded ? t.addedFeedback : t.addToBag}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;