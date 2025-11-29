declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      usuario: string;
      rol: string;
      permisos: string[];
    };
  }

  interface User {
    accessToken: string;
    usuario: string;
    rol: string;
    permisos: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    usuario: string;
    rol: string;
    permisos: string[];
  }
}
