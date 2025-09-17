"use client"

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
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  route("/")
                }}
                class="px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                Se connecter
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  route("/")
                }}
                class="px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                S'inscrire
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
