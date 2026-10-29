import { ArrowRight, Clock, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RecetaImagen } from './RecetaImagen.tsx'
import { nombreCategoria, type Receta } from '../types/receta.ts'

interface RecetaDestacadaProps {
  receta: Receta
}

export const RecetaDestacada = ({ receta }: RecetaDestacadaProps) => (
  <Link
    to={`/recetas/${receta.id}`}
    className="group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl p-6 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-barro md:min-h-96"
  >
    <RecetaImagen
      receta={receta}
      className="absolute inset-0 -z-20 size-full transition duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-tinta/90 via-tinta/30 to-transparent" />
    <span className="text-xs font-semibold tracking-wide text-maiz uppercase">
      {nombreCategoria[receta.categoria]}
    </span>
    <h3 className="mt-1 font-display text-3xl font-semibold">{receta.nombre}</h3>
    <p className="mt-2 max-w-md text-white/80">{receta.descripcion}</p>
    <div className="mt-4 flex items-center justify-between">
      <p className="flex gap-4 text-sm text-white/80">
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" aria-hidden="true" />
          {receta.tiempoMinutos} min
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="size-4" aria-hidden="true" />
          {receta.porciones} porciones
        </span>
      </p>
      <span className="flex items-center gap-1 text-sm font-semibold transition group-hover:gap-2">
        Ver receta
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </div>
  </Link>
)
