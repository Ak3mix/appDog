import { Filesystem, Directory } from '@capacitor/filesystem';
import { databaseService } from './DatabaseService';

export class DocumentService {
  async saveDocument(mascota_id: number, tipo: string, fileName: string, data: string) {
    // Guardar en filesystem
    await Filesystem.writeFile({
      path: `PetHealth/Documents/${fileName}`,
      data: data,
      directory: Directory.Documents,
      recursive: true
    });

    // Registrar en BD
    const db = await databaseService.getDb();
    await db.run('INSERT INTO documentos (mascota_id, tipo, ruta, fecha, sync_status) VALUES (?,?,?,?,?)',
      [mascota_id, tipo, `Documents/PetHealth/${fileName}`, new Date().toISOString(), 'pending']);
  }
}

export const documentService = new DocumentService();
