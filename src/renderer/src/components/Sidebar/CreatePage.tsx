import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import type { Document } from '~/src/shared/types/ipc'

export function CreatePage() {
  const queryClient = useQueryClient()
  const { isPending, mutate: createDocument } = useMutation({
    mutationFn: window.api.createDocument,
    onSuccess: (newDocument) => {
      const document: Document = {
        ...newDocument.data,
      }
      queryClient.setQueryData<{ data: Document[] }>(
        ['documents'],
        (oldDocuments) => {
          if (oldDocuments?.data) {
            return { data: [...oldDocuments.data, document] }
          } else {
            return { data: [document] }
          }
        },
      )
    },
  })

  return (
    <button
      onClick={() => createDocument()}
      disabled={isPending}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo Documento
    </button>
  )
}
