# IOL Currency Converter

## Descripción

Calculadora de cambio de divisas construida como challenge técnico frontend para IOL. La aplicación permite a los usuarios convertir entre diferentes monedas utilizando tasas de cambio en tiempo real obtenidas de la API de VATComply.

La aplicación demuestra decisiones arquitectónicas intentionales, separación de responsabilidades, manejo robusto de entrada de datos y buenas prácticas de testing.

## Funcionalidades principales

- **Conversión en tiempo real**: Ingresa un monto y selecciona las monedas de origen y destino. La conversión se calcula localmente de forma inmediata.
- **Valores por defecto claros**: En la primera carga, la app muestra 1.00 USD convertido a EUR.
- **Intercambio de divisas**: Botón para intercambiar rápidamente las monedas de origen y destino.
- **Símbolo de moneda**: Muestra el símbolo de la moneda seleccionada como prefijo en el campo de entrada.
- **Validación de entrada robusta**: Los caracteres inválidos se sanitizan silenciosamente. No se permiten valores negativos.
- **Manejo de estados**: Indicadores visuales claros para loading, error y éxito. Botón de reintento cuando la API falla.
- **Timestamp de actualización**: Muestra la fecha y hora del último fetch exitoso de tasas.
- **Diseño responsive**: La UI se adapta a dispositivos móviles, tabletas y desktop.

## Stack técnico

- **React 18** - Interfaz de usuario
- **TypeScript** - Tipado estático y seguridad en refactoring
- **Vite** - Build tool y dev server
- **Ant Design** - Componentes UI base
- **SCSS** - Estilos, layout y comportamiento responsive
- **pnpm** - Gestor de paquetes
- **Vitest + React Testing Library** - Testing unitario e integración
- **Fetch API** - Comunicación con API externa

## Instalación y ejecución

### Requisitos previos

- Node.js 16+ 
- pnpm 8+

### Pasos

```bash
# Clonar o descargar el repositorio
cd challenge-IOL

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo (abre http://localhost:5173)
pnpm dev

# Ejecutar tests en modo watch
pnpm test

# Ejecutar tests una sola vez (CI mode)
pnpm test -- --run

# Compilar para producción
pnpm build

# Previsualizar build de producción localmente
pnpm preview
```

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Inicia dev server con hot reload |
| `pnpm build` | Compila la app para producción en `dist/` |
| `pnpm preview` | Previsualiza la build en local |
| `pnpm test` | Ejecuta tests en modo watch |
| `pnpm test -- --run` | Ejecuta tests una sola vez (CI mode) |
| `pnpm lint` | Valida con ESLint |

## Enfoque de desarrollo: SDD (Spec Driven Development)

Este proyecto utilizó una metodología **Spec Driven Development** ligera:

1. **Especificación de producto** (`docs/PRODUCT_SPEC.md`): Requisitos funcionales, criterios de aceptación y comportamientos esperados definidos antes de la implementación.

2. **Especificación técnica** (`docs/TECH_SPEC.md`): Arquitectura, estructura de componentes, manejo de estado y decisiones técnicas documentadas.

3. **Decisiones** (`docs/DECISIONS.md`): Justificación de cada decisión arquitectónica, alternativas consideradas y trade-offs.

4. **Desglose de tareas** (`docs/TASKS.md`): Tareas atómicas derivadas del spec para facilitar seguimiento y validación incremental.

5. **QA manual** (`docs/MANUAL_QA.md`): Checklist de validación funcional para testing manual y UI.

**Beneficio**: Este enfoque mantuvo el scope claro, evitó overengineering y permitió validar decisiones tempranamente.

## Uso de herramientas de IA

Las herramientas de IA se utilizaron como **acelerador de desarrollo** en:

- **Planificación y desglose de tareas**: Estructuración de specs y breaking down de requisitos.
- **Refinamiento de prompts**: Definición clara de requisitos antes de la implementación.
- **Brainstorming UX**: Generación de ideas sobre layout, componentes y comportamientos.
- **Creación de checklist de QA**: Identificación de casos de prueba y edge cases.
- **Generación de código repetitivo**: Scaffolding inicial y funciones utilitarias.

**Importante**: Las herramientas de IA no reemplazaron la **propiedad técnica**. Todas las decisiones sobre arquitectura, comportamiento de producto, UX y scope fueron revisadas y aprobadas manualmente.

## Decisiones técnicas y trade-offs

### Vite como build tool

**Qué se decidió:**  
Usar Vite en lugar de Create React App o webpack.

**Por qué sí:**  
Vite ofrece dev server ultrarápido con HMR nativo, build optimizado, y es la herramienta moderna estándar en React. Tiene excelente soporte para TypeScript y SCSS. La curva de aprendizaje es menor que webpack.

**Por qué no:**  
- Create React App está deprecated y recomienda migraciones.
- webpack requiere configuración manual compleja para dev experience comparable.

**Trade-off:**  
Vite tiene menos documentación y plugins que webpack. En proyectos empresariales masivos, webpack ofrece más flexibilidad, pero aquí la simplicidad de Vite es una ventaja.

---

### Fetch API nativa vs Axios

**Qué se decidió:**  
Usar Fetch API nativa con promesas básicas en lugar de Axios.

**Por qué sí:**  
Fetch API está disponible en todos los navegadores modernos sin dependencias adicionales. Para este caso de uso (requests simples GET), Fetch es suficiente y más ligero.

**Por qué no:**  
- Axios agrega ~13KB gzipped de dependencia innecesaria.
- React Query / SWR añadirían complejidad innecesaria para una sola fuente de datos externa.

**Trade-off:**  
Fetch requiere manejo manual de errores y retry. En aplicaciones con múltiples fuentes de datos complejas, Axios o React Query serían más prácticos.

---

### Estado local vs Redux / Context

**Qué se decidió:**  
Mantener el estado de la moneda y monto dentro del componente `CurrencyConverter` usando `useState` local.

**Por qué sí:**  
El estado es simple, no se comparte entre múltiples ramas del árbol. Redux y Context agregarían overhead innecesario. El estado local es más fácil de entender, testear y refactorizar.

**Por qué no:**  
- Redux es overkill para un estado simple y centralizado.
- Context API introducería un provider wrapper innecesario y riesgo de re-renders globales.

**Trade-off:**  
Si el estado fuera compartido entre múltiples pantallas o la lógica fuera muy compleja, estado global sería justificado. Acá no lo es.

---

### `type="text"` con `inputMode="decimal"` vs `type="number"`

**Qué se decidió:**  
Usar `<input type="text" inputMode="decimal" />` en lugar de `type="number"`.

**Por qué sí:**  
- `type="number"` produce comportamiento inconsistente entre navegadores en móvil (algunos no permiten decimales, otros tienen spinner).
- `type="text"` + `inputMode="decimal"` muestra el teclado numérico correcto en móvil pero permite validación custom y manejo de edge cases.
- Permite sanitización custom silenciosa de caracteres inválidos.

**Por qué no:**  
- `type="number"` es más semántico pero rompe UX en móvil.

**Trade-off:**  
Requiere sanitización manual en JavaScript. Para casos simples, `type="number"` sería más fácil, pero acá UX mobile es prioritaria.

---

### Sanitización silenciosa vs validación visual

**Qué se decidió:**  
Sanitizar caracteres inválidos silenciosamente sin mostrar error visual.

**Por qué sí:**  
La experiencia es más fluida. Si el usuario pega `"1.50abc"`, la app muestra `"1.50"` sin fricciones. Menos mensajes de error = menos cognitivo.

**Por qué no:**  
Un sistema estricto que rechace input podría forzar al usuario a entender límites exactos. Pero esto es fricción innecesaria para una app de conversión simple.

**Trade-off:**  
El usuario puede no saber exactamente qué caracteres no fueron permitidos. Para formas de registro críticas, validación visual sería mejor.

---

### Fetch de tasas solo al cambiar moneda origen vs auto-refresh

**Qué se decidió:**  
Fetch de tasas solo cuando el usuario cambia la moneda de origen. Sin auto-refresh.

**Por qué sí:**  
Reduce requests a la API. Para un uso típico, las tasas no cambian lo suficientemente rápido como para justificar polling. El usuario que necesita tasas más frescas puede hacer swap manual.

**Por qué no:**  
Auto-refresh cada X segundos proporcionaría tasas más actualizadas pero causaría tráfico innecesario y batería en móviles.

**Trade-off:**  
Las tasas pueden estar ligeramente desactualizadas después de varios minutos de inactividad. Esto es aceptable para una demo.

---

### AppLayout separado de CurrencyConverter

**Qué se decidió:**  
Separar layout de página (hero, fondo, padding) de la lógica de conversión en componentes separados.

**Por qué sí:**  
Separación de responsabilidades. Si el layout cambia o se reutiliza, no afecta la lógica de conversión. Más fácil de testear y refactorizar.

**Por qué no:**  
Para una app de una sola pantalla, esto podría parecer overengineering. Pero demuestra arquitectura escalable.

**Trade-off:**  
Una capa de indirección más. Para una demo, podría estar en un solo componente.

---

### TypeScript vs JavaScript

**Qué se decidió:**  
Usar TypeScript en lugar de JavaScript puro.

**Por qué sí:**  
Typos se detectan tempranamente. Refactoring es más seguro. Contratos de funciones son explícitos. Para aplicaciones que van a crecer, TypeScript vale la pena.

**Por qué no:**  
Agrega complejidad inicial y tiempo de compilación.

**Trade-off:**  
Setup inicial más lento. Para un script de 100 líneas, innecesario. Para una app escalable, imprescindible.

---

### SCSS vs CSS-in-JS

**Qué se decidió:**  
Usar SCSS modular (archivos `.scss` por componente) en lugar de styled-components o CSS-in-JS.

**Por qué sí:**  
SCSS es estándar en la industria. Tooling maduro. Bundling eficiente. Fácil de entender para desarrolladores tradicionales. No agrega dependencias de JS.

**Por qué no:**  
CSS-in-JS (styled-components, Emotion) permite co-ubicación de styles y componentes y manejo de tipos. Pero aquí SCSS es suficiente.

**Trade-off:**  
SCSS requiere compilación. CSS-in-JS está disponible directamente en JS. Para componentes altamente reutilizables con muchas variantes, CSS-in-JS sería mejor.

---

## Decisiones UX y visuales

### Hero section con gradiente

La aplicación incluye una sección hero prominente con gradiente púrpura que comunica marca y propósito claramente. El efecto visual crea jerarquía y atrae atención sin ser invasivo.

### Tarjeta de conversor elevada

La tarjeta blanca del conversor se superpone sobre el hero (margen negativo) creando profundidad visual y focal point claro. Esto sigue patrones modernos de SaaS.

### Símbolo de moneda como prefijo

El campo de monto muestra el símbolo ISO de la moneda seleccionada como prefijo, brindando contexto inmediato sin necesidad de buscar.

### Timestamp de actualización

Mostrar "Last updated: ..." en la caja de resultado comunica al usuario cuán frescas son las tasas, generando confianza.

### Estados claros: Loading, Error, Success

- **Loading**: Spinner centrado durante fetch.
- **Error**: Alert rojo con mensaje descriptivo y botón Retry.
- **Success**: Resultado visible con tasa de conversión.

Esto reduce incertidumbre del usuario.

### Responsive mobile-first

En móviles:
- Controles en una columna en lugar de fila.
- Botón de swap se convierte en ancho completo.
- Fuentes más pequeñas pero aún legibles.
- Hero más compacto.

## Testing y QA

### Cobertura de testing

- **Utilities**: `sanitizeAmount()`, `calculateReceived()`, `formatCurrency()` - 100% coverage.
- **Hooks**: `useExchangeRates()` - validación de caching, error handling, retry.
- **Integración**: Casos de uso end-to-end en el componente `CurrencyConverter`.

### Casos de prueba validados

- Conversión correcta con diferentes pares de monedas.
- Entrada de monto con caracteres inválidos se sanitiza.
- Valores negativos se rechazan.
- Intercambio de monedas funciona correctamente.
- Estados de error y retry se muestran.
- Caching de tasas previene requests duplicados.
- La app inicia con valores por defecto correctos.

### Testing manual

Ver `docs/MANUAL_QA.md` para checklist de validación funcional y UI.

## Alcance y mejoras futuras

### No implementado (fuera de scope)

- ❌ Historial de conversiones
- ❌ Modo oscuro
- ❌ Internacionalización (i18n)
- ❌ Redux / state management global
- ❌ Persistencia de conversiones en localStorage
- ❌ GraphQL
- ❌ Autenticación
- ❌ Auto-refresh de tasas

### Mejoras potenciales futuras

- 📈 Gráfico de tendencias de tasa histórica.
- 🔔 Notificaciones de cambios de tasa significativos.
- 💾 Guardar pares de monedas favoritas.
- 🌙 Soporte de tema oscuro.
- 🌍 Soporte de idiomas múltiples.
- 📱 Progressive Web App (offline, installable).
- ♿ Auditoría de accesibilidad WCAG.

### Notas de producción

Esta aplicación fue construida como **demo técnica**, no como producto en producción. Para llevar a producción:

- Reemplazar VATComply con API de tasas de cambio autorizada en producción.
- Implementar rate limiting y caché en backend.
- Añadir logging y monitoring de errores.
- Realizar pruebas de seguridad y performance.
- Auditoría de accesibilidad.
- Testing de múltiples navegadores y dispositivos.
- Documentation de API.

---

## Contacto y preguntas

Para preguntas sobre decisiones de arquitectura, ver `docs/DECISIONS.md`.  
Para preguntas sobre especificación de producto, ver `docs/PRODUCT_SPEC.md`.  
Para preguntas sobre especificación técnica, ver `docs/TECH_SPEC.md`.
