import { ToC } from '../components/ToC'
import { Editor } from '../components/Editor'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const { data: response, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: () => window.api.getDocument({ id: id! }),
  })

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
        {!isFetching && response && <Editor content={initialContent} />}
      </section>
    </main>
  )
}
