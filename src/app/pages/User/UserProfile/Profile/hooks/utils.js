/**
 * Profile Utilities - Transform & Validation Functions
 * Consolidated from usecases, models, and schemas folders
 */

// ==================== TRANSFORM FUNCTIONS ====================

/**
 * Transform experience data from API format to UI format
 */
export const transformExperienceFromAPI = (exp) => {
  if (!exp) return null;

  try {
    let startMonth = '';
    let startYear = '';
    if (exp.start_date) {
      const startDate = new Date(exp.start_date);
      startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
      startYear = String(startDate.getFullYear());
    }

    let endMonth = '';
    let endYear = '';
    if (exp.end_date) {
      const endDate = new Date(exp.end_date);
      endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      endYear = String(endDate.getFullYear());
    }

    return {
      ...exp,
      id: exp.id,
      role: exp.position || exp.role,
      company: exp.company,
      location: exp.location,
      description: exp.description || '',
      isCurrentlyWorking: exp.is_current || exp.isCurrentlyWorking || false,
      startMonth,
      startYear,
      endMonth,
      endYear,
    };
  } catch (error) {
    console.error('Error transforming experience:', error, exp);
    return exp;
  }
};

/**
 * Transform experience data from UI format to API format
 */
export const transformExperienceToAPI = (formData) => {
  const startMonth = String(formData.startMonth || '').padStart(2, '0');
  const startDate = `${formData.startYear}-${startMonth}-01`;

  let endDate = null;
  if (!formData.isCurrentlyWorking && formData.endYear && formData.endMonth) {
    const endMonth = String(formData.endMonth).padStart(2, '0');
    endDate = `${formData.endYear}-${endMonth}-01`;
  }

  return {
    position: formData.jobTitle || formData.role,
    company: formData.company,
    location: formData.location || '',
    start_date: startDate,
    end_date: endDate,
    is_current: formData.isCurrentlyWorking || false,
    description: formData.description || '',
  };
};

/**
 * Transform education data from API format to UI format
 */
export const transformEducationFromAPI = (edu) => {
  if (!edu) return null;

  try {
    let startMonth = '';
    let startYear = '';
    if (edu.start_date) {
      const startDate = new Date(edu.start_date);
      startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
      startYear = String(startDate.getFullYear());
    }

    let endMonth = '';
    let endYear = '';
    if (edu.end_date) {
      const endDate = new Date(edu.end_date);
      endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      endYear = String(endDate.getFullYear());
    }

    return {
      ...edu,
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      major: edu.major || edu.field_of_study,
      description: edu.description || '',
      isCurrentlyStudying: edu.is_current || edu.isCurrentlyStudying || false,
      startMonth,
      startYear,
      endMonth,
      endYear,
    };
  } catch (error) {
    console.error('Error transforming education:', error, edu);
    return edu;
  }
};

/**
 * Transform education data from UI format to API format
 */
export const transformEducationToAPI = (formData) => {
  const startMonth = String(formData.startMonth || '').padStart(2, '0');
  const startDate = `${formData.startYear}-${startMonth}-01`;

  let endDate = null;
  if (!formData.isCurrentlyStudying && formData.endYear && formData.endMonth) {
    const endMonth = String(formData.endMonth).padStart(2, '0');
    endDate = `${formData.endYear}-${endMonth}-01`;
  }

  return {
    school: formData.school || '',
    degree: formData.degree || '',
    major: formData.major || '',
    start_date: startDate,
    end_date: endDate,
    description: formData.description || '',
  };
};

/**
 * Transform project data from API format to UI format
 */
export const transformProjectFromAPI = (proj) => {
  if (!proj) return null;

  try {
    let startMonth = '';
    let startYear = '';
    if (proj.start_date) {
      const startDate = new Date(proj.start_date);
      startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
      startYear = String(startDate.getFullYear());
    }

    let endMonth = '';
    let endYear = '';
    let isCurrentlyWorking = false;
    if (proj.end_date) {
      const endDate = new Date(proj.end_date);
      endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      endYear = String(endDate.getFullYear());
    } else {
      isCurrentlyWorking = proj.is_working_on || false;
    }

    return {
      ...proj,
      projectName: proj.name,
      startMonth,
      startYear,
      endMonth,
      endYear,
      isCurrentlyWorking: proj.is_working_on || isCurrentlyWorking,
      websiteLink: proj.website_link || proj.website || proj.websiteLink,
    };
  } catch (error) {
    console.error('Error transforming project:', error, proj);
    return proj;
  }
};

/**
 * Transform project data from UI format to API format
 */
export const transformProjectToAPI = (formData) => {
  const startMonth = String(formData.startMonth || '').padStart(2, '0');
  const startDate = `${formData.startYear}-${startMonth}-01`;

  let endDate = null;
  if (!formData.isCurrentlyWorking && formData.endYear && formData.endMonth) {
    const endMonth = String(formData.endMonth).padStart(2, '0');
    endDate = `${formData.endYear}-${endMonth}-01`;
  }

  // Get websiteLink from multiple possible field names
  const websiteLink = formData.websiteLink || formData.website || formData.website_link || '';

  return {
    name: formData.projectName || '',
    start_date: startDate,
    end_date: endDate,
    description: formData.description || '',
    website: websiteLink,
  };
};

/**
 * Transform certificate data from API format to UI format
 */
export const transformCertificateFromAPI = (cert) => {
  if (!cert) return null;

  try {
    let issueMonth = '';
    let issueYear = '';
    if (cert.issue_date) {
      const issueDate = new Date(cert.issue_date);
      issueMonth = String(issueDate.getMonth() + 1).padStart(2, '0');
      issueYear = String(issueDate.getFullYear());
    }

    return {
      ...cert,
      certificateName: cert.name,
      issueMonth,
      issueYear,
      certificateUrl: cert.certification_url || cert.url || cert.certificateUrl,
      description: cert.description || '',
    };
  } catch (error) {
    console.error('Error transforming certificate:', error, cert);
    return cert;
  }
};

/**
 * Transform certificate data from UI format to API format
 */
export const transformCertificateToAPI = (formData) => {
  const issueMonth = String(formData.issueMonth || '').padStart(2, '0');
  const issueDate = `${formData.issueYear}-${issueMonth}-01`;

  return {
    name: formData.certificateName || '',
    organization: formData.organization || '',
    issue_date: issueDate,
    url: formData.certificateUrl || '',
    description: formData.description || '',
  };
};

/**
 * Calculate profile completion percentage
 */
export const calculateCompletionPercentage = (user, about, experiences, educations, projects, certificates, skills) => {
  const sections = [
    user.name,
    user.email,
    about,
    user.location,
    experiences.length > 0,
    educations.length > 0,
    projects.length > 0,
    certificates.length > 0,
    skills.length > 0
  ];
  const completed = sections.filter(Boolean).length;
  return Math.round((completed / sections.length) * 100);
};

// ==================== VALIDATION FUNCTIONS ====================

/**
 * Validate education form data
 */
export const validateEducationForm = (formData) => {
  if (!formData.school || !formData.degree || !formData.major || !formData.startYear || !formData.startMonth) {
    return { valid: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' };
  }
  return { valid: true };
};

/**
 * Validate project form data
 */
export const validateProjectForm = (formData) => {
  if (!formData.projectName || !formData.startYear || !formData.startMonth) {
    return { valid: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' };
  }
  return { valid: true };
};

/**
 * Validate certificate form data
 */
export const validateCertificateForm = (formData) => {
  if (!formData.certificateName || !formData.organization || !formData.issueYear || !formData.issueMonth) {
    return { valid: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' };
  }
  return { valid: true };
};
