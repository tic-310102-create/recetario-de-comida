import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variante?: 'subir' | 'zoom'
}

// Renderizado directo sin animaciones
export const Reveal = ({ children, className = '' }: RevealProps) => {
  return <div className={className}>{children}</div>
}
