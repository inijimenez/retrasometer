import axios from 'axios';

const API_BASE_URL = '/api/v1/';
const HORARIOS_BASE_URL = '/api/v2/';

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 6.1; rv:19.0) Gecko/20100101 Firefox/19.0",
  "Content-Type": "application/json",
};

export async function getStations() {
  try {
    const response = await axios.post(API_BASE_URL, {
      resource_id: 'daa68d9b-77cf-4024-890f-285d31184c5a',
      q: '',
      filters: {},
      limit: 93,
      offset: 0,
    },
    { headers });

    return response.data.result.records;
  } catch (error) {
    console.error('Error fetching stations:' + error);
    return [];
  }
}

export async function getTrains(origen, destino) {
  try {
    const fechaActual = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const horaAnterior = new Date(Date.now() - 3600 * 1000).getHours();
    const horaSiguiente = new Date(Date.now() + 3600 * 1000).getHours();

    const response = await axios.post(HORARIOS_BASE_URL, {
      nucleo: '10',
      origen,
      destino,
      fchaViaje: fechaActual,
      validaReglaNegocio: true,
      tiempoReal: true,
      servicioHorarios: 'VTI',
      horaViajeOrigen: horaAnterior,
      horaViajeLlegada: horaSiguiente,
      accesibilidadTrenes: true,
    },
    { headers });

    return response.data.horario;
  } catch (error) {
    console.error('Error fetching trains:' + error);    
    return [];
  }
}
