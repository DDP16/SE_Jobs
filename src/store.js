import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./app/modules/services/authService";
import userReducer from "./app/modules/services/userService";
import jobsReducer from "./app/modules/services/jobsService";
import addressReducer from "./app/modules/services/addressService";
import companyReducer from "./app/modules/services/companyService";
import topCVJobsReducer from "./app/modules/services/topCVService";
import categoriesReducer from "./app/modules/services/categoriesService";
import skillsReducer from "./app/modules/services/skillsService";
import employmentTypesReducer from "./app/modules/services/employmentTypeService";
import levelsReducer from "./app/modules/services/levelsService";
import companyTypesReducer from "./app/modules/services/companyTypeService";
import educationsReducer from "./app/modules/services/educationsService";
import mediaReducer from "./app/modules/services/mediaService";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobs: jobsReducer,
    address: addressReducer,
    company: companyReducer,
    topCVJobs: topCVJobsReducer,
    categories: categoriesReducer,
    skills: skillsReducer,
    employmentTypes: employmentTypesReducer,
    levels: levelsReducer,
    companyTypes: companyTypesReducer,
    educations: educationsReducer,
    media: mediaReducer,
  },
});
