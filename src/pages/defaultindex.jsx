import { LogIn } from "lucide-preact"
import { useLocation } from "preact-iso"
import { useEffect, useState } from "preact/hooks"
import { Footer } from "../components/footer.jsx"
import { t, subscribe } from "../i18n"

export default function Home() {
  const { route } = useLocation()
  const [, setVersion] = useState(0)

  useEffect(() => subscribe(() => setVersion(v => v + 1)), [])

  return (
    <>
      <div class="min-h-screen bg-beige-mosifra">
        <section class="py-20 px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl font-bold text-slate-800 mb-8">{t("home.title", null, "Plateforme de gestion des stages à l'étranger MOSIFRA")}</h1>
            <p class="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("home.description", null, "Mosifra est une plateforme dédiée à la gestion des stages internationaux.")}
            </p>

            <a href="/login"
              onClick={() => route("/login")}
              class="inline-flex items-center gap-3 bg-beige-mosifra text-vert-mosifra px-8 py-4 border-1 border-vert-mosifra rounded-lg font-semibold hover:bg-vert-mosifra hover:text-white transition-all transform duration-300 text-lg shadow-lg hover:shadow-xl"
            >
              <LogIn class="h-5 w-5" />
              {t("nav.login", null, "Se connecter")}
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

