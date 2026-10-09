# EcoGuía

Sitio web educativo para aprender a separar residuos de uso común. Incluye una guía interactiva, un planificador inteligente para organizar una estación doméstica, un asistente local llamado EcoIA y un reto de cinco preguntas.

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
- Asistente local para consultar objetos comunes
- Reto educativo con explicaciones y puntuación

## Nota sobre EcoIA

EcoIA funciona completamente en el navegador con una base de conocimiento local de residuos comunes. Sus recomendaciones son educativas; las reglas exactas de recolección pueden variar según cada municipio.
