# Under Construction — Dragonfly Tech Solutions

Componente Angular 18+ standalone, completamente responsivo y con estética cyberpunk/futurista alineada a la identidad de Dragonfly Tech Solutions.

## Archivos

```
under-construction/
├── under-construction.component.ts    # Lógica + animación de partículas
├── under-construction.component.html  # Template con SVG del dragonfly y mockup
└── under-construction.component.scss  # Estilos con tokens de diseño
```

## Integración rápida

### 1. Copia la carpeta al proyecto

```bash
cp -r under-construction/ src/app/features/
```

### 2. Registra la ruta en app.routes.ts

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/under-construction/under-construction.component')
        .then(m => m.UnderConstructionComponent),
  },
  // tus otras rutas...
];
```

### 3. Asegúrate de tener el reset base en styles.scss

```scss
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 100%; min-height: 100vh; background: #020b18; }
```

### 4. Google Fonts (opcional si no usas SSR)

El componente importa las fuentes desde Google Fonts via @import en el SCSS.
Si usas SSR o prefieres cargarlas en el HTML:

```html
<!-- En index.html, dentro de <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&family=Space+Mono&display=swap" rel="stylesheet">
```

## Diseño

| Token         | Valor         |
|---------------|---------------|
| Color primario| `#00e5ff` (cyan)|
| Color secundario | `#7c4dff` (purple) |
| Color acento  | `#ff6b9d` (pink) |
| Fondo base    | `#020b18`     |
| Tipografía display | Orbitron |
| Tipografía body | Rajdhani |
| Tipografía mono | Space Mono |

## Características

- Canvas con sistema de partículas animadas + red de conexiones
- Dragonfly SVG animado con efecto hover flotante
- Mockup SVG de dashboard (alusivo al producto)
- Anillo orbital con puntos de colores girando
- Headline con gradiente texto cyan → purple
- CTA button con efecto glow hover
- Grid overlay con perspectiva radial
- Totalmente responsive (mobile/tablet/desktop)
- Sin dependencias externas (solo Angular core)

## Angular Version

Compatible con Angular 17+ (standalone components).
