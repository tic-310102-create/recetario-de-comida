import { ArrowDown, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Contenedor } from './Contenedor.tsx'
import { recetas } from '../data/recetas.ts'
import { useCarrusel } from '../hooks/useCarrusel.ts'
import { nombreCategoria } from '../types/receta.ts'

export const Hero = () => {
  const { actual, irA, setEnPausa } = useCarrusel(recetas.length, 2500)
  const receta = recetas[actual]

  return (
    <section
      className="relative isolate overflow-hidden bg-tinta text-white"
      aria-roledescription="carrusel"
      aria-label="Recetas del recetario"
      onMouseEnter={() => setEnPausa(true)}
      onMouseLeave={() => setEnPausa(false)}
      onFocus={() => setEnPausa(true)}
      onBlur={() => setEnPausa(false)}
    >
      {recetas.map((item, indice) => (
        <img
          key={item.id}
          src={item.imagen}
          alt=""
          loading={indice === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 -z-20 size-full object-cover transition-all duration-[900ms] ease-out ${
            indice === actual ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-tinta/95 via-tinta/70 to-tinta/20" />

      <Contenedor className="flex min-h-[72vh] flex-col justify-center gap-6 py-20 md:min-h-[80vh]">
        <p className="text-sm font-semibold tracking-[0.2em] text-maiz uppercase">Cocina mexicana casera</p>

        <div key={receta.id} className="animate-[aparecer_700ms_ease-out] space-y-4" aria-live="polite">
          <p className="flex items-center gap-3 text-sm text-white/75">
            <span className="rounded-full bg-white/15 px-3 py-1 font-medium backdrop-blur">
              {nombreCategoria[receta.categoria]}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {receta.tiempoMinutos} min · {receta.dificultad}
            </span>
          </p>
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] font-semibold text-balance md:text-7xl">
            {receta.nombre}
          </h1>
          <p className="line-clamp-3 max-w-xl text-lg text-white/80 text-pretty">{receta.descripcion}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/recetas/${receta.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-barro px-6 py-3 font-semibold transition hover:bg-barro-oscuro"
          >
            Ver receta
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href="#recetas"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/10"
          >
            Explorar todas
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-1.5">
            {recetas.map((item, indice) => (
              <button
                key={item.id}
                type="button"
                onClick={() => irA(indice)}
                aria-label={`Ver ${item.nombre}`}
                aria-current={indice === actual}
                className={`h-1.5 rounded-full transition-all ${
                  indice === actual ? 'w-8 bg-maiz' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </Contenedor>
    </section>
  )
}
