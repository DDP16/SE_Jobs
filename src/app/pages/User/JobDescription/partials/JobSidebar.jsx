import { motion } from "framer-motion";
import { BorderLinearProgress } from "@/components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export default function JobSidebar({ job }) {
  const { t } = useTranslation();
  const jobStatus = useSelector(state => state.jobs.status);
  const jobError = useSelector(state => state.jobs.error);
  const companyLogo = job?.company?.logo || job.logo;
  const companyName = typeof job?.company === 'string'
    ? job.company
    : job?.company?.name || "Company Name";

  if (jobStatus === "loading" && !job) {
    return (
      <div className="space-y-8">
        <p className="text-muted-foreground">{t("job.loading")}</p>
      </div>
    );
  }
  if (jobStatus === "failed" && jobError) {
    return (
      <div className="space-y-8">
        <p className="text-destructive">{jobError || t("job.error")}</p>
      </div>
    );
  }
  if (!job) {
    return (
      <div className="space-y-8">
        <p className="text-muted-foreground">{t("job.not_found")}</p>
      </div>
    );
  }

  // Format salary - handle both object and string formats
  const formatSalary = () => {
    // If salary is already a string, return it
    if (typeof job.salary === 'string') {
      return job.salary;
    }

    // If salary is an object with text property
    if (job.salary?.text) {
      return job.salary.text;
    }

    // If salary_text exists (direct field)
    if (job.salary_text) {
      return job.salary_text;
    }

    // If salary is an object with from/to
    if (job.salary?.from || job.salary?.to || job.salary_from || job.salary_to) {
      const from = job.salary?.from ?? job.salary_from;
      const to = job.salary?.to ?? job.salary_to;
      const currency = job.salary?.currency || job.salary_currency || '';

      if (from && to) {
        return `${from} - ${to} ${currency}`.trim();
      } else if (from) {
        return `${from} ${currency}`.trim();
      } else if (to) {
        return `Up to ${to} ${currency}`.trim();
      }
    }

    return "N/A";
  };

  const displaySalary = formatSalary();

  // Format job type - handle workingTime array, working_time, type, or employment_types
  const getDisplayType = () => {
    if (Array.isArray(job.workingTime) && job.workingTime.length > 0) {
      return job.workingTime.map(wt => typeof wt === 'string' ? wt : (wt.name || wt)).join(', ');
    }
    if (job.working_time) return job.working_time;
    if (job.type) return job.type;
    if (Array.isArray(job.employment_types) && job.employment_types.length > 0) {
      return job.employment_types.map(et => et.name || et).join(', ');
    }
    return "N/A";
  };

  const displayType = getDisplayType();

  // Normalize categories - handle both array of strings and array of objects
  const normalizedCategories = Array.isArray(job.categories)
    ? job.categories.map(cat => typeof cat === 'string' ? cat : (cat.name || cat))
    : [];

  // Normalize skills - handle both array of strings and array of objects
  const normalizedSkills = Array.isArray(job.skills)
    ? job.skills.map(skill => typeof skill === 'string' ? skill : (skill.name || skill))
    : (Array.isArray(job.requiredSkills)
      ? job.requiredSkills.map(skill => typeof skill === 'string' ? skill : (skill.name || skill))
      : []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      <h4 className="text-lg font-bold text-foreground mb-4">
        {t("company.info.title")}
      </h4>

      <div className="flex items-center mb-6 gap-4">
        <img
          src={companyLogo}
          alt={`${companyName} Logo`}
          className="w-14 h-14 object-contain"
        />
        <div>
          <h4 className="text-2xl font-bold text-foreground">{companyName}</h4>
          <a
            href="#"
            className="text-primary flex items-center gap-1 hover:underline mt-1"
          >
            {t("company.read_more_about", { companyName })}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <h4 className="text-lg font-bold text-foreground mb-4">
        {t("job.about_this_role")}
      </h4>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("job.apply_before")}</span>
            <span className="font-medium text-foreground">
              {job.deadline || job.dueDate
                ? new Date(job.deadline || job.dueDate).toLocaleDateString(t("languageDate"), { year: "numeric", month: "long", day: "numeric" })
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("job.posted_on")}</span>
            <span className="font-medium text-foreground">
              {job.createdAt || job.created_at
                ? new Date(job.createdAt || job.created_at).toLocaleDateString(t("languageDate"), { year: "numeric", month: "long", day: "numeric" })
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("job.job_type")}</span>
            <span className="font-medium text-foreground">{displayType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("job.salary")}</span>
            <span className="font-medium text-foreground">{displaySalary}</span>
          </div>
          {job.quantity && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("job.quantity")}</span>
              <span className="font-medium text-foreground">{job.quantity}</span>
            </div>
          )}
          {job.experience && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("job.experience")}</span>
              <span className="font-medium text-foreground">{job.experience}</span>
            </div>
          )}
          {job.position && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("job.position")}</span>
              <span className="font-medium text-foreground">{job.position}</span>
            </div>
          )}
          {/* {job.gender && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("job.gender")}</span>
              <span className="font-medium text-foreground">{job.gender}</span>
            </div>
          )} */}
        </div>
      </div>

      <hr className="border-t border-neutrals-20" />

      <h4 className="text-lg font-bold text-foreground mb-2">{t("job.categories")}</h4>
      <div className="flex flex-wrap gap-2">
        {normalizedCategories.length > 0 ? (
          normalizedCategories.map((category, index) => (
            <Badge
              key={`category-${category}-${index}`}
              variant="secondary"
              className={`bg-accent-green/10 text-accent-green hover:bg-accent-green/20 px-2.5 py-1.5 rounded-lg`}
            >
              {category}
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground">{t("job.no_categories_listed")}</span>
        )}
      </div>

      <hr className="border-t border-neutrals-20" />

      <h4 className="text-lg font-bold text-foreground mb-2">{t("job.required_skills")}</h4>
      <div className="flex flex-wrap gap-2">
        {normalizedSkills.length > 0 ? (
          normalizedSkills.map((skill, index) => (
            <Badge
              key={`skill-${skill}-${index}`}
              className="rounded-lg bg-background-lightBlue text-primary hover:bg-primary/10 px-2.5 py-1.5"
            >
              {skill}
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground">{t("job.no_skills_listed")}</span>
        )}
      </div>
    </motion.div>
  );
}
