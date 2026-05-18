# IOL Currency Converter

## Descripción

Calculadora de cambio de divisas construida con React como parte del challenge técnico frontend para IOL.

La aplicación permite convertir un monto entre monedas utilizando tasas obtenidas desde la API de VATComply. En la primera carga, el monto inicial es `1.00`, la moneda de origen es `USD` y la moneda de destino es `EUR`.


---

## Live demo

La aplicación está desplegada y puede probarse en el siguiente enlace:

[Ver demo online](https://iolfrontendchallenge.netlify.app/)

---

## Funcionalidades principales

- Conversión de divisas usando tasas de VATComply.
- Monto inicial por defecto: `1.00`.
- Monedas iniciales por defecto: `USD` como origen y `EUR` como destino.
- Recálculo automático del monto recibido al modificar el importe.
- Validación para evitar montos negativos.
- Sanitización silenciosa de caracteres inválidos.
- Intercambio rápido entre moneda origen y destino.
- Visualización de la última actualización exitosa de tasas.
- Caché en memoria por moneda origen para evitar llamadas repetidas a la API durante la sesión.
- Estados de carga, error y reintento.
- Interfaz responsive alineada con la dirección visual propuesta.

---

## Stack técnico

- React
- TypeScript
- Vite
- pnpm
- Ant Design
- SCSS
- Vitest
- React Testing Library
- Fetch API nativa del navegador

---

## Instalación y ejecución

### Requisitos

- Node.js
- pnpm

### Instalación

```bash
pnpm install
```

### Ejecutar en desarrollo

```bash
pnpm dev
```

Por defecto, Vite expone la aplicación en:

```txt
http://localhost:5173
```

### Ejecutar tests

```bash
pnpm test
```

Si se desea ejecutar Vitest una sola vez en modo `run`:

```bash
pnpm test -- --run
```

### Generar build productiva

```bash
pnpm build
```

### Previsualizar build

```bash
pnpm preview
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo con Vite. |
| `pnpm test` | Ejecuta los tests con Vitest. |
| `pnpm test -- --run` | Ejecuta los tests una sola vez. |
| `pnpm build` | Ejecuta TypeScript build y genera la build de Vite. |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto. |
| `pnpm preview` | Sirve localmente la build generada. |

---

## Enfoque de desarrollo: SDD

El proyecto se trabajó con un enfoque liviano de **Spec Driven Development**.

Antes y durante la implementación se definieron documentos de soporte para mantener el alcance claro, evitar decisiones accidentales y reducir overengineering:

- Especificación de producto.
- Especificación técnica.
- Registro de decisiones.
- Desglose de tareas.
- Checklist de validación funcional y manual.

Este enfoque permitió separar el problema en decisiones explícitas:

- Qué comportamiento debía tener la calculadora.
- Cómo se iba a consumir la API.
- Cómo se manejaría el input del monto.
- Qué estados de UI eran necesarios.
- Qué decisiones visuales aportaban a la experiencia del usuario.
- Qué quedaba fuera del alcance del challenge.

Para una descripción más detallada del proceso y decisiones, ver también:

- `docs/PRODUCT_SPEC.md`
- `docs/TECH_SPEC.md`
- `docs/DECISIONS.md`
- `docs/TASKS.md`

---

## Uso de herramientas de IA

Se utilizaron herramientas de IA como aceleradores de productividad durante el proceso de desarrollo.

Su uso estuvo orientado principalmente a:

- Planificación inicial.
- Desglose de tareas.
- Refinamiento de prompts y requisitos.
- Brainstorming de UX.
- Identificación de casos de QA.
- Revisión de consistencia entre decisiones y alcance.

La IA no reemplazó la propiedad técnica del proyecto. Las decisiones finales sobre arquitectura, comportamiento de producto, experiencia de usuario y alcance fueron revisadas manualmente.

El objetivo fue usar IA como herramienta de apoyo para acelerar ejecución y análisis, manteniendo criterio técnico sobre qué implementar, qué dejar fuera y cómo justificar cada decisión.

---

## Decisiones técnicas y trade-offs

### Vite como build tool

**Qué se decidió:**  
Usar Vite como herramienta de build y servidor de desarrollo.

**Por qué sí:**  
Vite ofrece una experiencia de desarrollo rápida, configuración simple y buen soporte para React, TypeScript y SCSS. Para un challenge frontend permite enfocarse en el producto sin invertir tiempo innecesario en configuración de build.

**Por qué no:**  
No se eligió una configuración manual con webpack porque agregaría complejidad sin aportar valor proporcional al alcance. Tampoco se eligió Create React App por estar fuera del estándar moderno recomendado para nuevos proyectos.

**Trade-off:**  
Vite simplifica mucho el setup, pero en aplicaciones enterprise muy específicas webpack todavía puede ofrecer mayor control fino sobre la configuración.

---

### TypeScript para contratos más seguros

**Qué se decidió:**  
Usar TypeScript en toda la aplicación.

**Por qué sí:**  
El dominio incluye estructuras de datos externas, monedas, tasas y estados derivados. TypeScript ayuda a documentar contratos, prevenir errores comunes y refactorizar con mayor confianza.

**Por qué no:**  
JavaScript habría sido suficiente para una demo pequeña, pero aumentaría el riesgo de errores silenciosos en transformaciones de datos y manejo de respuestas de API.

**Trade-off:**  
TypeScript agrega una capa de complejidad inicial y requiere mantener tipos actualizados, pero ese costo es bajo frente al beneficio de claridad y seguridad.

---

### Ant Design como base UI

**Qué se decidió:**  
Usar Ant Design para componentes base.

**Por qué sí:**  
Permite construir una UI consistente rápidamente con componentes probados como inputs, selects, botones, cards, alerts y spinners. Esto permite concentrar el esfuerzo en comportamiento, estado, integración con API y experiencia de usuario.

**Por qué no:**  
No se implementó un sistema de diseño desde cero porque no era el objetivo principal del challenge. Tampoco se usó una librería más liviana porque Ant Design resolvía bien la necesidad de velocidad y consistencia visual.

**Trade-off:**  
Ant Design trae estilos y patrones propios que pueden limitar la personalización fina. Por eso se complementó con SCSS para layout y refinamientos visuales.

---

### SCSS para layout y refinamientos visuales

**Qué se decidió:**  
Usar SCSS para estilos específicos del layout, responsive behavior y ajustes visuales.

**Por qué sí:**  
SCSS permite mantener estilos organizados y expresivos sin introducir una solución más compleja. Es adecuado para una app pequeña con necesidades claras de layout y responsive design.

**Por qué no:**  
No se usaron CSS-in-JS ni Tailwind porque habrían agregado una decisión adicional de arquitectura visual que no era necesaria para el alcance.

**Trade-off:**  
SCSS no encapsula estilos al nivel de algunas soluciones CSS-in-JS, por lo que requiere disciplina en nombres de clases y estructura.

---

### Fetch API nativa en lugar de Axios

**Qué se decidió:**  
Usar la Fetch API nativa para consumir VATComply.

**Por qué sí:**  
El proyecto realiza requests públicos simples. Fetch evita agregar una dependencia externa para un caso que el navegador ya resuelve de forma nativa.

**Por qué no:**  
No se eligió Axios porque sus ventajas —interceptores, configuración global, transformaciones avanzadas, headers compartidos— no eran necesarias para este challenge.

**Trade-off:**  
Fetch requiere manejar manualmente errores, parsing y algunos casos de red. En una aplicación con muchas integraciones, Axios podría ser más conveniente.

---

### Estado local en lugar de Redux o Context

**Qué se decidió:**  
Usar estado local de React para manejar monto, monedas seleccionadas y estado derivado del conversor.

**Por qué sí:**  
El estado pertenece a una única feature y no necesita compartirse globalmente. Mantenerlo local reduce complejidad y facilita el razonamiento del componente.

**Por qué no:**  
Redux sería excesivo para este alcance. Context tampoco aporta demasiado porque el estado del conversor es consumido dentro de una única feature y no necesita compartirse entre componentes lejanos de la aplicación.

**Trade-off:**  
Si el producto creciera con múltiples pantallas, historial, favoritos, preferencias persistidas o datos compartidos entre features, podría ser necesario introducir una estrategia de estado más global.

---

### No usar React Query

**Qué se decidió:**  
No incorporar React Query.

**Por qué sí:**  
La app solo necesita obtener tasas cuando cambia la moneda origen y manejar loading, error, retry y último éxito. Esa lógica es manejable con un hook propio.

**Por qué no:**  
React Query sería una buena opción para server state más complejo, cache invalidation avanzada, sincronización en background o múltiples endpoints. En este caso agregaría abstracción innecesaria.

**Trade-off:**  
Se implementa manualmente parte del manejo de estado remoto. Si la integración creciera, React Query podría ser una mejora futura razonable.

---

### Monto como string en la UI

**Qué se decidió:**  
Representar el monto ingresado como string en la UI.

**Por qué sí:**  
Durante la edición, el input puede estar en estados intermedios válidos para el usuario pero incómodos como número, por ejemplo `""`, `"."` o `"1."`. Mantenerlo como string permite una experiencia más natural.

**Por qué no:**  
Guardar el monto directamente como number simplificaría el cálculo, pero empeoraría el control del input y podría producir conversiones prematuras o pérdida de intención del usuario.

**Trade-off:**  
El cálculo necesita convertir y validar el string antes de operar. Esa complejidad se encapsula en utilidades específicas.

---

### `type="text"` con `inputMode="decimal"`

**Qué se decidió:**  
Usar un input de texto con `inputMode="decimal"` para el monto.

**Por qué sí:**  
Permite sugerir teclado decimal en mobile y, al mismo tiempo, controlar manualmente sanitización, separadores y estados intermedios del input.

**Por qué no:**  
`type="number"` puede tener comportamientos inconsistentes entre navegadores, spinners no deseados y restricciones que afectan la UX al editar decimales.

**Trade-off:**  
Se pierde parte de la validación nativa del navegador y se debe implementar sanitización propia.

---

### Sanitización silenciosa y bloqueo de negativos

**Qué se decidió:**  
Sanitizar caracteres inválidos de forma silenciosa y no permitir valores negativos.

**Por qué sí:**  
Para una calculadora simple, corregir entradas como caracteres no numéricos sin interrumpir al usuario genera una experiencia más fluida. Los negativos se bloquean porque no tienen sentido para el caso de conversión solicitado.

**Por qué no:**  
No se eligió mostrar errores por cada carácter inválido porque podría generar ruido visual innecesario.

**Trade-off:**  
La sanitización silenciosa puede hacer menos explícito qué carácter fue ignorado. En formularios críticos convendría una validación más visible.

---

### Recálculo local y fetch por moneda origen

**Qué se decidió:**  
Recalcular la conversión localmente cuando cambia el monto o la moneda destino, y pedir nuevas tasas solo cuando cambia la moneda origen.

**Por qué sí:**  
Las tasas recibidas ya contienen la información necesaria para calcular distintas monedas destino. Esto reduce requests, mejora la respuesta percibida y evita depender de la red para cada cambio de input.

**Por qué no:**  
No se hace fetch por cada cambio de monto porque sería innecesario: el monto no cambia la tasa de conversión.

**Trade-off:**  
La app depende de la última respuesta exitosa de tasas para la moneda origen actual.

---

### Caché en memoria por moneda origen

**Qué se decidió:**  
Implementar un caché en memoria para almacenar las tasas obtenidas exitosamente por moneda origen durante la sesión.

**Por qué sí:**  
Cuando el usuario cambia entre monedas ya consultadas, la aplicación puede reutilizar las tasas previamente obtenidas sin volver a llamar a la API. Esto mejora la velocidad percibida, evita requests repetidos y mantiene una experiencia más fluida.

**Por qué no:**  
No se implementó persistencia en `localStorage`, expiración por TTL ni una estrategia avanzada de cache invalidation porque el alcance del challenge no lo requiere. Tampoco se incorporó React Query, ya que la necesidad de server state es limitada y manejable con un hook propio.

**Trade-off:**  
El caché solo vive durante la sesión actual y se pierde al recargar la página. Además, al no tener expiración automática, puede mantener tasas antiguas si el usuario deja la app abierta mucho tiempo. Para mitigar esto, el usuario puede forzar una nueva carga mediante retry y la app muestra la última actualización exitosa.

---

### Mostrar última actualización sin auto-refresh

**Qué se decidió:**  
Mostrar la fecha y hora de la última actualización exitosa de tasas, sin implementar auto-refresh.

**Por qué sí:**  
El timestamp comunica frescura de datos sin generar tráfico automático. Para el alcance del challenge, el usuario no necesita polling constante.

**Por qué no:**  
No se implementó auto-refresh porque agregaría complejidad de intervalos, sincronización, cleanup, tests con timers y posibles estados inesperados sin un requisito explícito.

**Trade-off:**  
Si el usuario deja la app abierta mucho tiempo, las tasas pueden quedar desactualizadas hasta que se dispare una nueva carga, se cambie la moneda origen o se utilice retry. Esta decisión evita tráfico automático innecesario y mantiene el control explícito de las llamadas a la API.

---

### Separación entre layout y feature

**Qué se decidió:**  
Separar el layout general en `AppLayout` y la lógica de conversión en `CurrencyConverter`.

**Por qué sí:**  
Esta separación mantiene responsabilidades claras: el layout define estructura visual y contexto de página; el conversor concentra comportamiento de negocio y UI específica de la feature.

**Por qué no:**  
Poner todo en `App` o en un único componente habría sido más rápido, pero menos claro y menos mantenible.

**Trade-off:**  
Agrega una pequeña capa adicional de componentes, aceptable para mejorar legibilidad y evolución.

---

### Separación pragmática de responsabilidades

**Qué se decidió:**  
Separar acceso a API, hooks, utilidades, tipos, layout y componentes.

**Por qué sí:**  
Permite aplicar principios SOLID de forma pragmática: cada módulo tiene una razón principal para cambiar y puede testearse o reemplazarse con menor impacto.

**Por qué no:**  
No se llevó la arquitectura a un nivel más complejo de capas o dominios porque sería excesivo para una aplicación de una pantalla.

**Trade-off:**  
Hay más archivos que en una implementación mínima, pero la intención y mantenibilidad quedan más claras.

---

## Decisiones UX y visuales

Además de cumplir la consigna funcional, se tomaron decisiones visuales orientadas a mejorar la experiencia de usuario y acercar la app a una herramienta más pulida.

- **Hero section:** introduce el propósito de la herramienta y da contexto antes del formulario.
- **Card centrada:** concentra la atención en la acción principal: convertir.
- **Prefijo con símbolo de moneda:** refuerza qué moneda está ingresando el usuario. Si el símbolo no está disponible, se utiliza el código de moneda como fallback.
- **Swap visible:** permite alternar origen y destino sin reconfigurar selects manualmente.
- **Estados de loading, error y retry:** hacen explícito el estado de la integración con VATComply.
- **Última actualización:** ayuda a transmitir confianza sobre la frescura de los datos.
- **Responsive behavior:** prioriza legibilidad y facilidad de uso en distintos tamaños de pantalla.

El objetivo no fue sobrediseñar el challenge, sino mejorar claridad, confianza y usabilidad sin desviar el alcance técnico.

---

## Testing y QA

El proyecto incluye tests automatizados con Vitest y React Testing Library para validar lógica crítica y comportamiento de la feature.

Áreas principales contempladas:

- Sanitización del monto.
- Cálculo de conversión.
- Formateo de importes.
- Comportamiento del conversor en los flujos principales.
- Manejo de estados de carga, error y reintento cuando corresponde.

Comando principal:

```bash
pnpm test
```

También se definieron criterios de aceptación y checklist manual para validar:

- Carga inicial con `1.00`, `USD` y `EUR`.
- Conversión automática al editar el monto.
- Bloqueo de valores negativos.
- Sanitización de caracteres inválidos.
- Swap entre monedas.
- Estados visuales ante carga y error.
- Visualización de última actualización exitosa.
- Comportamiento responsive.
- Ausencia de `NaN` o `undefined` en la UI.
- Uso eficiente de la API, evitando requests por cada cambio de monto.
- Validación manual de que el caché evita requests repetidos para monedas ya consultadas.


---

## Alcance y mejoras futuras

Quedaron fuera del alcance inicial, pero podrían considerarse como mejoras futuras:

- Persistir última selección de monedas.
- Agregar historial de conversiones.
- Incorporar favoritos o monedas frecuentes.
- Implementar auto-refresh configurable.
- Agregar expiración configurable para el caché de tasas.
- Agregar internacionalización completa.
- Mejorar accesibilidad con una auditoría dedicada.
- Evaluar React Query si crecen los casos de server state.
- Agregar tests end-to-end con herramientas como Playwright o Cypress.

