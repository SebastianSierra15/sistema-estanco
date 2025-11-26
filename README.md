# Sistema de Gestión - Estanco

Sistema web para el inventario, ventas y control de reservas de canchas de tejo y mesas de billar.

## 🏗️ Arquitectura

- **Backend**: NestJS 11.x + TypeScript + Prisma ORM
- **Frontend**: Next.js 15 (App Router) + TypeScript + TailwindCSS + shadcn/ui
- **Base de Datos**: PostgreSQL 15 (transaccional) + MongoDB 7 (logs)
- **Infraestructura**: Docker Compose

## 📁 Estructura del Proyecto

```
sistema-estanco/
├── backend/          # API NestJS
├── frontend/         # Next.js App
├── prisma/           # Schema Prisma (MER)
├── docker/           # Docker Compose y configuraciones
└── docs/             # Documentación
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker y Docker Compose instalados
- Node.js 20.x (para desarrollo local)

### Instalación con Docker

1. Copiar archivo de entorno:
```bash
cp docker/.env.example docker/.env
```

2. Iniciar servicios:
```bash
cd docker
docker-compose up -d
```

3. Ejecutar migraciones de Prisma:
```bash
cd ../backend
npm install
npx prisma migrate dev
```

### Desarrollo Local

#### Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con las credenciales correctas
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 📊 Base de Datos

El modelo de datos está organizado en schemas de PostgreSQL:

- **auth**: Usuarios, roles, permisos
- **core**: Auditoría
- **mesas**: Mesas, tipos, tarifas, intervalos, usos
- **inventario**: Productos, categorías, subcategorías, movimientos
- **ventas**: Ventas, detalles, métodos de pago
- **public**: Caja

MongoDB se utiliza exclusivamente para logs y auditoría extendida.

## 🔑 Variables de Entorno

Ver archivos `.env.example` en cada directorio para las variables necesarias.

## 📝 Notas

- Esta es la arquitectura base sin lógica de negocio implementada
- Los módulos del backend están vacíos, listos para implementación
- Las rutas del frontend están creadas como esqueletos
- El schema Prisma refleja exactamente el MER del documento

## 📚 Documentación

Ver `/docs/documentacion/Documentación.md` para la documentación completa del sistema.

## 🌱 Github y versionado

| Rama        | Propósito                              |
| ----------- | -------------------------------------- |
| `main`      | Código estable y listo para producción |
| `develop`   | Integración continua del desarrollo    |
| `feature/*` | Nuevas funcionalidades                 |
| `bugfix/*`  | Correcciones de errores                |
| `hotfix/*`  | Correcciones urgentes en `main`        |
| `release/*` | Preparación de versiones               |

