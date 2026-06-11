import { Filesystem, Directory } from '@capacitor/filesystem';
import { databaseService } from './DatabaseService';

export class BackupService {
  async createBackup() {
    const db = await databaseService.getDb();
    
    // Obtener el dump de la base de datos
    const dump = await db.exportToJson('full');
    
    // Guardar backup en el filesystem
    await Filesystem.writeFile({
      path: `PetHealth/Backups/backup_${new Date().getTime()}.json`,
      data: JSON.stringify(dump),
      directory: Directory.Documents,
      recursive: true
    });
  }

  async restoreBackup(jsonContent: string) {
    const db = await databaseService.getDb();
    
    // Usar el método correcto para importar basado en la API de Capacitor SQLite
    await db.importFromJson(JSON.parse(jsonContent));
  }
}

export const backupService = new BackupService();
