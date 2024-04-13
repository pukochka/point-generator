import { contextBridge } from 'electron';
import { dialog } from '@electron/remote';
import FileFilter = Electron.FileFilter;

contextBridge.exposeInMainWorld('electronApi', {
  openFileDialog: async (
    title: string,
    folder: string,
    filters: FileFilter[]
  ) => {
    const response = await dialog.showOpenDialog({
      title,
      filters,
      properties: ['openFile', 'multiSelections'],
    });
    return response.filePaths;
  },
});
