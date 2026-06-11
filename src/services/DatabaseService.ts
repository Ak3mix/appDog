import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import migration1 from '../database/migrations/001_initial.sql?raw';
import migration2 from '../database/migrations/002_add_microchip.sql?raw';
import migration3 from '../database/migrations/003_add_veterinario.sql?raw';
import migration4 from '../database/migrations/004_add_qr.sql?raw';

class DatabaseService {
  private sqliteConnection: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private isInitialized = false;
  private migrations = [migration1, migration2, migration3, migration4];

  constructor() {
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  }

  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const platform = Capacitor.getPlatform();
      
      if (platform === 'web') {
        await this.sqliteConnection.initWebStore();
      }

      this.db = await this.sqliteConnection.createConnection(
        'pethealth.db',
        false,
        'no-encryption',
        1,
        false
      );
      await this.db.open();
      
      await this.checkIntegrity();
      await this.runMigrations();
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing database', error);
      throw error;
    }
  }

  async getDb(): Promise<SQLiteDBConnection> {
    if (!this.isInitialized) {
      await this.init();
    }
    return this.db;
  }

  private async checkIntegrity(): Promise<void> {
    const res = await this.db.query('PRAGMA integrity_check;');
    if (res.values && res.values[0].integrity_check !== 'ok') {
      throw new Error('Database integrity check failed');
    }
  }

  private async runMigrations(): Promise<void> {
    let currentVersion = 0;
    try {
      const res = await this.db.query('SELECT version FROM schema_version LIMIT 1;');
      if (res.values && res.values.length > 0) {
        currentVersion = res.values[0].version;
      }
    } catch (e) {
      currentVersion = 0;
    }

    for (let i = currentVersion; i < this.migrations.length; i++) {
      try {
        await this.db.execute(this.migrations[i]);
        console.log(`Migration ${i + 1} applied`);
      } catch (error) {
        console.error(`Migration ${i + 1} failed`, error);
        throw error;
      }
    }
  }
}

export const databaseService = new DatabaseService();
