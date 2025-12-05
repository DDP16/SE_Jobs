import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import './app/styles/colors.css'
import './app/styles/font.css'
import './settings/i18n'
import MainRoutes from './app/routes/MainRoutes'
import { getMe } from './app/modules'
import { useUserProfile } from './app/hooks/useUserProfile'

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  
  // Auto-fetch profile data based on user role (Student, Employer, Admin)
  // This hook will automatically fetch the appropriate profile when user is authenticated
  useUserProfile()

  // Fetch basic user data (getMe) if authenticated but user data is missing
  // This ensures we have at least basic auth user data before fetching role-specific profile
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getMe())
    }
  }, [isAuthenticated, dispatch])

  return <MainRoutes />
}

export default App