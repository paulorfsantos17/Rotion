export interface Document {
  id: string
  title: string
  content: string
}

/** Request */

/** Response */

export interface FetchAllDocumentsReponse {
  data: Document[]
}