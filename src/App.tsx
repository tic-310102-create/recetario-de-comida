import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { FavoritosPage } from './pages/FavoritosPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { RecetaPage } from './pages/RecetaPage.tsx'

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="recetas/:id" element={<RecetaPage />} />
      <Route path="favoritos" element={<FavoritosPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default App
