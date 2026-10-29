import { Link } from 'react-router-dom'
import { Contenedor } from '../components/Contenedor.tsx'

export const NotFoundPage = () => (
  <Contenedor className="space-y-4 py-24 text-center">
    <h1 className="font-display text-4xl font-semibold">Página no encontrada</h1>
    <p className="text-tinta/70">La página que buscas no existe o fue movida.</p>
    <Link to="/" className="inline-block rounded-full bg-barro px-5 py-2 font-medium text-white hover:bg-barro-oscuro">
      Volver al inicio
    </Link>
  </Contenedor>
)
