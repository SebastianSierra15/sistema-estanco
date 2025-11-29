export function formatCurrency(value: number, currency: string = "USD") {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("es-ES").format(num);
}
