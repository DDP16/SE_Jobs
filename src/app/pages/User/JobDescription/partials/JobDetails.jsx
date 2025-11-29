import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function JobDetails({ job }) {
  const { t } = useTranslation();
  const jobStatus = useSelector(state => state.jobs.status);
  const jobError = useSelector(state => state.jobs.error);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Normalize arrays - ensure they are arrays before mapping
  const normalizeArray = (value) => {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    // If it's a string, try to parse it or return empty array
    if (typeof value === 'string') return [];
    // If it's an object, return empty array
    return [];
  };

  const responsibilities = normalizeArray(job.responsibilities);
  const requirements = normalizeArray(job.requirements || job.requirement);
  const niceToHaves = normalizeArray(job.niceToHaves || job.nice_to_haves);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">{t("job.description")}</h4>
        <p className="text-muted-foreground leading-relaxed">
          {job?.description || t("job.no_description")}
        </p>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">{t("job.responsibilities")}</h4>
        <ul className="space-y-2">
          {responsibilities.length > 0 ? (
            responsibilities.map((item, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li>{t("job.no_responsibilities")}</li>
          )}
        </ul>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">{t("job.who_you_are")}</h4>
        <ul className="space-y-2">
          {requirements.length > 0 ? (
            requirements.map((item, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li>{t("job.no_requirements")}</li>
          )}
        </ul>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">{t("job.nice_to_haves")}</h4>
        <ul className="space-y-2">
          {niceToHaves.length > 0 ? (
            niceToHaves.map((item, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li>{t("job.no_nice_to_haves")}</li>
          )}
        </ul>
      </motion.section>
    </motion.div>
  );
};