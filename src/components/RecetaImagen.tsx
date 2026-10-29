import { useState } from 'react'
import type { Receta } from '../types/receta.ts'

interface RecetaImagenProps {
  receta: Receta
  className?: string
  prioridad?: boolean
}

export const RecetaImagen = ({ receta, className = '', prioridad = false }: RecetaImagenProps) => {
  const [fallo, setFallo] = useState(false)

  if (fallo) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-maiz/40 to-barro/40 ${className}`}
        role="img"
        aria-label={receta.nombre}
      >
        <span className="text-6xl drop-shadow-sm" aria-hidden="true">
          {receta.emoji}
        </span>
      </div>
    )
  }

  return (
    <img
      src={receta.imagen}
      alt={receta.nombre}
      loading={prioridad ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFallo(true)}
      className={`object-cover ${className}`}
    />
  )
}
