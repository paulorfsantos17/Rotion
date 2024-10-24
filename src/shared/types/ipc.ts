export interface Document {
  id: string
  title: string
  content?: string
}

/** Request */
export interface GetDocumentRequest {
  id: string
}

export interface DeleteDocumentRequest {
  id: string
}

export type SaveDocumentRequest = Document

/** Response */

export interface FetchAllDocumentsResponse {
  data: Document[]
}
export interface GetDocumentResponse {
  data: Document
}

export interface CreateDocumentResponse {
  data: Document
}
