# Grano Colombiano

Catálogo de café en grano con panel de administración, construido con React 19,
Vite y React Router. Los datos se consumen de un proyecto de MockAPI.

## Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción
npm run lint     # oxlint
```

## Estructura

```
src/
├── constantes/     Valores fijos del dominio, rutas, endpoints y textos
├── utilidades/     Funciones puras sin dependencia de React
├── servicios/      Acceso a la API (una capa por recurso)
├── hooks/          Lógica de React reutilizable
├── componentes/
│   ├── admin/      Un directorio por entidad del panel
│   ├── autenticacion/
│   ├── catalogo/
│   ├── comunes/    Piezas de interfaz compartidas (campos, tablas, avisos)
│   ├── iconos/
│   └── layout/     Encabezado, pie de página y estructura general
└── paginas/        Un componente por ruta; solo conectan contexto y componentes
```

## Convenciones de nombres

El código está en **español**, salvo donde React o el ecosistema imponen el
inglés. Esas excepciones son deliberadas y están acotadas.

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes (archivo y función) | `PascalCase` en español | `TarjetaProducto.jsx` |
| Páginas | `Pagina<Sección>` | `PaginaCatalogo.jsx` |
| Hooks | `use` + nombre en español (`use` lo exige React) | `useRecursoApi.js` |
| Servicios | `<entidad>Servicio.js`, en singular | `productoServicio.js` |
| Constantes | `MAYUSCULAS_CON_GUION_BAJO` | `CATEGORIA_INICIO` |
| Funciones y variables | `camelCase` en español | `filtrarCategoriasVisibles` |
| Props de callback | `on` + verbo en español (`on` es convención de React) | `onSeleccionarCategoria` |
| Directorios | `minuscula` en singular por entidad | `componentes/admin/producto/` |

Dentro de cada entidad del panel se repite la misma tripleta:

- `Formulario<Entidad>.jsx` — alta y edición.
- `Tabla<Entidades>.jsx` — listado.
- `Gestion<Entidades>.jsx` — contenedor que une ambos con el servicio.

### Excepciones en inglés (y por qué)

1. **`information`** — el recurso de MockAPI se publica con ese nombre y el
   endpoint no es editable. Queda aislado en `constantes/api.js`; de la capa de
   servicios hacia arriba el recurso se llama `informacion` en todo el código.
2. **Clases CSS** — se mantienen en inglés (`product-card`, `btn-save`). No son
   una convención de React y traducirlas no aporta valor frente al riesgo.
3. **API de React y del enrutador** — `useState`, `useEffect`, `props`,
   `children`, `key`, `to`, `path`. Son parte de la plataforma.

### Orden de los `import`

Externo → `constantes` → `hooks` → `servicios` → `utilidades` → `componentes` →
módulos locales (`./`). Dentro de cada grupo, alfabético por ruta.

## Notas de arquitectura

- **`servicios/api.js`** expone `crearServicioRecurso(recurso)`, que fabrica el
  CRUD completo de un recurso REST. Cada servicio de entidad solo lo reexporta
  con nombres de negocio.
- **`hooks/useRecursoApi`** encapsula el ciclo `datos / cargando / recargar` de
  cada colección.
- **`hooks/useGestionRecurso`** concentra el flujo alta / edición / borrado del
  panel, incluidos los avisos al usuario.
- **`hooks/useFormulario`** unifica el estado de los formularios.
- **Reglas de negocio en los servicios.** Por ejemplo, "siempre debe quedar al
  menos un administrador" vive en `usuarioServicio` y se comunica lanzando
  `ErrorInvarianteAdministrador`, cuyo mensaje la interfaz muestra tal cual.
- **Autenticación sin backend.** MockAPI no tiene endpoint de login, así que
  las credenciales se comprueban en el cliente. Para no descargar la colección
  de usuarios completa (incluye la clave de cada cuenta en texto plano),
  `autenticarUsuario` y `existeCorreoRegistrado` piden el filtrado a la API
  (`GET /usuario?correo=...`) mediante `servicios/api.js → buscar`. Dos avisos
  sobre ese filtro: responde **404** cuando no hay coincidencias (se traduce a
  lista vacía) y compara por **coincidencia parcial y sin distinguir
  mayúsculas**, por lo que siempre hay que repetir la comparación exacta en el
  cliente. La clave nunca se manda como filtro: al ser coincidencia parcial,
  cualquier prefijo de la clave real —incluida la cadena vacía— daría positivo
  y sería un salto de autenticación. **Limitación que queda en pie:** la
  respuesta del correo consultado sigue trayendo la clave de esa cuenta;
  eliminarlo del todo exige un backend que valide del lado del servidor.
- **Carga de datos: pública vs. solo-administración.** `App.jsx` solo carga de
  forma anticipada `productos`, `categorias` e `informacion`, porque
  alimentan vistas públicas (catálogo, encabezado, pie de página). Los
  recursos que solo se ven en el panel — `usuarios`, `clientes`, `ordenes`,
  `estadosOrden` — se piden dentro de su propia página de administración
  (`paginas/admin/Pagina*.jsx`), nunca desde `App`. Esto importa sobre todo
  para `usuarios`: la respuesta de MockAPI incluye la clave de cada cuenta en
  texto plano, así que no debe llegar a la red hasta que una sesión de
  administrador entra a esa sección; `RutaAdmin` ya lo garantiza al proteger
  la ruta. El costo es que la primera vez que se entra a esas secciones se ve
  un "Cargando…" que antes no aparecía, porque los datos ya venían
  precargados desde el arranque de la aplicación.
