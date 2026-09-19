export type FruitKind =
  | 'sakura'
  | 'strawberry'
  | 'mango'
  | 'boba'
  | 'peach'
  | 'pea'
  | 'matcha'
  | 'taro'
  | 'sugar'
  | 'lychee'
  | 'coconut'
  | 'grape'

export type Flavor = {
  id: string
  /** Название на витрине (латиница — как в референсе) */
  name: string
  /** Подпись по-русски */
  ru: string
  tagline: string
  notes: string[]
  price: number
  kcal: number
  sweetness: number
  /** «Новинка», «Хит», «Лимит» — маленький бейдж на карточке */
  badge?: string
  fruit: FruitKind
  colors: {
    /** пенка/молочная шапка */
    foam: string
    /** верх напитка */
    top: string
    /** низ напитка (самый насыщенный) */
    bottom: string
    /** тапиока */
    pearl: string
    /** свечение сцены */
    glow: string
    /** цвет текста-акцента */
    ink: string
    /** фон сцены: две точки радиального градиента */
    bgA: string
    bgB: string
  }
}

export const flavors: Flavor[] = [
  {
    id: 'sakura',
    name: 'Sakura Milk',
    ru: 'Сакура Милк',
    tagline: 'Цветущая ветка в стакане',
    notes: ['улун', 'молоко', 'сироп сакуры'],
    price: 390,
    kcal: 214,
    sweetness: 40,
    badge: 'хит весны',
    fruit: 'sakura',
    colors: {
      foam: '#fde7e4',
      top: '#f6c3c8',
      bottom: '#e98fa0',
      pearl: '#6b2a33',
      glow: '#f29da8',
      ink: '#ffd9dd',
      bgA: '#7a3346',
      bgB: '#1a0a0d',
    },
  },
  {
    id: 'strawberry',
    name: 'Strawberry Cream',
    ru: 'Клубника Крим',
    tagline: 'Ягода, взбитая с молоком',
    notes: ['клубника', 'сливки', 'чёрный чай'],
    price: 420,
    kcal: 268,
    sweetness: 60,
    fruit: 'strawberry',
    colors: {
      foam: '#fbdcd4',
      top: '#f3907f',
      bottom: '#c8402f',
      pearl: '#45120f',
      glow: '#e8634c',
      ink: '#ffd0c4',
      bgA: '#7d2a22',
      bgB: '#1a0a0d',
    },
  },
  {
    id: 'mango',
    name: 'Mango Passion',
    ru: 'Манго Пэшн',
    tagline: 'Солнце на дне стакана',
    notes: ['манго', 'маракуйя', 'зелёный чай'],
    price: 410,
    kcal: 231,
    sweetness: 70,
    fruit: 'mango',
    colors: {
      foam: '#fdeacb',
      top: '#f7b061',
      bottom: '#e3811f',
      pearl: '#4a2a0e',
      glow: '#f6a33f',
      ink: '#ffe3bb',
      bgA: '#7d4a18',
      bgB: '#1a0a0d',
    },
  },
  {
    id: 'classic',
    name: 'Classic Milk',
    ru: 'Классик Милк',
    tagline: 'Тот самый первый глоток',
    notes: ['ассам', 'молоко', 'тростниковый сахар'],
    price: 380,
    kcal: 245,
    sweetness: 50,
    fruit: 'boba',
    colors: {
      foam: '#f4ddc9',
      top: '#cf9b78',
      bottom: '#8b5136',
      pearl: '#2c1611',
      glow: '#c07d55',
      ink: '#f6d9c3',
      bgA: '#653524',
      bgB: '#1a0a0d',
    },
  },
  {
    id: 'peach',
    name: 'Peach Oolong',
    ru: 'Персик Улун',
    tagline: 'Бархат и лёгкая горчинка',
    notes: ['персик', 'улун', 'мёд'],
    price: 400,
    kcal: 198,
    sweetness: 45,
    fruit: 'peach',
    colors: {
      foam: '#fde6d8',
      top: '#f3bba3',
      bottom: '#df8168',
      pearl: '#4d2118',
      glow: '#ef9878',
      ink: '#ffdecd',
      bgA: '#78372a',
      bgB: '#1a0a0d',
    },
  },
  {
    id: 'lagoon',
    name: 'Blue Lagoon',
    ru: 'Блю Лагуна',
    tagline: 'Мотыльковый горошек и лайм',
    notes: ['анчан', 'лайм', 'кокос'],
    price: 430,
    kcal: 176,
    sweetness: 35,
    badge: 'лимит 40 стаканов',
    fruit: 'pea',
    colors: {
      foam: '#dff4f7',
      top: '#68cadd',
      bottom: '#2a7fc4',
      pearl: '#0f2330',
      glow: '#4fb6da',
      ink: '#cdeef8',
      bgA: '#17566e',
      bgB: '#0b0f18',
    },
  },
  {
    id: 'matcha',
    name: 'Matcha Cloud',
    ru: 'Матча Клауд',
    tagline: 'Церемониальная матча под молочным облаком',
    notes: ['матча', 'молоко', 'ваниль'],
    price: 450,
    kcal: 204,
    sweetness: 30,
    fruit: 'matcha',
    colors: {
      foam: '#eef5dd',
      top: '#bad683',
      bottom: '#6b8f3a',
      pearl: '#21300f',
      glow: '#9cc45c',
      ink: '#e9f6cd',
      bgA: '#3f5522',
      bgB: '#11180c',
    },
  },
  {
    id: 'taro',
    name: 'Taro Dream',
    ru: 'Таро Дрим',
    tagline: 'Лавандовый корень и пломбир',
    notes: ['таро', 'молоко', 'пломбир'],
    price: 440,
    kcal: 286,
    sweetness: 55,
    badge: 'новинка',
    fruit: 'taro',
    colors: {
      foam: '#f6ecfd',
      top: '#c9aee6',
      bottom: '#8d6bc4',
      pearl: '#2a1740',
      glow: '#b48ee0',
      ink: '#efe0fc',
      bgA: '#4d2f6f',
      bgB: '#150c1f',
    },
  },
  {
    id: 'brownsugar',
    name: 'Brown Sugar',
    ru: 'Браун Шугар',
    tagline: 'Карамельные подтёки по стенкам',
    notes: ['тростниковая карамель', 'молоко', 'жемчуг'],
    price: 460,
    kcal: 312,
    sweetness: 80,
    badge: 'самый сладкий',
    fruit: 'sugar',
    colors: {
      foam: '#f9e6cf',
      top: '#d79f63',
      bottom: '#7a3f1c',
      pearl: '#1d0f07',
      glow: '#c8813c',
      ink: '#f8ddbd',
      bgA: '#5f3114',
      bgB: '#170a06',
    },
  },
  {
    id: 'lychee',
    name: 'Lychee Rose',
    ru: 'Личи Роуз',
    tagline: 'Личи, роза и немного льда',
    notes: ['личи', 'роза', 'белый чай'],
    price: 430,
    kcal: 186,
    sweetness: 50,
    fruit: 'lychee',
    colors: {
      foam: '#fdeef0',
      top: '#f2c9cf',
      bottom: '#d98a9c',
      pearl: '#4b1c27',
      glow: '#eba7b6',
      ink: '#ffe4e9',
      bgA: '#6f3141',
      bgB: '#180a0f',
    },
  },
  {
    id: 'coconut',
    name: 'Coconut Snow',
    ru: 'Кокос Сноу',
    tagline: 'Кокосовое молоко и хлопья льда',
    notes: ['кокос', 'жасмин', 'кокосовое желе'],
    price: 420,
    kcal: 222,
    sweetness: 40,
    fruit: 'coconut',
    colors: {
      foam: '#ffffff',
      top: '#f4ece0',
      bottom: '#d3bda2',
      pearl: '#3a2a1c',
      glow: '#e8d6bd',
      ink: '#fff6ec',
      bgA: '#58422e',
      bgB: '#17110c',
    },
  },
  {
    id: 'grape',
    name: 'Grape Frost',
    ru: 'Грейп Фрост',
    tagline: 'Виноградный лёд с хрустом',
    notes: ['виноград', 'зелёный чай', 'лёд'],
    price: 410,
    kcal: 194,
    sweetness: 65,
    fruit: 'grape',
    colors: {
      foam: '#f2e7fb',
      top: '#b48ad6',
      bottom: '#6b3f9e',
      pearl: '#24103a',
      glow: '#9a63cf',
      ink: '#ecdcfa',
      bgA: '#472b69',
      bgB: '#130a1c',
    },
  },
]

export const flavorById = (id: string) => flavors.find((f) => f.id === id) ?? flavors[0]
