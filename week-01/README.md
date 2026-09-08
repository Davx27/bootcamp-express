# 🚀 Semana 01 — Procesador de Instrumentos Musicales

## 🎯 Objetivo

Construir una herramienta de línea de comandos (CLI) que lea el inventario de una tienda de instrumentos musicales desde un archivo JSON, lo procese aplicando filtros y transformaciones, y genere un reporte usando **Node.js + TypeScript + async/await**.

---

## 📋 Dominio: Tienda de Instrumentos Musicales

El recurso principal es `Instrument`, representado en `data/items.json`. Cada registro contiene:

| Campo | Descripción |
|-------|-------------|
| `id` | Identificador único del instrumento |
| `name` | Nombre o modelo |
| `brand` | Marca fabricante |
| `category` | Familia del instrumento |
| `price` | Precio de venta |
| `stock` | Unidades disponibles |
| `active` | Indica si se ofrece actualmente |

---

## ✅ Requisitos Funcionales

### 1. Leer datos desde un archivo JSON

La herramienta debe leer el archivo `data/items.json` usando `fs/promises`.

### 2. Mostrar un resumen del catálogo

- Total de ítems
- Ítems activos vs inactivos
- Precio promedio
- Ítem más caro y más barato

### 3. Filtrar por categoría

Aceptar un argumento de línea de comandos para filtrar por categoría:
```bash
pnpm start -- --category electronics
```

### 4. Generar reporte en un archivo de salida

Guardar el reporte en `output/report.json` usando `fs/promises.writeFile`.

### 5. Manejo de errores

- Si el archivo `items.json` no existe → mostrar error descriptivo y terminar con `process.exit(1)`
- Si la categoría no existe → mostrar aviso y listar las categorías disponibles

---

## 🛠️ Entregables

1. **Código funcional** que pase `pnpm build` sin errores TypeScript
2. **README.md actualizado** con tu dominio y descripción del recurso
3. **Screenshots o logs** de la herramienta ejecutándose con distintos argumentos
4. **`data/items.json`** adaptado a tu dominio (mínimo 10 registros)
5. **Reporte generado** en `output/report.json`

---

## ⏱️ Tiempo estimado: 2-3 horas

---

## 🧪 Cómo correr el proyecto

```bash
cd week-01
pnpm install
pnpm build
pnpm dev                              # todos los instrumentos
pnpm dev -- --category guitarras      # filtrar por categoría
```

El programa crea automáticamente `output/report.json` con la fecha de generación, el filtro aplicado, el resumen y los instrumentos seleccionados.

## 📊 Ejemplos de ejecución

Sin filtro:

```text
Total: 12
Activos: 10 | Inactivos: 2
Precio promedio: $739.16
Categorías: guitarras, bajos, baterías, teclados, vientos, cuerdas, amplificación, audio, accesorios
```

Con `--category guitarras`, el reporte contiene 2 instrumentos y muestra un precio promedio de `$1899.99`.

---

## 📊 Criterios de Evaluación

| Criterio | Peso |
|----------|------|
| Lee y parsea `items.json` correctamente | 20% |
| Calcula el resumen (total, promedio, extremos) | 20% |
| Filtra por categoría con `--category` | 20% |
| Escribe `output/report.json` correctamente | 20% |
| Manejo de errores (archivo no encontrado, categoría inexistente) | 10% |
| TypeScript estricto — `pnpm build` sin errores | 10% |

---

## 🔗 Recursos de Apoyo

- [Teoría: Módulos ESM](../../1-teoria/02-modulos-esm.md)
- [Teoría: async/await](../../1-teoria/03-async-await.md)
- [Ejercicio 01: Hello Node](../../2-practicas/ejercicio-01-hello-node/README.md)
- [Node.js fs/promises API](https://nodejs.org/docs/latest/api/fs.html#promises-api)
- [process.argv — Node.js docs](https://nodejs.org/docs/latest/api/process.html#processargv)
