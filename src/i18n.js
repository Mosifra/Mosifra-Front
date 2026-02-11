/**
 * Minimal i18n helper
 * - loadLocale(locale): charge /languages/<locale>.json (public/)
 * - t(key, params?, fallback?): retourne la traduction (interpolation + pluriels simples)
 * - setLocale(locale): change et enregistre la locale
 * - getLocale(): récupère la locale courante
 * - subscribe(fn): notifications quand dictionnaire chargé
 */

let currentLocale = "fr";
let dict = {};
const subscribers = [];

/** Notify subscribers that translations changed */
function notify() {
  for (const s of subscribers) {
    try { s(currentLocale, dict); } catch (e) { /* ignore */ }
  }
}

/** Simple interpolation: remplace {name} par params.name */
function interpolate(str, params = {}) {
  if (!str || !params) return str;
  return Object.keys(params).reduce((acc, k) => {
    const re = new RegExp(`\\{${k}\\}`, "g");
    return acc.replace(re, String(params[k]));
  }, str);
}

/** Handle simple plural forms separated by '|' (singular|plural). Uses params.count */
function choosePlural(value, params = {}) {
  if (!value || typeof value !== "string") return value;
  if (!value.includes("|")) return value;
  const parts = value.split("|");
  const count = params && (params.count ?? params.nb ?? params.nombre);
  // French: singular for count === 0? often plural; choose singular only if count === 1
  const usePlural = typeof count === "number" ? count !== 1 : true;
  return usePlural ? (parts[1] ?? parts[0]) : (parts[0] ?? parts[1]);
}

/** Load a locale file from /languages/<locale>.json */
export async function loadLocale(locale = "fr") {
  currentLocale = locale;
  try {
    const res = await fetch(`/languages/${locale}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to fetch locale ${locale}: ${res.status}`);
    const json = await res.json();
    dict = json || {};
  } catch (err) {
    console.error("i18n: loadLocale error", err);
    dict = {};
  }
  notify();
  return dict;
}

/** Translate key with optional params and fallback */
export function t(key, params = null, fallback = null) {
  if (!key) return "";
  let value = dict[key];
  if (value === undefined) {
    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
      console.warn(`i18n: missing key "${key}" for locale "${currentLocale}"`);
    }
    value = fallback ?? key;
  }
  // plural
  value = choosePlural(value, params);
  // interpolation
  try {
    return interpolate(String(value), params ?? {});
  } catch (e) {
    return String(value);
  }
}

/** Change locale (persists in localStorage) */
export function setLocale(locale) {
  try { localStorage.setItem("locale", locale); } catch (e) {}
  return loadLocale(locale);
}

export function getLocale() {
  return currentLocale;
}

/** Subscribe to locale changes: fn(locale, dict). Returns unsubscribe function. */
export function subscribe(fn) {
  if (typeof fn !== "function") return () => {};
  subscribers.push(fn);
  // fire once with current state
  try { fn(currentLocale, dict); } catch (e) {}
  return () => {
    const i = subscribers.indexOf(fn);
    if (i >= 0) subscribers.splice(i, 1);
  };
}

/** Initialize i18n at app start. Tries localStorage -> navigator -> default */
export function initI18n(preferredLocale) {
  let locale = preferredLocale;
  try {
    locale = locale || localStorage.getItem("locale");
  } catch (e) { /* ignore */ }
  if (!locale) {
    const nav = typeof navigator !== "undefined" ? (navigator.language || navigator.userLanguage) : null;
    if (nav) locale = nav.split("-")[0];
  }
  locale = locale || currentLocale;
  return loadLocale(locale);
}