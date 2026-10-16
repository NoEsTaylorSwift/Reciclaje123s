# EcoGuía

Sitio web educativo de varias páginas para aprender a separar residuos de uso común. Incluye una bienvenida, una guía interactiva, una experiencia que une la estación doméstica con el cálculo de impacto, una herramienta que reúne escáner, consultas y recetas de supra-reciclaje, y una zona de juegos.

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
- `estacion.html`: planificador doméstico, historial de reciclaje y calculadora de impacto en un mismo recorrido
- `ecoscan.html`: flujo continuo para escribir o fotografiar un objeto, recibir orientación, obtener ideas de reutilización, separarlo y calcular su impacto
- `ecoia.html` y `upcycling.html`: vistas anteriores conservadas por compatibilidad
- `upcycling.js`: recetas, selección segura y análisis visual para reutilización
- `unified.js`: navegación interna y transferencia de resultados entre identificación, ideas, estación y cálculo de impacto
- `impacto.html`: redirección de compatibilidad hacia la sección integrada
- `impacto.js`: almacenamiento local, equivalencias, comparaciones y análisis del historial
- `juegos.html`: zona de juegos y perfil de EcoPuntos
- `etica.html`: compromiso ético, privacidad, límites de la IA y control de datos
- `styles.css`: diseño adaptable, componentes e ilustraciones
- `app.js`: lógica de las herramientas educativas
- `games.js`: lógica de los tres juegos
- `site.js`: navegación y animaciones compartidas

## Funciones principales

- Guía visual de cinco familias de residuos
- Estación e impacto: recomienda contenedores y una rutina, registra los kilos reales y calcula el resultado ambiental en la misma página
- Herramienta IA unificada en un solo recorrido: entrada por texto o fotografía, respuesta del asistente, idea automática de reutilización o acción segura, recomendación de estación y registro de impacto
- EcoImpacto guarda kilos por material y estima CO₂ evitado, energía, agua y árboles equivalentes
- Reto educativo con explicaciones y puntuación
- Clasificación rápida de diez residuos
- Memoria ecológica que relaciona objetos con categorías
- Juego de mito o realidad con explicaciones
- Perfil por niveles con EcoPuntos guardados localmente

## Herramienta IA integrada

El escáner usa TensorFlow.js con dos modelos: COCO-SSD localiza objetos comunes y MobileNet V2 (alpha 1.0) aporta una segunda clasificación. El analizador valida iluminación, detalle y resolución; compara la imagen completa con un recorte del objeto; y solo presenta una categoría cuando existe suficiente confianza o acuerdo entre señales. Las imágenes grandes se redimensionan antes del análisis para reducir memoria y tiempo de inferencia. Los mismos modelos se reutilizan en la función de fotografía del generador para evitar una segunda carga.

La fotografía no se envía a un servidor. Los modelos se descargan cuando la persona abre la cámara o elige una foto, por lo que el primer análisis necesita conexión a internet. La cámara requiere abrir la página desde HTTPS o `localhost`.

Para probar la cámara desde GitHub, activa **Settings → Pages → Deploy from a branch**, elige `main` y la carpeta raíz. GitHub Pages publicará el proyecto con HTTPS, requisito del navegador para solicitar acceso a la cámara.

Los modelos reconocen objetos generales y EcoGuía los relaciona con categorías de reciclaje. Cuando una forma puede pertenecer a varios materiales —por ejemplo, una botella— el sistema solicita una confirmación breve. Si la foto es demasiado pequeña, oscura o sobreexpuesta, pide repetirla; si los modelos discrepan, devuelve un resultado no concluyente en lugar de adivinar. El resultado muestra su confianza, omite las etiquetas internas de los modelos y debe comprobarse con las reglas municipales.

La página explica de forma explícita que los modelos actuales son generales y no fueron entrenados con un conjunto propio de residuos locales. También documenta el proceso recomendado para crear un clasificador especializado: recolectar y etiquetar imágenes autorizadas, entrenar, validar con fotografías nunca vistas, medir errores por clase y reentrenar con ejemplos difíciles. La retroalimentación del usuario no se guarda ni se usa para entrenar sin consentimiento.

## Nota sobre el asistente y las recetas

El asistente funciona completamente en el navegador con una base de conocimiento local de residuos comunes. El generador selecciona y adapta proyectos de una biblioteca local revisada. Estas dos partes no son modelos generativos entrenados, y sus recomendaciones son educativas; las reglas exactas de recolección pueden variar según cada municipio.

## EcoImpacto

La calculadora guarda el historial únicamente en el navegador y resume cada mes de forma automática. Para papel, plástico, vidrio, metal y mezclas usa como referencia la diferencia entre reciclaje y vertedero para materiales reciclables mixtos del modelo WARM v16 de la EPA: 3.119 kg de CO₂e y 4.81 kWh por kilogramo. Las equivalencias de agua (29.2 L/kg) y árboles (0.0187/kg) se aplican solo a papel y cartón. Los electrónicos, orgánicos, textiles, madera, muebles y residuos generales se incluyen en el peso, pero no reciben equivalencias por la variación de su composición y tratamiento. El historial es compartido: un registro creado desde la herramienta IA aparece también en la página Estación e impacto.

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
