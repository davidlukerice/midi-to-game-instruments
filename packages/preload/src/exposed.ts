import * as exports from './index.js';
import { contextBridge } from 'electron';

const isExport = (key: string): key is keyof typeof exports => Object.hasOwn(exports, key);

for (const exportsKey in exports) {

  if (isExport(exportsKey)) {
    const cleanedExportKey = exportsKey
    const exportedValue = exports[exportsKey]
    contextBridge.exposeInMainWorld(cleanedExportKey, exportedValue);
  }
}

// Re-export for tests
export * from './index.js';
