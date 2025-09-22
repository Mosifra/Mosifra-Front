import { useState } from "preact/hooks"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-preact"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("student")

  const handleSubmit = (e) => {
    e.preventDefault() 
    console.log("Connexion:", { email, password, userType })
  }

  return (
    <div class="min-h-screen bg-gradient-to-br from-beige-mosifra to-white">
      
      <div class="flex items-center justify-center py-12 px-4">
        <div class="max-w-md w-full"> 
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-vert-mosifra rounded-full flex items-center justify-center mx-auto mb-4">
             <img src="/images/logo_notext.svg"/> 
            </div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">Connexion à Mosifra</h1>
            <p class="text-slate-600">Accédez à votre espace de gestion de stages</p>
          </div>

 
          <div class="bg-white rounded-xl shadow-lg border border-slate-200 p-8"> 
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-3">Type de compte</label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  class={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    userType === "student"
                      ? "bg-vert-mosifra text-white border-vert-mosifra"
                      : "bg-white text-slate-600 border-slate-200 hover:border-vert-mosifra"
                  }`}
                >
                  Étudiant
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("company")}
                  class={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    userType === "company"
                      ? "bg-vert-mosifra text-white border-vert-mosifra"
                      : "bg-white text-slate-600 border-slate-200 hover:border-vert-mosifra"
                  }`}
                >
                  Entreprise
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("university")}
                  class={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    userType === "university"
                      ? "bg-vert-mosifra text-white border-vert-mosifra"
                      : "bg-white text-slate-600 border-slate-200 hover:border-vert-mosifra"
                  }`}
                >
                  Université
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} class="space-y-6"> 
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Adresse email</label>
                <div class="relative">
                  <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    class="w-full pl-10 pr-4 py-3 border border-slate-200 text-vert-mosifra rounded-lg focus:border-vert-mosifra focus:outline-none focus:ring-2 focus:ring-vert-mosifra/20"
                    required
                  />
                </div>
              </div> 
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
                <div class="relative">
                  <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    class="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg text-vert-mosifra focus:border-vert-mosifra focus:outline-none focus:ring-2 focus:ring-vert-mosifra/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff class="h-5 w-5" /> : <Eye class="h-5 w-5" />}
                  </button>
                </div>
              </div> 
              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-slate-300 text-vert-mosifra focus:ring-vert-mosifra" />
                  <span class="ml-2 text-sm text-slate-600">Se souvenir de moi</span>
                </label>
                <a href="#" class="text-sm text-vert-mosifra hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
 
              <button
                type="submit"
                class="w-full bg-beige-mosifra text-vert-mosifra py-3 rounded-lg hover:bg-vert-mosifra hover:text-white border-1 border-vert-mosifra  transition-colors font-medium flex items-center justify-center gap-2"
              >
                Se connecter
                <ArrowRight class="h-5 w-5" />
              </button>
            </form>

          </div>

          <div class="mt-8 text-center">
            <p class="text-sm text-slate-500">
              En vous connectant, vous acceptez nos{" "}
              <a href="#" class="text-vert-mosifra hover:underline">
                conditions d'utilisation
              </a>{" "}
              et notre{" "}
              <a href="#" class="text-vert-mosifra hover:underline">
                politique de confidentialité
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

