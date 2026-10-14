export interface HorarioIntervalo {
  open: string;  // Formato "HH:mm" (24h), ej. "08:00"
  close: string; // Formato "HH:mm" (24h), ej. "17:00"
}

export interface HorarioDia {
  diaSemana: number; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  nombreDia: string;
  intervalos: HorarioIntervalo[];
  cerrado: boolean;
  textoVisible: string;
}

export interface ServicioClinico {
  id: string;
  nombre: string;
  etiqueta: string;
  descripcion: string;
  icono: string;
  precioAproximado?: string;
  confirmado: boolean;
}

export interface Testimonio {
  id: string;
  nombre: string;
  rol: string;
  texto: string;
  puntuacion: number;
  iniciales: string;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export interface DatosClinica {
  nombre: string;
  nombreCorto: string;
  doctora: string;
  tituloProfesional: string;
  telefono: string;
  telefonoLlamada: string;
  whatsapp: string;
  whatsappNumeroLimpio: string;
  email: string;
  direccion: {
    linea1: string;
    ciudad: string;
    departamento: string;
    pais: string;
    plusCode: string;
    coordenadas: {
      lat: number;
      lng: number;
    };
    googleMapsUrl: string;
    wazeUrl: string;
  };
  zonaHoraria: string;
  horarios: HorarioDia[];
  servicios: ServicioClinico[];
  pilaresConfianza: Array<{
    titulo: string;
    descripcion: string;
    icono: string;
  }>;
  pasosCita: Array<{
    numero: string;
    titulo: string;
    descripcion: string;
  }>;
  testimonios: Testimonio[];
  preguntasFrecuentes: PreguntaFrecuente[];
  meta: {
    dominio: string;
    tituloSeo: string;
    descripcionSeo: string;
    urlCanonica: string;
  };
}

export const clinica: DatosClinica = {
  nombre: "Clínica Dental Dra. Bianca Nathaly Hernández Flores",
  nombreCorto: "Clínica Dental Dra. Bianca",
  doctora: "Dra. Bianca Nathaly Hernández Flores",
  tituloProfesional: "Odontología General & Estética Dental",
  telefono: "+503 7524 0578",
  telefonoLlamada: "+50375240578",
  whatsapp: "+503 7524 0578",
  whatsappNumeroLimpio: "50375240578",
  email: "contacto@clinicadentaldrahernandez.com",
  direccion: {
    linea1: "Calle Dr. José Matías Delgado",
    ciudad: "Cojutepeque",
    departamento: "Cuscatlán",
    pais: "El Salvador",
    plusCode: "P3C7+WGH Cojutepeque",
    coordenadas: {
      lat: 13.7214,
      lng: -88.9358
    },
    googleMapsUrl: "https://www.google.com/maps/place/Clinica+Dental+Dra.+Bianca+Nathaly+Hernandez+Flores/",
    wazeUrl: "https://waze.com/ul?ll=13.7214,-88.9358&navigate=yes"
  },
  zonaHoraria: "America/El_Salvador",
  horarios: [
    {
      diaSemana: 1, // Lunes
      nombreDia: "Lunes",
      intervalos: [{ open: "08:00", close: "17:00" }],
      cerrado: false,
      textoVisible: "8:00 AM – 5:00 PM"
    },
    {
      diaSemana: 2, // Martes
      nombreDia: "Martes",
      intervalos: [{ open: "08:00", close: "17:00" }],
      cerrado: false,
      textoVisible: "8:00 AM – 5:00 PM"
    },
    {
      diaSemana: 3, // Miércoles
      nombreDia: "Miércoles",
      intervalos: [{ open: "08:00", close: "17:00" }],
      cerrado: false,
      textoVisible: "8:00 AM – 5:00 PM"
    },
    {
      diaSemana: 4, // Jueves
      nombreDia: "Jueves",
      intervalos: [{ open: "08:00", close: "17:00" }],
      cerrado: false,
      textoVisible: "8:00 AM – 5:00 PM"
    },
    {
      diaSemana: 5, // Viernes
      nombreDia: "Viernes",
      intervalos: [{ open: "08:00", close: "17:00" }],
      cerrado: false,
      textoVisible: "8:00 AM – 5:00 PM"
    },
    {
      diaSemana: 6, // Sábado
      nombreDia: "Sábado",
      intervalos: [{ open: "08:00", close: "13:00" }],
      cerrado: false,
      textoVisible: "8:00 AM – 1:00 PM"
    },
    {
      diaSemana: 0, // Domingo
      nombreDia: "Domingo",
      intervalos: [],
      cerrado: true,
      textoVisible: "Cerrado"
    }
  ],
  servicios: [
    {
      id: "consulta-dental",
      nombre: "Consulta dental",
      etiqueta: "Evaluación integral preventiva",
      descripcion: "Evaluación diagnóstica integral de tu salud oral con exploración digital y plan de cuidado personalizado.",
      icono: "stethoscope",
      confirmado: true
    },
    {
      id: "limpieza-dental",
      nombre: "Limpieza dental",
      etiqueta: "Profilaxis y ultrasonido",
      descripcion: "Higiene profiláctica profunda y eliminación cuidadosa de sarro y placa dental para encías sanas y aliento fresco.",
      icono: "clean_hands",
      confirmado: true
    },
    {
      id: "tratamiento-caries",
      nombre: "Tratamiento de caries",
      etiqueta: "Restauraciones de alta estética",
      descripcion: "Restauración estética y conservación dental mediante resinas de alta calidad biocompatibles que emulan el tono exacto.",
      icono: "healing",
      confirmado: true
    },
    {
      id: "extracciones-dentales",
      nombre: "Extracciones dentales",
      etiqueta: "Cirugía mínimamente invasiva",
      descripcion: "Procedimientos seguros guiados por técnicas mínimamente invasivas con anestesia eficaz y recuperación confortable.",
      icono: "dentistry",
      confirmado: true
    },
    {
      id: "salud-encias",
      nombre: "Salud de las encías",
      etiqueta: "Periodoncia y encías protegidas",
      descripcion: "Cuidado periodontal integral, desinflamación y mantenimiento tisular para evitar el sangrado y pérdida ósea.",
      icono: "cardiology",
      confirmado: true
    },
    {
      id: "odontologia-preventiva",
      nombre: "Odontología preventiva",
      etiqueta: "Flúor y sellantes",
      descripcion: "Aplicación de flúor protector y selladores de fosas y fisuras para blindar el esmalte de adultos y niños frente a caries.",
      icono: "shield",
      confirmado: true
    },
    {
      id: "blanqueamiento-dental",
      nombre: "Blanqueamiento dental",
      etiqueta: "Aclaramiento clínico seguro",
      descripcion: "Técnicas clínicas seguras para recuperar el brillo y tono natural de los dientes sin dañar el esmalte ni provocar sensibilidad.",
      icono: "auto_awesome",
      confirmado: true
    },
    {
      id: "otros-tratamientos",
      nombre: "Otros tratamientos",
      etiqueta: "Valoraciones personalizadas",
      descripcion: "Valoración individualizada de casos combinados, prótesis dentales o restauraciones puntuales adaptadas a tus requerimientos.",
      icono: "tune",
      confirmado: true
    }
  ],
  pilaresConfianza: [
    {
      titulo: "Salud bucal",
      descripcion: "Diagnóstico y prevención continua.",
      icono: "vital_signs"
    },
    {
      titulo: "Atención única",
      descripcion: "Trato cálido y sin prisas clínicas.",
      icono: "person_heart"
    },
    {
      titulo: "Orientación",
      descripcion: "Planes claros para toda tu familia.",
      icono: "health_and_safety"
    },
    {
      titulo: "Cita ágil",
      descripcion: "Respuesta rápida por WhatsApp.",
      icono: "forum"
    }
  ],
  pasosCita: [
    {
      numero: "01",
      titulo: "Contáctanos",
      descripcion: "Escríbenos por WhatsApp o realiza una llamada directa para iniciar tu solicitud."
    },
    {
      numero: "02",
      titulo: "Cuéntanos qué necesitas",
      descripcion: "Indícanos el motivo de tu consulta: revisión general, molestia puntual o estética."
    },
    {
      numero: "03",
      titulo: "Confirma tu cita",
      descripcion: "Te asignamos el horario que mejor te convenga con un recordatorio a tu teléfono."
    }
  ],
  testimonios: [
    {
      id: "resena-1",
      nombre: "Claudia Ramos",
      rol: "Paciente Verificado en Google Maps",
      texto: "Excelente atención de la Dra. Bianca. Siempre he tenido fobia al dentista y ella me tuvo una paciencia increíble. El tratamiento de caries fue completamente indoloro. ¡Super recomendada!",
      puntuacion: 5,
      iniciales: "CR"
    },
    {
      id: "resena-2",
      nombre: "Manuel Aguilar",
      rol: "Paciente Verificado en Google Maps",
      texto: "Las instalaciones son impecables y muy modernas. Me realicé una limpieza profunda y blanqueamiento dental; los resultados superaron mis expectativas. Trato muy profesional y puntual.",
      puntuacion: 5,
      iniciales: "MA"
    },
    {
      id: "resena-3",
      nombre: "Sofía Rodríguez",
      rol: "Paciente Verificado en Google Maps",
      texto: "Llevé a mi hijo pequeño para su chequeo preventivo con flúor y la doctora fue un amor. Ya no le tiene miedo a ir al consultorio. La clínica es muy acogedora y organizada.",
      puntuacion: 5,
      iniciales: "SR"
    }
  ],
  preguntasFrecuentes: [
    {
      pregunta: "¿Cómo programo una cita previa?",
      respuesta: "Puedes agendar fácilmente completando el formulario web, enviando un mensaje directo a nuestro WhatsApp o llamando a nuestra línea clínica. Te brindaremos los horarios disponibles más cómodos para ti."
    },
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos efectivo, transferencias bancarias locales y tarjetas de débito y crédito. Te entregamos tu recibo y detalle clínico al finalizar tu sesión."
    },
    {
      pregunta: "¿Los tratamientos causan dolor?",
      respuesta: "En la clínica empleamos técnicas modernas y anestésicos de alta eficacia para asegurar que tu experiencia sea totalmente confortable y libre de molestias innecesarias."
    },
    {
      pregunta: "¿Con qué frecuencia debo hacerme una limpieza?",
      respuesta: "Recomendamos realizar una limpieza profiláctica y revisión general cada 6 meses. Esto previene la acumulación de sarro, caries ocultas y problemas periodontales."
    },
    {
      pregunta: "¿Atienden emergencias dentales?",
      respuesta: "Sí. Si presentas dolor agudo, inflamación o traumatismo dental, contáctanos inmediatamente por WhatsApp para gestionar tu atención prioritaria en el mismo día según disponibilidad."
    },
    {
      pregunta: "¿Atienden a niños y adultos mayores?",
      respuesta: "Totalmente. Brindamos atención odontológica familiar integral con protocolos adaptados a las necesidades y ritmo de cada etapa de la vida."
    }
  ],
  meta: {
    dominio: "https://clinicadentaldrahernandez.com",
    tituloSeo: "Clínica Dental Dra. Bianca Nathaly Hernández Flores | Odontología en El Salvador",
    descripcionSeo: "Atención odontológica integral, estética y preventiva en El Salvador por la Dra. Bianca Nathaly Hernández Flores. Pide tu cita fácil por WhatsApp.",
    urlCanonica: "https://clinicadentaldrahernandez.com"
  }
};
