// Layout types for pages and components
export const layoutType = Object.freeze({
  full: 'full',
  compact: 'compact',
  minimal: 'minimal',
  half_width: 'half_width',
});

// Sort options for company list
export const sortType = Object.freeze({
  featured: 'featured',
  jobs: 'jobs',
  name: 'name',
  newest: 'newest',
  oldest: 'oldest',
});

// View modes for list/grid display
export const viewMode = Object.freeze({
  grid: 'grid',
  list: 'list',
});

// User Roles
export const Role = Object.freeze({
  STUDENT: "Student",
  EMPLOYER: "Employer",
  MANAGER: "Manager",
  ADMIN: "Admin"
});

// User Status
export const Status = Object.freeze({
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  BANNED: "Banned"
});

// Job Status
export const JobStatus = Object.freeze({
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  EXPIRED: "Expired"
});

// Application Status
export const ApplicationStatus = Object.freeze({
  SUBMITTED: "Submitted",
  VIEWED: "Viewed",
  INTERVIEW: "Interview",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected"
});

// Notification Types
export const NotificationType = Object.freeze({
  SYSTEM: "System",
  JOB: "Job",
  APPLICATION: "Application"
});

// Job Types
export const JobType = Object.freeze({
  FULL_TIME: "Full-Time",
  PART_TIME: "Part-Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance"
});

// Helper functions to get all values
export const getRoles = () => Object.values(Role);
export const getStatuses = () => Object.values(Status);
export const getJobStatuses = () => Object.values(JobStatus);
export const getApplicationStatuses = () => Object.values(ApplicationStatus);
export const getNotificationTypes = () => Object.values(NotificationType);
export const getJobTypes = () => Object.values(JobType);

// Helper functions to check enum values
export const isValidRole = (role) => Object.values(Role).includes(role);
export const isValidStatus = (status) => Object.values(Status).includes(status);
export const isValidJobStatus = (status) => Object.values(JobStatus).includes(status);
export const isValidApplicationStatus = (status) => Object.values(ApplicationStatus).includes(status);
export const isValidNotificationType = (type) => Object.values(NotificationType).includes(type);
export const isValidJobType = (type) => Object.values(JobType).includes(type);