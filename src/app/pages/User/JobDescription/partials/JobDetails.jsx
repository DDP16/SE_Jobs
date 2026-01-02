import { motion } from "framer-motion";
import { CircleCheck, MapPin } from "lucide-react";
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

  // Parse string with HTML breaks and newlines to array
  const parseStringToArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.trim()) {
      // Split by HTML breaks OR newlines and clean (ignore the break tokens themselves)
      return value
        .split(/<br\s*\/?>(?:\s*)?|\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
    return [];
  };

  // Handle responsibilities - ready for future data
  const responsibilities = parseStringToArray(job.responsibilities);

  // Handle requirements
  const requirements = parseStringToArray(job.requirement);

  // Handle nice to haves - ready for future data
  const niceToHaves = parseStringToArray(job.nice_to_haves || job.niceToHaves);

  // Handle work locations
  const getWorkLocations = () => {
    const locations = [];

    // From company_branches array
    if (Array.isArray(job.company_branches) && job.company_branches.length > 0) {
      job.company_branches.forEach(branch => {
        if (branch.address && branch.address.trim()) {
          locations.push(branch.address.trim());
        }
      });
    } else if (job.company_branches && !Array.isArray(job.company_branches) && job.company_branches.address) {
      // Handle case where company_branches is a single object (backward compatibility)
      locations.push(job.company_branches.address.trim());
    }

    // From workLocation array
    if (Array.isArray(job.workLocation) && job.workLocation.length > 0) {
      job.workLocation.forEach(loc => {
        if (typeof loc === 'string' && loc.trim()) {
          locations.push(loc.trim());
        } else if (loc && (loc.name || loc.address)) {
          const locParts = [loc.address, loc.name].filter(Boolean);
          if (locParts.length > 0) {
            locations.push(locParts.join(', '));
          }
        }
      });
    }

    // From locations array
    if (Array.isArray(job.locations) && job.locations.length > 0) {
      job.locations.forEach(loc => {
        if (typeof loc === 'string' && loc.trim()) {
          locations.push(loc.trim());
        }
      });
    }

    // From single location string
    if (job.location && typeof job.location === 'string' && job.location.trim()) {
      locations.push(job.location.trim());
    }

    // Remove duplicates
    return [...new Set(locations)];
  };

  const workLocations = getWorkLocations();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Description */}
      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">{t("job.description")}</h4>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {job?.description || t("job.no_description")}
        </p>
      </motion.section>

      {/* Work Locations */}
      {workLocations.length > 0 && (
        <motion.section variants={itemVariants}>
          <h4 className="text-2xl font-bold text-foreground mb-4">Vị trí văn phòng</h4>
          <ul className="space-y-2">
            {workLocations.map((location, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{location}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Responsibilities - will show when API provides data */}
      {responsibilities.length > 0 && (
        <motion.section variants={itemVariants}>
          <h4 className="text-2xl font-bold text-foreground mb-4">{t("job.responsibilities")}</h4>
          <ul className="space-y-2">
            {responsibilities.map((item, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Requirements */}
      {requirements.length > 0 && (
        <motion.section variants={itemVariants}>
          <h4 className="text-2xl font-bold text-foreground mb-4">{t("job.who_you_are")}</h4>
          <ul className="space-y-2">
            {requirements.map((item, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Nice to Haves - will show when API provides data */}
      {niceToHaves.length > 0 && (
        <motion.section variants={itemVariants}>
          <h4 className="text-2xl font-bold text-foreground mb-4">{t("job.nice_to_haves")}</h4>
          <ul className="space-y-2">
            {niceToHaves.map((item, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </motion.div>
  );
};