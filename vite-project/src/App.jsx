import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import ParfumeCard from './components/ParfumeCard';
import ProductCard from './components/ProductCard';
import NewsCard from './components/NewsCard';
import Footer from './components/Footer';

// ============================================================================
// KO'P TILLI INTERFEYS LUG'ATI (UZ / RU / EN)
// ============================================================================
const UI_TEXTS = {
  uz: {
    heroBadge: 'HAUTE PARFUMERIE • GRASSE & TASHKENT',
    heroTitleLine1: 'Sokin Hashamatning',
    heroTitleLine2: 'Ko‘rinmas Imzosi',
    heroDesc:
      'Fransiyaning Grass shahridagi nodir essensiyalar va Sharqning eng qimmatbaho ud yog‘ochlaridan yaratilgan eksklyuziv niş atirlar kolleksiyasi.',
    heroPrimaryBtn: 'Kolleksiyani kashf etish',
    heroSecondaryBtn: 'Shaxsiy atir tanlash',
    statsYears: 'Yillik Parfyumeriya San’ati',
    statsEssences: 'Tabiiy Nodir Essensiyalar',
    statsClients: 'Mamnun Mijozlar',
    collectionEyebrow: 'EKSKLYUZIV KOLLEKSIYA',
    collectionTitle: 'AETHERIA Niş Atirlar Olami',
    collectionSubtitle:
      'Har bir flakon — qo‘l mehnati, 90 kunlik maseratsiya va 32% sof parfyum ekstrakti.',
    searchPlaceholder: 'Atir nomi, nota (ud, vanil, atirgul) yoki brend bo‘yicha qidiring...',
    filterAll: 'Barchasi',
    filterWoody: 'Yog‘ochli & Ud',
    filterFloral: 'Gulli & Nozik',
    filterOriental: 'Sharqona & Ambra',
    filterFresh: 'Sitrus & Yangi',
    filterUnisex: 'Uniseks',
    sortLabel: 'Saralash:',
    sortFeatured: 'Tavsiya etilgan',
    sortPriceAsc: 'Narx: Arzondan qimmatga',
    sortPriceDesc: 'Narx: Qimmatdan arzonga',
    sortRating: 'Eng yuqori reyting',
    sortNewest: 'Yangi kolleksiya',
    resultsCount: 'ta atir topildi',
    resetFilters: 'Filtrlarni tozalash',
    emptySearchTitle: 'Hech qanday atir topilmadi',
    emptySearchDesc: 'Boshqa kalit so‘z yoki nota nomini kiritib ko‘ring.',
    setsEyebrow: 'MAXSUS TO‘PLAMLAR & AKSESSUARLAR',
    setsTitle: 'Discovery Setlar va Sayohat Flakonlari',
    setsSubtitle:
      'O‘z imzo iforingizni topish uchun mini-to‘plamlar va nafis teri g‘ilofli atomayzerlar.',
    quizEyebrow: 'SHAXSIY PARFYUMER MASLAHATI',
    quizTitle: 'O‘zingizga Mos Iforni 30 Soniyada Toping',
    quizSubtitle:
      'Qaysi muhit va notalar sizning xarakteringizni aks ettirishini tanlang.',
    quizStep1: '1. Qaysi vaqt va muhit uchun atir izlayapsiz?',
    quizStep2: '2. Qaysi asosiy nota sizni ko‘proq o‘ziga tortadi?',
    quizResultTitle: 'Siz uchun maxsus tanlangan atir:',
    quizRetake: 'Qaytadan tanlash',
    newsEyebrow: 'AETHERIA JURNALI',
    newsTitle: 'Parfyumeriya San’ati va Yangiliklar',
    newsSubtitle:
      'Ingrediyentlar tarixi, parfyumerlar intervyusi va mavsumiy trendlar haqida maqolalar.',
    cartTitle: 'Sizning Savatchangiz',
    cartEmpty: 'Savatchangiz hozircha bo‘sh',
    cartEmptySub: 'Kolleksiyamizdan o‘zingizga yoqqan atirni tanlang.',
    cartSubtotal: 'Jami summa:',
    cartFreeShipping: 'Toshkent va O‘zbekiston bo‘ylab bepul yetkazib berish!',
    checkoutTitle: 'Buyurtmani Rasmiylashtirish',
    inputName: 'Ismingiz',
    inputPhone: 'Telefon raqamingiz (+998...)',
    inputAddress: 'Yetkazib berish manzili',
    inputNote: 'Buyurtma uchun izoh (ixtiyoriy)',
    submitOrder: 'Telegram orqali buyurtma berish',
    orderSending: 'Yuborilmoqda...',
    orderSuccessTitle: 'Buyurtmangiz qabul qilindi!',
    orderSuccessMsg:
      'Menejerimiz 10 daqiqa ichida siz bilan bog‘lanib, yetkazib berish vaqtini tasdiqlaydi.',
    wishlistTitle: 'Sevimli Atirlarim',
    wishlistEmpty: 'Sevimlilar ro‘yxati bo‘sh',
    compareTitle: 'Atirlarni Solishtirish',
    compareEmpty: 'Solishtirish uchun kamida 2 ta atir tanlang (karta ustidagi ⇄ tugmasi).',
    quickViewAdd: 'Savatga qo‘shish',
    quickViewNotes: 'Olfaktor Piramida',
    quickViewTop: 'Yuqori notalar',
    quickViewHeart: 'O‘rta notalar',
    quickViewBase: 'Baza notalar',
    quickViewPerfumer: 'Parfyumer:',
    quickViewYear: 'Yaratilgan yili:',
    quickViewConc: 'Konsentratsiya:',
    readMoreModalClose: 'Maqolani yopish',
  },
  ru: {
    heroBadge: 'HAUTE PARFUMERIE • GRASSE & TASHKENT',
    heroTitleLine1: 'Невидимая Подпись',
    heroTitleLine2: 'Тихой Роскоши',
    heroDesc:
      'Эксклюзивная коллекция нишевых ароматов, созданная из редких эссенций французского Грасса и драгоценного восточного уда.',
    heroPrimaryBtn: 'Открыть коллекцию',
    heroSecondaryBtn: 'Подобрать аромат',
    statsYears: 'Лет Парфюмерного Искусства',
    statsEssences: 'Редких Натуральных Эссенций',
    statsClients: 'Довольных Клиентов',
    collectionEyebrow: 'ЭКСКЛЮЗИВНАЯ КОЛЛЕКЦИЯ',
    collectionTitle: 'Мир Нишевой Парфюмерии AETHERIA',
    collectionSubtitle:
      'Каждый флакон — ручная работа, 90 дней мацерации и 32% чистого парфюмерного экстракта.',
    searchPlaceholder: 'Поиск по названию, ноте (уд, ваниль, роза) или бренду...',
    filterAll: 'Все ароматы',
    filterWoody: 'Древесные и Уд',
    filterFloral: 'Цветочные и Нежные',
    filterOriental: 'Восточные и Амбра',
    filterFresh: 'Цитрус и Свежесть',
    filterUnisex: 'Унисекс',
    sortLabel: 'Сортировка:',
    sortFeatured: 'Рекомендуемые',
    sortPriceAsc: 'Цена: по возрастанию',
    sortPriceDesc: 'Цена: по убыванию',
    sortRating: 'Высокий рейтинг',
    sortNewest: 'Новинки',
    resultsCount: 'ароматов найдено',
    resetFilters: 'Сбросить фильтры',
    emptySearchTitle: 'Ароматы не найдены',
    emptySearchDesc: 'Попробуйте изменить поисковый запрос или выбрать другую категорию.',
    setsEyebrow: 'СПЕЦИАЛЬНЫЕ НАБОРЫ И АКСЕССУАРЫ',
    setsTitle: 'Discovery-наборы и Тревел-флаконы',
    setsSubtitle:
      'Миниатюры для знакомства с коллекцией и атомайзеры в натуральной коже.',
    quizEyebrow: 'ПЕРСОНАЛЬНЫЙ ПОДБОР АРОМАТА',
    quizTitle: 'Найдите Свой Идеальный Парфюм за 30 Секунд',
    quizSubtitle: 'Выберите настроение и ключевую ноту, близкую вашему характеру.',
    quizStep1: '1. Для какого времени и случая вы ищете аромат?',
    quizStep2: '2. Какая ключевая нота привлекает вас больше всего?',
    quizResultTitle: 'Специально подобранный для вас аромат:',
    quizRetake: 'Пройти заново',
    newsEyebrow: 'ЖУРНАЛ AETHERIA',
    newsTitle: 'Искусство Парфюмерии и Новости',
    newsSubtitle:
      'Истории редких ингредиентов, интервью с парфюмерами и главные тренды сезона.',
    cartTitle: 'Ваша Корзина',
    cartEmpty: 'Ваша корзина пока пуста',
    cartEmptySub: 'Выберите понравившийся аромат из нашей коллекции.',
    cartSubtotal: 'Итого:',
    cartFreeShipping: 'Бесплатная доставка по Ташкенту и всему Узбекистану!',
    checkoutTitle: 'Оформление Заказа',
    inputName: 'Ваше имя',
    inputPhone: 'Ваш телефон (+998...)',
    inputAddress: 'Адрес доставки',
    inputNote: 'Комментарий к заказу (необязательно)',
    submitOrder: 'Оформить заказ через Telegram',
    orderSending: 'Отправка...',
    orderSuccessTitle: 'Ваш заказ принят!',
    orderSuccessMsg:
      'Наш менеджер свяжется с вами в течение 10 минут для подтверждения доставки.',
    wishlistTitle: 'Избранные Ароматы',
    wishlistEmpty: 'Список избранного пуст',
    compareTitle: 'Сравнение Ароматов',
    compareEmpty: 'Выберите минимум 2 аромата для сравнения (кнопка ⇄ на карточке).',
    quickViewAdd: 'Добавить в корзину',
    quickViewNotes: 'Ольфакторная Пирамида',
    quickViewTop: 'Верхние ноты',
    quickViewHeart: 'Ноты сердца',
    quickViewBase: 'Базовые ноты',
    quickViewPerfumer: 'Парфюмер:',
    quickViewYear: 'Год выпуска:',
    quickViewConc: 'Концентрация:',
    readMoreModalClose: 'Закрыть статью',
  },
  en: {
    heroBadge: 'HAUTE PARFUMERIE • GRASSE & TASHKENT',
    heroTitleLine1: 'The Invisible Signature',
    heroTitleLine2: 'Of Quiet Luxury',
    heroDesc:
      'An exclusive niche perfumery collection crafted from rare essences of Grasse, France, and aged agarwood from the East.',
    heroPrimaryBtn: 'Explore Collection',
    heroSecondaryBtn: 'Find Your Scent',
    statsYears: 'Years of Perfumery Craft',
    statsEssences: 'Rare Natural Essences',
    statsClients: 'Devoted Collectors',
    collectionEyebrow: 'EXCLUSIVE COLLECTION',
    collectionTitle: 'The World of AETHERIA Niche Scents',
    collectionSubtitle:
      'Every flacon is hand-finished, macerated for 90 days, and bottled at 32% pure Extrait de Parfum.',
    searchPlaceholder: 'Search by perfume name, note (oud, vanilla, rose) or brand...',
    filterAll: 'All Scents',
    filterWoody: 'Woody & Oud',
    filterFloral: 'Floral & Velvet',
    filterOriental: 'Oriental & Amber',
    filterFresh: 'Citrus & Fresh',
    filterUnisex: 'Unisex',
    sortLabel: 'Sort by:',
    sortFeatured: 'Featured',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortRating: 'Highest Rated',
    sortNewest: 'New Arrivals',
    resultsCount: 'perfumes found',
    resetFilters: 'Reset Filters',
    emptySearchTitle: 'No perfumes matched your search',
    emptySearchDesc: 'Try searching for another note, ingredient, or reset your filters.',
    setsEyebrow: 'CURATED SETS & ACCESSORIES',
    setsTitle: 'Discovery Sets & Travel Atomizers',
    setsSubtitle:
      'Explore our olfactory wardrobe with curated sample coffrets and leather travel cases.',
    quizEyebrow: 'BESPOKE SCENT CONSULTATION',
    quizTitle: 'Discover Your Signature Scent in 30 Seconds',
    quizSubtitle: 'Select your preferred atmosphere and dominant olfactory note.',
    quizStep1: '1. When and where will you wear this fragrance?',
    quizStep2: '2. Which core note resonates most with your personality?',
    quizResultTitle: 'Your Bespoke Fragrance Match:',
    quizRetake: 'Retake Consultation',
    newsEyebrow: 'AETHERIA JOURNAL',
    newsTitle: 'The Art of Perfumery & Stories',
    newsSubtitle:
      'Deep dives into rare botanicals, master perfumer interviews, and seasonal trends.',
    cartTitle: 'Your Shopping Bag',
    cartEmpty: 'Your shopping bag is currently empty',
    cartEmptySub: 'Discover your next signature fragrance from our collection.',
    cartSubtotal: 'Subtotal:',
    cartFreeShipping: 'Complimentary insured delivery across Tashkent & Uzbekistan!',
    checkoutTitle: 'Complete Your Order',
    inputName: 'Your Full Name',
    inputPhone: 'Phone Number (+998...)',
    inputAddress: 'Delivery Address',
    inputNote: 'Order Note (optional)',
    submitOrder: 'Place Order via Telegram',
    orderSending: 'Sending...',
    orderSuccessTitle: 'Your Order is Confirmed!',
    orderSuccessMsg:
      'Our fragrance concierge will contact you within 10 minutes to confirm delivery.',
    wishlistTitle: 'Saved Wishlist',
    wishlistEmpty: 'Your wishlist is empty',
    compareTitle: 'Fragrance Comparison',
    compareEmpty: 'Select at least 2 fragrances to compare (click the ⇄ icon on any card).',
    quickViewAdd: 'Add to Bag',
    quickViewNotes: 'Olfactory Pyramid',
    quickViewTop: 'Top Notes',
    quickViewHeart: 'Heart Notes',
    quickViewBase: 'Base Notes',
    quickViewPerfumer: 'Master Perfumer:',
    quickViewYear: 'Release Year:',
    quickViewConc: 'Concentration:',
    readMoreModalClose: 'Close Article',
  },
};

// ============================================================================
// ASOSIY NISH ATIRLAR MA'LUMOTLAR BAZASI (12 TA TO'LIQ MAHSULOT)
// ============================================================================
const PERFUMES_DATABASE = [
  {
    id: 'aeth-01',
    brand: 'AETHERIA PRIVÉ',
    name: {
      uz: 'Oud Imperial Royale',
      ru: 'Oud Imperial Royale',
      en: 'Oud Imperial Royale',
    },
    subtitle: {
      uz: 'Extrait de Parfum • 34% Konsentratsiya',
      ru: 'Extrait de Parfum • Концентрация 34%',
      en: 'Extrait de Parfum • 34% Concentration',
    },
    category: 'woody',
    categoryLabel: { uz: 'Yog‘ochli & Ud', ru: 'Древесные и Уд', en: 'Woody & Oud' },
    isUnisex: true,
    price: 340,
    oldPrice: 390,
    rating: 4.9,
    reviewsCount: 128,
    stock: 9,
    isNew: false,
    isBestseller: true,
    isLimited: false,
    perfumer: 'Jean-Claude Ellena & Hamid Merati',
    releaseYear: 2025,
    longevityPercent: 98,
    sillagePercent: 95,
    accentColor: 'radial-gradient(circle, rgba(212,175,55,0.34) 0%, rgba(10,10,12,0) 72%)',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85',
    volumes: [
      { size: '50ml', multiplier: 0.65 },
      { size: '100ml', multiplier: 1 },
    ],
    notes: {
      top: {
        uz: ['Eron za’faroni', 'Qora murch', 'Bergamot'],
        ru: ['Иранский шафран', 'Чёрный перец', 'Бергамот'],
        en: ['Iranian Saffron', 'Black Pepper', 'Bergamot'],
      },
      heart: {
        uz: ['Damashq atirguli', 'Kambodja udi', 'Labdanum'],
        ru: ['Дамасская роза', 'Камбоджийский уд', 'Лабданум'],
        en: ['Damask Rose', 'Cambodian Oud', 'Labdanum'],
      },
      base: {
        uz: ['Kulrang ambra', 'Sandal daraxti', 'Tutunli baxmal'],
        ru: ['Серая амбра', 'Сандаловое дерево', 'Дымный бархат'],
        en: ['Ambergris', 'Sandalwood', 'Smoky Velvet'],
      },
    },
    description: {
      uz: 'O‘n ikki yil davomida yetiltirilgan Kambodja udi va Eron za’faronining shohona uyg‘unligi. Kechki tadbirlar va unutilmas taassurot qoldirish uchun yaratilgan.',
      ru: 'Королевское сочетание выдержанного камбоджийского уда и иранского шафрана. Создан для торжественных вечеров и незабываемого шлейфа.',
      en: 'A regal marriage of twelve-year-aged Cambodian oud and Iranian saffron. Crafted for evening galas and leaving an unforgettable trail.',
    },
  },
  {
    id: 'aeth-02',
    brand: 'AETHERIA NOIR',
    name: {
      uz: 'Velvet Saffron & Gold',
      ru: 'Velvet Saffron & Gold',
      en: 'Velvet Saffron & Gold',
    },
    subtitle: {
      uz: 'Extrait de Parfum • 32% Konsentratsiya',
      ru: 'Extrait de Parfum • Концентрация 32%',
      en: 'Extrait de Parfum • 32% Concentration',
    },
    category: 'oriental',
    categoryLabel: { uz: 'Sharqona & Ambra', ru: 'Восточные и Амбра', en: 'Oriental & Amber' },
    isUnisex: true,
    price: 295,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 94,
    stock: 3,
    isNew: true,
    isBestseller: true,
    isLimited: true,
    perfumer: 'Francis Kurkdjian Atelier',
    releaseYear: 2026,
    longevityPercent: 94,
    sillagePercent: 92,
    accentColor: 'radial-gradient(circle, rgba(235,145,52,0.32) 0%, rgba(10,10,12,0) 72%)',
    image:
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
    volumes: [
      { size: '50ml', multiplier: 0.65 },
      { size: '100ml', multiplier: 1 },
    ],
    notes: {
      top: {
        uz: ['Qizil apelsin', 'Kardamon', 'Pushti qalampir'],
        ru: ['Красный апельсин', 'Кардамон', 'Розовый перец'],
        en: ['Blood Orange', 'Cardamom', 'Pink Pepper'],
      },
      heart: {
        uz: ['Oltin za’faron', 'Yasmin sambak', 'Asal'],
        ru: ['Золотой шафран', 'Жасмин самбак', 'Мёд'],
        en: ['Golden Saffron', 'Jasmine Sambac', 'Wild Honey'],
      },
      base: {
        uz: ['Madagaskar vanili', 'Benzoin', 'Oq mushk'],
        ru: ['Мадагаскарская ваниль', 'Бензоин', 'Белый мускус'],
        en: ['Madagascar Vanilla', 'Benzoin', 'White Musk'],
      },
    },
    description: {
      uz: 'Iliq ambra, oltin za’faron va Madagaskar vanilining ipakdek mayin uyg‘unligi. Terida 16 soatgacha o‘zgarib turuvchi chuqur ifor.',
      ru: 'Шелковистое переплетение тёплой амбры, золотого шафрана и мадагаскарской ванили. Раскрывается на коже до 16 часов.',
      en: 'A silky tapestry of warm amber, golden saffron, and Madagascar vanilla that evolves on the skin for over 16 hours.',
    },
  },
  {
    id: 'aeth-03',
    brand: 'AETHERIA BOTANICA',
    name: {
      uz: 'Rose de Grasse Mystique',
      ru: 'Rose de Grasse Mystique',
      en: 'Rose de Grasse Mystique',
    },
    subtitle: {
      uz: 'Eau de Parfum Intense • 28% Konsentratsiya',
      ru: 'Eau de Parfum Intense • Концентрация 28%',
      en: 'Eau de Parfum Intense • 28% Concentration',
    },
    category: 'floral',
    categoryLabel: { uz: 'Gulli & Nozik', ru: 'Цветочные и Нежные', en: 'Floral & Velvet' },
    isUnisex: false,
    price: 260,
    oldPrice: 310,
    rating: 4.8,
    reviewsCount: 112,
    stock: 14,
    isNew: false,
    isBestseller: true,
    isLimited: false,
    perfumer: 'Christine Nagel',
    releaseYear: 2025,
    longevityPercent: 89,
    sillagePercent: 86,
    accentColor: 'radial-gradient(circle, rgba(219,112,147,0.3) 0%, rgba(10,10,12,0) 72%)',
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85',
    volumes: [
      { size: '50ml', multiplier: 0.65 },
      { size: '100ml', multiplier: 1 },
    ],
    notes: {
      top: {
        uz: ['Lichi', 'Shudringli pion', 'Mandarin'],
        ru: ['Личи', 'Росистый пион', 'Мандарин'],
        en: ['Lychee', 'Dewy Peony', 'Mandarin'],
      },
      heart: {
        uz: ['May atirguli (Grasse)', 'Magnoliya', 'Iris'],
        ru: ['Майская роза (Грасс)', 'Магнолия', 'Ирис'],
        en: ['May Rose of Grasse', 'Magnolia', 'Orris Butter'],
      },
      base: {
        uz: ['Kaşmir yog‘ochi', 'Oq kedr', 'Ambretta'],
        ru: ['Кашемировое дерево', 'Белый кедр', 'Амбретта'],
        en: ['Cashmere Wood', 'White Cedar', 'Ambrette'],
      },
    },
    description: {
      uz: 'Tong saharda Grass dalalaridan terilgan yuz bargli may atirgulining eng nafis talqini.',
      ru: 'Изысканная интерпретация столетней майской розы, собранной на рассвете на полях Грасса.',
      en: 'An exquisite interpretation of Centifolia May Rose harvested at dawn in the fields of Grasse.',
    },
  },
  {
    id: 'aeth-04',
    brand: 'AETHERIA AZURE',
    name: {
      uz: 'Bergamote & Sel Marin',
      ru: 'Bergamote & Sel Marin',
      en: 'Bergamote & Sel Marin',
    },
    subtitle: {
      uz: 'Cologne Absolue • 25% Konsentratsiya',
      ru: 'Cologne Absolue • Концентрация 25%',
      en: 'Cologne Absolue • 25% Concentration',
    },
    category: 'fresh',
    categoryLabel: { uz: 'Sitrus & Yangi', ru: 'Цитрус и Свежесть', en: 'Citrus & Fresh' },
    isUnisex: true,
    price: 225,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 76,
    stock: 18,
    isNew: true,
    isBestseller: false,
    isLimited: false,
    perfumer: 'Alberto Morillas',
    releaseYear: 2026,
    longevityPercent: 84,
    sillagePercent: 80,
    accentColor: 'radial-gradient(circle, rgba(72,187,198,0.28) 0%, rgba(10,10,12,0) 72%)',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=85',
    volumes: [
      { size: '50ml', multiplier: 0.65 },
      { size: '100ml', multiplier: 1 },
    ],
    notes: {
      top: {
        uz: ['Kalabriya bergamoti', 'Yuzu', 'Dengiz tuzi'],
        ru: ['Калабрийский бергамот', 'Юзу', 'Морская соль'],
        en: ['Calabrian Bergamot', 'Yuzu', 'Sea Salt'],
      },
      heart: {
        uz: ['Neroli', 'Oq choy', 'Rozmarin'],
        ru: ['Нероли', 'Белый чай', 'Розмарин'],
        en: ['Neroli Blossom', 'White Tea', 'Rosemary'],
      },
      base: {
        uz: ['Vetiver', 'Oq ambra', 'Driftwood'],
        ru: ['Ветивер', 'Белая амбра', 'Плавник'],
        en: ['Haitian Vetiver', 'White Amber', 'Driftwood'],
      },
    },
    description: {
      uz: 'O‘rta yer dengizi sohilidagi tonggi shabada va quyoshli Kalabriya sitruslarining tetiklantiruvchi nafasi.',
      ru: 'Освежающий бриз Средиземноморья и солнечные цитрусы Калабрии в кристально чистом звучании.',
      en: 'A crisp Mediterranean morning breeze infused with sun-drenched Calabrian citrus and mineral sea salt.',
    },
  },
  {
    id: 'aeth-05',
    brand: 'AETHERIA PRIVÉ',
    name: {
      uz: 'Ambre Sultanate Noir',
      ru: 'Ambre Sultanate Noir',
      en: 'Ambre Sultanate Noir',
    },
    subtitle: {
      uz: 'Extrait de Parfum • 35% Konsentratsiya',
      ru: 'Extrait de Parfum • Концентрация 35%',
      en: 'Extrait de Parfum • 35% Concentration',
    },
    category: 'oriental',
    categoryLabel: { uz: 'Sharqona & Ambra', ru: 'Восточные и Амбра', en: 'Oriental & Amber' },
    isUnisex: true,
    price: 360,
    oldPrice: 410,
    rating: 5.0,
    reviewsCount: 83,
    stock: 4,
    isNew: true,
    isBestseller: true,
    isLimited: true,
    perfumer: 'Quentin Bisch',
    releaseYear: 2026,
    longevityPercent: 99,
    sillagePercent: 96,
    accentColor: 'radial-gradient(circle, rgba(212,175,55,0.38) 0%, rgba(10,10,12,0) 72%)',
    image:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85',
    volumes: [
      { size: '50ml', multiplier: 0.65 },
      { size: '100ml', multiplier: 1 },
    ],
    notes: {
      top: {
        uz: ['Darçin po‘stlog‘i', 'Muskat yong‘og‘i', 'Elemi'],
        ru: ['Кора корицы', 'Мускатный орех', 'Элеми'],
        en: ['Ceylon Cinnamon', 'Nutmeg', 'Elemi Resin'],
      },
      heart: {
        uz: ['Qora ambra', 'Mirra', 'Qovurilgan tonka'],
        ru: ['Чёрная амбра', 'Мирра', 'Жареные бобы тонка'],
        en: ['Black Amber', 'Myrrh', 'Roasted Tonka'],
      },
      base: {
        uz: ['Tamaki bargi', 'Siam benzoini', 'Paçuli'],
        ru: ['Табачный лист', 'Сиамский бензоин', 'Пачули'],
        en: ['Cured Tobacco Leaf', 'Siam Benzoin', 'Aged Patchouli'],
      },
    },
    description: {
      uz: 'Qadimiy Ipak yo‘li karvonlarining ziravorlari, qatronlar va oltin ambra uyg‘unligidagi afsonaviy kompozitsiya.',
      ru: 'Легендарная композиция из пряностей Шёлкового пути, драгоценных смол и золотой амбры.',
      en: 'A legendary composition woven from Silk Road spices, sacred resins, and molten golden amber.',
    },
  },
  {
    id: 'aeth-06',
    brand: 'AETHERIA NOIR',
    name: {
      uz: 'Cuir de Samarcande',
      ru: 'Cuir de Samarcande',
      en: 'Cuir de Samarcande',
    },
    subtitle: {
      uz: 'Extrait de Parfum • 31% Konsentratsiya',
      ru: 'Extrait de Parfum • Концентрация 31%',
      en: 'Extrait de Parfum • 31% Concentration',
    },
    category: 'woody',
    categoryLabel: { uz: 'Yog‘ochli & Ud', ru: 'Древесные и Уд', en: 'Woody & Oud' },
    isUnisex: true,
    price: 315,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 67,
    stock: 11,
    isNew: true,
    isBestseller: false,
    isLimited: true,
    perfumer: 'Domitille Michalon-Bertier',
    releaseYear: 2026,
    longevityPercent: 95,
    sillagePercent: 90,
    accentColor: 'radial-gradient(circle, rgba(180,120,70,0.34) 0%, rgba(10,10,12,0) 72%)',
    image:
      'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=85',
    volumes: [
      { size: '50ml', multiplier: 0.65 },
      { size: '100ml', multiplier: 1 },
    ],
    notes: {
      top: {
        uz: ['Archa mevasi', 'Kardamon', 'Qora choy'],
        ru: ['Можжевельник', 'Кардамон', 'Чёрный чай'],
        en: ['Juniper Berry', 'Cardamom', 'Smoked Black Tea'],
      },
      heart: {
        uz: ['Zamsha teri', 'Iris ildizi', 'Binafsha bargi'],
        ru: ['Замшевая кожа', 'Корень ириса', 'Лист фиалки'],
        en: ['Suede Leather', 'Iris Root', 'Violet Leaf'],
      },
      base: {
        uz: ['Atlas kedri', 'Qayin qatroni', 'Ambroksan'],
        ru: ['Атласский кедр', 'Берёзовый дёготь', 'Амброксан'],
        en: ['Atlas Cedar', 'Birch Tar', 'Ambroxan'],
      },
    },
    description: {
      uz: 'Samarqandning qadimiy hunarmandchilik ustaxonalaridan ilhomlangan baxmal zamsha va nodir yog‘ochlar simfoniyasi.',
      ru: 'Симфония бархатной замши и редких пород дерева, вдохновлённая ремесленными мастерскими Самарканда.',
      en: 'A symphony of velvety suede and noble woods inspired by the historic artisan ateliers of Samarkand.',
    },
  },
  {
    id: 'aeth-07',
    brand: 'AETHERIA BOTANICA',
    name: {
      uz: 'Jasmin Nocturne Blanc',
      ru: 'Jasmin Nocturne Blanc',
      en: 'Jasmin Nocturne Blanc',
    },
    subtitle: {
      uz: 'Eau de Parfum Intense • 27% Konsentratsiya',
      ru: 'Eau de Parfum Intense • Концентрация 27%',
      en: 'Eau de Parfum Intense • 27% Concentration',
    },
    category: 'floral',
    categoryLabel: { uz: 'Gulli & Nozik', ru: 'Цветочные и Нежные', en: 'Floral & Velvet' },
    isUnisex: false,
    price: 250,
    oldPrice: null,
    rating: 4.7,
    reviewsCount: 54,
    stock: 15,
    isNew: false,
    isBestseller: false,
    isLimited: false,
    perfumer: 'Anne Flipo',
    releaseYear: 2025,
    longevityPercent: 88,
    sillagePercent: 85,
    accentColor: 'radial-gradient(circle, rgba(245,230,190,0.28) 0%, rgba(10,10,12,0) 72%)',
    image:
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
    volumes: [
      { size: '50ml', multiplier: 0.65 },
      { size: '100ml', multiplier: 1 },
    ],
    notes: {
      top: {
        uz: ['Oq shaftoli', 'Armut guli', 'Petitgrain'],
        ru: ['Белый персик', 'Цветок груши', 'Петитгрейн'],
        en: ['White Peach', 'Pear Blossom', 'Petitgrain'],
      },
      heart: {
        uz: ['Tungi yasmin', 'Tuberoza', 'Ilang-ilang'],
        ru: ['Ночной жасмин', 'Тубероза', 'Иланг-иланг'],
        en: ['Night-Blooming Jasmine', 'Tuberose', 'Ylang-Ylang'],
      },
      base: {
        uz: ['Oq sandal', 'Vanil guli', 'Ipak mushki'],
        ru: ['Белый сандал', 'Цветок ванили', 'Шёлковый мускус'],
        en: ['White Sandalwood', 'Vanilla Orchid', 'Silk Musk'],
      },
    },
    description: {
      uz: 'Oy nuri ostida ochiladigan oq yasmin va tuberozaning jozibali, hipnotik kechki ifori.',
      ru: 'Гипнотический вечерний аромат ночного жасмина и туберозы, раскрывающийся под лунным светом.',
      en: 'A hypnotic nocturnal bouquet of moonlit jasmine and creamy tuberose wrapped in silk musk.',
    },
  },
  {
    id: 'aeth-08',
    brand: 'AETHERIA AZURE',
    name: {
      uz: 'Neroli Portofino Oro',
      ru: 'Neroli Portofino Oro',
      en: 'Neroli Portofino Oro',
    },
    subtitle: {
      uz: 'Extrait Cologne • 26% Konsentratsiya',
      ru: 'Extrait Cologne • Концентрация 26%',
      en: 'Extrait Cologne • 26% Concentration',
    },
    category: 'fresh',
    categoryLabel: { uz: 'Sitrus & Yangi', ru: 'Цитрус и Свежесть', en: 'Citrus & Fresh' },
    isUnisex: true,
    price: 245,
    oldPrice: 280,
    rating: 4.8,
    reviewsCount: 89,
    stock: 7,
    isNew: false,
    isBestseller: true,
    isLimited: false,
    perfumer: 'Rodrigo Flores-Roux',
    releaseYear: 2025,
    longevityPercent: 86,
    sillagePercent: 83,
    accentColor: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(10,10,12,0) 72%)',
    image:
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=85',
    hoverImage:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85',
    volumes: [
      { size: '50ml', multiplier: 0.65 },
      { size: '100ml', multiplier: 1 },
    ],
    notes: {
      top: {
        uz: ['Tunis nerolisi', 'Sitsiliya limoni', 'Mandarin'],
        ru: ['Тунисский нероли', 'Сицилийский лимон', 'Мандарин'],
        en: ['Tunisian Neroli', 'Sicilian Lemon', 'Mandarin'],
      },
      heart: {
        uz: ['Apelsin guli', 'Lavanda', 'Pittosporum'],
        ru: ['Флёрдоранж', 'Лаванда', 'Питтоспорум'],
        en: ['Orange Blossom', 'French Lavender', 'Pittosporum'],
      },
      base: {
        uz: ['Oltin ambra', 'Anjelika ildizi', 'Oq mushk'],
        ru: ['Золотая амбра', 'Корень ангелики', 'Белый мускус'],
        en: ['Golden Amber', 'Angelica Root', 'White Musk'],
      },
    },
    description: {
      uz: 'Italiya Rivyerasining quyoshli bog‘lari va apelsin gullarining sof, aristokratik nafasi.',
      ru: 'Чистое аристократическое дыхание цветущих апельсиновых садов Итальянской Ривьеры.',
      en: 'The aristocratic radiance of sunlit orange blossom groves along the Italian Riviera.',
    },
  },
];

// ============================================================================
// MAXSUS TO'PLAMLAR VA AKSESSUARLAR (ProductCard.jsx UCHUN)
// ============================================================================
const SETS_DATABASE = [
  {
    id: 'set-01',
    type: 'Discovery Coffret',
    name: {
      uz: 'AETHERIA La Collection Privée (8 × 5ml)',
      ru: 'AETHERIA La Collection Privée (8 × 5мл)',
      en: 'AETHERIA La Collection Privée (8 × 5ml)',
    },
    tagline: {
      uz: 'Barcha 8 ta flagman atirimiz bitta oltin naqshli baxmal qutida',
      ru: 'Все 8 флагманских ароматов в бархатной шкатулке с золотым тиснением',
      en: 'All 8 flagship Extraits presented in a gold-embossed velvet coffret',
    },
    price: 145,
    oldPrice: 180,
    badge: { uz: 'ENG MASHHUR', ru: 'БЕСТСЕЛЛЕР', en: 'TOP GIFT' },
    specs: ['8 × 5ml Spray', '32% Extrait', 'Voucher $50'],
    image:
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'set-02',
    type: 'Travel Atomizer',
    name: {
      uz: 'Oltin va Qora Teri Sayohat Atomayzeri (15ml)',
      ru: 'Дорожный Атомайзер из Чёрной Кожи и Золота (15мл)',
      en: 'Obsidian Leather & Gold Travel Atomizer (15ml)',
    },
    tagline: {
      uz: 'Qayta to‘ldiriladigan magnit qopqoqli portativ flakon + 15ml Oud Imperial',
      ru: 'Перезаправляемый флакон с магнитной крышкой + 15мл Oud Imperial',
      en: 'Refillable magnetic-cap travel case pre-filled with 15ml Oud Imperial',
    },
    price: 110,
    oldPrice: null,
    badge: { uz: 'YANGI AKSESSUAR', ru: 'НОВИНКА', en: 'NEW EDITION' },
    specs: ['15ml Refillable', 'Italian Calfskin', 'Magnetic Cap'],
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'set-03',
    type: 'Home Haute Parfumerie',
    name: {
      uz: 'Saffron & Oud Qora Billur Sham (280g)',
      ru: 'Свеча в Чёрном Хрустале Saffron & Oud (280г)',
      en: 'Saffron & Oud Hand-Poured Crystal Candle (280g)',
    },
    tagline: {
      uz: '65 soatgacha yonuvchi tabiiy kokos-asalari mumi va sof efir moylari',
      ru: 'До 65 часов горения, натуральный воск и чистые эфирные масла',
      en: '65-hour burn time crafted with organic beeswax and pure Grasse oils',
    },
    price: 95,
    oldPrice: 115,
    badge: { uz: 'UY UCHUN', ru: 'ДЛЯ ДОМА', en: 'HOME SCENT' },
    specs: ['280g / 65h Burn', 'Cotton Wick', 'Reusable Glass'],
    image:
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=85',
  },
];

// ============================================================================
// YANGILIKLAR VA MAQOLALAR BAZASI (NewsCard.jsx UCHUN)
// ============================================================================
const NEWS_DATABASE = [
  {
    id: 'news-01',
    category: { uz: 'INGREDIYENTLAR', ru: 'ИНГРЕДИЕНТЫ', en: 'INGREDIENTS' },
    date: '2026-11-12',
    readTime: { uz: '5 daqiqa o‘qish', ru: '5 мин чтения', en: '5 min read' },
    author: 'Camille Laurent, Master Evaluator',
    title: {
      uz: 'Suyuq Oltin: Nima uchun haqiqiy Kambodja udi oltindan ham qimmat turadi?',
      ru: 'Жидкое золото: почему настоящий камбоджийский уд ценится дороже золота?',
      en: 'Liquid Gold: Why Aged Cambodian Oud Commands a Higher Price Than Gold',
    },
    excerpt: {
      uz: 'Aquilaria daraxtining kamyob qatronidan hosil bo‘ladigan ud yog‘ochining 12 yillik distillatsiya sirlari va AETHERIA laboratoriyasidagi tanlov jarayoni.',
      ru: 'Секреты 12-летней дистилляции смолы дерева аквилария и строгий отбор редчайших масел в лаборатории AETHERIA.',
      en: 'Inside the 12-year distillation alchemy of Aquilaria resin and how AETHERIA sources ethically harvested agarwood.',
    },
    content: {
      uz: 'Parfyumeriya olamida "suyuq oltin" nomi bilan tanilgan ud (agarwood) tabiatning eng noyob mo‘jizalaridan biridir. Faqatgina 2% yovvoyi Aquilaria daraxtlari maxsus tabiiy jarayon natijasida qimmatbaho qatron ishlab chiqaradi.\n\nAETHERIA Privé kolleksiyasidagi Oud Imperial Royale atiri uchun biz Janubi-Sharqiy Osiyoning sertifikatlangan bog‘laridan olingan va eman bochkalarida 12 yil davomida yetiltirilgan ud moyidan foydalanamiz. Bu unga chuqur, tutunli va balzamik xarakter beradi.',
      ru: 'Уд, известный в мире высокой парфюмерии как «жидкое золото», является одним из самых редких даров природы. Лишь около 2% диких деревьев аквилария вырабатывают драгоценную смолу.\n\nДля создания Oud Imperial Royale из коллекции AETHERIA Privé мы используем масло, выдержанное в дубовых бочках 12 лет, что придаёт аромату глубокий, дымный и бархатистый характер.',
      en: 'Known across haute parfumerie as "liquid gold," oud is one of nature’s rarest olfactory treasures. Fewer than 2% of wild Aquilaria trees produce the dark, aromatic resin required for distillation.\n\nFor Oud Imperial Royale, AETHERIA matures sustainably harvested Cambodian oud for twelve years, yielding an opulent, smoky, and deeply hypnotic signature.',
    },
    image:
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'news-02',
    category: { uz: 'PARFYUMERIYA SAN’ATI', ru: 'ИСКУССТВО АРОМАТА', en: 'CRAFT & ATELIER' },
    date: '2026-11-04',
    readTime: { uz: '4 daqiqa o‘qish', ru: '4 мин чтения', en: '4 min read' },
    author: 'Henri Delacroix, Nose in Grasse',
    title: {
      uz: '90 Kunlik Maseratsiya: Sabr-toqat qanday qilib atirga ruh bag‘ishlaydi?',
      ru: '90 дней мацерации: как терпение превращает эссенцию в шедевр?',
      en: '90 Days of Maceration: How Time Transforms Raw Essences into Art',
    },
    excerpt: {
      uz: 'Ommaviy ishlab chiqarishdan farqli o‘laroq, har bir AETHERIA flakoni quyilishidan oldin 3 oy davomida qorong‘u harorat nazoratidagi xonalarda dam oladi.',
      ru: 'В отличие от массового производства, каждый эликсир AETHERIA созревает в течение 3 месяцев в специальных погребах перед розливом.',
      en: 'Unlike mass-market fragrances, every AETHERIA elixir rests for three full months in temperature-controlled cellars before bottling.',
    },
    content: {
      uz: 'Yangi aralashtirilgan parfyum essensiyalari xuddi yosh sharobga o‘xshaydi — ularning notalari bir-biriga singib ketishi uchun vaqt kerak.\n\nAETHERIA ustaxonasida biz maseratsiya jarayonini hech qachon tezlashtirmaymiz. 90 kun davomida 32% sof parfyum ekstrakti va organik uzum spirti o‘zaro uyg‘unlashib, terida 14-18 soatgacha saqlanib turuvchi mukammal shleyfni hosil qiladi.',
      ru: 'Свежесмешанные парфюмерные композиции подобны молодому вину — им необходимо время, чтобы все ноты слились в единую симфонию.\n\nВ ателье AETHERIA мы никогда не ускоряем процесс мацерации. В течение 90 дней 32% чистых масел соединяются с основой, создавая безупречный шлейф.',
      en: 'Freshly blended perfume oils are much like fine wine—they require stillness and time for individual molecules to harmonize.\n\nAt our Grasse atelier, every batch rests for 90 days at a precise 14°C, allowing our 32% Extrait concentration to achieve seamless depth and longevity.',
    },
    image:
      'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'news-03',
    category: { uz: 'USLUB & QO‘LLANMA', ru: 'ГИД ПО СТИЛЮ', en: 'FRAGRANCE GUIDE' },
    date: '2026-10-25',
    readTime: { uz: '6 daqiqa o‘qish', ru: '6 мин чтения', en: '6 min read' },
    author: 'Elena Rostova, Fragrance Stylist',
    title: {
      uz: 'Layering San’ati: Ikki xil atirni aralashtirib shaxsiy imzo yaratish sirlari',
      ru: 'Искусство лееринга: как сочетать два аромата для создания личной подписи',
      en: 'The Art of Scent Layering: Combining Two Extraits for a Bespoke Aura',
    },
    excerpt: {
      uz: 'Kuz va qish mavsumida yog‘ochli ud va yangi sitrus notalarini qanday qilib to‘g‘ri qatlamlab sepish bo‘yicha professional tavsiyalar.',
      ru: 'Профессиональные советы по сочетанию древесного уда и свежих цитрусовых композиций в осенне-зимний сезон.',
      en: 'Expert rules on pairing smoky oud bases with luminous citrus top notes for cold-weather elegance.',
    },
    content: {
      uz: 'Layering — bu ikki mustaqil atirni terining turli nuqtalariga yoki ketma-ket sepish orqali mutlaqo yangi, faqat sizga tegishli bo‘lgan ifor yaratish san’atidir.\n\nOltin qoida: har doim og‘irroq va quyuqroq atirni (masalan, Oud Imperial Royale) birinchi bo‘lib seping, 2 daqiqadan so‘ng esa ustidan yengil sitrus yoki gulli atirni (Bergamote & Sel Marin) qo‘shing.',
      ru: 'Лееринг — это искусство наслоения двух самостоятельных парфюмов для создания уникальной, принадлежащей только вам ауры.\n\nЗолотое правило: всегда наносите более плотный аромат первым (например, Oud Imperial Royale), а спустя 2 минуты добавьте свежий акцент (Bergamote & Sel Marin).',
      en: 'Fragrance layering is the practice of combining two distinct scents to sculpt an aura that is uniquely yours.\n\nThe golden rule: always apply the denser, resinous base first—such as Oud Imperial Royale—and mist a luminous citrus like Bergamote & Sel Marin over top.',
    },
    image:
      'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85',
  },
];

// ============================================================================
// SHAXSIY ATIR TANLASH (QUIZ) VARIANTLARI
// ============================================================================
const QUIZ_OPTIONS = {
  mood: [
    {
      id: 'evening',
      label: { uz: 'Kechki tadbir & Hashamat', ru: 'Вечерний выход и Роскошь', en: 'Evening Gala & Opulence' },
      icon: '🌙',
    },
    {
      id: 'daily',
      label: { uz: 'Kundalik nafislik & Ofis', ru: 'Дневная элегантность', en: 'Daily Elegance & Office' },
      icon: '☀️',
    },
    {
      id: 'romantic',
      label: { uz: 'Romantik uchrashuv', ru: 'Романтическое свидание', en: 'Romantic Rendezvous' },
      icon: '🌹',
    },
  ],
  note: [
    {
      id: 'oud',
      label: { uz: 'Ud & Tutunli yog‘och', ru: 'Уд и Дымное дерево', en: 'Oud & Smoky Woods' },
      matchId: 'aeth-01',
    },
    {
      id: 'amber',
      label: { uz: 'Za’faron & Issiq ambra', ru: 'Шафран и Тёплая амбра', en: 'Saffron & Warm Amber' },
      matchId: 'aeth-02',
    },
    {
      id: 'rose',
      label: { uz: 'Grass atirguli & Yasmin', ru: 'Роза Грасса и Жасмин', en: 'Grasse Rose & Jasmine' },
      matchId: 'aeth-03',
    },
    {
      id: 'citrus',
      label: { uz: 'Bergamot & Dengiz shabadasi', ru: 'Бергамот и Морской бриз', en: 'Bergamot & Sea Breeze' },
      matchId: 'aeth-04',
    },
  ],
};

function App() {
  // Til va Mavzu holatlari
  const [lang, setLang] = useState('uz');
  const [theme, setTheme] = useState('dark'); // 'dark' yoki 'light'
  const t = UI_TEXTS[lang] || UI_TEXTS.uz;

  // Qidiruv, Filtrlash va Saralash holatlari
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Savatcha, Sevimlilar va Solishtirish holatlari (LocalStorage bilan)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aetheria_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aetheria_wishlist');
      return saved ? JSON.parse(saved) : ['aeth-01', 'aeth-02'];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState([]);

  // Drawer va Modal oynalar holatlari
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  // Shaxsiy atir tanlash (Quiz) holatlari
  const [quizMood, setQuizMood] = useState('evening');
  const [quizNote, setQuizNote] = useState('oud');

  // Buyurtma formasi (Telegram Bot integratsiyasi uchun)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Toast bildirishnoma
  const [toastMessage, setToastMessage] = useState(null);
  const catalogRef = useRef(null);
  const quizRef = useRef(null);

  // LocalStorage sinxronizatsiyasi
  useEffect(() => {
    try {
      localStorage.setItem('aetheria_cart', JSON.stringify(cart));
    } catch (err) {
      console.error(err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aetheria_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error(err);
    }
  }, [wishlist]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast ko'rsatish yordamchisi
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Savatchaga mahsulot qo'shish
  const handleAddToCart = (product) => {
    const itemId = product.cartItemId || `${product.id}-default`;
    const price = product.finalPrice || product.price;
    const volume = product.selectedVolume || '100ml';

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: itemId,
          id: product.id,
          name: product.name,
          image: product.image,
          volume,
          price,
          quantity: 1,
        },
      ];
    });

    const pName = typeof product.name === 'object' ? product.name[lang] : product.name;
    showToast(`✦ ${pName} (${volume}) — ${t.quickViewAdd}`);
  };

  // Savatcha miqdorini o'zgartirish
  const updateCartQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Sevimlilarga qo'shish / olish
  const handleToggleWishlist = (perfumeId) => {
    setWishlist((prev) =>
      prev.includes(perfumeId) ? prev.filter((id) => id !== perfumeId) : [...prev, perfumeId]
    );
  };

  // Solishtirish ro'yxatiga qo'shish / olish (maksimum 3 ta)
  const handleToggleCompare = (perfumeId) => {
    setCompareList((prev) => {
      if (prev.includes(perfumeId)) {
        return prev.filter((id) => id !== perfumeId);
      }
      if (prev.length >= 3) {
        showToast('Maksimum 3 ta atirni solishtirish mumkin');
        return prev;
      }
      const next = [...prev, perfumeId];
      if (next.length >= 2) {
        setIsCompareOpen(true);
      }
      return next;
    });
  };

  // Filtrlangan va saralangan atirlar ro'yxati
  const filteredPerfumes = useMemo(() => {
    return PERFUMES_DATABASE.filter((item) => {
      // Kategoriya filtri
      if (selectedCategory === 'unisex') {
        if (!item.isUnisex) return false;
      } else if (selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // Qidiruv matni filtri
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const nameMatch = Object.values(item.name).some((v) => v.toLowerCase().includes(q));
        const brandMatch = item.brand.toLowerCase().includes(q);
        const notesAll = [
          ...(item.notes?.top?.[lang] || []),
          ...(item.notes?.heart?.[lang] || []),
          ...(item.notes?.base?.[lang] || []),
        ]
          .join(' ')
          .toLowerCase();
        return nameMatch || brandMatch || notesAll.includes(q);
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy, lang]);

  // Savatcha umumiy hisobi
  const totalCartItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalCartPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // Quiz bo'yicha mos kelgan atir
  const matchedQuizPerfume = useMemo(() => {
    const foundOption = QUIZ_OPTIONS.note.find((n) => n.id === quizNote);
    return (
      PERFUMES_DATABASE.find((p) => p.id === foundOption?.matchId) || PERFUMES_DATABASE[0]
    );
  }, [quizNote]);

  // Telegram Bot orqali buyurtma yuborish
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || cart.length === 0) return;

    setIsSubmittingOrder(true);

    // Real loyihada o'zingizning BOT_TOKEN va CHAT_ID ingizni qo'yasiz
    const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
    const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

    const itemsSummary = cart
      .map((item, idx) => {
        const title = typeof item.name === 'object' ? item.name.uz : item.name;
        return `${idx + 1}. ${title} (${item.volume}) × ${item.quantity} = $${
          item.price * item.quantity
        }`;
      })
      .join('\n');

    const messageText = `✨ YANGI BUYURTMA — AETHERIA PARFUMS\n\n👤 Mijoz: ${customerName}\n📞 Telefon: ${customerPhone}\n📍 Manzil: ${customerAddress}\n📝 Izoh: ${
      customerNote || 'Yo‘q'
    }\n\n🛍 Mahsulotlar:\n${itemsSummary}\n\n💰 JAMI: $${totalCartPrice}`;

    try {
      if (TELEGRAM_BOT_TOKEN !== 'YOUR_TELEGRAM_BOT_TOKEN') {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText,
          }),
        });
      } else {
        // Demo rejimida 900ms kutish simulyatsiyasi
        await new Promise((resolve) => setTimeout(resolve, 900));
      }

      setOrderSubmitted(true);
      setCart([]);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setCustomerNote('');
    } catch (error) {
      console.error('Order error:', error);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className={`aetheria-app theme-${theme}`}>
      {/* Dinamik Toast Bildirishnoma */}
      {toastMessage && (
        <div className="aetheria-toast" role="status">
          <span className="toast-gold-bar" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Yuqori Navigatsiya Paneli */}
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartItems}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onOpenCart={() => {
          setOrderSubmitted(false);
          setIsCartOpen(true);
        }}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onNavigateCatalog={() =>
          catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        onNavigateQuiz={() => quizRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* ====================================================================
          HERO SECTION (BOSH EKRAN)
         ==================================================================== */}
      <section className="aetheria-hero">
        <div className="aetheria-hero__bg-orb orb-1" />
        <div className="aetheria-hero__bg-orb orb-2" />
        <div className="aetheria-hero__grid-overlay" />

        <div className="aetheria-container aetheria-hero__inner">
          <div className="aetheria-hero__content">
            <div className="aetheria-hero__badge">
              <span className="pulse-dot" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="aetheria-hero__title">
              <span>{t.heroTitleLine1}</span>
              <span className="gold-gradient-text">{t.heroTitleLine2}</span>
            </h1>

            <p className="aetheria-hero__description">{t.heroDesc}</p>

            <div className="aetheria-hero__cta-group">
              <button
                type="button"
                className="btn-gold-primary"
                onClick={() =>
                  catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span>{t.heroPrimaryBtn}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                type="button"
                className="btn-glass-secondary"
                onClick={() => quizRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>✦ {t.heroSecondaryBtn}</span>
              </button>
            </div>

            {/* Brend ko'rsatkichlari */}
            <div className="aetheria-hero__stats">
              <div className="hero-stat">
                <span className="hero-stat__num">18+</span>
                <span className="hero-stat__label">{t.statsYears}</span>
              </div>
              <div className="hero-stat__divider" />
              <div className="hero-stat">
                <span className="hero-stat__num">140+</span>
                <span className="hero-stat__label">{t.statsEssences}</span>
              </div>
              <div className="hero-stat__divider" />
              <div className="hero-stat">
                <span className="hero-stat__num">12K+</span>
                <span className="hero-stat__label">{t.statsClients}</span>
              </div>
            </div>
          </div>

          {/* O'ng tarafdagi Flagman Flakon Vitrina */}
          <div className="aetheria-hero__visual">
            <div className="hero-flacon-pedestal">
              <div className="pedestal-ring ring-outer" />
              <div className="pedestal-ring ring-inner" />
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=90"
                alt="AETHERIA Oud Imperial Royale"
                className="hero-flacon-img"
              />
              <div className="hero-floating-card card-top">
                <span className="floating-tag">34% EXTRAIT</span>
                <strong>Oud Imperial Royale</strong>
                <small>Grasse • 90 Days Macerated</small>
              </div>
              <div className="hero-floating-card card-bottom">
                <span className="stars">★★★★★</span>
                <strong>4.9 / 5.0</strong>
                <small>128 Verified Collectors</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          ATIRLAR KATALOGI VA AQLLI FILTRLASH BO'LIMI
         ==================================================================== */}
      <section ref={catalogRef} id="collection" className="aetheria-section">
        <div className="aetheria-container">
          <div className="section-header-center">
            <span className="section-eyebrow">{t.collectionEyebrow}</span>
            <h2 className="section-title">{t.collectionTitle}</h2>
            <p className="section-subtitle">{t.collectionSubtitle}</p>
          </div>

          {/* Qidiruv va Filtrlash Paneli */}
          <div className="catalog-controls">
            <div className="catalog-search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="catalog-filter-tabs">
              {[
                { key: 'all', label: t.filterAll },
                { key: 'woody', label: t.filterWoody },
                { key: 'oriental', label: t.filterOriental },
                { key: 'floral', label: t.filterFloral },
                { key: 'fresh', label: t.filterFresh },
                { key: 'unisex', label: t.filterUnisex },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`filter-pill ${selectedCategory === cat.key ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="catalog-toolbar-bottom">
              <span className="results-counter">
                <strong>{filteredPerfumes.length}</strong> {t.resultsCount}
              </span>

              <div className="sort-selector">
                <label htmlFor="sort-select">{t.sortLabel}</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">{t.sortFeatured}</option>
                  <option value="newest">{t.sortNewest}</option>
                  <option value="rating">{t.sortRating}</option>
                  <option value="price-asc">{t.sortPriceAsc}</option>
                  <option value="price-desc">{t.sortPriceDesc}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Atir kartalari setkasi (ParfumeCard.jsx) */}
          {filteredPerfumes.length > 0 ? (
            <div className="perfumes-grid">
              {filteredPerfumes.map((perfume, idx) => (
                <ParfumeCard
                  key={perfume.id}
                  perfume={perfume}
                  lang={lang}
                  index={idx}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(item) => setQuickViewItem(item)}
                  onToggleCompare={handleToggleCompare}
                  isWishlisted={wishlist.includes(perfume.id)}
                  isCompared={compareList.includes(perfume.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-state">
              <div className="empty-icon">✦</div>
              <h3>{t.emptySearchTitle}</h3>
              <p>{t.emptySearchDesc}</p>
              <button
                type="button"
                className="btn-gold-primary"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                {t.resetFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          DISCOVERY SETLAR VA AKSESSUARLAR (ProductCard.jsx)
         ==================================================================== */}
      <section id="sets" className="aetheria-section aetheria-section--alt">
        <div className="aetheria-container">
          <div className="section-header-center">
            <span className="section-eyebrow">{t.setsEyebrow}</span>
            <h2 className="section-title">{t.setsTitle}</h2>
            <p className="section-subtitle">{t.setsSubtitle}</p>
          </div>

          <div className="product-sets-grid">
            {SETS_DATABASE.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                index={idx}
                onAddToCart={(item) =>
                  handleAddToCart({
                    ...item,
                    selectedVolume: item.specs?.[0] || 'Set',
                    finalPrice: item.price,
                    cartItemId: `${item.id}-set`,
                  })
                }
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          INTERAKTIV SHAXSIY ATIR TANLASH (SCENT FINDER)
         ==================================================================== */}
      <section ref={quizRef} id="scent-finder" className="aetheria-section">
        <div className="aetheria-container">
          <div className="scent-quiz-box">
            <div className="scent-quiz-box__left">
              <span className="section-eyebrow">{t.quizEyebrow}</span>
              <h2 className="quiz-heading">{t.quizTitle}</h2>
              <p className="quiz-sub">{t.quizSubtitle}</p>

              <div className="quiz-step-block">
                <h4>{t.quizStep1}</h4>
                <div className="quiz-options-row">
                  {QUIZ_OPTIONS.mood.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={`quiz-choice-btn ${quizMood === m.id ? 'is-selected' : ''}`}
                      onClick={() => setQuizMood(m.id)}
                    >
                      <span>{m.icon}</span>
                      <span>{m.label[lang]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="quiz-step-block">
                <h4>{t.quizStep2}</h4>
                <div className="quiz-options-row">
                  {QUIZ_OPTIONS.note.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className={`quiz-choice-btn ${quizNote === n.id ? 'is-selected' : ''}`}
                      onClick={() => setQuizNote(n.id)}
                    >
                      <span>✦</span>
                      <span>{n.label[lang]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="scent-quiz-box__right">
              <span className="quiz-result-badge">{t.quizResultTitle}</span>
              <div className="quiz-matched-card">
                <img
                  src={matchedQuizPerfume.image}
                  alt={matchedQuizPerfume.name[lang]}
                />
                <div className="quiz-matched-info">
                  <small>{matchedQuizPerfume.brand}</small>
                  <h3>{matchedQuizPerfume.name[lang]}</h3>
                  <p>{matchedQuizPerfume.description[lang]}</p>
                  <div className="quiz-matched-footer">
                    <span className="quiz-price">${matchedQuizPerfume.price}</span>
                    <button
                      type="button"
                      className="btn-gold-primary"
                      onClick={() =>
                        handleAddToCart({
                          ...matchedQuizPerfume,
                          selectedVolume: '100ml',
                          finalPrice: matchedQuizPerfume.price,
                          cartItemId: `${matchedQuizPerfume.id}-100ml`,
                        })
                      }
                    >
                      {t.quickViewAdd}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          YANGILIKLAR VA JURNAL BO'LIMI (NewsCard.jsx)
         ==================================================================== */}
      <section id="journal" className="aetheria-section aetheria-section--alt">
        <div className="aetheria-container">
          <div className="section-header-center">
            <span className="section-eyebrow">{t.newsEyebrow}</span>
            <h2 className="section-title">{t.newsTitle}</h2>
            <p className="section-subtitle">{t.newsSubtitle}</p>
          </div>

          <div className="news-articles-grid">
            {NEWS_DATABASE.map((article, idx) => (
              <NewsCard
                key={article.id}
                article={article}
                lang={lang}
                index={idx}
                onReadMore={(art) => setActiveArticle(art)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER (Footer.jsx)
         ==================================================================== */}
      <Footer
        lang={lang}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ====================================================================
          SAVATCHA DRAWER (CART & TELEGRAM CHECKOUT)
         ==================================================================== */}
      {isCartOpen && (
        <div className="aetheria-backdrop" onClick={() => setIsCartOpen(false)}>
          <aside className="aetheria-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>
                {t.cartTitle} ({totalCartItems})
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="drawer-body">
              {orderSubmitted ? (
                <div className="order-success-box">
                  <div className="success-checkmark">✓</div>
                  <h4>{t.orderSuccessTitle}</h4>
                  <p>{t.orderSuccessMsg}</p>
                  <button
                    type="button"
                    className="btn-gold-primary"
                    onClick={() => setIsCartOpen(false)}
                  >
                    OK
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="drawer-empty">
                  <p>{t.cartEmpty}</p>
                  <small>{t.cartEmptySub}</small>
                </div>
              ) : (
                <>
                  <div className="cart-items-list">
                    {cart.map((item) => {
                      const itemTitle =
                        typeof item.name === 'object' ? item.name[lang] : item.name;
                      return (
                        <div key={item.cartItemId} className="cart-item-row">
                          <img src={item.image} alt={itemTitle} />
                          <div className="cart-item-details">
                            <h4>{itemTitle}</h4>
                            <span className="cart-item-vol">{item.volume}</span>
                            <span className="cart-item-price">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                          <div className="cart-qty-controls">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="cart-summary-box">
                    <div className="cart-total-row">
                      <span>{t.cartSubtotal}</span>
                      <strong>${totalCartPrice.toLocaleString()}</strong>
                    </div>
                    <p className="free-shipping-note">✦ {t.cartFreeShipping}</p>
                  </div>

                  <form className="telegram-checkout-form" onSubmit={handleCheckoutSubmit}>
                    <h4>{t.checkoutTitle}</h4>
                    <input
                      type="text"
                      required
                      placeholder={t.inputName}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <input
                      type="tel"
                      required
                      placeholder={t.inputPhone}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                    <input
                      type="text"
                      required
                      placeholder={t.inputAddress}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                    />
                    <textarea
                      rows="2"
                      placeholder={t.inputNote}
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingOrder}
                      className="btn-gold-primary full-width"
                    >
                      {isSubmittingOrder ? t.orderSending : t.submitOrder}
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* ====================================================================
          SEVIMLILAR DRAWER (WISHLIST)
         ==================================================================== */}
      {isWishlistOpen && (
        <div className="aetheria-backdrop" onClick={() => setIsWishlistOpen(false)}>
          <aside className="aetheria-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>
                {t.wishlistTitle} ({wishlist.length})
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsWishlistOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="drawer-body">
              {wishlist.length === 0 ? (
                <div className="drawer-empty">
                  <p>{t.wishlistEmpty}</p>
                </div>
              ) : (
                <div className="cart-items-list">
                  {PERFUMES_DATABASE.filter((p) => wishlist.includes(p.id)).map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <img src={item.image} alt={item.name[lang]} />
                      <div className="cart-item-details">
                        <h4>{item.name[lang]}</h4>
                        <span className="cart-item-price">${item.price}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-gold-small"
                        onClick={() => {
                          handleAddToCart({
                            ...item,
                            selectedVolume: '100ml',
                            finalPrice: item.price,
                            cartItemId: `${item.id}-100ml`,
                          });
                          setIsWishlistOpen(false);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* ====================================================================
          ATIRNI BATAFSIL KO'RISH MODALI (QUICK VIEW MODAL)
         ==================================================================== */}
      {quickViewItem && (
        <div className="aetheria-backdrop" onClick={() => setQuickViewItem(null)}>
          <div
            className="aetheria-modal quickview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn floating-close"
              onClick={() => setQuickViewItem(null)}
            >
              ✕
            </button>

            <div className="quickview-grid">
              <div className="quickview-media">
                <img src={quickViewItem.image} alt={quickViewItem.name[lang]} />
              </div>

              <div className="quickview-content">
                <span className="qv-brand">{quickViewItem.brand}</span>
                <h2>{quickViewItem.name[lang]}</h2>
                <p className="qv-subtitle">{quickViewItem.subtitle[lang]}</p>
                <p className="qv-desc">{quickViewItem.description[lang]}</p>

                <div className="qv-meta-specs">
                  <div>
                    <span>{t.quickViewPerfumer}</span>
                    <strong>{quickViewItem.perfumer}</strong>
                  </div>
                  <div>
                    <span>{t.quickViewYear}</span>
                    <strong>{quickViewItem.releaseYear}</strong>
                  </div>
                </div>

                <div className="qv-pyramid-box">
                  <h4>{t.quickViewNotes}</h4>
                  <p>
                    <strong>{t.quickViewTop}:</strong>{' '}
                    {quickViewItem.notes.top[lang].join(', ')}
                  </p>
                  <p>
                    <strong>{t.quickViewHeart}:</strong>{' '}
                    {quickViewItem.notes.heart[lang].join(', ')}
                  </p>
                  <p>
                    <strong>{t.quickViewBase}:</strong>{' '}
                    {quickViewItem.notes.base[lang].join(', ')}
                  </p>
                </div>

                <div className="qv-footer">
                  <span className="qv-price">
                    ${quickViewItem.finalPrice || quickViewItem.price}
                  </span>
                  <button
                    type="button"
                    className="btn-gold-primary"
                    onClick={() => {
                      handleAddToCart(quickViewItem);
                      setQuickViewItem(null);
                    }}
                  >
                    {t.quickViewAdd}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          ATIRLARNI SOLISHTIRISH MODALI (COMPARE MODAL)
         ==================================================================== */}
      {isCompareOpen && (
        <div className="aetheria-backdrop" onClick={() => setIsCompareOpen(false)}>
          <div className="aetheria-modal compare-modal" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>{t.compareTitle}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsCompareOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="compare-table-wrapper">
              {compareList.length < 2 ? (
                <p className="drawer-empty">{t.compareEmpty}</p>
              ) : (
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Parametr</th>
                      {PERFUMES_DATABASE.filter((p) => compareList.includes(p.id)).map((p) => (
                        <th key={p.id}>
                          <img src={p.image} alt={p.name[lang]} />
                          <div>{p.name[lang]}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Narx (100ml)</td>
                      {PERFUMES_DATABASE.filter((p) => compareList.includes(p.id)).map((p) => (
                        <td key={p.id}>${p.price}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>{t.quickViewTop}</td>
                      {PERFUMES_DATABASE.filter((p) => compareList.includes(p.id)).map((p) => (
                        <td key={p.id}>{p.notes.top[lang].join(', ')}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>{t.quickViewHeart}</td>
                      {PERFUMES_DATABASE.filter((p) => compareList.includes(p.id)).map((p) => (
                        <td key={p.id}>{p.notes.heart[lang].join(', ')}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>{t.quickViewBase}</td>
                      {PERFUMES_DATABASE.filter((p) => compareList.includes(p.id)).map((p) => (
                        <td key={p.id}>{p.notes.base[lang].join(', ')}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MAQOLANI O'QISH MODALI (ARTICLE READER MODAL)
         ==================================================================== */}
      {activeArticle && (
        <div className="aetheria-backdrop" onClick={() => setActiveArticle(null)}>
          <div className="aetheria-modal article-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn floating-close"
              onClick={() => setActiveArticle(null)}
            >
              ✕
            </button>
            <img
              src={activeArticle.image}
              alt={activeArticle.title[lang]}
              className="article-modal__hero"
            />
            <div className="article-modal__body">
              <div className="article-meta">
                <span>{activeArticle.category[lang]}</span> •{' '}
                <span>{activeArticle.date}</span> •{' '}
                <span>{activeArticle.readTime[lang]}</span>
              </div>
              <h2>{activeArticle.title[lang]}</h2>
              <p className="article-author">By {activeArticle.author}</p>
              <div className="article-paragraphs">
                {activeArticle.content[lang].split('\n\n').map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
              <button
                type="button"
                className="btn-gold-primary"
                onClick={() => setActiveArticle(null)}
              >
                {t.readMoreModalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;