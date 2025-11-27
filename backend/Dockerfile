FROM node:20-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Copiamos paquetes primero
COPY package*.json ./
COPY prisma ./prisma/

# Instalamos dependencias dentro del contenedor
RUN npm install

# Generamos Prisma dentro del contenedor
RUN npx prisma generate

# Copiamos el resto
COPY . .

EXPOSE 4200
CMD ["npm", "run", "start:dev"]
