import { Contenedor } from '../components/Contenedor.tsx'
import { FiltrosRecetas } from '../components/FiltrosRecetas.tsx'
import { ListaRecetas } from '../components/ListaRecetas.tsx'
import { RecetaDestacada } from '../components/RecetaDestacada.tsx'
import { Reveal } from '../components/Reveal.tsx'
import { recetas, recetasDestacadas } from '../data/recetas.ts'
import { useFiltroRecetas } from '../hooks/useFiltroRecetas.ts'

export const HomePage = () => {
  const { busqueda, setBusqueda, categoria, setCategoria, resultados, limpiar } = useFiltroRecetas(recetas)

  return (
    <>
      <Contenedor className="space-y-6 pt-10 pb-16">
        <Reveal className="space-y-2">
          <p className="text-sm font-semibold tracking-wide text-barro uppercase">Recomendadas</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Las favoritas de la casa</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {recetasDestacadas.map((receta, indice) => (
            <Reveal key={receta.id} variante="zoom" delay={indice * 150}>
              <RecetaDestacada receta={receta} />
            </Reveal>
          ))}
        </div>
      </Contenedor>

      <section id="recetas" className="scroll-mt-20 border-t border-tinta/10 bg-white/50">
        <Contenedor className="space-y-8 py-16">
          <Reveal className="space-y-2">
            <p className="text-sm font-semibold tracking-wide text-barro uppercase">Catálogo</p>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">Todas las recetas</h2>
          </Reveal>

          <Reveal delay={120}>
            <FiltrosRecetas
              busqueda={busqueda}
              onBusquedaChange={setBusqueda}
              categoria={categoria}
              onCategoriaChange={setCategoria}
            />
          </Reveal>

          <p className="text-sm text-tinta/60" aria-live="polite">
            {resultados.length} {resultados.length === 1 ? 'receta' : 'recetas'}
          </p>

          {resultados.length > 0 ? (
            <ListaRecetas recetas={resultados} />
          ) : (
            <div className="rounded-2xl border border-dashed border-tinta/20 py-16 text-center">
              <p className="font-medium">No encontramos recetas con esos filtros.</p>
              <button type="button" onClick={limpiar} className="mt-3 text-barro underline underline-offset-4">
                Limpiar búsqueda
              </button>
            </div>
          )}
        </Contenedor>
      </section>
    </>
  )
}
