import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import ParallaxBackground from './components/ParallaxBackground'
import FloatingParticles from './components/FloatingParticles'
import Home from './pages/Home'
import News from './pages/News'
import Course from './pages/Course'
import Reviews from './pages/Reviews'
import About from './pages/About'
import Logo3DPage from './pages/Logo3DPage'

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/course" element={<Course />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/logo3d" element={<Logo3DPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
