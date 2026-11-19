import React, { useState } from 'react';

const FOOTER_TEXTS = {
  uz: {
    pillars: [
      {
        icon: '◈',
        title: '100% Grasse Essensiyalari',
        desc: 'Fransiyaning parfyumeriya poytaxtidan keltirilgan sertifikatlangan tabiiy moylar.',
      },
      {
        icon: '✦',
        title: '32% Extrait de Parfum',
        desc: 'Terida 16 soatgacha saqlanib turuvchi yuqori konsentratsiyali formulalar.',
      },
      {
        icon: '❖',
        title: 'Bepul Oltin Gravyura',
        desc: 'Har bir flakon va sovg‘a qutisiga ismingiz yoki initsialingizni yozib beramiz.',
      },
      {
        icon: '✧',
        title: 'Sug‘urtalangan Yetkazish',
        desc: 'Toshkent bo‘ylab 2 soatda, O‘zbekiston bo‘ylab 24 soat ichida bepul yetkazish.',
      },
    ],
    brandStory:
      'AETHERIA — Sharqning qadimiy ud va ambra an’analarini Fransiyaning Grass shahridagi yuqori parfyumeriya san’ati bilan birlashtiruvchi mustaqil niş parfyumeriya uyi.',
    newsletterEyebrow: 'AETHERIA PRIVÉ CLUB',
    newsletterTitle: 'Yopiq Kolleksiyalar va 10% Birinchi Xarid Imtiyozi',
    newsletterDesc:
      'Yangi cheklangan nashrlar, parfyumerlar bilan uchrashuvlar va shaxsiy takliflardan birinchi bo‘lib xabardor bo‘ling.',
    emailPlaceholder: 'Elektron pochtangizni kiriting...',
    subscribeBtn: 'A’zo bo‘lish',
    subscribedSuccess: '✦ Tabriklaymiz! Siz AETHERIA Privé Club a’zosiga aylandingiz. Promokod: AETHERIA10',
    colCollections: 'Kolleksiyalar',
    linkAll: 'Barcha atirlar',
    linkWoody: 'Yog‘ochli & Ud',
    linkOriental: 'Sharqona & Ambra',
    linkFloral: 'Gulli & Nozik',
    linkFresh: 'Sitrus & Yangi',
    linkUnisex: 'Uniseks kolleksiya',
    colHouse: 'Parfyumeriya Uyi',
    linkSets: 'Discovery Setlar',
    linkFinder: 'Shaxsiy atir tanlash',
    linkJournal: 'AETHERIA Jurnali',
    linkBespoke: 'Individual parfyum yaratish',
    linkCorporate: 'Korporativ sovg‘alar',
    colBoutiques: 'Flagman Butiklar',
    boutiqueTashkent: 'Toshkent — Amir Temur shoh ko‘chasi, 108 (Tashkent City Mall, 1-qavat)',
    boutiqueSamarkand: 'Samarqand — Registon maydoni yonida, Silk Road Boutique',
    boutiqueGrasse: 'Grasse, Fransiya — 14 Rue Jean Ossola, Atelier Privé',
    hoursLabel: 'Ish vaqti: Har kuni 10:00 – 22:00',
    conciergeLabel: 'VIP Konsyerj:',
    rightsText: '© 2026 AETHERIA Haute Parfumerie. Barcha huquqlar himoyalangan.',
    privacyLink: 'Maxfiylik siyosati',
    termsLink: 'Foydalanish shartlari',
    authenticityLink: 'Haqiqiylik sertifikati',
    backToTop: 'Yuqoriga qaytish',
  },
  ru: {
    pillars: [
      {
        icon: '◈',
        title: '100% Эссенции Грасса',
        desc: 'Сертифицированные натуральные масла из мировой столицы парфюмерии.',
      },
      {
        icon: '✦',
        title: '32% Extrait de Parfum',
        desc: 'Высокая концентрация экстракта со стойкостью на коже до 16 часов.',
      },
      {
        icon: '❖',
        title: 'Бесплатная Гравировка',
        desc: 'Персонализация каждого флакона вашими инициалами из сусального золота.',
      },
      {
        icon: '✧',
        title: 'Застрахованная Доставка',
        desc: 'Бесплатно за 2 часа по Ташкенту и за 24 часа по всему Узбекистану.',
      },
    ],
    brandStory:
      'AETHERIA — независимый дом нишевой парфюмерии, соединяющий драгоценные восточные смолы с высокими традициями французского Грасса.',
    newsletterEyebrow: 'КЛУБ AETHERIA PRIVÉ',
    newsletterTitle: 'Закрытые Релизы и Привилегия 10% на Первый Заказ',
    newsletterDesc:
      'Узнавайте первыми о лимитированных изданиях, закрытых дегустациях и персональных подарках.',
    emailPlaceholder: 'Введите ваш e-mail...',
    subscribeBtn: 'Вступить в клуб',
    subscribedSuccess: '✦ Добро пожаловать в AETHERIA Privé Club! Ваш промокод: AETHERIA10',
    colCollections: 'Коллекции',
    linkAll: 'Все ароматы',
    linkWoody: 'Древесные и Уд',
    linkOriental: 'Восточные и Амбра',
    linkFloral: 'Цветочные и Нежные',
    linkFresh: 'Цитрус и Свежесть',
    linkUnisex: 'Коллекция Унисекс',
    colHouse: 'Парфюмерный Дом',
    linkSets: 'Discovery-наборы',
    linkFinder: 'Подбор аромата',
    linkJournal: 'Журнал AETHERIA',
    linkBespoke: 'Создание личного аромата',
    linkCorporate: 'Корпоративные подарки',
    colBoutiques: 'Флагманские Бутики',
    boutiqueTashkent: 'Ташкент — пр-т Амира Темура, 108 (Tashkent City Mall, 1 этаж)',
    boutiqueSamarkand: 'Самарканд — площадь Регистан, Silk Road Boutique',
    boutiqueGrasse: 'Грасс, Франция — 14 Rue Jean Ossola, Atelier Privé',
    hoursLabel: 'Часы работы: Ежедневно 10:00 – 22:00',
    conciergeLabel: 'VIP Консьерж:',
    rightsText: '© 2026 AETHERIA Haute Parfumerie. Все права защищены.',
    privacyLink: 'Политика конфиденциальности',
    termsLink: 'Условия использования',
    authenticityLink: 'Сертификат подлинности',
    backToTop: 'Наверх',
  },
  en: {
    pillars: [
      {
        icon: '◈',
        title: '100% Grasse Essences',
        desc: 'Certified botanical absolutes sourced directly from the perfume capital of France.',
      },
      {
        icon: '✦',
        title: '32% Extrait de Parfum',
        desc: 'High-concentration formulations crafted for up to 16 hours of skin longevity.',
      },
      {
        icon: '❖',
        title: 'Complimentary Engraving',
        desc: 'Bespoke gold-leaf monogramming available on every 100ml flacon.',
      },
      {
        icon: '✧',
        title: 'Insured Courier Delivery',
        desc: 'Complimentary 2-hour delivery in Tashkent and 24-hour nationwide shipping.',
      },
    ],
    brandStory:
      'AETHERIA is an independent haute parfumerie house uniting sacred Eastern resins and aged oud with the centuries-old artistry of Grasse, France.',
    newsletterEyebrow: 'AETHERIA PRIVÉ CLUB',
    newsletterTitle: 'Private Releases & 10% Privilege on Your First Flacon',
    newsletterDesc:
      'Receive early access to numbered editions, master perfumer salons, and private gifts.',
    emailPlaceholder: 'Enter your email address...',
    subscribeBtn: 'Join the Club',
    subscribedSuccess: '✦ Welcome to AETHERIA Privé Club! Your private code: AETHERIA10',
    colCollections: 'Collections',
    linkAll: 'All Fragrances',
    linkWoody: 'Woody & Oud',
    linkOriental: 'Oriental & Amber',
    linkFloral: 'Floral & Velvet',
    linkFresh: 'Citrus & Fresh',
    linkUnisex: 'Unisex Wardrobe',
    colHouse: 'The Maison',
    linkSets: 'Discovery Sets',
    linkFinder: 'Bespoke Scent Finder',
    linkJournal: 'AETHERIA Journal',
    linkBespoke: 'Bespoke Formulation',
    linkCorporate: 'Corporate Gifting',
    colBoutiques: 'Flagship Boutiques',
    boutiqueTashkent: 'Tashkent — 108 Amir Temur Avenue (Tashkent City Mall, Level 1)',
    boutiqueSamarkand: 'Samarkand — Registan Square Promenade, Silk Road Boutique',
    boutiqueGrasse: 'Grasse, France — 14 Rue Jean Ossola, Atelier Privé',
    hoursLabel: 'Hours: Open Daily 10:00 – 22:00',
    conciergeLabel: 'VIP Concierge:',
    rightsText: '© 2026 AETHERIA Haute Parfumerie. All rights reserved.',
    privacyLink: 'Privacy Policy',
    termsLink: 'Terms of Service',
    authenticityLink: 'Certificate of Authenticity',
    backToTop: 'Back to Top',
  },
};

const Footer = ({ lang = 'uz', onSelectCategory }) => {
  const t = FOOTER_TEXTS[lang] || FOOTER_TEXTS.uz;

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  const handleCategoryJump = (categoryKey) => {
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
  };

  const handleScrollSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="aetheria-footer">
      {/* 1. Brend Kafolatlari (Pillars) Qatori */}
      <div className="aetheria-footer__pillars">
        <div className="aetheria-container pillars-grid">
          {t.pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon">{pillar.icon}</div>
              <div className="pillar-text">
                <h4>{pillar.title}</h4>
                <p>{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. VIP Privé Club Obuna Bo'limi */}
      <div className="aetheria-footer__newsletter">
        <div className="aetheria-container newsletter-inner">
          <div className="newsletter-copy">
            <span className="section-eyebrow">{t.newsletterEyebrow}</span>
            <h3>{t.newsletterTitle}</h3>
            <p>{t.newsletterDesc}</p>
          </div>

          <div className="newsletter-action">
            {isSubscribed ? (
              <div className="newsletter-success-banner">{t.subscribedSuccess}</div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                />
                <button type="submit" className="btn-gold-primary">
                  {t.subscribeBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Asosiy Ko'p Ustunli Navigatsiya va Butik Manzillari */}
      <div className="aetheria-footer__main">
        <div className="aetheria-container footer-columns-grid">
          {/* Ustun 1: Brend Haqida va Ijtimoiy Tarmoqlar */}
          <div className="footer-col footer-col--brand">
            <div className="footer-logo">
              <span className="brand-emblem">◈</span>
              <div>
                <strong>AETHERIA</strong>
                <small>HAUTE PARFUMERIE</small>
              </div>
            </div>

            <p className="footer-story">{t.brandStory}</p>

            <div className="footer-socials">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                title="Instagram @aetheria.parfums"
              >
                IG
              </a>
              <a
                href="#telegram"
                onClick={(e) => e.preventDefault()}
                aria-label="Telegram"
                title="Telegram @aetheria_prive"
              >
                TG
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                aria-label="YouTube"
                title="YouTube Atelier"
              >
                YT
              </a>
              <a
                href="#pinterest"
                onClick={(e) => e.preventDefault()}
                aria-label="Pinterest"
                title="Pinterest Lookbook"
              >
                PT
              </a>
            </div>
          </div>

          {/* Ustun 2: Kolleksiyalar */}
          <div className="footer-col">
            <h4 className="footer-col__heading">{t.colCollections}</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => handleCategoryJump('all')}>
                  {t.linkAll}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleCategoryJump('woody')}>
                  {t.linkWoody}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleCategoryJump('oriental')}>
                  {t.linkOriental}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleCategoryJump('floral')}>
                  {t.linkFloral}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleCategoryJump('fresh')}>
                  {t.linkFresh}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleCategoryJump('unisex')}>
                  {t.linkUnisex}
                </button>
              </li>
            </ul>
          </div>

          {/* Ustun 3: Parfyumeriya Uyi */}
          <div className="footer-col">
            <h4 className="footer-col__heading">{t.colHouse}</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => handleScrollSection('sets')}>
                  {t.linkSets}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleScrollSection('scent-finder')}>
                  {t.linkFinder}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleScrollSection('journal')}>
                  {t.linkJournal}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleScrollSection('scent-finder')}>
                  {t.linkBespoke}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleScrollSection('sets')}>
                  {t.linkCorporate}
                </button>
              </li>
            </ul>
          </div>

          {/* Ustun 4: Flagman Butiklar */}
          <div className="footer-col footer-col--boutiques">
            <h4 className="footer-col__heading">{t.colBoutiques}</h4>
            <ul className="footer-boutiques-list">
              <li>
                <span className="boutique-pin">◈</span>
                <span>{t.boutiqueTashkent}</span>
              </li>
              <li>
                <span className="boutique-pin">◈</span>
                <span>{t.boutiqueSamarkand}</span>
              </li>
              <li>
                <span className="boutique-pin">◈</span>
                <span>{t.boutiqueGrasse}</span>
              </li>
            </ul>

            <div className="footer-contact-box">
              <small>{t.hoursLabel}</small>
              <div>
                <span>{t.conciergeLabel}</span>{' '}
                <a href="tel:+998712008899">+998 (71) 200-88-99</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Eng Pastki Huquqiy Qator va Yuqoriga Qaytish Tugmasi */}
      <div className="aetheria-footer__bottom">
        <div className="aetheria-container footer-bottom-inner">
          <p className="copyright-text">{t.rightsText}</p>

          <div className="footer-legal-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>
              {t.privacyLink}
            </a>
            <span>•</span>
            <a href="#terms" onClick={(e) => e.preventDefault()}>
              {t.termsLink}
            </a>
            <span>•</span>
            <a href="#authenticity" onClick={(e) => e.preventDefault()}>
              {t.authenticityLink}
            </a>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>{t.backToTop}</span>
            <span className="top-arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;