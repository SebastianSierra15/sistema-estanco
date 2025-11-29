/**
 * Obtiene variables de entorno de manera segura
 */

export function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }

  return value;
}

export const ENV = {
  API_URL: getEnv("NEXT_PUBLIC_API_URL"),
  NEXTAUTH_URL: getEnv("NEXTAUTH_URL"),
};
