import { LogIn } from "lucide-preact"
import { Footer } from "../components/footer.jsx"
import { useLocation } from "preact-iso"

export function Home() {
  const { route } = useLocation()

  return (
    <>
    <div class="min-h-screen bg-beige-mosifra"> 
      <section class="py-20 px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl font-bold text-slate-800 mb-8">Plateforme de gestion des stages à l'étranger MOSIFRA</h1>
          <p class="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Mosifra est une plateforme dédiée à la gestion des stages internationaux. Elle connecte les
            universités, entreprises et étudiants pour faciliter l'organisation et le suivi des stages à l'étranger. Dû au statut privé de la plateforme, nous vous prions de vous connecter à votre compte. 
          </p>

          <a href="/login"
            onClick={() => route("/login")}
            class="inline-flex items-center gap-3 bg-beige-mosifra text-vert-mosifra px-8 py-4 border-1 border-vert-mosifra rounded-lg font-semibold hover:bg-vert-mosifra hover:text-white transition-colors text-lg shadow-lg hover:shadow-xl"
          >
            <LogIn class="h-5 w-5" />
            Se connecter
          </a>
        </div>
      </section> 
    </div>
    <Footer />
    </>
  )
}

