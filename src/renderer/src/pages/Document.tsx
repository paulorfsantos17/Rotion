import { ToC } from '../components/ToC'
import { Editor, type OnContentUpdatedParams } from '../components/Editor'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { Document } from '~/src/shared/types/ipc'

export function DocumentPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data: response, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: () => window.api.getDocument({ id: id! }),
  })

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: ({ content, title }: OnContentUpdatedParams) =>
      window.api.saveDocument({ id: id!, title, content }),
    onSuccess: (_, { title }) => {
      queryClient.setQueryData<{ data: Document[] | undefined }>(
        ['documents'],
        (documents) => {
          return {
            data: documents?.data?.map((document) => {
              if (document.id === id) {
                return { ...document, title }
              }

              return document
            }),
          }
        },
      )
    },
  })

  function handleEditorContentUpdate({
    content,
    title,
  }: OnContentUpdatedParams) {
    saveDocument({ content, title })
  }

  const initialContent = useMemo(() => {
    if (response) {
      return `<h1>${response.data.title}</h1>${response.data.content ?? '<p></p>'}`
    }

    return ''
  }, [response])

  return (
    <main className="flex flex-1  py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENT
        </span>
        <ToC.Root>
          <ToC.Section>
            <ToC.Link>BackEnd</ToC.Link>
            <ToC.Link>Banco de Dados</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>
      <section className="flex-1 flex flex-col items-center">
        {!isFetching && response && (
          <Editor
            content={initialContent}
            onContentUpdate={handleEditorContentUpdate}
          />
        )}
      </section>
    </main>
  )
}
