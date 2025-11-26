# Configuración Docker

## Variables de Entorno

Crear un archivo `.env` en el directorio `docker/` con las siguientes variables:

```env
# PostgreSQL Configuration
POSTGRES_USER=estanco_user
POSTGRES_PASSWORD=estanco_password
POSTGRES_DB=sistema_estanco

# MongoDB Configuration
MONGO_USER=estanco_user
MONGO_PASSWORD=estanco_password
MONGO_DB=sistema_estanco_logs

# Backend Configuration
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:3200

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:4200
```

## Uso

### Iniciar todos los servicios

```bash
docker-compose up -d
```

### Ver logs

```bash
docker-compose logs -f
```

### Detener servicios

```bash
docker-compose down
```

### Detener y eliminar volúmenes

```bash
docker-compose down -v
```

## Puertos

- Frontend: http://localhost:3200
- Backend API: http://localhost:4200
- PostgreSQL: localhost:5433
- MongoDB: localhost:27017

## Migraciones de Base de Datos

Después de iniciar los servicios, ejecutar las migraciones de Prisma:

```bash
cd ../backend
npm install
npx prisma migrate dev
```

