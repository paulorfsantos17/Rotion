import { ipcMain } from 'electron'
import { IPC } from '@/shared/constants/ipc'
import type { FetchAllDocumentsReponse } from '../shared/types/ipc'

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, (): FetchAllDocumentsReponse => {
  return {
    data: [
      {
        id: '1',
        title: 'Ignite',
        content: '',
      },
      {
        id: '2',
        title: 'Discover',
        content: '',
      },
      {
        id: '3',
        title: 'Rocketseat',
        content: '',
      },
      {
        id: '4',
        title: 'Docs',
        content: '',
      },
    ],
  }
})
