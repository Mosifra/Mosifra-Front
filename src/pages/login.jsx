import { getBaseUrl } from "../utils";
import { ArrowRight, Eye, EyeOff, Lock, UserRound } from "lucide-preact";
import { useLocation } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { t, subscribe } from "../i18n";

export function LoginPage() {
  const location = useLocation();
  const [, setVersion] = useState(0); // force rerender on locale change
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const unsub = subscribe(() => setVersion((v) => v + 1));
    return unsub;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const connectionPayload = {
      login,
      password,
      remember_me: rememberMe,
      user_type: userType,
    };

    try {
      const response = await fetch(`${getBaseUrl()}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(connectionPayload),
      });

      if (!response.ok) {
        // Try to parse error message from API
        let errText = null;
        try {
          const errJson = await response.json();
          errText = errJson?.message || null;
        } catch (e) {
          /* ignore */
        }
        throw new Error(errText || "request_error");
      }

      const data = await response.json();

      if (data.transaction_id) {
        location.route(
          `/twofa?type=${encodeURIComponent(
            userType
          )}&transaction_id=${encodeURIComponent(
            data.transaction_id
          )}&remember_me=${encodeURIComponent(rememberMe)}`
        );
      } else {
        setErrorMessage(t("login.invalid", null, "Mot de passe incorrect."));
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        t(
          "errors.network",
          null,
          "Impossible de se connecter. Vérifiez vos identifiants ou réessayez plus tard."
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-beige-mosifra">
      <div class="flex items-center justify-center py-12 px-4">
        <div class="max-w-md w-full">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-vert-mosifra rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/images/logo_notext.svg" alt={t("app.name", null, "Mosifra")} />
            </div>
            <h1 class="text-3xl font-bold text-slate-800 mb-2">
              {t("login.title", null, "Connexion à Mosifra")}
            </h1>
            <p class="text-slate-600">
              {t("login.subtitle", null, "Accédez à votre espace de gestion de stages")}
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-3">
                {t("login.account_type", null, "Type de compte")}
              </label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUserType("student")}
                  class={`px-3 py-2 text-sm rounded-lg border transition-all duration-300 transform ${userType === "student"
                    ? "bg-vert-mosifra text-white border-vert-mosifra"
                    : "bg-white text-slate-600 border-slate-200 hover:border-vert-mosifra"
                    }`}
                >
                  {t("userTypes.student", null, "Étudiant")}
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("company")}
                  class={`px-3 py-2 text-sm rounded-lg border transition-all duration-300 transform ${userType === "company"
                    ? "bg-vert-mosifra text-white border-vert-mosifra"
                    : "bg-white text-slate-600 border-slate-200 hover:border-vert-mosifra"
                    }`}
                >
                  {t("userTypes.company", null, "Entreprise")}
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("university")}
                  class={`px-3 py-2 text-sm rounded-lg border transition-all duration-300 transform ${userType === "university"
                    ? "bg-vert-mosifra text-white border-vert-mosifra"
                    : "bg-white text-slate-600 border-slate-200 hover:border-vert-mosifra"
                    }`}
                >
                  {t("userTypes.university", null, "Université")}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">
                  {t("login.username_label", null, "Nom d'utilisateur")}
                </label>
                <div class="relative">
                  <UserRound class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    value={login}
                    onInput={(e) => setLogin(e.target.value)}
                    placeholder={t("placeholders.username", null, "dupont1")}
                    class="w-full pl-10 pr-4 py-3 border border-slate-200 text-vert-mosifra rounded-lg focus:border-vert-mosifra focus:outline-none focus:ring-2 focus:ring-vert-mosifra/20"
                    required
                    aria-label={t("login.username", null, "Nom d'utilisateur ou e-mail")}
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">
                  {t("login.password_label", null, "Mot de passe")}
                </label>
                <div class="relative">
                  <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    class="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg text-vert-mosifra focus:border-vert-mosifra focus:outline-none focus:ring-2 focus:ring-vert-mosifra/20"
                    required
                    aria-label={t("login.password", null, "Mot de passe")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={
                      showPassword
                        ? t("buttons.hide", null, "Cacher le mot de passe")
                        : t("buttons.show", null, "Afficher le mot de passe")
                    }
                  >
                    {showPassword ? <EyeOff class="h-5 w-5" /> : <Eye class="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.currentTarget.checked)}
                    class="rounded border-slate-300 text-vert-mosifra focus:ring-vert-mosifra"
                  />
                  <span class="ml-2 text-sm text-slate-600">
                    {t("login.remember", null, "Se souvenir de moi")}
                  </span>
                </label>

                <a
                  href="/forgot-password"
                  class="text-sm text-vert-mosifra hover:underline"
                >
                  {t("login.forgot", null, "Mot de passe oublié ?")}
                </a>
              </div>

              {errorMessage && (
                <p class="text-red-600 text-sm mt-2 text-center">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                class={`w-full py-3 rounded-lg border transition-all duration-300 transform font-medium flex items-center justify-center gap-2
                  ${isLoading
                    ? "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
                    : "bg-beige-mosifra text-vert-mosifra hover:bg-vert-mosifra hover:text-white border-vert-mosifra"
                  }`}
              >
                {isLoading ? t("login.loading", null, "Veuillez patienter...") : t("login.submit", null, "Se connecter")}
                {!isLoading && <ArrowRight class="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

