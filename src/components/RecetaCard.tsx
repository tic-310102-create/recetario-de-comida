import { Link } from 'react-router-dom'
import { BotonFavorito } from './BotonFavorito.tsx'
import { RecetaImagen } from './RecetaImagen.tsx'
import { nombreCategoria, type Receta } from '../types/receta.ts'

interface RecetaCardProps {
  receta: Receta
}

export const RecetaCard = ({ receta }: RecetaCardProps) => (
  <div className="relative flex w-full">
    <Link
      to={`/recetas/${receta.id}`}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-tinta/10 bg-white transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-barro"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <RecetaImagen receta={receta} className="size-full transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-nopal">
          {nombreCategoria[receta.categoria]}
        </span>
        <h2 className="font-display text-xl font-semibold group-hover:text-barro">{receta.nombre}</h2>
        <p className="line-clamp-3 flex-1 text-sm text-tinta/70">{receta.descripcion}</p>
        <p className="text-sm text-tinta/60">
          {receta.tiempoMinutos} min · {receta.porciones} porciones · {receta.dificultad}
        </p>
      </div>
    </Link>
    {/* Fuera del enlace para no anidar elementos interactivos. */}
    <BotonFavorito recetaId={receta.id} className="absolute right-3 top-3" />
  </div>
)
