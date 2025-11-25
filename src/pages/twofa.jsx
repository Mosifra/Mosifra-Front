import { ArrowRight, Binary } from "lucide-preact";
import { useLocation } from "preact-iso";
import { useState } from "preact/hooks";

export function Twofa() {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState("");

  const transactionId = location.query.transaction_id;
  const rememberMe = location.query.remember_me;
  const userType = location.query.type;

  const remember = rememberMe === "true";

  const ttl = remember
    ? 30 * 24 * 3600
    : 30 * 60;      


  const handleSubmit = async (e) => {
    e.preventDefault();

    const connectionPayload = {code: code, transaction_id: transactionId, user_type: userType, remember_me: remember};
    try {
      const response = await fetch("http://localhost:8000/auth/twofa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(connectionPayload),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }

      const data = await response.json();
      console.log("Réponse API", data);

      if (data.jwt !== null) {
        document.cookie = `jwt=${data.jwt}; path=/; max-age=${ttl};`;

        window.dispatchEvent(new Event("userTypeUpdated"));

        location.route("/");
      } else {
        setErrorMessage("Code incorrect, veuillez réessayer.")
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-beige-mosifra to-white">
      <div class="flex items-center justify-center py-12 px-4">
        <div class="max-w-md w-full">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-vert-mosifra rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/images/logo_notext.svg" alt="Logo Mosifra" />
            </div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">
              Connexion à Mosifra
            </h1>
            <p class="text-slate-600">
              Veuillez saisir le code envoyé à l'adresse mail associée à votre compte
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <form onSubmit={handleSubmit} class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">
                  Code de vérification
                </label>
                <div class="relative">
                  <Binary class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    value={code}
                    onInput={(e) => setCode(e.target.value)}
                    placeholder="Votre code"
                    class="w-full pl-10 pr-4 py-3 border border-slate-200 text-vert-mosifra rounded-lg focus:border-vert-mosifra focus:outline-none focus:ring-2 focus:ring-vert-mosifra/20"
                    required
                  />
                </div>
              </div>
              <p class="text-red-600 text-sm mt-2 text-center">{errorMessage}</p>

              <button
                type="submit"
                class="w-full bg-beige-mosifra text-vert-mosifra py-3 rounded-lg hover:bg-vert-mosifra hover:text-white border border-vert-mosifra transition-all duration-300 transform font-medium flex items-center justify-center gap-2"
              >
                Valider
                <ArrowRight class="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
