// Datum-format
export function formatDate(date, locale = "sv-SE") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// Nummer / valuta-format
export function formatCurrency(value, locale = "sv-SE", currency = "SEK") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
