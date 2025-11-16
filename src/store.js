import { configureStore } from '@reduxjs/toolkit'
import authReducer from './app/modules/services/authService'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})