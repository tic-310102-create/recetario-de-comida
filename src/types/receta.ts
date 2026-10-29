import { z } from 'zod'

export const categorias = ['desayuno', 'comida', 'cena', 'postre'] as const

export const categoriaSchema = z.enum(categorias)

export const ingredienteSchema = z.object({
  nombre: z.string().min(1),
  cantidad: z.string().min(1),
})

export const recetaSchema = z.object({
  id: z.string().min(1),
  nombre: z.string().min(1),
  descripcion: z.string().min(1),
  categoria: categoriaSchema,
  dificultad: z.enum(['Fácil', 'Media', 'Difícil']),
  tiempoMinutos: z.number().int().positive(),
  porciones: z.number().int().positive(),
  emoji: z.string().min(1),
  imagen: z.string().min(1),
  ingredientes: z.array(ingredienteSchema).min(1),
  pasos: z.array(z.string().min(1)).min(1),
  consejos: z.array(z.string().min(1)),
  destacada: z.boolean().optional(),
})

export type Categoria = z.infer<typeof categoriaSchema>
export type Ingrediente = z.infer<typeof ingredienteSchema>
export type Receta = z.infer<typeof recetaSchema>

export const nombreCategoria: Record<Categoria, string> = {
  desayuno: 'Desayuno',
  comida: 'Comida',
  cena: 'Cena',
  postre: 'Postre',
}
