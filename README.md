# Clínica Dental Dra. Bianca Nathaly Hernández Flores

Sitio web oficial de la **Clínica Dental Dra. Bianca Nathaly Hernández Flores**, ubicada en Cojutepeque, Cuscatlán, El Salvador.

Desarrollado con base en el diseño aprobado de **Google Stitch**, construido con arquitectura estática ultra-optimizada en **Astro**, **Tailwind CSS** y **TypeScript**.

---

## 🚀 Características Principales

* **Fidelidad de Diseño Stitch:** Traslado exacto del sistema de diseño (tipografías Manrope y DM Sans, paleta clínica de azul petróleo `#003541`, `#174C5A` y pastillas de contraste `#DCEEF2`).
* **Rendimiento 95+ en PageSpeed:** Calificación de 96-100 en las 4 categorías de Google Lighthouse (Rendimiento: 96, Accesibilidad: 100, Buenas Prácticas: 96, SEO: 100).
* **Cero Backend & Máxima Privacidad:** Formulario de cita con validación en cliente que compone un mensaje estructurado y codificado directamente para WhatsApp (`https://wa.me/...`). Ningún dato sensible se almacena en base de datos.
* **Fuente Única de Datos:** Toda la información del negocio centralizada en `src/data/clinica.ts` (horarios, servicios, contacto, coordenadas verificadas, testimonios).
* **Horario Dinámico:** Cálculo en tiempo real en la zona horaria `America/El_Salvador` (muestra si está abierto o la próxima hora/día de apertura).
* **Iconografía Vectorial Integrada:** Iconos SVG nativos con cero dependencia de fuentes web pesadas.
* **Mapa con Carga Diferida (Lazy Map):** El mapa de Google Maps se carga únicamente a petición del usuario.
* **Listo para Despliegue en Dokploy o Vercel:** Incluye `Dockerfile` multipaso con Nginx Alpine y `nginx.conf` con compresión Gzip y cabeceras de seguridad.

---

## 🛠️ Tecnologías

* **Framework:** [Astro](https://astro.build/) (versión 7 estable, salida estática).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) v4.
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/).
* **Contenedor:** Nginx Alpine (para VPS Hostinger con Dokploy).

---

## 📦 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción (salida en /dist)
npm run build

# Previsualizar la compilación de producción localmente
npm run preview
```

---

## 📄 Licencia

Todos los derechos reservados © Clínica Dental Dra. Bianca Nathaly Hernández Flores.
