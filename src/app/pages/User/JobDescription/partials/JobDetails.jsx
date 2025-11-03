import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

export default function JobDetails() {
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
        <h3 className="text-2xl font-bold text-foreground mb-4">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          Stripe is looking for a Social Media Marketing expert to help manage our online networks. You will
          be responsible for monitoring our social media channels, creating content, finding effective ways
          to engage the community and incentivize others to engage on our channels.
        </p>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h3 className="text-2xl font-bold text-foreground mb-6">Responsibilities</h3>
        <ul className="space-y-3">
          {[
            "Community engagement to ensure that is supported and actively represented online",
            "Focus on social media marketing and blogging to increase engagement and outreach",
            "Marketing and strategy support",
            "Stay on top of trends on social media platforms, and suggest content ideas to the team",
            "Engage with online communities",
          ].map((item, index) => (
            <li key={index} className="flex gap-3 text-muted-foreground">
              <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h3 className="text-2xl font-bold text-foreground mb-6">Who You Are</h3>
        <ul className="space-y-3">
          {[
            "You get energy from people and building the ideal work environment",
            "You have a sense for beautiful spaces and office experiences",
            "You are a confident office manager, ready for added responsibilities",
            "You're detail-oriented and creative",
            "You're a growth marketer and know how to run campaigns",
          ].map((item, index) => (
            <li key={index} className="flex gap-3 text-muted-foreground">
              <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h3 className="text-2xl font-bold text-foreground mb-6">Nice-To-Haves</h3>
        <ul className="space-y-3">
          {[
            "Fluent in English",
            "Project management skills",
            "Copy editing skills",
          ].map((item, index) => (
            <li key={index} className="flex gap-3 text-muted-foreground">
              <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  );
};