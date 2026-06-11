import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Filesystem, Directory } from '@capacitor/filesystem';

export class ExportService {
  async generateReport(mascota: any, eventos: any[]): Promise<string> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    page.drawText(`Reporte de Salud: ${mascota.nombre}`, { x: 50, y: 750, size: 20, font });
    
    eventos.forEach((ev, index) => {
      page.drawText(`${ev.fecha} - ${ev.tipo}: ${ev.detalle}`, { x: 50, y: 700 - (index * 20), size: 12, font });
    });

    const pdfBytes = await pdfDoc.save();
    
    // Guardar el PDF en el filesystem
    const fileName = `Reporte_${mascota.nombre}_${Date.now()}.pdf`;
    const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
    await Filesystem.writeFile({
      path: `PetHealth/PDF/${fileName}`,
      data: base64Pdf,
      directory: Directory.Documents,
      recursive: true
    });

    return fileName;
  }
}

export const exportService = new ExportService();
