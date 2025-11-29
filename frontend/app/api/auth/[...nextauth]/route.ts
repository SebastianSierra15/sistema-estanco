import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  debug: true,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usuario: { label: "Usuario", type: "text" },
        contrasena: { label: "Contraseña", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              usuario: credentials.usuario,
              contrasena: credentials.contrasena,
            }
          );

          const data = res.data;

          if (!data?.access_token || !data?.usuario) return null;

          return {
            id: data.usuario.usuarioId,
            usuario: data.usuario.usuarioUsuario,
            rol: data.usuario.rol?.rolNombre,
            // 👉 ahora backend SÍ devuelve esto
            permisos: data.permisos ?? [],
            accessToken: data.access_token,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.usuario = user.usuario;
        token.rol = user.rol;
        // 👉 guardar permisos en el token JWT de NextAuth
        token.permisos = user.permisos ?? [];
      }
      return token;
    },

    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user = {
        usuario: token.usuario,
        rol: token.rol,
        // 👉 enviar permisos a la sesión
        permisos: token.permisos ?? [],
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
