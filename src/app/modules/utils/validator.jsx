const sanitizeString = (value) => {
  if (typeof value !== 'string') return '';
  return value.trim();
};

const sanitizeUrl = (value) => {
  const sanitized = sanitizeString(value);
  if (!sanitized) return '';
  return sanitized;
};

const buildComparableDate = (month, year) => {
  if (!month || !year) return null;
  const monthIndex = parseInt(month, 10) - 1;
  const numericYear = parseInt(year, 10);

  if (Number.isNaN(monthIndex) || Number.isNaN(numericYear)) return null;

  return new Date(numericYear, Math.max(monthIndex, 0), 1).getTime();
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  return confirmPassword === password;
};

export const validateExperienceForm = (formData = {}) => {
  const sanitizedData = {
    ...formData,
    jobTitle: sanitizeString(formData.jobTitle || formData.title || ''),
    company: sanitizeString(formData.company || formData.employer || ''),
    startMonth: formData.startMonth || '',
    startYear: formData.startYear || '',
    endMonth: formData.isCurrentlyWorking ? '' : (formData.endMonth || ''),
    endYear: formData.isCurrentlyWorking ? '' : (formData.endYear || ''),
    description: formData.description || formData.content || '',
  };

  const errors = {};
  const currentYear = new Date().getFullYear();
  const numericStartYear = parseInt(sanitizedData.startYear, 10);

  if (!sanitizedData.jobTitle) {
    errors.jobTitle = 'modals.experience.errors.jobTitleRequired';
  }

  if (!sanitizedData.company) {
    errors.company = 'modals.experience.errors.companyRequired';
  }

  if (!sanitizedData.startMonth) {
    errors.startMonth = 'modals.experience.errors.startMonthRequired';
  }

  if (!sanitizedData.startYear) {
    errors.startYear = 'modals.experience.errors.startYearRequired';
  } else if (!Number.isNaN(numericStartYear) && numericStartYear > currentYear) {
    errors.startYear = 'modals.experience.errors.startYearFuture';
  }

  if (!sanitizedData.isCurrentlyWorking) {
    if (!sanitizedData.endMonth) {
      errors.endMonth = 'modals.experience.errors.endMonthRequired';
    }

    if (!sanitizedData.endYear) {
      errors.endYear = 'modals.experience.errors.endYearRequired';
    }
  }

  const startDate = buildComparableDate(sanitizedData.startMonth, sanitizedData.startYear);
  const endDate = sanitizedData.isCurrentlyWorking ? null : buildComparableDate(sanitizedData.endMonth, sanitizedData.endYear);

  if (startDate && endDate && startDate > endDate) {
    errors.dateRange = 'modals.experience.errors.dateRange';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};

export const validateProjectForm = (formData = {}) => {
  const sanitizedData = {
    ...formData,
    projectName: sanitizeString(formData.projectName || formData.name || ''),
    isCurrentlyWorking: Boolean(formData.isCurrentlyWorking),
    startMonth: formData.startMonth || '',
    startYear: formData.startYear || '',
    endMonth: formData.isCurrentlyWorking ? '' : (formData.endMonth || ''),
    endYear: formData.isCurrentlyWorking ? '' : (formData.endYear || ''),
    description: formData.description || '',
    websiteLink: sanitizeUrl(formData.websiteLink || formData.website || ''),
  };

  const errors = {};
  const currentYear = new Date().getFullYear();
  const numericStartYear = parseInt(sanitizedData.startYear, 10);

  if (!sanitizedData.projectName) {
    errors.projectName = 'modals.projects.errors.projectNameRequired';
  }

  if (!sanitizedData.startMonth) {
    errors.startMonth = 'modals.projects.errors.startMonthRequired';
  }

  if (!sanitizedData.startYear) {
    errors.startYear = 'modals.projects.errors.startYearRequired';
  } else if (!Number.isNaN(numericStartYear) && numericStartYear > currentYear) {
    errors.startYear = 'modals.projects.errors.startYearFuture';
  }

  if (!sanitizedData.isCurrentlyWorking) {
    if (!sanitizedData.endMonth) {
      errors.endMonth = 'modals.projects.errors.endMonthRequired';
    }

    if (!sanitizedData.endYear) {
      errors.endYear = 'modals.projects.errors.endYearRequired';
    }
  }

  const startDate = buildComparableDate(sanitizedData.startMonth, sanitizedData.startYear);
  const endDate = sanitizedData.isCurrentlyWorking ? null : buildComparableDate(sanitizedData.endMonth, sanitizedData.endYear);

  if (startDate && endDate && startDate > endDate) {
    errors.dateRange = 'modals.projects.errors.dateRange';
  }

  if (sanitizedData.websiteLink) {
    try {
      // Allow omission of protocol by attempting to construct a URL
      // If protocol missing, prepend https:// for validation purposes
      const candidate = sanitizedData.websiteLink.match(/^https?:\/\//i)
        ? sanitizedData.websiteLink
        : `https://${sanitizedData.websiteLink}`;
      // eslint-disable-next-line no-new
      new URL(candidate);
      sanitizedData.websiteLink = candidate;
    } catch (_err) {
      errors.websiteLink = 'modals.projects.errors.websiteInvalid';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};

export const validateEducationForm = (formData = {}) => {
  const sanitizedData = {
    ...formData,
    school: sanitizeString(formData.school || formData.university || ''),
    degree: sanitizeString(formData.degree || ''),
    major: sanitizeString(formData.major || formData.fieldOfStudy || ''),
    startMonth: formData.startMonth || '',
    startYear: formData.startYear || '',
    endMonth: formData.isCurrentlyStudying ? '' : (formData.endMonth || ''),
    endYear: formData.isCurrentlyStudying ? '' : (formData.endYear || ''),
    description: formData.description || '',
  };

  const errors = {};
  const currentYear = new Date().getFullYear();
  const numericStartYear = parseInt(sanitizedData.startYear, 10);

  if (!sanitizedData.school) {
    errors.school = 'modals.education.errors.schoolRequired';
  }

  if (!sanitizedData.degree) {
    errors.degree = 'modals.education.errors.degreeRequired';
  }

  if (!sanitizedData.major) {
    errors.major = 'modals.education.errors.majorRequired';
  }

  if (!sanitizedData.startMonth) {
    errors.startMonth = 'modals.education.errors.startMonthRequired';
  }

  if (!sanitizedData.startYear) {
    errors.startYear = 'modals.education.errors.startYearRequired';
  } else if (!Number.isNaN(numericStartYear) && numericStartYear > currentYear) {
    errors.startYear = 'modals.education.errors.startYearFuture';
  }

  if (!sanitizedData.isCurrentlyStudying) {
    if (!sanitizedData.endMonth) {
      errors.endMonth = 'modals.education.errors.endMonthRequired';
    }

    if (!sanitizedData.endYear) {
      errors.endYear = 'modals.education.errors.endYearRequired';
    }
  }

  const startDate = buildComparableDate(sanitizedData.startMonth, sanitizedData.startYear);
  const endDate = sanitizedData.isCurrentlyStudying ? null : buildComparableDate(sanitizedData.endMonth, sanitizedData.endYear);

  if (startDate && endDate && startDate > endDate) {
    errors.dateRange = 'modals.education.errors.endAfterStart';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};

export const validateCertificateForm = (formData = {}) => {
  const sanitizedData = {
    ...formData,
    certificateName: sanitizeString(formData.certificateName || formData.name || ''),
    organization: sanitizeString(formData.organization || ''),
    issueMonth: formData.issueMonth || '',
    issueYear: formData.issueYear || '',
    certificateUrl: sanitizeUrl(formData.certificateUrl || formData.url || ''),
    description: formData.description || '',
  };

  const errors = {};
  const currentYear = new Date().getFullYear();
  const numericIssueYear = parseInt(sanitizedData.issueYear, 10);

  if (!sanitizedData.certificateName) {
    errors.certificateName = 'modals.certificates.errors.certificateNameRequired';
  }

  if (!sanitizedData.organization) {
    errors.organization = 'modals.certificates.errors.organizationRequired';
  }

  if (!sanitizedData.issueMonth) {
    errors.issueMonth = 'modals.certificates.errors.issueMonthRequired';
  }

  if (!sanitizedData.issueYear) {
    errors.issueYear = 'modals.certificates.errors.issueYearRequired';
  } else if (!Number.isNaN(numericIssueYear) && numericIssueYear > currentYear) {
    errors.issueYear = 'modals.certificates.errors.issueYearFuture';
  }

  if (sanitizedData.certificateUrl) {
    try {
      const candidate = sanitizedData.certificateUrl.match(/^https?:\/\//i)
        ? sanitizedData.certificateUrl
        : `https://${sanitizedData.certificateUrl}`;
      // eslint-disable-next-line no-new
      new URL(candidate);
      sanitizedData.certificateUrl = candidate;
    } catch (_err) {
      errors.certificateUrl = 'modals.certificates.errors.certificateUrlInvalid';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};

export const validateAwardForm = (formData = {}) => {
  const sanitizedData = {
    ...formData,
    awardName: sanitizeString(formData.awardName || formData.name || ''),
    awardOrganization: sanitizeString(formData.awardOrganization || formData.organization || ''),
    issueMonth: formData.issueMonth || '',
    issueYear: formData.issueYear || '',
    description: formData.description || '',
  };

  const errors = {};
  const currentYear = new Date().getFullYear();
  const numericIssueYear = parseInt(sanitizedData.issueYear, 10);

  if (!sanitizedData.awardName) {
    errors.awardName = 'modals.awards.errors.awardNameRequired';
  }

  if (!sanitizedData.awardOrganization) {
    errors.awardOrganization = 'modals.awards.errors.awardOrganizationRequired';
  }

  if (!sanitizedData.issueMonth) {
    errors.issueMonth = 'modals.awards.errors.issueMonthRequired';
  }

  if (!sanitizedData.issueYear) {
    errors.issueYear = 'modals.awards.errors.issueYearRequired';
  } else if (!Number.isNaN(numericIssueYear) && numericIssueYear > currentYear) {
    errors.issueYear = 'modals.awards.errors.issueYearFuture';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};

export const validateSkillGroupForm = (formData = {}) => {
  const sanitizedData = {
    groupName: sanitizeString(formData.groupName || formData.name || ''),
    skills: Array.isArray(formData.skills)
      ? formData.skills
        .map((skill) => ({
          id: skill.id ?? Date.now(),
          name: sanitizeString(skill.name || skill.skill_name || skill || ''),
        }))
        .filter((skill) => skill.name)
      : [],
  };

  const errors = {};

  if (!sanitizedData.groupName) {
    errors.groupName = 'modals.skills.errors.groupNameRequired';
  }

  if (sanitizedData.skills.length === 0) {
    errors.skills = 'modals.skills.errors.skillsRequired';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData,
  };
};

export const validateLanguagesList = (languages = []) => {
  const sanitizedLanguages = Array.isArray(languages)
    ? languages
      .map((lang) => ({
        language: sanitizeString(lang.language || ''),
        level: sanitizeString(lang.level || ''),
      }))
      .filter((lang) => lang.language)
    : [];

  const errors = {};

  if (sanitizedLanguages.length === 0) {
    errors.languages = 'modals.languages.errors.languagesRequired';
  } else if (sanitizedLanguages.some((lang) => !lang.level)) {
    errors.languages = 'modals.languages.errors.languageLevelRequired';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedLanguages,
  };
};
