import { motion } from "framer-motion";
import { uiBadge as Badge, BorderLinearProgress } from "../../../../components";

export default function JobSidebar({ job }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      <h3 className="text-lg font-bold text-foreground mb-4">
        About this role
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-success font-medium">{job.applied} applied</span>
          <span className="text-muted-foreground">of {job.capacity} capacity</span>
        </div>
        <BorderLinearProgress variant="determinate" value={(job.applied / job.capacity) * 100} />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Apply Before</span>
            <span className="font-medium text-foreground">{new Date(job.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Job Posted On</span>
            <span className="font-medium text-foreground">{new Date(job.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Job Type</span>
            <span className="font-medium text-foreground">{job.type}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Salary</span>
            <span className="font-medium text-foreground">{job.salary}</span>
          </div>
        </div>
      </div>

      <hr className="border-t border-neutrals-20"/>

      <h3 className="text-lg font-bold text-foreground mb-2">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {job.categories?.map((category, index) => (
          <Badge
            key={index}
            variant="secondary"
            className={`bg-accent-green/10 text-accent-green hover:bg-accent-green/20 px-2.5 py-1.5 rounded-lg`}
          >
            {category}
          </Badge>
        )) || <span className="text-muted-foreground">No categories listed.</span>}
      </div>

      <hr className="border-t border-neutrals-20"/>

      <h3 className="text-lg font-bold text-foreground mb-2">Required Skills</h3>
      <div className="flex flex-wrap gap-2">
        {job.requiredSkills?.map((skill, index) => (
          <Badge
            key={index}
            className="rounded-lg bg-background-lightBlue text-primary hover:bg-primary/10 px-2.5 py-1.5"
          >
            {skill}
          </Badge>
        )) || <span className="text-muted-foreground">No skills listed.</span>}
      </div>
    </motion.div>
  );
}
