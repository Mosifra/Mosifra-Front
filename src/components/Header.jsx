import { useLocation } from "preact-iso"

export function Header() {
  const { url, route } = useLocation()

  const isActive = (p) => url === p

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

          <ul class="flex items-center space-x-1">
            <li>
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault()
                  route("/login")
                }}
                class="px-4 py-2 rounded-full font-medium transition-colors duration-200 bg-beige-mosifra border-1 border-vert-mosifra text-vert-mosifra hover:text-beige-mosifra hover:bg-vert-mosifra"
              >
                Se connecter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
