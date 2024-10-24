import { ipcMain } from 'electron'
import { IPC } from '@/shared/constants/ipc'
import type {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  FetchAllDocumentsResponse,
  GetDocumentRequest,
  GetDocumentResponse,
  SaveDocumentRequest,
} from '../shared/types/ipc'

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, (): FetchAllDocumentsResponse => {
  return {
    data: [],
  }
})

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  (_, { id }: GetDocumentRequest): GetDocumentResponse => {
    return {
      data: {},
    }
  },
)

ipcMain.handle(IPC.DOCUMENTS.CREATE, (): CreateDocumentResponse => {
  return {
    data: {},
  }
})

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  (_, {}: SaveDocumentRequest): Promise<void> => {},
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  (_, {}: DeleteDocumentRequest): Promise<void> => {},
)
