---
name: portfolio-design-system
description: Sistema de diseño del portfolio personal — base de documentación técnica de fines de los 80/principios de los 90 (BYTE Magazine, manuales IBM/HP/Sun/SGI, Xerox PARC), con una segunda capa de lenguaje de instrumentación/electrónica de consumo (VU meters, visores de cámara digital) agregada el 2026-10-24, aplicada solo a dos zonas estrictamente delimitadas: sectores de datos en vivo e imágenes fotográficas. Usar SIEMPRE que se construya, edite o revise cualquier componente, sección, estilo, color, tipografía, gráfico o imagen de este sitio, incluso si el pedido es puntual (ej. "agregá una sección de X", "cambiá el color de Y", "hacé un gráfico de Z"). No asumir ningún patrón visual nuevo sin revisar primero si ya existe uno equivalente acá — cualquier elemento (borde, color, icono, animación, tipografía, material) que no esté definido en este documento probablemente no pertenece al sistema.
---

# Sistema de diseño — portfolio personal

## 1. Filosofía y referencia

**Referencia base**: publicaciones técnicas de fines de los 80 / principios de los 90 — BYTE Magazine, manuales IBM/HP/Sun/SGI, documentación Xerox PARC, catálogos industriales, specs de ingeniería.

**No es retro**: es un portfolio contemporáneo diseñado como si lo hubiera hecho alguien influenciado por esa tradición editorial/industrial. Sin nostalgia de computación barata — nada de synthwave, scanlines, neón, plástico translúcido multicolor, displays LCD/VFD de segmentos simulados, carcasa de dispositivo como layout completo.

**Respuesta emocional buscada**: precisión, claridad, ingeniería, credibilidad, documentación, investigación, confianza calma. Personalidad a través de la contención, no de la decoración — **esto sigue siendo la regla por defecto en todo lo que no sea un sector de datos en vivo o una imagen fotográfica** (ver la segunda capa, abajo).

**Optimismo tecnológico**: estos documentos transmitían la sensación de estar mirando el comienzo de algo más grande — "imaginá lo que se podrá hacer con esto". Esto se logra sobre todo con **datos reales en vivo** (ver punto 7), no con ilustración especulativa. El copy puede tener una nota aspiracional puntual (qué habilita esto, hacia dónde escala), sin lenguaje de marketing ("revolucionario", "innovador").

**Vida de los gráficos — el corazón del sistema**: lo que hace que el sitio se sienta activo y contemporáneo (y no un documento de archivo) son gráficos con **datos en tiempo real** (actividad de GitHub, stack tecnológico), tratados siempre con el mismo lenguaje visual documental. La ilustración técnica estática (isométrica, exploded-view) es un recurso secundario, útil solo cuando hay algo estructural genuino para documentar — nunca la pieza obligatoria de portada.

**Regla rectora de todo el sistema**: cada elemento tiene que tener una razón funcional para existir. Si no se puede justificar en una frase, no entra. Si un componente nuevo necesita "algo distinto", primero revisar si algún patrón ya definido (grilla de 1px, punto de color, vidrio de datos, marco de visor, mono type, control de documento) lo resuelve antes de inventar uno nuevo.

### Segunda capa — instrumentación/electrónica de consumo (2026-10-24)

Exploración de identidad visual: el sistema documental de arriba se sentía "genérico" a pesar de no ser slop — necesitaba una segunda capa de personalidad sin perder la contención de base. Se agregó un lenguaje de **instrumentación técnica y electrónica de consumo de inicios de los 2000** (VU meters/ecualizadores gráficos de equipos de audio, visores de cámara digital compacta), pero **estrictamente acotado a dos zonas**, nunca como piel del sitio completo:

1. **Vidrio** — exclusivo de sectores de datos en vivo (ver punto 4).
2. **Marco de visor** — exclusivo de imágenes fotográficas, reemplaza el retinado (ver punto 5).

Todo lo demás (nav, Sobre mí, Logros, tabla de Proyectos) **sigue siendo papel/plano plano, sin vidrio, sin metal, sin textura nueva** — la decoración se gana por zona, no se reparte parejo.

**Explícitamente explorado y descartado** en el proceso (no reintroducir sin que el usuario lo pida explícitamente de nuevo):
- **"Inmersión total"** — todo el sitio dentro de una carcasa de dispositivo (nav como botones físicos, hero como display VFD gigante). Calificado por el usuario como "slop puro".
- **Plástico translúcido multicolor** (tipo iMac G3 Bondi Blue/Grape/Tangerine) como material de panel. Feedback explícito: "los colores translúcidos son horribles".
- **"Cassette futurism"** — paneles de grafito/metal cepillado con tornillos/rivets como detalle. Feedback explícito: "perdió color" y "odio esos simil tornillos".
- **Displays LCD/VFD de segmentos** (tipografía tipo contador digital, ej. `VT323`) para texto — no para codificar dato, para texto de marca/hero. Feedback: "no me convencen".
- **Retinado/halftone sobre fotos** (ver punto 5) — se leía como ruido a tamaño web, no como trama de impresión.

**Lo que sí se confirmó y quedó**:
- Vidrio translúcido de **un solo tinte** (el azul técnico ya existente), nunca candy multicolor — y solo en sectores de datos.
- El **VU meter / ecualizador de segmentos** (lit/unlit visibles) como codificación de magnitud — ver punto 7.
- El **punto de color con glow** como hilo conector entre el vidrio y el resto del sitio plano — ver punto 4.
- El **marco de visor** (brackets de enfoque + LED + blur sutil) para fotos — ver punto 5.
- Tipografía **IBM Plex Sans** en vez de Public Sans — ver punto 3.
- Investigación de respaldo: glassmorphism se mantiene vigente en 2026 solo como **acento localizado**, nunca como estilo de página completa (fuente: comparación de guías de diseño 2026) — confirma por qué el vidrio tiene que quedar acotado a los sectores de datos y no expandirse.

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

Colores mate, nunca saturados. El acento (azul) se usa con moderación — números de sección, links, labels puntuales, vidrio de datos (ver punto 4) — nunca como relleno grande de superficie narrativa.

### Color funcional (rojo/naranja/verde)

Se usan **exclusivamente** para codificar información real, nunca decorativamente.

- **Regla de validación**: si el color no se puede explicar en una palabra ("crítico", "resuelto", "en curso"), no entra.
- Aparecen como elementos pequeños — puntos de 5-6px, segmentos de gráfico, texto de valor puntual — nunca como fondos de card ni superficies grandes.
- Mapeo semántico: verde = estado positivo/resuelto/en producción · naranja = severidad media/atención/en curso · rojo = severidad alta o crítica/bloqueante.
- Un mismo color mantiene su significado en **todo el sitio** — no hay dos sistemas de color funcional paralelos.
- **Excepción documentada (2026-07-27)**: `DOC 02` (calendario de actividad de GitHub, punto 7) reutiliza el mismo verde funcional como escala secuencial de *intensidad de actividad*, no de estado. Decisión explícita del usuario — prevalece sobre la regla de "un significado por color" para este caso puntual. No extender a otros insights sin la misma confirmación explícita.
- **Hallazgo validado con herramienta (2026-10-24)**: corriendo el validador de paletas del skill `dataviz` (`scripts/validate_palette.js`) sobre naranja/rojo en los dos temas, el ΔE entre ambos es ~8.8-8.9 — por debajo del piso de 15, difícil de distinguir solo por color incluso con visión normal. Mitigación: **nunca** un punto de este color aislado sin texto/label adyacente (ya se cumple en Proyectos y Logros); en el VU meter se mitiga además por posición fija (rojo siempre arriba del naranja). No usar naranja y rojo como única diferencia en un elemento sin acompañamiento de texto.

### Glow — el punto de color bajo instrumento (2026-10-24)

Mismo punto de color funcional de siempre, con un halo sutil (`box-shadow`) — es el hilo que conecta los sectores de vidrio con el resto del sitio sin necesitar vidrio en todos lados.

- Implementado como utilities en `globals.css`: `.glow-green`, `.glow-orange`, `.glow-red`, `.glow-blue`, vía `box-shadow: 0 0 5px 1px color-mix(in srgb, var(--color-*-value) 55%, transparent)` — se auto-adapta al tema porque lee el mismo token que ya usa el fondo del punto.
- Aplicado en: marcador de timeline de Logros, punto de estado y de categoría en Proyectos, celda de mayor intensidad (`level 4`) del calendario de GitHub.
- **No** aplicar glow a segmentos finos y muy juntos (ej. `SegmentBar`, punto 7) — a esa escala el halo de cada segmento se funde con el siguiente y se pierde la definición; ahí la distinción lit/unlit ya la da la opacidad, no hace falta glow.

### Paleta de retinado — ELIMINADA (2026-10-24)

El retinado/halftone sobre fotos fue reemplazado por el marco de visor — ver punto 5. No reintroducir esta sección; queda acá solo como referencia histórica de que existió.

## 3. Tipografía

**Familias**:
- **IBM Plex Sans** — texto principal, títulos, cuerpo de bio y descripciones, nombres de registro (proyectos). Reemplaza a Public Sans (2026-10-24, tras comparar 3 variantes de tabla/tipografía — "A" Public Sans/grilla, "B" todo-mono tipo manifiesto, "C" Plex Sans/registro apilado; se eligió "C", renombrado "Ledger"). Carácter más cercano a placa de instrumento/manual técnico serio que Public Sans (de linaje gubernamental, US Web Design System).
- **Space Mono** — metadata, labels, números de sección, fechas, valores técnicos, datos de gráficos, botones. Más personalidad de época que una mono de software genérica.
- Sin tipografía decorativa ni display fonts grandes. Sin tipografía de segmento/LCD (`VT323` y similares fueron probadas para texto de marca y descartadas — ver punto 1). Ambas familias gratuitas vía Google Fonts.

**Escala y jerarquía** (para evitar el efecto "CV"):
- Escala general contenida en todos lados — **sin excepción de salto de tamaño audaz** (había una reservada para el Hero/title-block; se eliminó junto con esa sección, 2026-07-28, y no se trasladó a ningún otro elemento — ver punto 6, nota de navBar).
- Dos pesos: regular (400) y medium (500) — nunca bold/700.
- Mayúsculas reservadas a mono type en labels/metadata (`DOC 01-A`, `FIG. 02`) — el cuerpo en Sans siempre en oración normal.

| Elemento | Familia | Notas |
|---|---|---|
| Nombre de marca (navBar) | IBM Plex Sans, 500 | `text-2xl` — el texto más grande del sitio, pero dentro de la escala contenida, no una excepción |
| Cuerpo / bio / descripciones | IBM Plex Sans, 400 | line-height generoso, ancho topeado |
| Nombre de proyecto (formato ledger) | IBM Plex Sans, 500 | `text-lg` — ver punto 6, "Proyectos" |
| Control de documento / numeración | Space Mono | azul técnico, tracking amplio |
| Metadata (fechas, rev, escala) | Space Mono | texto secundario |
| Valores de datos en vivo | Space Mono | puede tomar el salto de escala grande |
| Labels de UI (botones, tags) | Space Mono | mayúsculas, chico |

## 4. Layout y grilla

**Contenedor**: `max-w-6xl` compartido, con **container queries** (no solo media queries) — los componentes responden a su propio espacio disponible.

**Dos columnas a partir de `2xl` (1536px)**: izquierda = Sobre mí + Logros; derecha = Proyectos. Divisor: regla vertical de 1px (`line`). Por debajo de `2xl`: una sola columna.

**Anchos de prosa topeados**: `max-w-2xl`/`max-w-3xl` en texto corrido (bio, notas técnicas). Tablas y gráficos en vivo pueden usar el ancho completo de su columna.

**Contenedores de imagen/gráfico**: todo elemento visual va dentro de un frame con `overflow: hidden` — contiene el marco de visor (punto 5) exactamente al borde de la imagen sin filtrarse al fondo. Ningún visual se muestra "suelto" sin su marco de 1px.

**Grillas de ficha/gráfico**: patrón de grilla de 1px entre celdas (`background: line` + celdas `panel`) para fichas técnicas y sectores de insight que no usan vidrio — mismo patrón sin importar la fuente de datos.

### Vidrio — material exclusivo de sectores de datos en vivo (2026-10-24)

Implementado como `.glass-panel` / `.dark .glass-panel` en `globals.css`: gradiente translúcido de **un solo tinte** (azul técnico), borde e inset-shadow sutiles, **esquinas cuadradas** — el material cambia, la geometría del sistema (1px, sin radius) no.

Tres reglas, en este orden de precedencia:

1. **Regla 1 — el vidrio es exclusivo de sectores de datos en vivo.** Hoy: `GithubActivity` (`DOC 02`) y `StackFrequency` (`DOC 05`), reemplazando su `border border-line bg-panel` por `glass-panel`. Ninguna sección narrativa (Sobre mí, Logros, Proyectos) lo usa.
2. **Regla 2 — fuera de esas zonas, sigue siendo papel plano.** Sin vidrio, sin metal, sin textura nueva en el resto del sitio — la restricción original (punto 1) no se pierde fuera de las dos zonas de la regla 1.
3. **Regla 3 — el hilo conector es el punto con glow** (ver punto 2), no vidrio repartido por todos lados. Logros y Proyectos usan glow en sus puntos existentes; no necesitan vidrio para sentirse parte del mismo sistema.

Antes de agregar vidrio a una sección nueva: ¿es un sector de datos en vivo? Si no, no entra — usar glow en su lugar si hace falta conectar visualmente.

### Control de documento (reemplaza numeración editorial genérica 01/02/03)

En vez de números de sección "limpios" (que leen como el patrón genérico de IA), cada sección/sector lleva un identificador real:

```
DOC 0{n}[-{sub}]
```
Ejemplo: `DOC 02`, `DOC 04-A`

- Secuencial en todo el sitio, sectores de insight incluidos — un insight toma el siguiente número entero de la secuencia igual que una sección narrativa, **no** un sub-letra forzado. El sub-letra (`-A`, `-B`) queda solo para un sub-ítem real dentro de otra sección (ej. el proyecto destacado dentro de Proyectos), nunca como convención obligatoria para insights.
- **Texto plano, sin link** (decisión explícita del usuario, 2026-07-28 — el click-through a un commit específico de GitHub no aportaba información real al lector; se descartó ese easter egg). `DocControl` es un `<span>`, no un `<a>`.
- `REV {hash corto}` se muestra **una sola vez, en el masthead del Navbar** (`Rev. {hash} · {locale}`) — no se repite en cada sección, ver `src/components/Navbar.tsx`.
- Este es el **único** sistema de referencia documental del sitio (se descartó un sistema paralelo tipo "File ref P.01" por redundante — ver punto 8).

## 5. Marco de visor en imágenes (reemplaza el retinado/halftone)

**Reemplazado el 2026-10-24.** El retinado/halftone (capa fina de puntos simulando trama de impresión offset) se leía como ruido a tamaño web típico — competía con el detalle de la imagen en vez de servirlo. Se eliminó por completo (`.halftone-frame` y sus tokens, borrados de `globals.css`).

**Reemplazo**: marco de "visor" de cámara digital compacta — referencia real: Minolta Dimage S404, Olympus serie C/D, Fujifilm FinePix, ~2000-2002. Esas cámaras marcaban el área de enfoque con **brackets en las esquinas** del visor/LCD y señalizaban estado con un **LED verde/naranja** (verde = foco listo, naranja = cargando flash / riesgo de movimiento) — el mismo verde/naranja funcional que el sistema ya usa, no un color nuevo.

Implementado en `src/components/Viewfinder.tsx`, envolviendo la imagen (`<Image>`) que antes llevaba `.halftone-frame`:

- **Brackets de enfoque**: SVG a mano (`viewBox="0 0 100 100"`, `preserveAspectRatio="none"`), 4 `<polyline>` en las esquinas, `stroke="currentColor"` heredando `text-blue` (se adapta solo al tema), `vectorEffect="non-scaling-stroke"` para que el trazo no se distorsione en imágenes no cuadradas.
- **Punto LED**: esquina inferior derecha, `bg-green` + `.glow-green` — mismo vocabulario de punto-con-glow del resto del sitio (punto 2), nunca un color nuevo.
- **Blur sutil**: `filter: blur(0.35px)` aplicado **solo a la capa de la foto** (nunca a los brackets ni al punto, que son información y tienen que quedar siempre nítidos). Evoca la óptica más blanda de los sensores CCD de consumo de esa época. Verificado con una prueba A/B a tamaño normal vs. zoom 3× antes de aplicarlo: a tamaño normal es imperceptible, solo se nota ampliado — esa es la intención ("nadie que no lo esté buscando debería notarlo").

**Nunca se extiende** al fondo del documento ni al marco de 1px que rodea la imagen (`overflow: hidden` en el contenedor, igual que antes).

**Explícitamente descartado** (no reintroducir sin pedido explícito):
- El retinado/halftone en sí (ver arriba).
- Desregistro de color animado en scroll, cursor tipo lupa, grano de papel animado — seguían descartados ya desde el sistema anterior, siguen descartados ahora.
- Retinado de densidad variable multi-tono como tratamiento *estándar* de foto (sigue siendo válido solo como recurso de visualización de datos puntual si algún insight futuro lo justifica — ver punto 7).

**Variante no decidida — queda abierta** (ver "Notas abiertas"): una línea de metadata tipo exposición fotográfica (`F/2.8 · 1/125 · ISO 200`, en Space Mono, debajo de la imagen) se probó como variante "B" junto a la mínima ("A", solo brackets + punto). El sitio implementa **A** por defecto; no agregar la línea de exposición sin confirmación explícita del usuario, porque no se resolvió si suma información real o es decoración de más.

**Aplica a**: foto de perfil (`WhoAmI`), imagen del proyecto destacado (`Projects`). **No aplica a**: iconografía lineal, gráficos de datos en vivo con su propia codificación (punto 7), fondos de sección, paneles de UI, SVG/placeholder sin foto real.

## 6. Componentes por sección

**NavBar** (chrome persistente, no es una "sección" con su propio DOC):
- Eliminado el Hero/title-block (`DOC 00`, 2026-07-28) — no aportaba información que no estuviera ya en la navBar (nombre, REV/hash) o en "Sobre mí" (rol, en la primera línea de la bio). La navBar absorbió su rol de identificación.
- Nombre de marca a `text-2xl` (antes `text-base`) y la fila principal con más padding vertical (`py-6`) — más presencia que antes, pero sin reproducir el salto de escala grande que tenía el Hero (ver punto 3): el objetivo era aligerar la parte superior del sitio, no trasladarle el mismo peso visual a otro elemento.
- Barra superior (masthead): antes repetía el nombre (`{nombre} — Technical Dossier`, y "Technical Dossier" quedaba sin traducir en español); ahora solo `Technical Dossier`/`Dossier Técnico` — el nombre ya aparece una sola vez, en la fila principal.
- La fecha de build (`FECHA`) que mostraba el Hero no se reemplaza en ningún otro lugar — el REV/hash de la navBar ya cumple el rol de "dato real de build" visible.
- Sin vidrio, sin tratamiento especial de la segunda capa — el nav es chrome persistente, no un sector de datos ni una foto.

**Sobre mí**:
- Bio corta, ancho topeado, tono aspiracional puntual sin lenguaje de marketing.
- Foto con **marco de visor** (punto 5) en vez de retinado — `src/components/Viewfinder.tsx`.
- Los datos en vivo (GitHub, stack) viven en sus propios sectores de insight, no acá (ver abajo).

**Logros**:
- Timeline vertical, marcador de 5-6px por evento, mono type para fecha.
- Marcador: azul técnico (`border-blue bg-paper`) con **glow** (`.glow-blue`, 2026-10-24) — el hilo conector de la segunda capa, sin vidrio.
- Sin ilustración — sección puramente documental.

**Proyectos (resumen comparativo)** — **formato "Ledger" desde 2026-10-24**, reemplaza la tabla-grilla anterior:
- Cada proyecto es un registro apilado, no una fila de tabla: nombre en IBM Plex Sans 500 (`text-lg`) + punto de estado con glow a la derecha; debajo, una sola línea de metadata en Space Mono (stack · categoría con punto azul + glow · año); debajo, los links (demo/código) si existen.
- **Mismos campos que la tabla anterior, ningún dato se perdió** — solo cambió el layout de grilla-de-columnas a registro-apilado.
- El proyecto destacado conserva su acento (`border-l-2 border-l-blue`), ahora como borde izquierdo del nombre en vez de la celda.
- Implementado en `src/components/Projects.tsx`.

**Proyecto destacado**:
- Figura anotada (call-outs numerados ①②, nota técnica debajo) si el proyecto lo amerita — lugar típico para ilustración técnica secundaria o captura real con **marco de visor** (punto 5, no retinado).
- Ficha de metadata propia (mismo patrón de grilla).
- Datos en vivo propios del proyecto (uptime, requests) con el mismo tratamiento del punto 7, si existen.
- Única sección con licencia para más padding/aire, por concentrar más densidad de información.

### Sectores de insight — intercalados, no agrupados

Los gráficos con datos en tiempo real **no** se empaquetan dentro de "Sobre mí": son sectores independientes intercalados entre las secciones narrativas, para ganar heterogeneidad de ritmo.

- Cada sector lleva su propio control de documento (`DOC 0{n}`, el siguiente entero de la secuencia — sin sub-letra, ver punto 4).
- Se distingue de una sección narrativa por estar **enmarcado en vidrio** (`.glass-panel`, ver punto 4) — las secciones narrativas fluyen sin vidrio propio. Esa diferencia es la señal "esto es un dato, no prosa" (antes era solo un borde de 1px + `bg-panel`; desde 2026-10-24 es vidrio, pero la función — distinguir dato de prosa — es la misma).
- Corto por naturaleza: un dato o dos, su gráfico, nada de texto largo.
- **Regla de alternancia**: nunca dos sectores de insight consecutivos — siempre una sección narrativa entre medio.
- **Cantidad total recomendada**: 2-3 para un portfolio de este tamaño. Más que eso y el sitio se lee como dashboard en vez de documento con datos insertados.

Orden de referencia (ejemplo, no fijo) — refleja el estado real implementado:
```
DOC 01     — Sobre mí — bio + foto (marco de visor)
DOC 02     — insight: actividad GitHub (vidrio)
DOC 03     — Logros — timeline
DOC 04     — Proyectos — comparativo (formato ledger)
DOC 04-A   — Destacado — sub-ítem de Proyectos, no un sector de insight
DOC 05     — insight: frecuencia de stack tecnológico (vidrio, dentro de la
             columna derecha, debajo de Proyectos y su destacado — no full-width)
```

**Cómo se suman insights futuros**: no hay lista pre-planeada. Cada vez que se agregue uno nuevo: (1) completar la especificación del punto 7, (2) indicar explícitamente entre qué sectores existentes va, respetando la regla de alternancia, (3) actualizar la numeración de control de documento según su posición real, (4) decidir si entra en `glass-panel` (si es un sector de datos en vivo, por regla general sí).

## 7. Gráficos en vivo (datos en tiempo real)

Esto es lo que le da vida real al sitio — no la ilustración estática.

**Voz del copy (epígrafes, decks)**: siempre neutra, tercera persona — nunca "tu cuenta"/"tus contribuciones" ni ningún otro que se dirija al lector como si fuera el dueño del sitio. El dueño del sitio es quien presenta esta información a otras personas, no quien la recibe (decisión explícita del usuario, 2026-07-28). Describir el dato ("bytes de código por lenguaje en repositorios con contribuciones"), no narrar el proceso de obtenerlo en segunda persona.

**Regla general de "apagado visible" (generalizada 2026-10-24)**: en cualquier codificación de magnitud por segmentos/celdas, el estado "cero" o "sin dato" tiene que seguir siendo visible (opacidad baja, color atenuado) — nunca transparente/invisible. Es más fiel al instrumento real (un VU meter muestra toda la escala, no solo el valor) y evita que el gráfico se sienta vacío con pocos datos. Ya se cumplía en el calendario de GitHub (`level 0` = `bg-panel-2`, nunca transparente); se formalizó como regla general al construir `SegmentBar` (ver `DOC 05` abajo, segmentos apagados al 15% de opacidad en vez de invisibles).

### Especificación de un insight (completar antes de construir cualquiera, presente o futuro)

| Campo | Qué responde |
|---|---|
| Identificador | `DOC 0{n}` (siguiente entero de la secuencia; `-{sub}` solo si es un sub-ítem de otra sección) |
| Pregunta que responde | Qué debe entender el lector con un vistazo |
| Fuente de datos | API/origen concreto, pública/autenticada/scraping |
| Frecuencia de actualización | En vivo / cacheado con revalidación cada X / build-time |
| Codificación visual | Qué propiedad visual mapea a qué dato — nunca color de marca del origen |
| Formato de marco | `.glass-panel` (vidrio, ver punto 4) — todo insight de datos en vivo entra en esta regla |
| Estado | `implementado` / `roadmap` |

### Insights actuales

**`DOC 02` — Actividad de GitHub**
- Pregunta: ¿qué tan activo estoy escribiendo código, y cuándo?
- Fuente: API GraphQL de GitHub (`contributionsCollection`), incluye repos privados y de organización además de públicos (decisión explícita del usuario, 2026-07-27). Requiere un PAT **clásico** con scope `read:user` — un fine-grained PAT no sirve para esto: solo puede tener un resource owner (cuenta personal o una org, nunca ambos), así que nunca ve las dos fuentes en un mismo token.
- Frecuencia: **en vivo, en cada visita** (decisión explícita del usuario, no cacheado) — se consulta desde un Route Handler dedicado (`/api/github/contributions`, `runtime="nodejs"`, `dynamic="force-dynamic"`) llamado por el componente cliente, nunca desde el build ni desde un Server Component de la página. Esto mantiene el resto del sitio 100% estático (el fetch dinámico está aislado a esta única ruta, no vuelve dinámica a `/`).
- Codificación visual: **se replica la estructura exacta del gráfico original de GitHub** (grilla semana × día, labels de mes arriba, labels de día a la izquierda, leyenda "menos → más") — escala de 5 tonos con el **verde funcional del sistema** (`panel-2` → `green`, ver excepción documentada en el punto 2), no el verde de marca de GitHub (tono distinto, mate en vez de saturado). La celda de intensidad máxima (`level 4`) lleva `.glow-green` (2026-10-24).
- Marco: `.glass-panel` (2026-10-24, reemplaza `border border-line bg-panel`).
- **Decisión de forma (2026-10-24)**: al explorar la segunda capa se evaluó reemplazar esta grilla por un VU meter de columnas (igual que `DOC 05`), pero se descartó — la grilla semana×día es la forma correcta para 365 días de datos, un VU meter de pocas columnas no puede representar esa cantidad de puntos sin perder información. El vidrio y el glow sí se aplicaron; la forma del gráfico no cambió.
- Estado: `implementado`.

**`DOC 05` — Frecuencia de stack tecnológico**
- Pregunta: ¿qué tecnologías uso, y con qué frecuencia, medido por mi actividad real (no una lista puesta a mano)?
- Fuente: misma API GraphQL que `DOC 02`. `contributionsCollection.commitContributionsByRepository` da el peso por repo (días con commits del usuario en el último año — proxy barato de "cuánto aporté ahí", no el conteo literal de commits), y `repository.languages` el desglose en bytes por lenguaje de cada uno. El peso de cada repo se reparte entre sus lenguajes proporcional al tamaño en bytes (excluyendo del total los lenguajes filtrados, no solo del listado — ver abajo), se suma entre repos y se normaliza 0-100 contra el máximo. Un solo request GraphQL, sin N+1 por repo. Nombres de lenguaje que el linguist de GitHub separa pero son la misma tecnología (`Dockerfile` → `Docker`) se unifican antes de agregar — ver `LANGUAGE_ALIASES` en `src/lib/github/index.ts`.
- **Filtro de relevancia (2026-07-28)**: `Shell`, `Makefile`, `Docker`/`Dockerfile` y `Batchfile` se excluyen — son archivos de infraestructura/build que el linguist detecta como "lenguaje" pero no son stack real (decisión explícita del usuario). No es un umbral numérico (ni por bytes crudos ni por score): un umbral habría descartado también `CSS`/`JavaScript`, que sí son stack real aunque tengan valores bajos. Lista curada en `STACK_EXCLUDE`, `src/lib/github/index.ts` — extender ahí si aparece otro caso, no inventar una regla numérica.
- **Nota de scope (2026-07-28)**: a diferencia de `DOC 02`, acá `read:user` **no alcanza** para incluir repos privados/de organización — el conteo agregado del calendario no necesita resolver el objeto `Repository`, pero leer `languages` sí, y eso exige que el token tenga lectura real sobre ese repo específico. Con solo `read:user` este insight cae de vuelta a "solo públicos" aunque el calendario (`DOC 02`) ya vea todo. Para que ambos coincidan en alcance hace falta el scope clásico `repo` (de lectura/escritura — un clásico no tiene un "repo read-only" separado).
- Frecuencia: en vivo en cada visita, misma ventana de 1 año que `DOC 02` (decisión explícita del usuario, 2026-07-28 — consistencia entre ambos insights) — `/api/github/stack`, mismo patrón de Route Handler dinámico aislado que `DOC 02`.
- Codificación visual: **`SegmentBar`** (2026-10-24, `src/components/SegmentBar.tsx`) — escalera de 20 segmentos discretos en azul técnico, reemplaza la barra sólida anterior. Segmentos apagados visibles al 15% de opacidad (`bg-blue/15`), nunca invisibles — ver regla general de "apagado visible" arriba. Es magnitud, no severidad: usa el azul técnico, nunca el verde/naranja/rojo funcional (ver punto 2, "un mismo color mantiene su significado"). Ordenadas de mayor a menor, top 8 tecnologías.
- Marco: `.glass-panel` (2026-10-24, reemplaza `border border-line bg-panel`).
- Estado: `implementado`.

### Ilustración técnica (isométrica, exploded-view, figuras anotadas)

Recurso secundario y acotado:
- Solo cuando hay algo estructural genuino que un gráfico de datos no puede mostrar (arquitectura de sistema, diagrama de vector de ataque, corte de un mecanismo).
- No es pieza obligatoria de portada — esa responsabilidad la llevan los datos en vivo.
- Reglas si aparece: una sola fuente de luz si tiene volumen, máximo 4-5 tonos, contenida a su propio marco, volumen con planos de color (nunca gradiente suave/glow).

## 8. Bordes, iconografía y micro-detalles

**Bordes**: reglas de 1px en todo el sistema, **incluido el vidrio** (punto 4) — el material cambia, la geometría (sin radius, sin sombra proyectada hacia afuera) no. Única excepción: acento de 2px reservado para "featured/recomendado" (hoy: borde izquierdo del nombre en el formato ledger de Proyectos). Sin cards flotantes, sin bordes gruesos.

**Iconografía**: mínima — líneas, símbolos geométricos, flechas (`→`), indicadores de estado (puntos de 5-6px, con glow desde 2026-10-24), marcas de callout (`①②`). Nada skeuomórfico, nada a color fuera de la paleta funcional. Nunca librería de iconos genérica — se dibuja con el mismo lenguaje de línea fina.
- **Instancia nueva (2026-10-24)**: los brackets de enfoque del marco de visor (punto 5) son SVG a mano (`<polyline>`, `currentColor`, sin librería) — mismo principio que el resto de la iconografía del sistema, aplicado a un elemento nuevo.

**Detalles documentales**:
- Control de documento con datos reales (punto 4) — el único sistema de referencia del sitio.
- `Fig. 01/02` para figuras anotadas — se mantiene, tiene función real.
- **Eliminado**: `File ref P.01` — quedaba redundante frente al control de documento.
- **Eliminado (2026-10-24)**: retinado/halftone — ver punto 5.

## 9. Movimiento y animación

**Regla general**: animación casi invisible, nunca protagonista. Si no tiene una metáfora documental clara (imprimir, revelar un dato, actualizar una revisión), probablemente no entra.

**Dónde sí anima**:
- Sectores de insight actualizándose: crossfade corto de valor viejo a nuevo — nunca un contador que cuenta hacia arriba.
- Hover en elementos cliqueables reales (links, filas/registros de Proyectos — el control de documento ya **no** es uno de ellos, ver punto 4): cambio de color/borde sutil, sin scale ni desplazamiento.
- Foco de teclado: siempre visible, no negociable.
- Carga inicial: fade-in breve y uniforme de toda la página, nunca escalonado ni con desplazamiento.

**Explícitamente fuera del sistema**:
- Scroll-triggered reveals, parallax, scale exagerado
- Contadores animados en números
- Animación en loop o que "respira" de fondo
- Transiciones de página con movimiento (slide, wipe)
- Desregistro de color en scroll, cursor tipo lupa (ver punto 5)

**Roadmap explícito (2026-10-24)**: animar el `SegmentBar` / el VU meter — prender/apagar segmentos en el tiempo en vez de solo mostrarlos estáticos — es el próximo paso pedido por el usuario, fuera de alcance de esta iteración. `SegmentBar` ya está estructurado como un componente centralizado (no markup repetido) justamente para que esa animación se implemente en un solo lugar cuando llegue el momento. No implementar todavía sin que se confirme la dirección (qué dispara la animación, con qué duración, si respeta `prefers-reduced-motion` igual que el fade-in de carga).

## Notas abiertas

- **Variante B del marco de visor** (línea de metadata tipo exposición fotográfica, `F/2.8 · 1/125 · ISO 200`, debajo de la foto) — no decidida. El sitio implementa la variante mínima (A). Ver punto 5.
- **Animación de `SegmentBar`/VU meter** — próxima iteración explícita, ver punto 9.
- **Deploy a Vercel pendiente de verificación** — esta capa se implementó y se validó con `tsc --noEmit` + `next build` + `eslint`, pero los dos insights en vivo (`DOC 02`, `DOC 05`) no se pudieron ver localmente por falta de `GITHUB_TOKEN` en `.env.local`. Verificar visualmente contra el deploy de Vercel (que sí tiene el token) antes de confirmar que el vidrio y el `SegmentBar` se ven como se espera con datos reales.

Si surge una decisión pendiente nueva, documentarla acá con fecha antes de implementar.
