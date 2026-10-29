import type { ReactNode } from 'react'

interface ContenedorProps {
  children: ReactNode
  className?: string
}

export const Contenedor = ({ children, className = '' }: ContenedorProps) => (
  <div className={`mx-auto w-full max-w-6xl px-4 ${className}`}>{children}</div>
)
