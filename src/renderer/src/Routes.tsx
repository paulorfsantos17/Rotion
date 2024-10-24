import { Router, Route } from 'electron-router-dom'
import { Blank } from './pages/Blank'
import { DocumentPage } from './pages/Document'
import { Default } from './pages/layouts/Default'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/document/:id" element={<DocumentPage />} />
        </Route>
      }
    />
  )
}
