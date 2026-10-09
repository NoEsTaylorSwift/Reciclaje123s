# EcoGuía

Sitio web educativo para aprender a separar residuos de uso común. Incluye una guía interactiva, un planificador inteligente para organizar una estación doméstica, reconocimiento visual con cámara, un asistente local llamado EcoIA y un reto de cinco preguntas.

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
- `localStorage` para guardar el mejor resultado del reto y el plan doméstico

## Funciones principales

- Guía visual de cinco familias de residuos
- Planificador que recomienda contenedores y una rutina según el hogar
- Cálculo del porcentaje de residuos potencialmente recuperables
- EcoScan IA para reconocer residuos mediante cámara o fotografía
- Asistente local para consultar objetos comunes
- Reto educativo con explicaciones y puntuación

## EcoScan IA

EcoScan usa TensorFlow.js y MobileNet para reconocer objetos directamente en el navegador. La fotografía no se envía a un servidor. El primer análisis necesita conexión a internet para descargar el modelo y la cámara requiere abrir la página desde HTTPS o `localhost`.

Para probar la cámara desde GitHub, activa **Settings → Pages → Deploy from a branch**, elige `main` y la carpeta raíz. GitHub Pages publicará el proyecto con HTTPS, requisito del navegador para solicitar acceso a la cámara.

MobileNet reconoce objetos generales y EcoGuía los relaciona con categorías de reciclaje. El resultado muestra su confianza y debe confirmarse observando el material real y las reglas municipales.

## Nota sobre EcoIA

EcoIA funciona completamente en el navegador con una base de conocimiento local de residuos comunes. Sus recomendaciones son educativas; las reglas exactas de recolección pueden variar según cada municipio.
