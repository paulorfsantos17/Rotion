import { ipcMain } from 'electron'
import { IPC } from '@/shared/constants/ipc'
import type {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  FetchAllDocumentsResponse,
  GetDocumentRequest,
  GetDocumentResponse,
  SaveDocumentRequest,
} from '../shared/types/ipc'
import { store } from './store'
import { randomUUID } from 'crypto'

ipcMain.handle(IPC.DOCUMENTS.FETCH_ALL, (): FetchAllDocumentsResponse => {
  return {
    data: Object.values(store.get('documents')),
  }
})

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  (_, { id }: GetDocumentRequest): GetDocumentResponse => {
    const document = store.get(`documents.${id}`) as Document
    return {
      data: document,
    }
  },
)

ipcMain.handle(IPC.DOCUMENTS.CREATE, (): CreateDocumentResponse => {
  const id = randomUUID()

  const document: Document = {
    id,
    title: 'Untitled',
    content: '',
  }

  store.set(`documents.${id}`, document)

  return {
    data: document,
  }
})

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  (_, { id, title, content }: SaveDocumentRequest): void => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    })
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  (_, { id }: DeleteDocumentRequest): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.delete(`documents.${id}`)
  },
)
