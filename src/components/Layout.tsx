import { useEffect } from 'react'
import { ArrowUp, Heart } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useFavoritos } from '../hooks/useFavoritos.ts'

const anioActual = new Date().getFullYear()

export const Layout = () => {
  const { pathname, hash } = useLocation()
  const { favoritos } = useFavoritos()

  // Al cambiar de página, empezar desde arriba o en la sección indicada por el ancla.
  useEffect(() => {
    const destino = hash ? document.getElementById(hash.slice(1)) : null
    if (destino) destino.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-tinta/10 bg-crema/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-2xl font-semibold text-barro">
            Recetario
          </Link>
          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive ? 'bg-barro text-white' : 'hover:bg-barro/10 hover:text-barro'
              }`
            }
          >
            <Heart className="size-4" aria-hidden="true" />
            Favoritas
            <span className="rounded-full bg-tinta/10 px-2 text-xs">{favoritos.length}</span>
          </NavLink>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-tinta/10 bg-tinta text-white">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-12">
          {/* Fila superior con marca y botón volver arriba */}
          <div className="flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <Link to="/" className="font-display text-3xl font-bold tracking-tight text-white hover:text-white/90">
                Recetario
              </Link>
              <p className="text-sm text-white/60">
                Inspiración culinaria práctica con ingredientes frescos y resultados comprobados.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-barro hover:bg-barro hover:text-white"
            >
              <ArrowUp className="size-3.5" aria-hidden="true" />
              Subir al inicio
            </button>
          </div>

          {/* Columnas de navegación e información */}
          <div className="grid gap-10 py-10 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-xs font-bold tracking-[0.2em] text-barro uppercase">Sobre el proyecto</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Una selección curada de platillos explicados paso a paso para cocinar en casa con técnica y sabor.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/80">6 Recetas</span>
                <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/80">Paso a paso</span>
                <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/80">100% Casero</span>
              </div>
            </div>

            <nav aria-label="Navegación principal" className="flex flex-col gap-2.5 text-sm">
              <h3 className="text-xs font-bold tracking-[0.2em] text-barro uppercase">Navegación</h3>
              <Link to="/" className="w-fit text-white/70 hover:text-white">
                Inicio
              </Link>
              <Link to="/#recetas" className="w-fit text-white/70 hover:text-white">
                Catálogo de recetas
              </Link>
              <Link to="/favoritos" className="w-fit text-white/70 hover:text-white">
                Mis recetas favoritas ({favoritos.length})
              </Link>
            </nav>

            <div className="flex flex-col gap-2.5 text-sm">
              <h3 className="text-xs font-bold tracking-[0.2em] text-barro uppercase">Categorías</h3>
              <span className="text-white/70">🍳 Desayunos</span>
              <span className="text-white/70">🍲 Comidas</span>
              <span className="text-white/70">🌮 Cenas</span>
              <span className="text-white/70">🍰 Postres</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <h3 className="text-xs font-bold tracking-[0.2em] text-maiz uppercase">Consejo del Chef</h3>
              <p className="mt-2 leading-relaxed text-white/80">
                Tener todos los ingredientes lavados, pesados y picados antes de encender la estufa garantiza que cada platillo salga a la perfección.
              </p>
            </div>
          </div>

          {/* Barra inferior */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {anioActual} Recetario · Experiencia culinaria moderna y accesible.</p>
            <p>Cocina con confianza cada día</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
