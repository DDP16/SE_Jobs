import './App.css'
import './app/styles/colors.css'
import './app/styles/font.css'
import './i18n'
import { useTranslation } from 'react-i18next'
import ThemeProvider from './app/providers/ThemeProvider'
import MainLayout from './app/layouts/MainLayout'
import Home from './app/pages/Home'
import MainRoutes from './app/routes/MainRoutes'

function App() {
  const { t } = useTranslation()

  return (
    <ThemeProvider>
      <MainLayout maxWidth={false}>
        {/* <MainRoutes /> */}
        <Home />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App