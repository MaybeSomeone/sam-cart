export type Product = {
  id: string
  title: string
  brand: string
  image: string
  price: number
  originalPrice: number
  groupCount: number
  tall?: boolean
}

export const products: Product[] = [
  {
    id: 'swiss-roll',
    title: 'Member\u2019s Mark 巧克力瑞士卷 塬味口感 1000g',
    brand: "Member's Mark",
    image: '/products/swiss-roll.png',
    price: 58,
    originalPrice: 68,
    groupCount: 32,
    tall: true,
  },
  {
    id: 'beef',
    title: '澳洲谷饲原切西冷牛排套餐 10片装',
    brand: "Member's Mark",
    image: '/products/beef.png',
    price: 199,
    originalPrice: 258,
    groupCount: 18,
  },
  {
    id: 'nuts',
    title: '每日综合坚果混合罐装 750g 健康零食',
    brand: "Member's Mark",
    image: '/products/nuts.png',
    price: 89,
    originalPrice: 108,
    groupCount: 54,
    tall: true,
  },
  {
    id: 'muffin',
    title: '经典麦芬蛋糕 混合口味 6枚装',
    brand: "Member's Mark",
    image: '/products/muffin.png',
    price: 42,
    originalPrice: 52,
    groupCount: 27,
  },
  {
    id: 'chicken',
    title: '招牌烤全鸡 现烤热食 约1.2kg',
    brand: "Member's Mark",
    image: '/products/chicken.png',
    price: 39,
    originalPrice: 45,
    groupCount: 96,
  },
  {
    id: 'milk',
    title: '有机全脂纯牛奶 1L×3 早餐奶',
    brand: "Member's Mark",
    image: '/products/milk.png',
    price: 65,
    originalPrice: 79,
    groupCount: 41,
    tall: true,
  },
  {
    id: 'berries',
    title: '进口新鲜蓝莓 大果 510g 鲜甜多汁',
    brand: "Member's Mark",
    image: '/products/berries.png',
    price: 76,
    originalPrice: 98,
    groupCount: 63,
  },
]

export const quickLinks = [
  { key: 'hot', label: '热门商品', color: '#e74c3c' },
  { key: 'new', label: '新品首发', color: '#003d5b' },
  { key: 'group', label: '拼单专区', color: '#f39c12' },
  { key: 'rules', label: '代购规则', color: '#27ae60' },
]
