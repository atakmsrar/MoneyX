const NewsCard = ({ news, index }) => {
  return (
    <div 
      className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
    >
      {/* Заголовок новости */}
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors duration-300">
        {news.title}
      </h3>
      
      {/* Описание */}
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        {news.description}
      </p>
      
      {/* Мета информация */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
          {news.source}
        </span>
        <span>{news.time}</span>
      </div>
      
      {/* Теги */}
      <div className="flex flex-wrap gap-2 mt-4">
        {news.tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex}
            className="px-2 py-1 bg-amber-400/20 text-amber-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default NewsCard
