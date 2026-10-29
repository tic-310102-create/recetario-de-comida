// Quita acentos y mayúsculas para comparar texto sin importar cómo se escriba.
export const normalizar = (texto: string): string =>
  texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
