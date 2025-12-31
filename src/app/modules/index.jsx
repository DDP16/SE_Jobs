export {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateExperienceForm,
  validateEducationForm,
  validateProjectForm,
  validateCertificateForm,
  validateAwardForm,
  validateSkillGroupForm,
  validateLanguagesList,
} from "./utils/validator";

export { loginWithEmail, register, getMe, logout, resetPassword } from './services/authService';
export { getProvinces, getWards } from './services/addressService';
export { getJobs, getJobById, getJobsByCompanyId } from './services/jobsService';
export { getCompanies, getCompany, createCompany, updateCompany, deleteCompany } from './services/companyService';
export { getTopCVJobs } from './services/topCVService';
export { getUserById, updateUser } from './services/userService';
export { getCategories } from "./services/categoriesService";
export { getSkills } from "./services/skillsService";
export { getEmploymentTypes } from "./services/employmentTypeService";
export { getLevels } from "./services/levelsService";
export { getEducations } from "./services/educationsService";
export { uploadMedia, deleteMedia } from "./services/mediaService";
export { getCompanyTypes } from "./services/companyTypeService";
export { getProjectsByStudentId, getProject, createProject, updateProject, deleteProject } from "./services/projectsService";
export { getCertificatesByStudentId, getCertificate, createCertificate, updateCertificate, deleteCertificate } from "./services/certificateService";
export { getExperiencesByStudentId, getExperienceById, createExperience, updateExperience, deleteExperience } from "./services/experiencesService";
export { getEducationByStudentId, getEducation, createEducation, updateEducation, deleteEducation } from "./services/educationsService";
export { getCvs, getCvsByStudentId, getCvById, createCv, updateCv, deleteCv } from "./services/cvService";
export { getSavedJobs, addSavedJob, removeSavedJob } from "./services/savedJobsService";
