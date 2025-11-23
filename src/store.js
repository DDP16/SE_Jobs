import { configureStore } from '@reduxjs/toolkit'
import authReducer from './app/modules/services/authService'
import userReducer from './app/modules/services/userService'

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
})