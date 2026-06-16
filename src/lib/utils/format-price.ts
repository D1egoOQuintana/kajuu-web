export function formatPriceARS(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price).replace(/^/, "$");
}
