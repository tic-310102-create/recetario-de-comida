import { z } from 'zod'
import { recetaSchema, type Receta } from '../types/receta.ts'
import recetasJson from './recetas.json'

// Valida el JSON al cargar para detectar datos mal capturados en desarrollo.
export const recetas: Receta[] = z.array(recetaSchema).parse(recetasJson)

export const buscarRecetaPorId = (id: string): Receta | undefined =>
  recetas.find((receta) => receta.id === id)

export const recetasDestacadas: Receta[] = recetas.filter((receta) => receta.destacada)
