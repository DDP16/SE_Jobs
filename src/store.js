import { configureStore } from '@reduxjs/toolkit'
import authReducer from './app/modules/services/authService'
import userReducer from './app/modules/services/userService'
import jobsReducer from './app/modules/services/jobsService'
import addressReducer from './app/modules/services/addressService'
import companyReducer from './app/modules/services/companyService'
import topCVJobsReducer from './app/modules/services/topCVService'

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobs: jobsReducer,
    address: addressReducer,
    company: companyReducer,
    topCVJobs: topCVJobsReducer,
  },
})