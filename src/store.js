import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./app/modules/services/authService";
import userReducer from "./app/modules/services/userService";
import jobsReducer from "./app/modules/services/jobsService";
import addressReducer from "./app/modules/services/addressService";
import companyReducer from "./app/modules/services/companyService";
import companyBranchesReducer from "./app/modules/services/companyBranchesService";
import topCVJobsReducer from "./app/modules/services/topCVService";
import categoriesReducer from "./app/modules/services/categoriesService";
import companyTypesReducer from "./app/modules/services/companyTypeService";
import skillsReducer from "./app/modules/services/skillsService";
import employmentTypesReducer from "./app/modules/services/employmentTypeService";
import levelsReducer from "./app/modules/services/levelsService";
import educationsReducer from "./app/modules/services/educationsService";
import mediaReducer from "./app/modules/services/mediaService";
import projectsReducer from "./app/modules/services/projectsService";
import certificatesReducer from "./app/modules/services/certificateService";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobs: jobsReducer,
    address: addressReducer,
    company: companyReducer,
    topCVJobs: topCVJobsReducer,
    categories: categoriesReducer,
    companyTypes: companyTypesReducer,
    companyBranches: companyBranchesReducer,
    skills: skillsReducer,
    employmentTypes: employmentTypesReducer,
    levels: levelsReducer,
    educations: educationsReducer,
    media: mediaReducer,
    projects: projectsReducer,
    certificates: certificatesReducer,
  },
});
