import { Heart } from 'lucide-react'
import { useFavoritos } from '../hooks/useFavoritos.ts'

interface BotonFavoritoProps {
  recetaId: string
  className?: string
}

export const BotonFavorito = ({ recetaId, className = '' }: BotonFavoritoProps) => {
  const { esFavorito, alternarFavorito } = useFavoritos()
  const activo = esFavorito(recetaId)

  return (
    <button
      type="button"
      onClick={() => alternarFavorito(recetaId)}
      aria-pressed={activo}
      aria-label={activo ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className={`flex size-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-110 active:scale-95 ${className}`}
    >
      <Heart className={`size-5 transition ${activo ? 'fill-barro text-barro' : 'text-tinta/50'}`} aria-hidden="true" />
    </button>
  )
}
