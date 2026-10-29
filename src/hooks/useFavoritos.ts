import { useCallback, useSyncExternalStore } from 'react'
import { z } from 'zod'

const CLAVE = 'recetario:favoritos'
const favoritosSchema = z.array(z.string())
const suscriptores = new Set<() => void>()

let cache: string[] = leer()

function leer(): string[] {
  try {
    const resultado = favoritosSchema.safeParse(JSON.parse(localStorage.getItem(CLAVE) ?? '[]'))
    return resultado.success ? resultado.data : []
  } catch {
    return []
  }
}

function guardar(ids: string[]) {
  cache = ids
  try {
    localStorage.setItem(CLAVE, JSON.stringify(ids))
  } catch {
    // Sin almacenamiento disponible (modo privado): los favoritos duran solo esta sesión.
  }
  suscriptores.forEach((avisar) => avisar())
}

const suscribir = (avisar: () => void) => {
  suscriptores.add(avisar)
  return () => {
    suscriptores.delete(avisar)
  }
}

// Estado compartido entre componentes, persistido en localStorage.
export const useFavoritos = () => {
  const favoritos = useSyncExternalStore(suscribir, () => cache)

  const esFavorito = useCallback((id: string) => favoritos.includes(id), [favoritos])

  const alternarFavorito = useCallback((id: string) => {
    guardar(cache.includes(id) ? cache.filter((actual) => actual !== id) : [...cache, id])
  }, [])

  return { favoritos, esFavorito, alternarFavorito }
}
