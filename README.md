# EcoGuía

Sitio web educativo de varias páginas para aprender a separar residuos de uso común. Incluye una bienvenida, una guía interactiva, un planificador inteligente, reconocimiento visual con cámara, un asistente local llamado EcoIA y una zona de juegos.

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
- `juegos.html`: zona de juegos y perfil de EcoPuntos
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
- Reto educativo con explicaciones y puntuación
- Clasificación rápida de diez residuos
- Memoria ecológica que relaciona objetos con categorías
- Juego de mito o realidad con explicaciones
- Perfil por niveles con EcoPuntos guardados localmente

## EcoScan IA

EcoScan usa TensorFlow.js con dos modelos: COCO-SSD localiza objetos comunes y MobileNet aporta una clasificación alternativa. La fotografía no se envía a un servidor. El primer análisis necesita conexión a internet para descargar los modelos y la cámara requiere abrir la página desde HTTPS o `localhost`.

Para probar la cámara desde GitHub, activa **Settings → Pages → Deploy from a branch**, elige `main` y la carpeta raíz. GitHub Pages publicará el proyecto con HTTPS, requisito del navegador para solicitar acceso a la cámara.

Los modelos reconocen objetos generales y EcoGuía los relaciona con categorías de reciclaje. Cuando una forma puede pertenecer a varios materiales —por ejemplo, una botella— el sistema solicita una confirmación breve. El resultado muestra su confianza y debe comprobarse con las reglas municipales.

## Nota sobre EcoIA

EcoIA funciona completamente en el navegador con una base de conocimiento local de residuos comunes. Sus recomendaciones son educativas; las reglas exactas de recolección pueden variar según cada municipio.
