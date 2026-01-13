import { Facebook, Instagram, Linkedin, Mail, X, Youtube } from "lucide-react";

// Layout types for pages and components
export const layoutType = Object.freeze({
  full: 'full',
  compact: 'compact',
  minimal: 'minimal',
  preview: 'preview',
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
  CLOSED: "Closed"
});

// Application Status
export const ApplicationStatus = Object.freeze({
  APPLIED: "Applied",
  VIEWED: "Viewed",
  INTERVIEW_SCHEDULED: "Interview_Scheduled",
  HIRED: "Hired",
  REJECTED: "Rejected",
  SHORTLISTED: "Shortlisted",
  OFFERED: "Offered",
  CANCELLED: "Cancelled"
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

export const infoApplyStatus = Object.freeze({
  EMPTY: "Empty",
  LACK: "Lack",
  COMPLETE: "Complete"
});

export const SOCIAL_ICONS = {
  twitter: { icon: X, color: "text-sky-500" },
  facebook: { icon: Facebook, color: "text-blue-600" },
  linkedin: { icon: Linkedin, color: "text-blue-700" },
  youtube: { icon: Youtube, color: "text-red-500" },
  mail: { icon: Mail, color: "text-red-500" },
  instagram: { icon: Instagram, color: "text-pink-500" },
};

// Helper functions to get all values
export const getRoles = () => Object.values(Role);
export const getStatuses = () => Object.values(Status);
export const getJobStatuses = () => Object.values(JobStatus);
export const getApplicationStatuses = () => Object.values(ApplicationStatus);
export const getNotificationTypes = () => Object.values(NotificationType);
export const getJobTypes = () => Object.values(JobType);
export const getInfoApplyStatuses = () => Object.values(infoApplyStatus);

// Helper functions to check enum values
export const isValidRole = (role) => Object.values(Role).includes(role);
export const isValidStatus = (status) => Object.values(Status).includes(status);
export const isValidJobStatus = (status) => Object.values(JobStatus).includes(status);
export const isValidApplicationStatus = (status) => Object.values(ApplicationStatus).includes(status);
export const isValidNotificationType = (type) => Object.values(NotificationType).includes(type);
export const isValidJobType = (type) => Object.values(JobType).includes(type);
export const isValidInfoApplyStatus = (status) => Object.values(infoApplyStatus).includes(status);