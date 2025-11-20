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
    errors.jobTitle = 'Job title is required.';
  }

  if (!sanitizedData.company) {
    errors.company = 'Company name is required.';
  }

  if (!sanitizedData.startMonth) {
    errors.startMonth = 'Start month is required.';
  }

  if (!sanitizedData.startYear) {
    errors.startYear = 'Start year is required.';
  } else if (!Number.isNaN(numericStartYear) && numericStartYear > currentYear) {
    errors.startYear = 'Start year cannot be in the future.';
  }

  if (!sanitizedData.isCurrentlyWorking) {
    if (!sanitizedData.endMonth) {
      errors.endMonth = 'End month is required.';
    }

    if (!sanitizedData.endYear) {
      errors.endYear = 'End year is required.';
    }
  }

  const startDate = buildComparableDate(sanitizedData.startMonth, sanitizedData.startYear);
  const endDate = sanitizedData.isCurrentlyWorking ? null : buildComparableDate(sanitizedData.endMonth, sanitizedData.endYear);

  if (startDate && endDate && startDate > endDate) {
    errors.dateRange = 'End date must be after the start date.';
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
    errors.projectName = 'Project name is required.';
  }

  if (!sanitizedData.startMonth) {
    errors.startMonth = 'Start month is required.';
  }

  if (!sanitizedData.startYear) {
    errors.startYear = 'Start year is required.';
  } else if (!Number.isNaN(numericStartYear) && numericStartYear > currentYear) {
    errors.startYear = 'Start year cannot be in the future.';
  }

  if (!sanitizedData.isCurrentlyWorking) {
    if (!sanitizedData.endMonth) {
      errors.endMonth = 'End month is required.';
    }

    if (!sanitizedData.endYear) {
      errors.endYear = 'End year is required.';
    }
  }

  const startDate = buildComparableDate(sanitizedData.startMonth, sanitizedData.startYear);
  const endDate = sanitizedData.isCurrentlyWorking ? null : buildComparableDate(sanitizedData.endMonth, sanitizedData.endYear);

  if (startDate && endDate && startDate > endDate) {
    errors.dateRange = 'End date must be after the start date.';
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
      errors.websiteLink = 'Enter a valid URL (e.g. https://example.com).';
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
    errors.school = 'School is required.';
  }

  if (!sanitizedData.degree) {
    errors.degree = 'Degree is required.';
  }

  if (!sanitizedData.major) {
    errors.major = 'Major is required.';
  }

  if (!sanitizedData.startMonth) {
    errors.startMonth = 'Start month is required.';
  }

  if (!sanitizedData.startYear) {
    errors.startYear = 'Start year is required.';
  } else if (!Number.isNaN(numericStartYear) && numericStartYear > currentYear) {
    errors.startYear = 'Start year cannot be in the future.';
  }

  if (!sanitizedData.isCurrentlyStudying) {
    if (!sanitizedData.endMonth) {
      errors.endMonth = 'End month is required.';
    }

    if (!sanitizedData.endYear) {
      errors.endYear = 'End year is required.';
    }
  }

  const startDate = buildComparableDate(sanitizedData.startMonth, sanitizedData.startYear);
  const endDate = sanitizedData.isCurrentlyStudying ? null : buildComparableDate(sanitizedData.endMonth, sanitizedData.endYear);

  if (startDate && endDate && startDate > endDate) {
    errors.dateRange = 'End date must be after the start date.';
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
    errors.certificateName = 'Certificate name is required.';
  }

  if (!sanitizedData.organization) {
    errors.organization = 'Organization is required.';
  }

  if (!sanitizedData.issueMonth) {
    errors.issueMonth = 'Issue month is required.';
  }

  if (!sanitizedData.issueYear) {
    errors.issueYear = 'Issue year is required.';
  } else if (!Number.isNaN(numericIssueYear) && numericIssueYear > currentYear) {
    errors.issueYear = 'Issue year cannot be in the future.';
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
      errors.certificateUrl = 'Enter a valid URL (e.g. https://example.com).';
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
    errors.awardName = 'Award name is required.';
  }

  if (!sanitizedData.awardOrganization) {
    errors.awardOrganization = 'Award organization is required.';
  }

  if (!sanitizedData.issueMonth) {
    errors.issueMonth = 'Issue month is required.';
  }

  if (!sanitizedData.issueYear) {
    errors.issueYear = 'Issue year is required.';
  } else if (!Number.isNaN(numericIssueYear) && numericIssueYear > currentYear) {
    errors.issueYear = 'Issue year cannot be in the future.';
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
          ...skill,
          id: skill.id ?? Date.now(),
          name: sanitizeString(skill.name || ''),
          experience: sanitizeString(skill.experience || ''),
        }))
        .filter((skill) => skill.name)
      : [],
  };

  const errors = {};

  if (!sanitizedData.groupName) {
    errors.groupName = 'Group name is required.';
  }

  if (sanitizedData.skills.length === 0) {
    errors.skills = 'Please add at least one skill.';
  } else if (sanitizedData.skills.some((skill) => !skill.experience)) {
    errors.skills = 'Each skill must include an experience level.';
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
    errors.languages = 'Please add at least one language.';
  } else if (sanitizedLanguages.some((lang) => !lang.level)) {
    errors.languages = 'Each language needs an associated level.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedLanguages,
  };
};
