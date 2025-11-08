# 🎓 Proyecto de Tesis - Diseño de un Sistema web para mejorar el flujo de la información 

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 📋 Objetivo general:

Diseñar y Desarrollar un sistema web para mejorar la gestión y el flujo de la información
de los proyectos, teniendo como finalidad mejorar el desempeño y comunicación de todos los
miembros del área asimismo viéndose reflejada la mejora en la calidad del producto.


## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- Sistema de login con validación en tiempo real
- Validación de correo electrónico con expresiones regulares
- Gestión de sesiones de usuario
- Recuperación de contraseña mediante contacto con administrador
- Checkbox de aceptación de términos y condiciones

### 🎨 Diseño Moderno
- Interfaz basada en diseño Figma profesional
- Gradiente animado de fondo
- Logos decorativos con animaciones suaves
- Efectos hover y transiciones fluidas
- Diseño completamente responsive (Desktop, Tablet, Móvil)

### 🔍 Validaciones Inteligentes
- Validación de formato de correo electrónico
- Indicadores visuales de estado de campos (válido/inválido)
- Mensajes de error contextuales
- Botón de submit deshabilitado hasta completar todos los campos
- Toggle de visibilidad de contraseña

### 🎬 Animaciones
- Gradiente de fondo animado (15 segundos)
- Logos con efecto de flotación
- Animaciones de entrada (fade in/down/up)
- Efectos de rebote y shake
- Pulso suave en elementos interactivos

## 🛠️ Tecnologías Utilizadas

### Frontend Framework
- **React 19.1.1** - Librería para construir interfaces de usuario
- **TypeScript 5.9.3** - Superset de JavaScript con tipado estático
- **Vite 7.2.2** - Build tool y dev server ultra-rápido con HMR

### Estilos
- **CSS3** - Estilos modernos con variables CSS
- **CSS Variables** - Sistema de theming customizable
- **Flexbox & Grid** - Layouts responsive
- **Keyframe Animations** - Animaciones nativas CSS

### Desarrollo
- **ESLint 9.36.0** - Linter para mantener calidad de código
- **Git** - Control de versiones
- **VS Code** - Editor de código recomendado

### Diseño
- **Figma** - Diseño de interfaces (fuente de assets)
- **Google Fonts** - Fuentes: Poppins, Space Grotesk

## 📁 Estructura del Proyecto

```
proyecto_tesis_dl/
├── public/                 # Archivos públicos estáticos
├── src/
│   ├── assets/            # Imágenes y recursos
│   ├── App.tsx            # Componente raíz
│   ├── App.css            # Estilos globales de App
│   ├── main.tsx           # Punto de entrada
│   ├── index.css          # Estilos globales base
│   ├── PaginaInicio.tsx   # Componente de Login
│   └── PaginaInicio.css   # Estilos del Login
├── .gitignore
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración TypeScript
├── vite.config.ts         # Configuración Vite
├── eslint.config.js       # Configuración ESLint
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18.x o superior
- npm 9.x o superior (o yarn/pnpm)
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/DiegoCross7/PROYECTO-TESIS-DL.git
cd proyecto_tesis_dl
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 📜 Scripts Disponibles

```bash
# Modo desarrollo con HMR
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 🎨 Paleta de Colores

```css
--color-primario: #d43371      /* Rosa principal */
--color-secundario: #e1bde2    /* Morado claro */
--color-acento: #72c8e5        /* Azul cielo */
--color-exito: #4caf50         /* Verde éxito */
--color-error: #f44336         /* Rojo error */
--color-advertencia: #ff9800   /* Naranja advertencia */
```

## 📱 Responsive Breakpoints

| Dispositivo | Ancho | Características |
|-------------|-------|----------------|
| Desktop | > 1024px | Diseño completo con todos los elementos |
| Tablet | 768px - 1024px | Logos reducidos, layout adaptado |
| Tablet pequeño | 480px - 768px | Layout vertical, elementos compactos |
| Móvil | < 480px | Logos ocultos, diseño optimizado |

## 🔮 Características Futuras

### Backend Integration
- [ ] Conexión con API REST para autenticación
- [ ] Sistema de gestión de sesiones
- [ ] Recuperación de contraseña por email
- [ ] Registro de nuevos usuarios

### Funcionalidades Adicionales
- [ ] Dashboard de usuario
- [ ] Módulos de aprendizaje
- [ ] Sistema de notificaciones
- [ ] Análisis con Deep Learning
- [ ] Reportes y estadísticas

## 🔗 Enlaces Útiles

- [Diseño en Figma](https://www.figma.com/design/QqGcENnGAmNUJb159JNsqs/)
- [GitHub - DiegoCross7](https://github.com/DiegoCross7)
- [Documentación React](https://react.dev/)
- [Documentación Vite](https://vitejs.dev/)
- [Documentación TypeScript](https://www.typescriptlang.org/)
- [Instituto SENATI](https://www.senati.edu.pe/)

## 📞 Contacto

**Diego Gabriel**
- 📧 Email: diegogabrielcentenpfalcon7@gmail.com
- 📱 WhatsApp: +51 946595031
- 💼 GitHub: [@DiegoCross7](https://github.com/DiegoCross7)
- 🏫 Institución: SENATI

---

**Nota**: Este es un proyecto en desarrollo activo. Las funcionalidades y características están sujetas a cambios.