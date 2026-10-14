import { clinica } from '../data/clinica';

export interface EstadoHorario {
  abierto: boolean;
  mensaje: string;
}

export function obtenerEstadoHorario(): EstadoHorario {
  // Obtener fecha y hora actual en la zona horaria de El Salvador
  const ahora = new Date();
  const formatoElSalvador = new Intl.DateTimeFormat('en-US', {
    timeZone: clinica.zonaHoraria,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });

  const partes = formatoElSalvador.formatToParts(ahora);
  const getPart = (type: string) => partes.find(p => p.type === type)?.value || '';

  const diaSemanaTexto = getPart('weekday').toLowerCase(); // 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
  const mapaDias: Record<string, number> = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
  };
  const diaSemanaNum = mapaDias[diaSemanaTexto] ?? ahora.getDay();
  const horaActual = parseInt(getPart('hour'), 10);
  const minutoActual = parseInt(getPart('minute'), 10);
  const minutosTotalesHoy = horaActual * 60 + minutoActual;

  const diaHoy = clinica.horarios.find(h => h.diaSemana === diaSemanaNum);

  if (diaHoy && !diaHoy.cerrado && diaHoy.intervalos.length > 0) {
    for (const intervalo of diaHoy.intervalos) {
      const [hApertura, mApertura] = intervalo.open.split(':').map(Number);
      const [hCierre, mCierre] = intervalo.close.split(':').map(Number);
      const minutosApertura = hApertura * 60 + mApertura;
      const minutosCierre = hCierre * 60 + mCierre;

      if (minutosTotalesHoy >= minutosApertura && minutosTotalesHoy < minutosCierre) {
        return {
          abierto: true,
          mensaje: `Abierto ahora · Cierra a las ${formatearHora12(intervalo.close)}`
        };
      }
    }
  }

  // Si está cerrado, buscar el siguiente horario de apertura en los próximos 7 días
  for (let i = 0; i < 7; i++) {
    const siguienteDiaNum = (diaSemanaNum + i) % 7;
    const diaEvaluado = clinica.horarios.find(h => h.diaSemana === siguienteDiaNum);

    if (diaEvaluado && !diaEvaluado.cerrado && diaEvaluado.intervalos.length > 0) {
      for (const intervalo of diaEvaluado.intervalos) {
        const [hApertura, mApertura] = intervalo.open.split(':').map(Number);
        const minutosApertura = hApertura * 60 + mApertura;

        if (i === 0 && minutosTotalesHoy < minutosApertura) {
          // Abre hoy más tarde
          return {
            abierto: false,
            mensaje: `Cerrado · Abre hoy a las ${formatearHora12(intervalo.open)}`
          };
        } else if (i > 0) {
          const prefijoDia = i === 1 ? 'mañana' : `el ${diaEvaluado.nombreDia.toLowerCase()}`;
          return {
            abierto: false,
            mensaje: `Cerrado · Abre ${prefijoDia} a las ${formatearHora12(intervalo.open)}`
          };
        }
      }
    }
  }

  return {
    abierto: false,
    mensaje: 'Cerrado temporalmente'
  };
}

function formatearHora12(hora24: string): string {
  const [h, m] = hora24.split(':').map(Number);
  const periodo = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mStr = m === 0 ? '00' : m < 10 ? `0${m}` : `${m}`;
  return `${h12}:${mStr} ${periodo}`;
}
