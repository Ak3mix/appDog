export class QRService {
  generateQRData(pet: any) {
    // Generamos un objeto JSON para representar en el QR
    return JSON.stringify({
      id: pet.id,
      nombre: pet.nombre,
      microchip: pet.microchip,
      // Se omite historial médico por privacidad, según especificación
    });
  }
}

export const qrService = new QRService();
