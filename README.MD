# 🎸 API REST — Tienda de Instrumentos Musicales
**Bootcamp ExpressJS — Semana 02**

API RESTful desarrollada con **Node.js 22+**, **Express 5** y **TypeScript** para la gestión del inventario de una tienda de instrumentos musicales.

---

## 📋 Descripción del Dominio

El proyecto gestiona la entidad principal de **Instrumentos Musicales** dentro del inventario de la tienda, permitiendo controlar las ventas y alquileres registrados para cada ítem.

### Campos del Recurso (`Item`)
- **`id`** (`number`): Identificador único autoincremental.
- **`name`** (`string`): Nombre o modelo del instrumento (ej: *"Guitarra Eléctrica Stratocaster"*).
- **`brand`** (`string`): Marca del instrumento (ej: *"Fender"*).
- **`salesCount`** (`number`): Unidades vendidas.
- **`rentalsCount`** (`number`): Veces que ha sido alquilado.

---

## 📐 Decisiones de Diseño y Arquitectura

1. **Separación de Capas**:
   - `types.ts`: Definición de interfaces e inferencias de tipos (`Item`, `CreateItemDto`, `UpdateItemDto`).
   - `store.ts`: Capa de persistencia en memoria (mantiene estado durante la ejecución).
   - `routes/items.routes.ts`: Definición de enrutamiento y lógica de los 5 endpoints CRUD.
   - `app.ts`: Configuración de la aplicación Express y registro ordenado de middlewares.
   - `server.ts`: Punto de entrada con implementación de **Graceful Shutdown**.

2. **Orden Estricto de Middlewares**:
   - `express.json()` para parseo del cuerpo de las peticiones.
   - **Logger personalizado** que registra método, URL, código de respuesta y tiempo de ejecución.
   - Rutas principales (`/api/v1/items`) y de salud (`/health`).
   - **Handler 404** para rutas no encontradas (`Route not found`).
   - **Global Error Handler** de 4 parámetros para capturar excepciones no controladas.

3. **Graceful Shutdown**:
   - Captura de señales `SIGINT` (Ctrl+C) y `SIGTERM` para garantizar el cierre seguro del servidor HTTP antes de finalizar el proceso.

---

## 🚀 Instalación y Ejecución

1. **Garantizar la versión de pnpm**:
   ```bash
   corepack enable
   corepack prepare pnpm@10.34.5 --activate
Instalar dependencias:Bashpnpm install
Ejecutar en modo desarrollo:Bashpnpm dev
🔗 Endpoints de la APIMétodoRutaDescripciónStatus CodeGET/healthHealth Check del servidor200GET/api/v1/itemsListar todos los instrumentos200GET/api/v1/items/:idObtener instrumento por ID200 / 404POST/api/v1/itemsCrear un nuevo instrumento201 / 400PUT/api/v1/items/:idActualizar un instrumento200 / 404DELETE/api/v1/items/:idEliminar un instrumento204 / 404🧪 Ejemplos de Pruebas (cURL)Bash# Listar todos
curl http://localhost:3000/api/v1/items

# Obtener por ID
curl http://localhost:3000/api/v1/items/1

# Crear nuevo instrumento
curl -X POST http://localhost:3000/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bajo Eléctrico Jazz Bass",
    "brand": "Fender",
    "salesCount": 0,
    "rentalsCount": 0
  }'

# Actualizar instrumento
curl -X PUT http://localhost:3000/api/v1/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Guitarra Eléctrica Stratocaster Custom",
    "salesCount": 15
  }'

# Eliminar instrumento
curl -i -X DELETE http://localhost:3000/api/v1/items/2