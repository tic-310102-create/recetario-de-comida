import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Contenedor } from '../components/Contenedor.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { ListaRecetas } from '../components/ListaRecetas.tsx'
import { recetas } from '../data/recetas.ts'
import { useFavoritos } from '../hooks/useFavoritos.ts'

export const FavoritosPage = () => {
  const { esFavorito } = useFavoritos()
  const favoritas = recetas.filter((receta) => esFavorito(receta.id))

  return (
    <Contenedor className="space-y-8 py-12">
      <Reveal className="space-y-3">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">Mis favoritas</h1>
        <p className="text-tinta/70">Las recetas que marcaste con el corazón se guardan en este navegador.</p>
      </Reveal>

      {favoritas.length > 0 ? (
        <ListaRecetas recetas={favoritas} />
      ) : (
        <div className="space-y-3 rounded-2xl border border-dashed border-tinta/20 py-16 text-center">
          <Heart className="mx-auto size-8 text-tinta/30" aria-hidden="true" />
          <p className="font-medium">Aún no tienes recetas favoritas.</p>
          <Link to="/" className="inline-block text-barro underline underline-offset-4">
            Explorar recetas
          </Link>
        </div>
      )}
    </Contenedor>
  )
}
