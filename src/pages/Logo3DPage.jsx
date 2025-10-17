import Logo3D from '../components/Logo3D'

const Logo3DPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Logo3D />
      
      {/* Инструкции */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-sm mb-2">
          Статичный логотип MoneyX
        </p>
        <p className="text-gray-500 text-xs">
          Без анимаций и эффектов
        </p>
      </div>
    </div>
  )
}

export default Logo3DPage
