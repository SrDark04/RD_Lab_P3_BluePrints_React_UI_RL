import { NavLink, Route, Routes } from 'react-router-dom'
import BlueprintsPage from './pages/BlueprintsPage.jsx'
import BlueprintDetailPage from './pages/BlueprintDetailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFound from './pages/NotFound.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import BlueprintForm from './components/BlueprintForm.jsx'
import { useDispatch } from 'react-redux'
import { createBlueprint } from './features/blueprints/blueprintsSlice.js'

export default function App() {

  const dispatch = useDispatch()
  const handleCreate = (formData) => {
    dispatch(createBlueprint(formData));
  }

  return (
    <div className="container">
      <header>
        <h1>ECI - Laboratorio de Blueprints en React</h1>
        <nav>
          <NavLink to="/" end>
            Blueprints
          </NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<BlueprintsPage />} />
        <Route path="/blueprints/:author/:name" element={<BlueprintDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new" element={
          <PrivateRoute>
            <BlueprintForm onSubmit={handleCreate} />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
