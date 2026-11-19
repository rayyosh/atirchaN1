import React, { useState, useRef, useEffect } from 'react';

const NEWS_CARD_TEXTS = {
  uz: {
    readArticle: 'Maqolani o‘qish',
    bookmarkSave: 'Maqolani saqlash',
    bookmarkSaved: 'Saqlandi',
    shareLink: 'Havolani nusxalash',
    copiedFeedback: 'Nusxalandi ✓',
    featuredBadge: 'TANLANGAN MAQOLA',
    likesLabel: 'yoqdi',
    byAuthor: 'Muallif:',
  },
  ru: {
    readArticle: 'Читать статью',
    bookmarkSave: 'Сохранить статью',
    bookmarkSaved: 'Сохранено',
    shareLink: 'Скопировать ссылку',
    copiedFeedback: 'Скопировано ✓',
    featuredBadge: 'ВЫБОР РЕДАКЦИИ',
    likesLabel: 'нравится',
    byAuthor: 'Автор:',
  },
  en: {
    readArticle: 'Read Full Story',
    bookmarkSave: 'Bookmark Story',
    bookmarkSaved: 'Bookmarked',
    shareLink: 'Copy Article Link',
    copiedFeedback: 'Link Copied ✓',
    featuredBadge: 'EDITOR’S PICK',
    likesLabel: 'likes',
    byAuthor: 'By',
  },
};

const MONTHS_LOCALIZED = {
  uz: [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
  ],
  ru: [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const formatEditorialDate = (isoDate, lang = 'uz') => {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const months = MONTHS_LOCALIZED[lang] || MONTHS_LOCALIZED.en;
  const monthName = months[monthIndex] || '';

  if (lang === 'en') {
    return `${monthName} ${day}, ${year}`;
  }
  return `${day} ${monthName}, ${year}`;
};

const NewsCard = ({
  article,
  lang = 'uz',
  index = 0,
  onReadMore,
  isFeatured = false,
}) => {
  const t = NEWS_CARD_TEXTS[lang] || NEWS_CARD_TEXTS.uz;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(() => 42 + index * 17);
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  if (!article) return null;

  const categoryText =
    typeof article.category === 'object'
      ? article.category[lang] || article.category.en
      : article.category;

  const titleText =
    typeof article.title === 'object'
      ? article.title[lang] || article.title.en
      : article.title;

  const excerptText =
    typeof article.excerpt === 'object'
      ? article.excerpt[lang] || article.excerpt.en
      : article.excerpt;

  const readTimeText =
    typeof article.readTime === 'object'
      ? article.readTime[lang] || article.readTime.en
      : article.readTime;

  const formattedDate = formatEditorialDate(article.date, lang);

  // Like tugmasi
  const handleToggleLike = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => {
      const next = !prev;
      setLikeCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  // Saqlash (Bookmark) tugmasi
  const handleToggleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked((prev) => !prev);
  };

  // Havolani nusxalash
  const handleCopyShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/#journal-${article.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setIsCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1800);
  };

  // Maqolani ochish
  const handleOpenArticle = () => {
    if (onReadMore) {
      onReadMore(article);
    }
  };

  // Muallif bosh harflari (Avatar uchun)
  const authorInitials = (article.author || 'A E')
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <article
      className={`aetheria-ncard ${isFeatured ? 'is-featured' : ''} ${
        isHovered ? 'is-hovered' : ''
      }`}
      style={{ animationDelay: `${index * 120}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOpenArticle}
    >
      {/* Yuqori Oltin Chiziq Animatsiyasi */}
      <div className="aetheria-ncard__top-line" />

      {/* Rasm Qismi */}
      <div className="aetheria-ncard__media">
        <img
          src={article.image}
          alt={titleText}
          className="aetheria-ncard__img"
          loading="lazy"
        />
        <div className="aetheria-ncard__overlay" />

        {/* Kategoriya va Featured Badge */}
        <div className="aetheria-ncard__badges">
          <span className="ncard-category-pill">{categoryText}</span>
          {isFeatured && (
            <span className="ncard-featured-pill">✦ {t.featuredBadge}</span>
          )}
        </div>

        {/* O'ng yuqori tezkor harakat tugmalari */}
        <div className="aetheria-ncard__floating-actions">
          <button
            type="button"
            className={`ncard-action-btn ${isBookmarked ? 'is-active' : ''}`}
            onClick={handleToggleBookmark}
            title={isBookmarked ? t.bookmarkSaved : t.bookmarkSave}
            aria-label={isBookmarked ? t.bookmarkSaved : t.bookmarkSave}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isBookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <button
            type="button"
            className={`ncard-action-btn ${isCopied ? 'is-copied' : ''}`}
            onClick={handleCopyShare}
            title={t.shareLink}
            aria-label={t.shareLink}
          >
            {isCopied ? (
              <span className="copied-tick">✓</span>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            )}
          </button>
        </div>

        {/* Pastki rasm ustidagi sana va o'qish vaqti */}
        <div className="aetheria-ncard__media-meta">
          <span className="ncard-date">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formattedDate}
          </span>

          <span className="ncard-readtime">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {readTimeText}
          </span>
        </div>
      </div>

      {/* Kontent Qismi */}
      <div className="aetheria-ncard__body">
        <h3 className="aetheria-ncard__title">{titleText}</h3>
        <p className="aetheria-ncard__excerpt">{excerptText}</p>

        {/* Muallif va Ijtimoiy Ko'rsatkichlar */}
        <div className="aetheria-ncard__author-row">
          <div className="ncard-author-info">
            <div className="ncard-author-avatar">{authorInitials}</div>
            <div className="ncard-author-text">
              <small>{t.byAuthor}</small>
              <span>{article.author || 'AETHERIA Editorial'}</span>
            </div>
          </div>

          <button
            type="button"
            className={`ncard-like-pill ${isLiked ? 'is-liked' : ''}`}
            onClick={handleToggleLike}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{likeCount}</span>
          </button>
        </div>

        {/* Pastki Harakat Tugmasi */}
        <div className="aetheria-ncard__footer">
          <button
            type="button"
            className="aetheria-ncard__read-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenArticle();
            }}
          >
            <span>{t.readArticle}</span>
            <span className="read-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>

          {isCopied && <span className="ncard-copied-toast">{t.copiedFeedback}</span>}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;