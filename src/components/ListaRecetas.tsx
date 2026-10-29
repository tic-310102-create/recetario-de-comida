import { Reveal } from './Reveal.tsx'
import { RecetaCard } from './RecetaCard.tsx'
import type { Receta } from '../types/receta.ts'

interface ListaRecetasProps {
  recetas: Receta[]
}

export const ListaRecetas = ({ recetas }: ListaRecetasProps) => (
  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {recetas.map((receta, indice) => (
      <li key={receta.id} className="flex">
        <Reveal delay={(indice % 3) * 120} className="flex w-full">
          <RecetaCard receta={receta} />
        </Reveal>
      </li>
    ))}
  </ul>
)
