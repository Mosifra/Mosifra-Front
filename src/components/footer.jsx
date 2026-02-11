import { t, subscribe } from "../i18n"
import { useEffect, useState } from "preact/hooks"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [, setVersion] = useState(0)

  useEffect(() => subscribe(() => setVersion(v => v + 1)), [])

  return (
     <footer class="py-4 px-4 bg-vert-mosifra text-white sticky bottom-0">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row justify-center items-center">
          <p class="text-beige-mosifra text-sm">{t("footer.copy", { year: currentYear }, `© ${currentYear} Mosifra - C.I.T.E.F. Tous droits réservés.`)}</p>
        </div>
      </div>
    </footer>
  )
}
