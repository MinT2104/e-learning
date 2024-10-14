import { Route, Routes, useNavigate } from "react-router-dom"
import { MappedAuthRoute, routes } from "./constants/Routes"
import AuthRoute from "./middleware/AuthRoute"
import ProtectedRoute from "./middleware/ProtectedRoute"
import DefaultLayout from "./Layouts/DefaultLayout"
import { useEffect } from "react"

function App() {

  const role = 'guest'
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to home when the component mounts (on reload)
    navigate('/');
  }, []);
  return (
    <Routes>
      {
        MappedAuthRoute.map((route: any, index: number) => (
          <Route
            key={index}
            path={route.path}
            element={
              <AuthRoute>
                {<route.element />}
              </AuthRoute>
            }
          />
        ))
      }
      {routes.map((route: any, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <ProtectedRoute role={role} allowedRoles={route.allowedRoles}>
              <DefaultLayout>
                {<route.element />}
              </DefaultLayout>
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  )
}

export default App
