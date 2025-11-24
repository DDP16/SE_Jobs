import { configureStore } from '@reduxjs/toolkit'
import authReducer from './app/modules/services/authService'
import userReducer from './app/modules/services/userService'
import jobsReducer from './app/modules/services/jobsService'
import addressReducer from './app/modules/services/addressService'

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobs: jobsReducer,
    address: addressReducer,
  },
})