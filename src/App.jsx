import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { routes } from './config/routes'
import AppHeader from './components/AppHeader'
function AppContent() {
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <AppHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="min-h-screen bg-surface-300 dark:bg-gray-900">
        <Routes>
          <Route path={routes.home.path} element={<routes.home.component />} />
          <Route path={routes.properties.path} element={<routes.properties.component />} />
          <Route path={routes.clients.path} element={<routes.clients.component />} />
          <Route path={routes.notFound.path} element={<routes.notFound.component />} />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App