---
name: portfolio-design-system
description: Sistema de diseño del portfolio personal — estética de documentación técnica de fines de los 80/principios de los 90 (BYTE Magazine, manuales IBM/HP/Sun/SGI, Xerox PARC). Usar SIEMPRE que se construya, edite o revise cualquier componente, sección, estilo, color, tipografía, gráfico o imagen de este sitio, incluso si el pedido es puntual (ej. "agregá una sección de X", "cambiá el color de Y", "hacé un gráfico de Z"). No asumir ningún patrón visual nuevo sin revisar primero si ya existe uno equivalente acá — cualquier elemento (borde, color, icono, animación, tipografía) que no esté definido en este documento probablemente no pertenece al sistema.
---

# Sistema de diseño — portfolio personal

## 1. Filosofía y referencia

**Referencia**: publicaciones técnicas de fines de los 80 / principios de los 90 — BYTE Magazine, manuales IBM/HP/Sun/SGI, documentación Xerox PARC, catálogos industriales, specs de ingeniería.

**No es retro**: es un portfolio contemporáneo diseñado como si lo hubiera hecho alguien influenciado por esa tradición editorial/industrial. Sin nostalgia de computación — nada de synthwave, CRT, scanlines, glassmorphism, glow, neón.

**Respuesta emocional buscada**: precisión, claridad, ingeniería, credibilidad, documentación, investigación, confianza calma. Personalidad a través de la contención, no de la decoración.

**Optimismo tecnológico**: estos documentos transmitían la sensación de estar mirando el comienzo de algo más grande — "imaginá lo que se podrá hacer con esto". Esto se logra sobre todo con **datos reales en vivo** (ver punto 7), no con ilustración especulativa. El copy puede tener una nota aspiracional puntual (qué habilita esto, hacia dónde escala), sin lenguaje de marketing ("revolucionario", "innovador").

**Vida de los gráficos — el corazón del sistema**: lo que hace que el sitio se sienta activo y contemporáneo (y no un documento de archivo) son gráficos con **datos en tiempo real** (commits, HTB, métricas propias), tratados siempre con el mismo lenguaje visual documental. La ilustración técnica estática (isométrica, exploded-view) es un recurso secundario, útil solo cuando hay algo estructural genuino para documentar — nunca la pieza obligatoria de portada.

**Regla rectora de todo el sistema**: cada elemento tiene que tener una razón funcional para existir. Si no se puede justificar en una frase, no entra. Si un componente nuevo necesita "algo distinto", primero revisar si algún patrón ya definido (grilla de 1px, punto de color, retinado, mono type, control de documento) lo resuelve antes de inventar uno nuevo.

## 2. Paleta de color

Dos temas, mismos roles semánticos — **nunca hex hardcodeado en componentes**, siempre vía variables/tokens.

| Rol | Claro ("papel impreso") | Oscuro ("plano de ingeniería") |
|---|---|---|
| Fondo (paper) | `#F4F1EA` | `#16202B` |
| Panel | `#E7E2D9` | `#1D2C3B` |
| Panel secundario | `#D6D0C7` | `#24384A` |
| Texto primario (ink) | `#222222` | `#E7E2D9` |
| Texto secundario | `#5E5E5E` | `#93A3AF` |
| Bordes/divisores (line) | `#B9B3AA` | `#35516A` |
| Azul técnico (acento) | `#3C5874` | `#7FA1BE` |
| Azul oscuro | `#243647` | `#A9C4DA` |
| Rojo industrial | `#A84A36` | `#C97A61` |
| Naranja quemado | `#B86A2E` | `#D89A5D` |
| Verde apagado | `#697A66` | `#8FA68C` |

Colores mate, nunca saturados. El acento (azul) se usa con moderación — números de sección, links, labels puntuales — nunca como relleno grande de superficie.

### Color funcional (rojo/naranja/verde)

Se usan **exclusivamente** para codificar información real, nunca decorativamente.

- **Regla de validación**: si el color no se puede explicar en una palabra ("crítico", "resuelto", "en curso"), no entra.
- Aparecen como elementos pequeños — puntos de 5-6px, texto de valor puntual — nunca como fondos de card ni superficies grandes.
- Mapeo semántico: verde = estado positivo/resuelto/en producción · naranja = severidad media/atención/en curso · rojo = severidad alta o crítica/bloqueante.
- Un mismo color mantiene su significado en **todo el sitio** — no hay dos sistemas de color funcional paralelos.
- **Excepción documentada (2026-07-27)**: `DOC 02` (calendario de actividad de GitHub, punto 7) reutiliza el mismo verde funcional como escala secuencial de *intensidad de actividad*, no de estado. Decisión explícita del usuario — prevalece sobre la regla de "un significado por color" para este caso puntual. No extender a otros insights sin la misma confirmación explícita.

### Paleta de retinado (ver punto 5)

- Claro: punto en `ink` (`#222222`), blend `multiply`
- Oscuro: punto en `blue` (`#7FA1BE`), blend `screen`
- Nunca un color fuera de esta paleta para el retinado.

## 3. Tipografía

**Familias**:
- **Public Sans** — texto principal, títulos, cuerpo de bio y descripciones. Nace de documentación técnica gubernamental (US Web Design System) — carácter "manual serio" sin ser la pareja default de esta estética (IBM Plex).
- **Space Mono** — metadata, labels, números de sección, fechas, valores técnicos, datos de gráficos, botones. Más personalidad de época que una mono de software genérica.
- Sin tipografía decorativa ni display fonts grandes. Ambas gratuitas vía Google Fonts.

**Escala y jerarquía** (para evitar el efecto "CV"):
- Escala general contenida, con **una única excepción deliberada por vista**: un salto de tamaño audaz en el hero (nombre en el title-block) o en un número clave de un dato en vivo.
- Dos pesos: regular (400) y medium (500) — nunca bold/700.
- Mayúsculas reservadas a mono type en labels/metadata (`DOC 01-A`, `FIG. 02`) — el cuerpo en Sans siempre en oración normal.

| Elemento | Familia | Notas |
|---|---|---|
| Nombre / título hero | Public Sans, 500 | el salto de escala grande |
| Cuerpo / bio / descripciones | Public Sans, 400 | line-height generoso, ancho topeado |
| Control de documento / numeración | Space Mono | azul técnico, tracking amplio |
| Metadata (fechas, rev, escala) | Space Mono | texto secundario |
| Valores de datos en vivo | Space Mono | puede tomar el salto de escala grande |
| Labels de UI (botones, tags) | Space Mono | mayúsculas, chico |

## 4. Layout y grilla

**Contenedor**: `max-w-6xl` compartido, con **container queries** (no solo media queries) — los componentes responden a su propio espacio disponible.

**Dos columnas a partir de `2xl` (1536px)**: izquierda = Sobre mí + Logros; derecha = Proyectos. Divisor: regla vertical de 1px (`line`). Por debajo de `2xl`: una sola columna.

**Anchos de prosa topeados**: `max-w-2xl`/`max-w-3xl` en texto corrido (bio, notas técnicas). Tablas y gráficos en vivo pueden usar el ancho completo de su columna.

**Contenedores de imagen/gráfico**: todo elemento visual va dentro de un frame con `overflow: hidden` — contiene el retinado exactamente al borde de la imagen sin filtrarse al fondo. Ningún visual se muestra "suelto" sin su marco de 1px.

**Grillas de ficha/gráfico**: patrón de grilla de 1px entre celdas (`background: line` + celdas `panel`) para fichas técnicas y sectores de insight — mismo patrón sin importar la fuente de datos.

### Control de documento (reemplaza numeración editorial genérica 01/02/03)

En vez de números de sección "limpios" (que leen como el patrón genérico de IA), cada sección/sector lleva un identificador real:

```
DOC 0{n}[-{sub}]
```
Ejemplo: `DOC 02`, `DOC 04-A`

- Secuencial en todo el sitio, sectores de insight incluidos — un insight toma el siguiente número entero de la secuencia igual que una sección narrativa, **no** un sub-letra forzado. El sub-letra (`-A`, `-B`) queda solo para un sub-ítem real dentro de otra sección (ej. el proyecto destacado dentro de Proyectos), nunca como convención obligatoria para insights.
- **Texto plano, sin link** (decisión explícita del usuario, 2026-07-28 — el click-through a un commit específico de GitHub no aportaba información real al lector; se descartó ese easter egg). `DocControl` es un `<span>`, no un `<a>`.
- `REV {hash corto}` se muestra **una sola vez, en el masthead del Navbar** (`Rev. {hash} · {locale}`) — no se repite en cada sección, ver `src/components/Navbar.tsx`.
- Este es el **único** sistema de referencia documental del sitio (se descartó un sistema paralelo tipo "File ref P.01" por redundante — ver punto 9).

## 5. Retinado / halftone en imágenes

Capa fina de puntos sobre toda imagen fotográfica del sitio (retrato, capturas, figuras), simulando trama de impresión offset. Tratamiento único y sutil, aplicado por igual a **toda imagen fotográfica** sin excepción.

```css
.halftone-frame {
  position: relative;
  overflow: hidden; /* contiene el punto exactamente al borde de la imagen */
}
.halftone-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--dot) 0.6px, transparent 0.6px);
  background-size: var(--halftone-size); /* 4-4.5px */
  mix-blend-mode: var(--blend);
  opacity: var(--halftone-opacity);
  pointer-events: none;
}
```

| | Claro | Oscuro |
|---|---|---|
| Color del punto | `ink` (`#222222`) | `blue` (`#7FA1BE`) |
| Blend mode | `multiply` | `screen` |
| Opacidad | 20-25% | 25-30% |
| Tamaño de trama | 4-4.5px | 4-4.5px |

*(Valores de partida — ajustar mirando la foto de perfil real en pantalla.)*

**Nunca se extiende** al fondo del documento ni al marco de 1px que rodea la imagen (`overflow: hidden` en el contenedor).

**Explícitamente descartado** (no reintroducir):
- Desregistro de color animado en scroll
- Cursor tipo lupa que revela el retinado ampliado
- Grano de papel animado/respirando de fondo
- Retinado de densidad variable multi-tono como tratamiento *estándar* de foto (sí es válido como recurso de visualización de datos puntual — ver excepción en punto 7)

**Aplica a**: foto de perfil, capturas/figuras de proyectos. **No aplica a**: iconografía lineal, gráficos de datos en vivo con su propia codificación (punto 7), fondos de sección, paneles de UI.

## 6. Componentes por sección

**Hero / title-block** (`DOC 00`):
- Carátula de plano técnico: nombre en el salto de escala grande, rol como subtítulo mono, metadata a la derecha (`FECHA`, real — del último commit).
- Bloque de control de documento arriba de todo (texto plano, sin link — ver punto 4).
- Sin foto de perfil grande de fondo — si hay foto, chica, con su frame de retinado, no protagonista.

**Sobre mí**:
- Bio corta, ancho topeado, tono aspiracional puntual sin lenguaje de marketing.
- Solo bio + foto con retinado — los datos en vivo (GitHub, HTB) viven en sus propios sectores de insight, no acá (ver abajo).

**Logros**:
- Timeline vertical, marcador de 5-6px por evento, mono type para fecha.
- Color del marcador es funcional: codifica tipo de logro (certificación / publicación / hito laboral) con la paleta de tres colores.
- Sin ilustración — sección puramente documental.

**Proyectos (resumen comparativo)**:
- Tabla: proyecto, categoría (punto de color + mono), estado (punto de color), severidad si aplica (texto coloreado).
- Misma grilla de 1px, mono type y puntos de color ya definidos — sin elementos nuevos.

**Proyecto destacado**:
- Figura anotada (call-outs numerados ①②, nota técnica debajo) si el proyecto lo amerita — lugar típico para ilustración técnica secundaria o captura real con retinado.
- Ficha de metadata propia (mismo patrón de grilla).
- Datos en vivo propios del proyecto (uptime, requests) con el mismo tratamiento del punto 7.
- Única sección con licencia para más padding/aire, por concentrar más densidad de información.

### Sectores de insight — intercalados, no agrupados

Los gráficos con datos en tiempo real **no** se empaquetan dentro de "Sobre mí": son sectores independientes intercalados entre las secciones narrativas, para ganar heterogeneidad de ritmo.

- Cada sector lleva su propio control de documento (`DOC 0{n}`, el siguiente entero de la secuencia — sin sub-letra, ver punto 4).
- Se distingue de una sección narrativa por estar **enmarcado** (borde de 1px en los 4 lados) — las secciones narrativas fluyen sin marco propio. Esa diferencia es la señal "esto es un dato, no prosa".
- Corto por naturaleza: un dato o dos, su gráfico, nada de texto largo.
- **Regla de alternancia**: nunca dos sectores de insight consecutivos — siempre una sección narrativa entre medio.
- **Cantidad total recomendada**: 2-3 para un portfolio de este tamaño. Más que eso y el sitio se lee como dashboard en vez de documento con datos insertados.

Orden de referencia (ejemplo, no fijo) — refleja el estado real implementado:
```
DOC 00     — Hero
DOC 01     — Sobre mí — bio + foto
DOC 02     — insight: actividad GitHub
DOC 03     — Logros — timeline
DOC 04     — Proyectos — comparativo
DOC 04-A   — Destacado — sub-ítem de Proyectos, no un sector de insight
DOC 05     — insight: frecuencia de stack tecnológico (dentro de la columna
             derecha, debajo de Proyectos y su destacado — no full-width)
```

**Cómo se suman insights futuros**: no hay lista pre-planeada. Cada vez que se agregue uno nuevo: (1) completar la especificación del punto 7, (2) indicar explícitamente entre qué sectores existentes va, respetando la regla de alternancia, (3) actualizar la numeración de control de documento según su posición real.

## 7. Gráficos en vivo (datos en tiempo real)

Esto es lo que le da vida real al sitio — no la ilustración estática.

**Voz del copy (epígrafes, decks)**: siempre neutra, tercera persona — nunca "tu cuenta"/"tus contribuciones" ni ningún otro que se dirija al lector como si fuera el dueño del sitio. El dueño del sitio es quien presenta esta información a otras personas, no quien la recibe (decisión explícita del usuario, 2026-07-28). Describir el dato ("bytes de código por lenguaje en repositorios con contribuciones"), no narrar el proceso de obtenerlo en segunda persona.

### Especificación de un insight (completar antes de construir cualquiera, presente o futuro)

| Campo | Qué responde |
|---|---|
| Identificador | `DOC 0{n}` (siguiente entero de la secuencia; `-{sub}` solo si es un sub-ítem de otra sección) |
| Pregunta que responde | Qué debe entender el lector con un vistazo |
| Fuente de datos | API/origen concreto, pública/autenticada/scraping |
| Frecuencia de actualización | En vivo / cacheado con revalidación cada X / build-time |
| Codificación visual | Qué propiedad visual mapea a qué dato — nunca color de marca del origen |
| Formato de marco | Recuadro de 1px estándar (no varía) |
| Estado | `implementado` / `roadmap` |

### Insights actuales

**`DOC 02` — Actividad de GitHub**
- Pregunta: ¿qué tan activo estoy escribiendo código, y cuándo?
- Fuente: API GraphQL de GitHub (`contributionsCollection`), incluye repos privados y de organización además de públicos (decisión explícita del usuario, 2026-07-27). Requiere un PAT **clásico** con scope `read:user` — un fine-grained PAT no sirve para esto: solo puede tener un resource owner (cuenta personal o una org, nunca ambos), así que nunca ve las dos fuentes en un mismo token.
- Frecuencia: **en vivo, en cada visita** (decisión explícita del usuario, no cacheado) — se consulta desde un Route Handler dedicado (`/api/github/contributions`, `runtime="nodejs"`, `dynamic="force-dynamic"`) llamado por el componente cliente, nunca desde el build ni desde un Server Component de la página. Esto mantiene el resto del sitio 100% estático (el fetch dinámico está aislado a esta única ruta, no vuelve dinámica a `/`).
- Codificación visual: **se replica la estructura exacta del gráfico original de GitHub** (grilla semana × día, labels de mes arriba, labels de día a la izquierda, leyenda "menos → más") — escala de 5 tonos con el **verde funcional del sistema** (`panel-2` → `green`, ver excepción documentada en el punto 2), no el verde de marca de GitHub (tono distinto, mate en vez de saturado).
- Estado: `implementado`.

**`DOC 05` — Frecuencia de stack tecnológico**
- Pregunta: ¿qué tecnologías uso, y con qué frecuencia, medido por mi actividad real (no una lista puesta a mano)?
- Fuente: misma API GraphQL que `DOC 02`. `contributionsCollection.commitContributionsByRepository` da el peso por repo (días con commits del usuario en el último año — proxy barato de "cuánto aporté ahí", no el conteo literal de commits), y `repository.languages` el desglose en bytes por lenguaje de cada uno. El peso de cada repo se reparte entre sus lenguajes proporcional al tamaño en bytes (excluyendo del total los lenguajes filtrados, no solo del listado — ver abajo), se suma entre repos y se normaliza 0-100 contra el máximo. Un solo request GraphQL, sin N+1 por repo. Nombres de lenguaje que el linguist de GitHub separa pero son la misma tecnología (`Dockerfile` → `Docker`) se unifican antes de agregar — ver `LANGUAGE_ALIASES` en `src/lib/github/index.ts`.
- **Filtro de relevancia (2026-07-28)**: `Shell`, `Makefile`, `Docker`/`Dockerfile` y `Batchfile` se excluyen — son archivos de infraestructura/build que el linguist detecta como "lenguaje" pero no son stack real (decisión explícita del usuario). No es un umbral numérico (ni por bytes crudos ni por score): un umbral habría descartado también `CSS`/`JavaScript`, que sí son stack real aunque tengan valores bajos. Lista curada en `STACK_EXCLUDE`, `src/lib/github/index.ts` — extender ahí si aparece otro caso, no inventar una regla numérica.
- **Nota de scope (2026-07-28)**: a diferencia de `DOC 02`, acá `read:user` **no alcanza** para incluir repos privados/de organización — el conteo agregado del calendario no necesita resolver el objeto `Repository`, pero leer `languages` sí, y eso exige que el token tenga lectura real sobre ese repo específico. Con solo `read:user` este insight cae de vuelta a "solo públicos" aunque el calendario (`DOC 02`) ya vea todo. Para que ambos coincidan en alcance hace falta el scope clásico `repo` (de lectura/escritura — un clásico no tiene un "repo read-only" separado).
- Frecuencia: en vivo en cada visita, misma ventana de 1 año que `DOC 02` (decisión explícita del usuario, 2026-07-28 — consistencia entre ambos insights) — `/api/github/stack`, mismo patrón de Route Handler dinámico aislado que `DOC 02`.
- Codificación visual: **barra sólida horizontal** con el azul técnico del sistema (decisión explícita del usuario — se descartó la opción de retinado multi-tono bocetada originalmente acá, ver excepción del punto siguiente). Ordenadas de mayor a menor, top 8 tecnologías.
- Estado: `implementado`.

### Excepción de retinado multi-tono (no usada actualmente)

La densidad de punto variable (4 niveles de tono con un solo color de tinta) sería la única situación donde el retinado multi-tono podría aplicar como codificación de datos — distinto del retinado uniforme y sutil de fotos (punto 5), porque ahí la densidad *sería* el dato, no una textura. Se bocetó pensando en `DOC 05`, pero al construirlo se optó por barra sólida en su lugar (más simple, decisión explícita del usuario). Mecanismo queda documentado por si un insight futuro lo justifica — ninguno lo usa hoy.

### Ilustración técnica (isométrica, exploded-view, figuras anotadas)

Recurso secundario y acotado:
- Solo cuando hay algo estructural genuino que un gráfico de datos no puede mostrar (arquitectura de sistema, diagrama de vector de ataque, corte de un mecanismo).
- No es pieza obligatoria de portada — esa responsabilidad la llevan los datos en vivo.
- Reglas si aparece: una sola fuente de luz si tiene volumen, máximo 4-5 tonos, contenida a su propio marco, volumen con planos de color (nunca gradiente suave/glow).

## 8. Bordes, iconografía y micro-detalles

**Bordes**: reglas de 1px en todo el sistema. Única excepción: acento de 2px reservado para "featured/recomendado" en la tabla comparativa, si hace falta. Sin cards flotantes, sin sombras, sin bordes gruesos.

**Iconografía**: mínima — líneas, símbolos geométricos, flechas (`→`), indicadores de estado (puntos de 5-6px), marcas de callout (`①②`). Nada skeuomórfico, nada a color fuera de la paleta funcional. Nunca librería de iconos genérica — se dibuja con el mismo lenguaje de línea fina.

**Detalles documentales**:
- Control de documento con datos reales (punto 4) — el único sistema de referencia del sitio.
- `Fig. 01/02` para figuras anotadas — se mantiene, tiene función real.
- **Eliminado**: `File ref P.01` — quedaba redundante frente al control de documento.

## 9. Movimiento y animación

**Regla general**: animación casi invisible, nunca protagonista. Si no tiene una metáfora documental clara (imprimir, revelar un dato, actualizar una revisión), probablemente no entra.

**Dónde sí anima**:
- Sectores de insight actualizándose: crossfade corto de valor viejo a nuevo — nunca un contador que cuenta hacia arriba.
- Hover en elementos cliqueables reales (links, filas de tabla — el control de documento ya **no** es uno de ellos, ver punto 4): cambio de color/borde sutil, sin scale ni desplazamiento.
- Foco de teclado: siempre visible, no negociable.
- Carga inicial: fade-in breve y uniforme de toda la página, nunca escalonado ni con desplazamiento.

**Explícitamente fuera del sistema**:
- Scroll-triggered reveals, parallax, scale exagerado
- Contadores animados en números
- Animación en loop o que "respira" de fondo
- Transiciones de página con movimiento (slide, wipe)
- Desregistro de color en scroll, cursor tipo lupa (ver punto 5)

## Notas abiertas

Ninguna al cierre de esta versión — todos los puntos fueron revisados y confirmados en conversación. Si surge una decisión pendiente nueva, documentarla acá con fecha antes de implementar.
