import { ToC } from '../components/ToC'
export function Blank() {
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
      <section className="flex-1 flex flex-col items-center">fasdfasd</section>
    </main>
  )
}
