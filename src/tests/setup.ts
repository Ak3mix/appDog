import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Capacitor Plugins
vi.mock('@capacitor/core', () => ({
  Capacitor: {
    getPlatform: () => 'web'
  }
}));

vi.mock('@capacitor-community/sqlite', () => ({
  CapacitorSQLite: {},
  SQLiteConnection: vi.fn(() => ({
    createConnection: vi.fn().mockResolvedValue({
      open: vi.fn(),
      query: vi.fn().mockResolvedValue({ values: [{ integrity_check: 'ok' }] }),
      run: vi.fn().mockResolvedValue({ changes: { lastId: 1 } }),
      execute: vi.fn(),
      exportToJson: vi.fn().mockResolvedValue({}),
      importFromJson: vi.fn(),
    }),
    initWebStore: vi.fn()
  }))
}));

vi.mock('@capacitor/filesystem', () => ({
  Filesystem: {
    writeFile: vi.fn(),
  },
  Directory: {
    Documents: 'Documents'
  }
}));
