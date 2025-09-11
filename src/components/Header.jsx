"use client"

import { useLocation } from "preact-iso"

export function Header() {
  const { url, route } = useLocation()

  const isActive = (p) => url === p

  return (
    <nav class="sticky top-0 z-50 bg-white shadow-lg border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <img src="/images/logo_transparent_notext.svg" class="w-6 h-6" alt="Mosifra" />
              </div>
              <div>
                <span class="text-xl font-bold text-slate-800">Mosifra</span>
                <div class="text-xs text-slate-500">Université de Limoges</div>
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
                Accueil
              </a>
            </li>
            <li>
              <a
                href="/logoselector"
                onClick={(e) => {
                  e.preventDefault()
                  route("/logoselector")
                }}
                class="px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                Comparatif de logos
              </a>
            </li>
            <li>
              <a
                href="/stages"
                onClick={(e) => {
                  e.preventDefault()
                  route("/stages")
                }}
                class="px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              >
                Stages
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
