import { h } from "preact";
import { useState } from "preact/hooks";
import { setLocale, getLocale } from "../i18n";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState(getLocale() || "fr");
  function onChange(e) {
    const l = e.target.value;
    setLang(l);
    setLocale(l);
  }
  return (
    <select value={lang} onChange={onChange} aria-label="Langue">
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
}