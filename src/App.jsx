import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import ParallaxBackground from './components/ParallaxBackground'
import FloatingParticles from './components/FloatingParticles'

// Импортируем главную страницу сразу для быстрой загрузки
import Home from './pages/Home'

// Ленивая загрузка остальных страниц
const News = lazy(() => import('./pages/News'))
const Course = lazy(() => import('./pages/Course'))
const Reviews = lazy(() => import('./pages/Reviews'))
const About = lazy(() => import('./pages/About'))
const Logo3DPage = lazy(() => import('./pages/Logo3DPage'))
const ThankYou = lazy(() => import('./pages/ThankYou'))

function App() {
  const location = useLocation()

  // Убираем анимации переходов между страницами - они уже есть в компонентах

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Условно рендерим фоновые эффекты */}
      {location.pathname !== '/logo3d' && <ParallaxBackground />}
      {location.pathname !== '/logo3d' && <FloatingParticles />}
      <CustomCursor />
      <Navbar />
      
      <div className="relative z-10">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-amber-400 text-xl font-bold animate-pulse">Загрузка...</div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/course" element={<Course />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/logo3d" element={<Logo3DPage />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
