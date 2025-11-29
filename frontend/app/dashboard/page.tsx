export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* TODO: Implementar dashboard con faltantes al iniciar sesión */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Productos Faltantes</h2>
          <p className="text-gray-500">Lista de productos faltantes pendiente</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Ventas del Día</h2>
          <p className="text-gray-500">Resumen de ventas pendiente</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Estado de Caja</h2>
          <p className="text-gray-500">Estado de caja pendiente</p>
        </div>
      </div>
    </div>
  );
}

