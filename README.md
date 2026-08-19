# Playwright E2E Testing - Practice Software Testing

Suite completa de testing E2E contra la aplicación Practice Software Testing. Incluye tests de ecommerce, accessibility, visual regression, API testing y mobile.

## Características

- **E2E Testing**: Flujo completo de compra
- **Accessibility Testing**: Validación WCAG 2.1 con axe-core
- **Visual Regression Testing**: Screenshots comparativos
- **API Testing**: Validación de endpoints
- **Mobile Testing**: Responsive design testing
- **Page Object Model**: Arquitectura mantenible

## Requisitos

- Node.js 20+
- npm

## Instalación

```bash
npm install
npx playwright install
```

## Ejecución

```bash
# Ejecutar todos los tests
npm test

# Ejecutar en modo headed
npm run test:headed

# Ejecutar solo en Chrome
npm run test:chrome

# Ejecutar solo en Firefox
npm run test:firefox

# Ejecutar tests mobile
npm run test:mobile

# Ejecutar tests de accessibility
npm run test:accessibility

# Ejecutar tests visuales
npm run test:visual

# Ejecutar tests de API
npm run test:api

# Ver reporte
npm run report
```

## Estructura

```
src/
├── pages/
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── LoginPage.ts
├── tests/
│   ├── ecommerce.spec.ts
│   ├── accessibility.spec.ts
│   ├── visual.spec.ts
│   ├── api.spec.ts
│   └── mobile.spec.ts
└── utils/
    └── accessibility.ts
```

## Endpoints probados

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/products` | GET | Listar productos |
| `/api/products/:id` | GET | Obtener producto |
| `/api/categories` | GET | Listar categorías |
| `/api/cart` | POST | Agregar al carrito |

## Tags

- `@accessibility`: Tests de accesibilidad
- `@visual`: Tests de regresión visual
- `@api`: Tests de API
