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
} from './utils/validator';

export { loginWithEmail, register, getMe, logout } from './services/authService';