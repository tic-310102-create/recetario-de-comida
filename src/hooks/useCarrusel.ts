import { useCallback, useEffect, useState } from 'react'

const prefiereMenosMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Índice que avanza solo cada `intervaloMs`, salvo en pausa o con movimiento reducido.
export const useCarrusel = (total: number, intervaloMs = 6000) => {
  const [actual, setActual] = useState(0)
  const [enPausa, setEnPausa] = useState(false)

  const irA = useCallback((indice: number) => setActual(((indice % total) + total) % total), [total])
  const siguiente = useCallback(() => setActual((indice) => (indice + 1) % total), [total])
  const anterior = useCallback(() => setActual((indice) => (indice - 1 + total) % total), [total])

  useEffect(() => {
    if (enPausa || total < 2 || prefiereMenosMovimiento()) return
    const temporizador = window.setTimeout(siguiente, intervaloMs)
    return () => window.clearTimeout(temporizador)
  }, [actual, enPausa, total, intervaloMs, siguiente])

  return { actual, irA, siguiente, anterior, enPausa, setEnPausa }
}
