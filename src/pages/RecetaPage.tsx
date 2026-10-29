import { useState } from 'react'
import {
  Check,
  CheckCircle2,
  ChefHat,
  Clock,
  Lightbulb,
  Printer,
  RotateCcw,
  Share2,
  Sparkles,
  Users,
  Utensils,
} from 'lucide-react'
import { useParams } from 'react-router-dom'
import { BotonFavorito } from '../components/BotonFavorito.tsx'
import { BotonRegresar } from '../components/BotonRegresar.tsx'
import { Contenedor } from '../components/Contenedor.tsx'
import { RecetaImagen } from '../components/RecetaImagen.tsx'
import { buscarRecetaPorId } from '../data/recetas.ts'
import { nombreCategoria } from '../types/receta.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

export const RecetaPage = () => {
  const { id = '' } = useParams()
  const receta = buscarRecetaPorId(id)

  const [ingredientesMarcados, setIngredientesMarcados] = useState<Record<string, boolean>>({})
  const [pasosCompletados, setPasosCompletados] = useState<Record<number, boolean>>({})
  const [copiado, setCopiado] = useState(false)

  if (!receta) return <NotFoundPage />

  const totalIngredientes = receta.ingredientes.length
  const ingredientesListos = Object.values(ingredientesMarcados).filter(Boolean).length
  const totalPasos = receta.pasos.length
  const pasosListos = Object.values(pasosCompletados).filter(Boolean).length

  const alternarIngrediente = (nombre: string) => {
    setIngredientesMarcados((prev) => ({
      ...prev,
      [nombre]: !prev[nombre],
    }))
  }

  const alternarPaso = (indice: number) => {
    setPasosCompletados((prev) => ({
      ...prev,
      [indice]: !prev[indice],
    }))
  }

  const reiniciarProgreso = () => {
    setIngredientesMarcados({})
    setPasosCompletados({})
  }

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      setCopiado(false)
    }
  }

  const imprimirReceta = () => {
    window.print()
  }

  return (
    <Contenedor className="py-8">
      <article className="mx-auto max-w-5xl space-y-10">
        {/* Barra superior de herramientas */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-tinta/10 pb-4">
          <BotonRegresar />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copiarEnlace}
              className="inline-flex items-center gap-1.5 rounded-full border border-tinta/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-tinta transition hover:border-barro hover:text-barro"
              title="Copiar enlace"
            >
              {copiado ? (
                <>
                  <Check className="size-3.5 text-nopal" aria-hidden="true" />
                  <span className="text-nopal">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3.5 text-tinta/70" aria-hidden="true" />
                  <span>Compartir</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={imprimirReceta}
              className="inline-flex items-center gap-1.5 rounded-full border border-tinta/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-tinta transition hover:border-barro hover:text-barro"
              title="Imprimir receta"
            >
              <Printer className="size-3.5 text-tinta/70" aria-hidden="true" />
              <span>Imprimir</span>
            </button>

            <div className="pl-1">
              <BotonFavorito recetaId={receta.id} />
            </div>
          </div>
        </div>

        {/* Encabezado editorial de la receta: Dos columnas (Información + Fotografía) */}
        <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-nopal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-nopal">
                <ChefHat className="size-3.5" aria-hidden="true" />
                {nombreCategoria[receta.categoria]}
              </span>
              {receta.destacada && (
                <span className="inline-flex items-center gap-1 rounded-full bg-maiz/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-tinta">
                  <Sparkles className="size-3 text-maiz" aria-hidden="true" />
                  Destacada
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-tinta md:text-5xl">
              {receta.nombre}
            </h1>

            <p className="text-base leading-relaxed text-tinta/80 md:text-lg">
              {receta.descripcion}
            </p>

            {/* Dashboard de métricas clave */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
              <div className="rounded-2xl border border-tinta/10 bg-white p-3.5 text-center shadow-xs">
                <Clock className="mx-auto size-5 text-barro" aria-hidden="true" />
                <p className="mt-1.5 text-xs text-tinta/60 uppercase tracking-wider font-medium">Tiempo</p>
                <p className="text-sm font-bold text-tinta">{receta.tiempoMinutos} min</p>
              </div>

              <div className="rounded-2xl border border-tinta/10 bg-white p-3.5 text-center shadow-xs">
                <Users className="mx-auto size-5 text-barro" aria-hidden="true" />
                <p className="mt-1.5 text-xs text-tinta/60 uppercase tracking-wider font-medium">Porciones</p>
                <p className="text-sm font-bold text-tinta">{receta.porciones} personas</p>
              </div>

              <div className="rounded-2xl border border-tinta/10 bg-white p-3.5 text-center shadow-xs">
                <ChefHat className="mx-auto size-5 text-barro" aria-hidden="true" />
                <p className="mt-1.5 text-xs text-tinta/60 uppercase tracking-wider font-medium">Dificultad</p>
                <p className="text-sm font-bold text-tinta">{receta.dificultad}</p>
              </div>

              <div className="rounded-2xl border border-tinta/10 bg-white p-3.5 text-center shadow-xs">
                <Utensils className="mx-auto size-5 text-barro" aria-hidden="true" />
                <p className="mt-1.5 text-xs text-tinta/60 uppercase tracking-wider font-medium">Ingredientes</p>
                <p className="text-sm font-bold text-tinta">{totalIngredientes} items</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-tinta/10 shadow-lg">
            <RecetaImagen receta={receta} prioridad className="size-full object-cover" />
          </div>
        </header>

        {/* Barra de progreso de cocina en vivo */}
        {(ingredientesListos > 0 || pasosListos > 0) && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-barro/20 bg-barro/5 px-5 py-3 text-sm">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-barro">Tu progreso de cocina:</span>
              <span className="text-tinta/70">
                {ingredientesListos}/{totalIngredientes} ingredientes listos
              </span>
              <span className="text-tinta/70">·</span>
              <span className="text-tinta/70">
                {pasosListos}/{totalPasos} pasos listos
              </span>
            </div>
            <button
              type="button"
              onClick={reiniciarProgreso}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-barro underline underline-offset-4 hover:opacity-80"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Reiniciar marcas
            </button>
          </div>
        )}

        {/* Estructura principal: Ingredientes (izquierda) y Preparación paso a paso (derecha) */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          {/* Columna de Ingredientes */}
          <section className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-tinta">Ingredientes</h2>
                <p className="text-xs text-tinta/60">Toca un ingrediente para marcarlo como listo</p>
              </div>
              <span className="rounded-full bg-tinta/10 px-2.5 py-1 text-xs font-semibold text-tinta">
                {ingredientesListos}/{totalIngredientes}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-tinta/10 bg-white shadow-xs">
              <ul className="divide-y divide-tinta/10">
                {receta.ingredientes.map((ingrediente) => {
                  const marcado = !!ingredientesMarcados[ingrediente.nombre]
                  return (
                    <li key={ingrediente.nombre}>
                      <button
                        type="button"
                        onClick={() => alternarIngrediente(ingrediente.nombre)}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition ${
                          marcado ? 'bg-nopal/5 text-tinta/50' : 'hover:bg-crema text-tinta'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition ${
                              marcado
                                ? 'border-nopal bg-nopal text-white'
                                : 'border-tinta/30 bg-white'
                            }`}
                          >
                            {marcado && <Check className="size-3.5 stroke-[3]" />}
                          </span>
                          <span className={`text-sm font-medium ${marcado ? 'line-through text-tinta/50' : ''}`}>
                            {ingrediente.nombre}
                          </span>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            marcado ? 'bg-tinta/10 text-tinta/50' : 'bg-barro/10 text-barro'
                          }`}
                        >
                          {ingrediente.cantidad}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          {/* Columna de Indicaciones / Preparación paso a paso */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-tinta/10 pb-3">
              <div>
                <h2 className="font-display text-2xl font-bold text-tinta">Instrucciones de preparación</h2>
                <p className="text-xs text-tinta/60">Sigue cada paso guiado para asegurar el mejor resultado</p>
              </div>
              <span className="rounded-full bg-barro/10 px-3 py-1 text-xs font-semibold text-barro">
                {totalPasos} pasos en total
              </span>
            </div>

            <div className="space-y-4">
              {receta.pasos.map((paso, indice) => {
                const completado = !!pasosCompletados[indice]
                return (
                  <div
                    key={paso}
                    className={`rounded-2xl border p-5 transition ${
                      completado
                        ? 'border-nopal/40 bg-nopal/5 shadow-xs'
                        : 'border-tinta/10 bg-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                            completado
                              ? 'bg-nopal text-white'
                              : 'bg-barro text-white'
                          }`}
                        >
                          {indice + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-tinta/60">
                          Paso {indice + 1} de {totalPasos}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => alternarPaso(indice)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                          completado
                            ? 'bg-nopal/20 text-nopal hover:bg-nopal/30'
                            : 'bg-tinta/5 text-tinta/70 hover:bg-tinta/10'
                        }`}
                      >
                        <CheckCircle2 className={`size-3.5 ${completado ? 'text-nopal' : 'text-tinta/40'}`} />
                        {completado ? 'Completado' : 'Marcar como listo'}
                      </button>
                    </div>

                    <p
                      className={`text-sm md:text-base leading-relaxed ${
                        completado ? 'text-tinta/70' : 'text-tinta'
                      }`}
                    >
                      {paso}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Consejos del Chef como tarjeta destacada al final de las instrucciones */}
            {receta.consejos.length > 0 && (
              <aside className="mt-8 rounded-3xl border border-maiz/30 bg-maiz/10 p-6 shadow-xs">
                <div className="flex items-center gap-2.5 text-tinta">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-maiz/30 text-tinta">
                    <Lightbulb className="size-5 text-barro" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-tinta">Consejos y secretos del Chef</h3>
                    <p className="text-xs text-tinta/60">Recomendaciones para perfeccionar tu platillo</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {receta.consejos.map((consejo) => (
                    <li key={consejo} className="flex items-start gap-2.5 text-sm leading-relaxed text-tinta/80">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-barro" />
                      <span>{consejo}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </section>
        </div>
      </article>
    </Contenedor>
  )
}
