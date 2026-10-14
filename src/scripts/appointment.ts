import { clinica } from '../data/clinica';
import { obtenerEstadoHorario } from './schedule-status';

export function inicializarInteracciones(): void {
  // 1. Actualizar indicador dinámico de horario
  const badgeEstado = document.getElementById('estado-horario-badge');
  const dotEstado = document.getElementById('estado-horario-dot');
  const textoEstado = document.getElementById('estado-horario-texto');

  if (textoEstado && dotEstado) {
    const estado = obtenerEstadoHorario();
    textoEstado.textContent = estado.mensaje;
    if (estado.abierto) {
      dotEstado.className = 'w-2 h-2 rounded-full bg-[#2A7E64] animate-pulse';
    } else {
      dotEstado.className = 'w-2 h-2 rounded-full bg-slate-400';
    }
    if (badgeEstado) {
      badgeEstado.setAttribute('title', `Horario según zona ${clinica.zonaHoraria}`);
    }
  }

  // 2. Preselección de servicio desde los botones "Pedir cita" de las tarjetas
  const selectServicio = document.getElementById('servicio-select') as HTMLSelectElement | null;
  const botonesPedirCita = document.querySelectorAll<HTMLElement>('[data-servicio-id]');

  botonesPedirCita.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const servicioId = btn.getAttribute('data-servicio-id');
      if (selectServicio && servicioId) {
        selectServicio.value = servicioId;
      }
      // Scroll suave hacia el formulario
      const formularioSection = document.getElementById('formulario-cita');
      if (formularioSection) {
        formularioSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 3. Formulario "Pide tu cita" con envío a WhatsApp
  const formCita = document.getElementById('form-cita') as HTMLFormElement | null;
  if (formCita) {
    formCita.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombreInput = document.getElementById('cita-nombre') as HTMLInputElement | null;
      const telefonoInput = document.getElementById('cita-telefono') as HTMLInputElement | null;
      const servicioInput = document.getElementById('servicio-select') as HTMLSelectElement | null;
      const fechaInput = document.getElementById('cita-fecha') as HTMLInputElement | null;
      const horarioInput = document.getElementById('cita-horario') as HTMLSelectElement | null;
      const comentarioInput = document.getElementById('cita-comentario') as HTMLTextAreaElement | null;

      const nombre = nombreInput?.value.trim() || '';
      const telefono = telefonoInput?.value.trim() || '';
      const servicioSeleccionado = servicioInput?.options[servicioInput.selectedIndex]?.text || 'Consulta general';
      const fecha = fechaInput?.value || 'Lo antes posible';
      const horario = horarioInput?.value || 'Cualquier horario';
      const comentario = comentarioInput?.value.trim() || '';

      if (!nombre || !telefono) {
        alert('Por favor completa tu nombre y número de teléfono.');
        return;
      }

      // Componer mensaje de WhatsApp formal y amigable
      let mensaje = `¡Hola Dra. Bianca Nathaly! 👋\n`;
      mensaje += `Deseo solicitar una cita en la Clínica Dental:\n\n`;
      mensaje += `• *Paciente:* ${nombre}\n`;
      mensaje += `• *Teléfono de contacto:* ${telefono}\n`;
      mensaje += `• *Servicio solicitado:* ${servicioSeleccionado}\n`;
      mensaje += `• *Día preferido:* ${fecha}\n`;
      mensaje += `• *Horario de preferencia:* ${horario}\n`;
      if (comentario) {
        mensaje += `• *Comentario o motivo:* ${comentario}\n`;
      }
      mensaje += `\n¿Tienen disponibilidad en esa fecha? ¡Muchas gracias!`;

      // Codificación estricta de URI para caracteres latinos, saltos de línea y emojis
      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsapp = `https://wa.me/${clinica.whatsappNumeroLimpio}?text=${mensajeCodificado}`;

      // Abrir WhatsApp en nueva pestaña
      window.open(urlWhatsapp, '_blank', 'noopener,noreferrer');
    });
  }

  // 4. Acordeón accesible para Preguntas Frecuentes (FAQ)
  const faqToggles = document.querySelectorAll<HTMLButtonElement>('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const content = toggle.nextElementSibling as HTMLElement | null;
      const icon = toggle.querySelector<HTMLElement>('.faq-icon');

      if (!content) return;

      if (isExpanded) {
        toggle.setAttribute('aria-expanded', 'false');
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        // Cerrar otros acordeones para mantener orden y accesibilidad
        faqToggles.forEach(otherToggle => {
          if (otherToggle !== toggle) {
            otherToggle.setAttribute('aria-expanded', 'false');
            const otherContent = otherToggle.nextElementSibling as HTMLElement | null;
            const otherIcon = otherToggle.querySelector<HTMLElement>('.faq-icon');
            if (otherContent) otherContent.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        toggle.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // 5. Menú móvil interactivo
  const menuBtn = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>('.menu-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        menuBtn.setAttribute('aria-expanded', 'true');
        if (menuIcon) (menuIcon as HTMLElement).style.transform = 'rotate(90deg)';
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (menuIcon) (menuIcon as HTMLElement).style.transform = 'rotate(0deg)';
      }
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuBtn?.setAttribute('aria-expanded', 'false');
        if (menuIcon) (menuIcon as HTMLElement).style.transform = 'rotate(0deg)';
      });
    });
  }

  // 6. Carga diferida del Mapa interactivo (Lazy Map)
  const mapContainer = document.getElementById('mapa-contenedor');
  const mapTriggerBtn = document.getElementById('cargar-mapa-btn');
  if (mapContainer && mapTriggerBtn) {
    mapTriggerBtn.addEventListener('click', () => {
      const lat = clinica.direccion.coordenadas.lat;
      const lng = clinica.direccion.coordenadas.lng;
      const iframeUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=16&output=embed`;
      
      mapContainer.innerHTML = `
        <iframe
          src="${iframeUrl}"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Ubicación en Google Maps de ${clinica.nombre}"
          class="w-full h-full rounded-2xl"
        ></iframe>
      `;
    });
  }
}
