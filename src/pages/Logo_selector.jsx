import { useState } from "preact/hooks"
import { useLocation } from "preact-iso"

import logovert from "/images/logoverttext.svg";
import logorouge from "/images/logorouge.svg";
import logojaune from "/images/logojaune.svg";
import logonoir from "/images/logonoir.svg";
import logotransparent from "/images/logo_transparent_notext.svg";
import logovert2 from "/images/logovert2.svg";
import logojaune2 from "/images/logojaune2.svg";
import logorouge2 from "/images/logorouge2.svg";
import logorouge3 from "/images/logorouge3.svg";
import logoarch from "/images/logoarch.svg";

export function LogoSelector() {
  const logos = {
    logovert,
    logorouge,
    logojaune,
    logonoir,
    logotransparent,
    logoarch,
    logojaune2,
    logovert2,
    logorouge2,
    logorouge3,
  }
  const [selected, setSelected] = useState(logos.logovert)
  const { url, route } = useLocation()

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-6xl mx-auto px-6 py-12">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-slate-800 mb-4">Sélecteur de Logo Mosifra</h1>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">
              Choisissez le logo qui représentera au mieux votre plateforme de stages à l'étranger
            </p>
          </div>

          <div class="flex justify-center mb-12">
            <div class="bg-white rounded-2xl shadow-lg p-8 border">
              <img class="w-64 h-64 object-contain" src={selected || "/placeholder.svg"} alt="Logo sélectionné" />
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-12">
        <h2 class="text-2xl font-semibold text-slate-800 mb-8 text-center">Choisissez votre logo</h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <button
            onClick={() => setSelected(logos.logovert)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-emerald-300"
          >
            <img src={logos.logovert || "/placeholder.svg"} class="w-full h-20 object-contain mb-3" alt="Logo vert 1" />
            <span class="text-sm font-medium text-slate-700 group-hover:text-emerald-600">Logo vert 1</span>
          </button>

          <button
            onClick={() => setSelected(logos.logovert2)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-emerald-300"
          >
            <img
              src={logos.logovert2 || "/placeholder.svg"}
              class="w-full h-20 object-contain mb-3"
              alt="Logo vert 2"
            />
            <span class="text-sm font-medium text-slate-700 group-hover:text-emerald-600">Logo vert 2</span>
          </button>

          <button
            onClick={() => setSelected(logos.logorouge)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-red-300"
          >
            <img
              src={logos.logorouge || "/placeholder.svg"}
              class="w-full h-20 object-contain mb-3"
              alt="Logo rouge 1"
            />
            <span class="text-sm font-medium text-slate-700 group-hover:text-red-600">Logo rouge 1</span>
          </button>

          <button
            onClick={() => setSelected(logos.logorouge2)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-red-300"
          >
            <img
              src={logos.logorouge2 || "/placeholder.svg"}
              class="w-full h-20 object-contain mb-3"
              alt="Logo rouge 2"
            />
            <span class="text-sm font-medium text-slate-700 group-hover:text-red-600">Logo rouge 2</span>
          </button>

          <button
            onClick={() => setSelected(logos.logorouge3)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-red-300"
          >
            <img
              src={logos.logorouge3 || "/placeholder.svg"}
              class="w-full h-20 object-contain mb-3"
              alt="Logo rouge 3"
            />
            <span class="text-sm font-medium text-slate-700 group-hover:text-red-600">Logo rouge 3</span>
          </button>

          <button
            onClick={() => setSelected(logos.logojaune)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-yellow-300"
          >
            <img
              src={logos.logojaune || "/placeholder.svg"}
              class="w-full h-20 object-contain mb-3"
              alt="Logo jaune 1"
            />
            <span class="text-sm font-medium text-slate-700 group-hover:text-yellow-600">Logo jaune 1</span>
          </button>

          <button
            onClick={() => setSelected(logos.logojaune2)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-yellow-300"
          >
            <img
              src={logos.logojaune2 || "/placeholder.svg"}
              class="w-full h-20 object-contain mb-3"
              alt="Logo jaune 2"
            />
            <span class="text-sm font-medium text-slate-700 group-hover:text-yellow-600">Logo jaune 2</span>
          </button>

          <button
            onClick={() => setSelected(logos.logonoir)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-slate-400"
          >
            <img src={logos.logonoir || "/placeholder.svg"} class="w-full h-20 object-contain mb-3" alt="Logo noir" />
            <span class="text-sm font-medium text-slate-700 group-hover:text-slate-800">Logo noir</span>
          </button>

          <button
            onClick={() => setSelected(logos.logotransparent)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-blue-300"
          >
            <img
              src={logos.logotransparent || "/placeholder.svg"}
              class="w-full h-20 object-contain mb-3"
              alt="Logo transparent"
            />
            <span class="text-sm font-medium text-slate-700 group-hover:text-blue-600">Logo transparent</span>
          </button>

          <button
            onClick={() => setSelected(logos.logoarch)}
            class="group relative bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 border-slate-200 hover:border-purple-300"
          >
            <img
              src={logos.logoarch || "/placeholder.svg"}
              class="w-full h-20 object-contain mb-3"
              alt="Logo architectural"
            />
            <span class="text-sm font-medium text-slate-700 group-hover:text-purple-600">Logo architectural</span>
          </button>
        </div>

        <div class="mt-16 text-center">
          <div class="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border">
            <h3 class="text-xl font-semibold text-slate-800 mb-4">Prêt à explorer les opportunités ?</h3>
            <p class="text-slate-600 mb-6">
              Découvrez les stages à l'étranger disponibles avec l'Université de Limoges
            </p>
            <button onClick={(e) => {
                  e.preventDefault()
                  route("/stages")
                }} class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Explorer les stages
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
