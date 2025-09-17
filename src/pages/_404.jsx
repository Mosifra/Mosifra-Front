import { House, List } from "lucide-preact"
import { useLocation } from "preact-iso"

export function NotFound() {

	const { url, route } = useLocation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-bleu-light-citef to-bleu-citef bg-clip-text mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-slate-800 mb-4">Page non trouvée</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour explorer nos
            offres de stages à l'étranger.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
		  href="/"
            onClick={(e) => {
                  e.preventDefault()
                  route("/")
                }}
            className="inline-flex items-center px-6 py-3 border-2 border-bleu-citef text-bleu-citef font-semibold rounded-lg hover:bg-bleu-citef hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <House class="w-5 h-5 mr-2"/>
            Retour à l'accueil
          </a>
          <a
		  	href="/stages"
            onClick={(e) => {
                  e.preventDefault()
                  route("/stages")
                }}
            className="inline-flex items-center px-6 py-3 border-2 border-bleu-citef text-bleu-citef font-semibold rounded-lg hover:bg-bleu-citef hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <List class="w-5 h-5 mr-2"/>
            Voir les stages
          </a>
        </div>
      </div>
      <div className="mt-16 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-slate-200">
          <img
            src="/images/logo_notext.svg"
            alt="Mosifra - Université de Limoges"
            className="w-8 h-8 mr-3 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-slate-700">Mosifra - Université de Limoges</span>
        </div>
      </div>
    </div>
  )
}
