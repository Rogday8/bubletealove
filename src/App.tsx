import Lenis from 'lenis'
import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { CartDrawer } from './components/CartDrawer'
import { Constructor } from './components/Constructor'
import { Faq } from './components/Faq'
import { Flavors } from './components/Flavors'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { PhotoWall } from './components/PhotoWall'
import { Reviews } from './components/Reviews'
import { Ritual } from './components/Ritual'
import { Splash } from './components/Splash'
import { Stats } from './components/Stats'
import { CartProvider } from './state/cart'
import { FlavorProvider } from './state/flavor'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  useSmoothScroll(!loading)

  // пока висит заставка — страница не скроллится
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <FlavorProvider>
      <CartProvider>
        <AnimatePresence>{loading && <Splash key="splash" onDone={done} />}</AnimatePresence>

        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Stats />
          <Flavors />
          <Constructor />
          <Ritual />
          <Gallery />
          <PhotoWall />
          <Reviews />
          <Faq />
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </FlavorProvider>
  )
}

/** Инерционный скролл — без него параллакс выглядит рвано */
function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled])
}
