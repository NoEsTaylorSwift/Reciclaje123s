# EcoGuía

Sitio web educativo de varias páginas para aprender a separar residuos de uso común. Incluye una bienvenida, una guía interactiva, un planificador inteligente, reconocimiento visual con cámara, un asistente local llamado EcoIA, recetas de supra-reciclaje, cálculo de impacto ambiental y una zona de juegos.

## Uso local

No requiere instalación ni base de datos. Abre `index.html` directamente en el navegador o inicia un servidor estático:

```powershell
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## Tecnologías

- HTML5 semántico
- CSS3 adaptable a móviles
- JavaScript sin dependencias
- `localStorage` para guardar puntuaciones, EcoPuntos y el plan doméstico

## Archivos

- `index.html`: bienvenida y acceso a cada experiencia
- `aprender.html`: guía visual y regla de las 3R
- `estacion.html`: planificador de la estación doméstica
- `ecoscan.html`: clasificación de fotografías con IA
- `ecoia.html`: asistente local para consultar residuos
- `upcycling.html`: generador de proyectos de supra-reciclaje por texto o fotografía
- `upcycling.js`: recetas, selección segura y análisis visual de objetos para EcoCrea
- `impacto.html`: historial mensual y calculadora de impacto ambiental
- `impacto.js`: almacenamiento local, equivalencias, comparaciones y análisis del historial
- `juegos.html`: zona de juegos y perfil de EcoPuntos
- `etica.html`: compromiso ético, privacidad, límites de la IA y control de datos
- `styles.css`: diseño adaptable, componentes e ilustraciones
- `app.js`: lógica de las herramientas educativas
- `games.js`: lógica de los tres juegos
- `site.js`: navegación y animaciones compartidas

## Funciones principales

- Guía visual de cinco familias de residuos
- Planificador que recomienda contenedores y una rutina según el hogar
- Cálculo del porcentaje de residuos potencialmente recuperables
- EcoScan IA para reconocer residuos mediante cámara o fotografía
- Asistente local para consultar objetos comunes
- EcoCrea genera proyectos paso a paso para reutilizar ropa, madera, vidrio, plástico y otros objetos
- EcoImpacto guarda kilos por material y estima CO₂ evitado, energía, agua y árboles equivalentes
- Reto educativo con explicaciones y puntuación
- Clasificación rápida de diez residuos
- Memoria ecológica que relaciona objetos con categorías
- Juego de mito o realidad con explicaciones
- Perfil por niveles con EcoPuntos guardados localmente

## EcoScan IA

EcoScan usa TensorFlow.js con dos modelos: COCO-SSD localiza objetos comunes y MobileNet V2 (alpha 1.0) aporta una segunda clasificación. El analizador valida iluminación, detalle y resolución; compara la imagen completa con un recorte del objeto; y solo presenta una categoría cuando existe suficiente confianza o acuerdo entre señales. Las imágenes grandes se redimensionan antes del análisis para reducir memoria y tiempo de inferencia.

La fotografía no se envía a un servidor. Los modelos se descargan cuando la persona abre la cámara o elige una foto, por lo que el primer análisis necesita conexión a internet. La cámara requiere abrir la página desde HTTPS o `localhost`.

Para probar la cámara desde GitHub, activa **Settings → Pages → Deploy from a branch**, elige `main` y la carpeta raíz. GitHub Pages publicará el proyecto con HTTPS, requisito del navegador para solicitar acceso a la cámara.

Los modelos reconocen objetos generales y EcoGuía los relaciona con categorías de reciclaje. Cuando una forma puede pertenecer a varios materiales —por ejemplo, una botella— el sistema solicita una confirmación breve. Si la foto es demasiado pequeña, oscura o sobreexpuesta, pide repetirla; si los modelos discrepan, devuelve un resultado no concluyente en lugar de adivinar. El resultado muestra su confianza y debe comprobarse con las reglas municipales.

## Nota sobre EcoIA

EcoIA funciona completamente en el navegador con una base de conocimiento local de residuos comunes. Sus recomendaciones son educativas; las reglas exactas de recolección pueden variar según cada municipio.

## EcoImpacto

La calculadora guarda el historial únicamente en el navegador y resume cada mes de forma automática. Para papel, plástico, vidrio, metal y mezclas usa como referencia la diferencia entre reciclaje y vertedero para materiales reciclables mixtos del modelo WARM v16 de la EPA: 3.119 kg de CO₂e y 4.81 kWh por kilogramo. Las equivalencias de agua (29.2 L/kg) y árboles (0.0187/kg) se aplican solo a papel y cartón. Los electrónicos se incluyen en el peso, pero no reciben equivalencias por la variación de su composición y tratamiento.

Estas cifras son promedios educativos de Estados Unidos y no sustituyen una medición de ciclo de vida ni una auditoría ambiental local. La página enlaza directamente a las fuentes y explica los límites del cálculo.

## Ética, privacidad y transparencia

EcoGuía toma como referencia el [Código de Ética y Conducta Profesional de la ACM](https://www.acm.org/binaries/content/assets/about/codigo-de-etica-y-conducta-profesional-de-acm.pdf), sin afirmar certificación, afiliación ni aprobación de la ACM. La aplicación convierte sus principios en decisiones comprobables:

- bien público: educación ambiental gratuita, sin cuentas ni publicidad;
- prevención de daños: los residuos peligrosos se derivan a gestores autorizados y la IA puede responder «no concluyente»;
- honestidad: se informan la confianza, las limitaciones de los modelos y la variación de reglas municipales;
- inclusión: HTML semántico, navegación por teclado, textos alternativos, diseño adaptable y respeto a la reducción de movimiento;
- privacidad: las consultas y fotografías no se guardan; solo el plan, el progreso y el historial de impacto permanecen en `localStorage`;
- control: `etica.html` permite revisar y borrar todos los datos locales creados por EcoGuía;
- minimización: los pesos de los modelos visuales se solicitan únicamente cuando se inicia una interacción con EcoScan.

El sitio no incluye cuentas, anuncios, analítica ni rastreadores propios. Google Fonts entrega las tipografías. EcoScan obtiene TensorFlow.js, COCO-SSD y MobileNet mediante jsDelivr y los proveedores de los modelos; esos servicios pueden recibir los datos técnicos normales de una conexión web, pero EcoGuía no les envía la fotografía.

## Dependencias y atribución

- [TensorFlow.js](https://github.com/tensorflow/tfjs), licencia Apache-2.0
- [COCO-SSD para TensorFlow.js](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd), licencia Apache-2.0
- [MobileNet para TensorFlow.js](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet), licencia Apache-2.0
- Tipografías DM Sans y Manrope servidas por [Google Fonts](https://fonts.google.com/)
