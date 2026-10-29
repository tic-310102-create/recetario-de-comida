import { Search } from 'lucide-react'
import { categorias, nombreCategoria, type Categoria } from '../types/receta.ts'

interface FiltrosRecetasProps {
  busqueda: string
  onBusquedaChange: (valor: string) => void
  categoria: Categoria | null
  onCategoriaChange: (categoria: Categoria | null) => void
}

const claseChip = (activo: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm font-medium transition ${
    activo ? 'border-barro bg-barro text-white' : 'border-tinta/15 bg-white hover:border-barro hover:text-barro'
  }`

export const FiltrosRecetas = ({ busqueda, onBusquedaChange, categoria, onCategoriaChange }: FiltrosRecetasProps) => (
  <div className="space-y-4">
    <label className="relative block">
      <span className="sr-only">Buscar recetas</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-tinta/40" aria-hidden="true" />
      <input
        type="search"
        value={busqueda}
        onChange={(evento) => onBusquedaChange(evento.target.value)}
        placeholder="Busca por nombre o ingrediente, por ejemplo «queso»"
        className="w-full rounded-full border border-tinta/15 bg-white py-3 pl-12 pr-4 outline-none focus:border-barro focus:ring-2 focus:ring-barro/20"
      />
    </label>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      <button type="button" className={claseChip(categoria === null)} aria-pressed={categoria === null} onClick={() => onCategoriaChange(null)}>
        Todas
      </button>
      {categorias.map((opcion) => (
        <button
          key={opcion}
          type="button"
          className={claseChip(categoria === opcion)}
          aria-pressed={categoria === opcion}
          onClick={() => onCategoriaChange(opcion)}
        >
          {nombreCategoria[opcion]}
        </button>
      ))}
    </div>
  </div>
)
