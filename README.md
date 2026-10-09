# EcoGuía

Sitio web educativo para aprender a separar residuos de uso común. Incluye una guía interactiva, un asistente local llamado EcoIA y un reto de cinco preguntas.

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
- `localStorage` para guardar el mejor resultado del reto

## Nota sobre EcoIA

EcoIA funciona completamente en el navegador con una base de conocimiento local de residuos comunes. Sus recomendaciones son educativas; las reglas exactas de recolección pueden variar según cada municipio.
