import { useEffect, useState } from "preact/hooks"
import { getUserTypeFromCookie } from "../utils.js"
import { useLocation } from "preact-iso"

export function Header() {
  const { route } = useLocation()
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    setUserType(getUserTypeFromCookie())
  }, [])

  return (
    <nav class="sticky top-0 z-50 bg-white shadow-lg border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-1">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-bleu-light-citef rounded-lg flex items-center justify-center">
                <img src="/images/logoverttext.svg" class="w-10 h-10" alt="Mosifra" />
              </div>
              <div>
                <span class="text-xl font-bold text-slate-800">Mosifra</span>
              </div>
            </div>
          </div>

          <ul class="flex items-center space-x-3">
                <li>
                  <a href="/" class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium">
                    Accueil
                  </a>
                </li>
            {!userType && (
              <li>
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault()
                    route("/login")
                  }}
                  class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium"
                >
                  Se connecter
                </a>
              </li>
            )}

            {userType === "student" && (
              <>
                <li>
                  <a href="/student/account" class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium">
                    Compte
                  </a>
                </li>
                <li>
                  <a href="/internships" class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium">
                    Stages
                  </a>
                </li>
              </>
            )}

            {userType === "company" && (
              <>
                <li>
                  <a href="/company/managecandidates" class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium">
                    Candidatures
                  </a>
                </li>
                <li>
                  <a href="/company/submitinternship" class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium">
                    Créer une offre
                  </a>
                </li>
              </>
            )}

            {userType === "university" && (
              <>
                <li>
                  <a href="/internships" class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium">
                    Stages
                  </a>
                </li>
                <li>
                  <a href="/university/students" class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium">
                    Promotions
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
