import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export const BotonRegresar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Si se entró directo a la URL no hay historial dentro de la app: ir al inicio.
  const regresar = () => (location.key === 'default' ? navigate('/') : navigate(-1))

  return (
    <button
      type="button"
      onClick={regresar}
      className="inline-flex items-center gap-2 rounded-full border border-tinta/15 bg-white px-4 py-2 text-sm font-medium transition hover:border-barro hover:text-barro"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Regresar
    </button>
  )
}
