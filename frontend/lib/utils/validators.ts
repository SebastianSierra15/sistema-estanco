export function isEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export function validateRequired(value: any, name = "Campo"): string | null {
  if (value === undefined || value === null || value === "")
    return `${name} es obligatorio`;
  return null;
}

export function validateMinLength(
  value: string,
  length: number,
  name = "Campo"
) {
  if (value.length < length)
    return `${name} debe tener al menos ${length} caracteres`;
  return null;
}
