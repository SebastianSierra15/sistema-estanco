# Reglas del proyecto (para Cursor AI)

- Toda nueva funcionalidad se desarrolla en una rama feature/nombre.
- Los cambios al backend (NestJS) deben mantener arquitectura modular.
- Toda interacción con PostgreSQL usa Prisma/TypeORM.
- MongoDB se usa exclusivamente para logs y auditorías.
- El frontend (Next.js) debe usar Server Actions y Tailwind.
- Cada PR requiere:
  - Resumen
  - Cambios realizados
  - Endpoints nuevos
  - Comandos para probar
