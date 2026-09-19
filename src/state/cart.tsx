import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type CartItem = {
  /** ключ позиции: одинаковые сборки складываются в одну строку */
  id: string
  title: string
  subtitle: string
  price: number
  qty: number
  /** цвет кружка-превью в корзине */
  color: string
}

type CartState = {
  items: CartItem[]
  count: number
  total: number
  open: boolean
  /** последняя добавленная позиция — по ней прыгает счётчик в шапке */
  pulse: number
  add: (item: Omit<CartItem, 'qty'>) => void
  inc: (id: string) => void
  dec: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  setOpen: (v: boolean) => void
}

const Ctx = createContext<CartState | null>(null)
const STORAGE_KEY = 'btl-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })
  const [open, setOpen] = useState(false)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* приватный режим — просто не сохраняем */
    }
  }, [items])

  const add = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id)
      if (found) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { ...item, qty: 1 }]
    })
    setPulse((p) => p + 1)
  }, [])

  const inc = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))
  }, [])

  const dec = useCallback((id: string) => {
    setItems((prev) =>
      prev.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])),
    )
  }, [])

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<CartState>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const total = items.reduce((n, i) => n + i.qty * i.price, 0)
    return { items, count, total, open, pulse, add, inc, dec, remove, clear, setOpen }
  }, [items, open, pulse, add, inc, dec, remove, clear])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart должен вызываться внутри <CartProvider/>')
  return ctx
}
