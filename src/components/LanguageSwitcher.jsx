import { h } from "preact";
import { useState } from "preact/hooks";
import { setLocale, getLocale } from "../i18n";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState(getLocale() || "fr");
  const [showDropdown, setShowDropdown] = useState(false);

  function onChange(newLang) {
    setLang(newLang);
    setLocale(newLang);
    setShowDropdown(false);
  }

  const flags = {
    fr: "🇫🇷",
    en: "🇬🇧",
  };

  const codes = {
    fr: "FR",
    en: "EN",
  };

  return (
    <div class="relative inline-block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        class="px-4 py-2 bg-beige-mosifra rounded-full text-vert-mosifra border-1 border-vert-mosifra transition-colors duration-300 hover:bg-vert-mosifra hover:text-white font-medium flex items-center gap-2"
        aria-label="Sélectionner la langue"
      >
        <span>{flags[lang]}</span>
        <span>{codes[lang]}</span>
      </button>

      {showDropdown && (
        <div class="absolute right-0 mt-2 bg-white border border-vert-mosifra rounded-lg shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => onChange("fr")}
            class={`block w-full text-left px-4 py-2 transition-colors ${
              lang === "fr"
                ? "bg-vert-mosifra text-white font-semibold"
                : "bg-beige-mosifra text-vert-mosifra hover:bg-vert-mosifra hover:text-white"
            }`}
          >
            🇫🇷 Français
          </button>
          <button
            onClick={() => onChange("en")}
            class={`block w-full text-left px-4 py-2 transition-colors ${
              lang === "en"
                ? "bg-vert-mosifra text-white font-semibold"
                : "bg-beige-mosifra text-vert-mosifra hover:bg-vert-mosifra hover:text-white"
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      )}
    </div>
  );
}