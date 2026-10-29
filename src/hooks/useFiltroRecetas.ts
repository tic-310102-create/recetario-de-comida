import { useMemo, useState } from 'react'
import type { Categoria, Receta } from '../types/receta.ts'
import { normalizar } from '../utils/texto.ts'

export const useFiltroRecetas = (recetas: Receta[]) => {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState<Categoria | null>(null)

  const resultados = useMemo(() => {
    const termino = normalizar(busqueda)
    return recetas.filter((receta) => {
      if (categoria && receta.categoria !== categoria) return false
      if (!termino) return true
      return (
        normalizar(receta.nombre).includes(termino) ||
        receta.ingredientes.some((ingrediente) => normalizar(ingrediente.nombre).includes(termino))
      )
    })
  }, [recetas, busqueda, categoria])

  const limpiar = () => {
    setBusqueda('')
    setCategoria(null)
  }

  return { busqueda, setBusqueda, categoria, setCategoria, resultados, limpiar }
}
