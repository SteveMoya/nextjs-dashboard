# Plan: Completar el CRUD del Dashboard (Clientes) + Funcionalidades

> **Para Hermes:** usar la skill `subagent-driven-development` para ejecutar este plan tarea por tarea al ser aprobado.

**Goal:** Completar el CRUD de administración del dashboard — crear/editar/borrar **clientes** — y añadir las funcionalidades faltantes (búsqueda y paginación de clientes, robustez `error`/`not-found`), arreglando el bug de la página de clientes. Todo con el patrón ya existente de **facturas**.

**Arquitectura:** App Router + Server Components. Los `forms` son client components con `useFormState`/`useFormStatus`; las mutaciones son Server Actions Zod en `app/lib/actions.ts`; los datos vienen de `@vercel/postgres` vía `app/lib/data.ts`.

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind, TypeScript, zod, @vercel/postgres, NextAuth v5.

---

## Contexto actual (verificado en el repo)

- **Facturas:** CRUD completo ✅ (crear, editar, borrar, buscar + paginar + `error.tsx`/`not-found.tsx`). Es el **patrón a replicar**.
- **Clientes — LO QUE FALTA:**
  - `app/ui/customers/buttons.tsx` ya define `CreateCustomer` (→ `/dashboard/customers/create`), `UpdateCustomer` (→ `/dashboard/customers/[id]/edit`) y `DeleteCustomer`; las rutas create/edit **no existen** → 404.
  - `deleteCustomer` existe; **no** existen `createCustomer` ni `updateCustomer`.
  - `app/ui/customers/table.tsx` **no tiene columna de acciones** (solo Name/Email/Invoices/Pending/Paid) ni botón `Create` en el header.
  - **Bug:** `app/dashboard/customers/page.tsx` hace `const customers = await fetchAllCustomers()` a **nivel de módulo** (top-level await con DB, sin `noStore`) → corre en build/import y es frágil/obsoleto. Debe ser un componente `async` que llame el fetch dentro.
  - El `<Search>` de clientes está renderizado pero **no hace nada** (no hay query ni paginación conectadas).
  - `data.ts`: existen `fetchCustomers`, `fetchAllCustomers`, `fetchFilteredCustomers`. **Falta** `fetchCustomerById` y `fetchCustomersPages`.
- **Dashboard (overview):** read-only (cards, revenue chart, latest invoices) — correcto; sin CRUD directo.

## Enfoque

Completar clientes siguiendo 1:1 el patrón de facturas (form + server action + ruta + paginación + error/not-found). Añadir búsqueda/paginación de clientes reutilizando la infraestructura de facturas. Imagen de cliente: si el form no trae `image_url`, usar un avatar por defecto de Vercel (`https://vercel.com/api/ui/avatars?seed=<name>`) — no requiere upload.

---

## FASE A — CRUD de clientes completo

### Task A1: Arreglar `app/dashboard/customers/page.tsx` (bug de await a nivel de módulo)
- **Files:** `app/dashboard/customers/page.tsx`
- Convertir a componente `async` que llama el fetch **dentro** (o a una función con `noStore`). Añadir `<CreateCustomer />` en el header y mantiene `<CustomersTable customers={...} />`.
- Eliminar el `const customers = await ...` a nivel de módulo.

### Task A2: Columna de acciones en la tabla de clientes
- **Files:** `app/ui/customers/table.tsx`
- Añadir columna "Actions" (desktop) y un bloque de acciones (mobile) por fila con `UpdateCustomer` (lápiz) y `DeleteCustomer` (papelera). Header con botón `CreateCustomer`.

### Task A3: `fetchCustomerById` + `fetchCustomersPages` en data
- **Files:** `app/lib/data.ts`
- `fetchCustomerById(id): Promise<Customer>` (para el edit form — validar "Customer not found").
- `fetchCustomersPages(query): Promise<number>` (total de páginas, patrón `fetchInvoicesPages`).

### Task A4: Server Actions `createCustomer` / `updateCustomer`
- **Files:** `app/lib/actions.ts`
- Zod schema (name min 1, email valid, image_url opcional). Manejar **email duplicado** (UNIQUE) devolviendo error en el form. `revalidatePath('/dashboard/customers')` + `redirect`.
- Mantener `deleteCustomer` (ya existe).

### Task A5: Página + form de CREAR cliente
- **Files crea:** `app/dashboard/customers/create/page.tsx`, `app/ui/customers/create-form.tsx`
- Patrón `app/ui/invoices/create-form.tsx` + `useFormState(createCustomer, {message:null,errors:{}})`.
- Campos: Nombre, Email, URL de imagen (opcional). Navegación con breadcrumbs (reusar `app/ui/invoices/breadcrumbs.tsx`).

### Task A6: Página + form de EDITAR cliente
- **Files crea:** `app/dashboard/customers/[id]/edit/page.tsx`, `app/ui/customers/edit-form.tsx`
- `fetchCustomerById(id)` + `useFormState(updateCustomer, ...)`. **not-found** si el id no existe.

### Task A7: Robustez `error.tsx` / `not-found.tsx`
- **Files crea:** `app/dashboard/customers/error.tsx`, `app/dashboard/customers/not-found.tsx`, `app/dashboard/customers/[id]/edit/not-found.tsx`

---

## FASE B — Funcionalidades que faltan (buscar + paginar clientes)

### Task B1: Conectar query y paginación en la página de clientes
- **Files:** `app/dashboard/customers/page.tsx`
- Leer `searchParams` (`query`, `page`), usar `fetchFilteredCustomers(query, page)` + `fetchCustomersPages(query)`.

### Task B2: Paginación en la tabla
- **Files:** `app/ui/customers/table.tsx` (+ posible `app/ui/customers/pagination.tsx` integrando el patrón de `app/ui/invoices/pagination.tsx`).
- Render `Pagination` abajo de la tabla.

### Task B3: Hook del `<Search>`
- **Files:** `app/ui/customers/table.tsx` / página
- El `Search` ya recibe placeholder; conectarlo con `searchParams` + `usePathname/useRouter/useSearchParams` (patrón facturas) para filtrar de verdad.

---

## FASE C — Calidad y validación

### Task C1: Gates verde
- `npm run lint`, `npm run typecheck`, `npm run build` (con Postgres seed) → 0 issues. (En local del sandbox: `tsc --noEmit` y `eslint`; el build con DB vía CI/entorno real.)
- Validar con `node_modules/.bin/tsc --noEmit` y `eslint` sobre los archivos tocados.

### Task C2 (opcional): Tests unitarios
- Vitest + pruebas de validación de las acciones Zod (`createCustomer`/`updateCustomer`).

---

## Riesgos y decisiones abiertas

- **Imagen de clientes:** el form acepta URL opcional; default avatar por seed. No hay upload de archivos (fuera de alcance).
- **Email único:** duplicado devuelve error amigable en el form (requiere manejo explícito del constraint UNIQUE).
- **Dashboard overview:** se deja read-only (es correcto). Si quieres filtros por rango de fechas en `revenue-chart` (opcional), sería una Fase D adicional.
- **Bug top-level await:** corregirlo en A1 para que `customers` no se rompa en build.
- **CI/branch:** el workflow de CI aún no está pusheado (limitación de scope `workflow` del token).

## Archivos que cambiarán (resumen)
- `app/dashboard/customers/page.tsx` (bug + header + paginación)
- `app/ui/customers/table.tsx` (columna de acciones + paginación)
- `app/lib/data.ts` (fetchCustomerById, fetchCustomersPages)
- `app/lib/actions.ts` (createCustomer, updateCustomer)
- Nuevos: `app/dashboard/customers/create/page.tsx`, `[id]/edit/page.tsx`, `error.tsx`, `not-found.tsx`, `[id]/edit/not-found.tsx`, `app/ui/customers/create-form.tsx`, `edit-form.tsx`, `pagination.tsx`

## Verificación final
1. `npm run lint` y `npm run typecheck` → 0.
2. Navegar (con DB): crear cliente → aparece en la tabla; editar → se refleja; borrar → desaparece; buscar/paginar funciona; `error/not-found` se muestran en fallos.
3. `npm run build` con seed → éxito.