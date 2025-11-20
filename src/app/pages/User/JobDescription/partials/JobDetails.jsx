import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

export default function JobDetails({ job }) {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">Description</h4>
        <p className="text-muted-foreground leading-relaxed">
          {job.description || "Job Description"}
        </p>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">Responsibilities</h4>
        <ul className="space-y-2">
          {job.responsibilities?.map((item, index) => (
            <li key={index} className="flex gap-3 text-muted-foreground">
              <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          )) || <li>No responsibilities listed.</li>}
        </ul>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">Who You Are</h4>
        <ul className="space-y-2">
          {job.requirements?.map((item, index) => (
            <li key={index} className="flex gap-3 text-muted-foreground">
              <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          )) || <li>No requirements listed.</li>}
        </ul>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h4 className="text-2xl font-bold text-foreground mb-4">Nice-To-Haves</h4>
        <ul className="space-y-2">
          {job.niceToHaves?.map((item, index) => (
            <li key={index} className="flex gap-3 text-muted-foreground">
              <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          )) || <li>No nice-to-haves listed.</li>}
        </ul>
      </motion.section>
    </motion.div>
  );
};