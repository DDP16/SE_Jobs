import { motion } from "framer-motion";
import { uiBadge as Badge, BorderLinearProgress } from "../../../../components";
import { useSelector } from "react-redux";
export default function JobSidebar({ job }) {

  const jobStatus = useSelector(state => state.jobs.status);
  const jobError = useSelector(state => state.jobs.error);

  if (jobStatus === "loading" && !job) {
    return (
      <div className="space-y-8">
        <p className="text-muted-foreground">Loading job details...</p>
      </div>
    );
  }
  if (jobStatus === "failed" && jobError) {
    return (
      <div className="space-y-8">
        <p className="text-destructive">{jobError || "Failed to load job details."}</p>
      </div>
    );
  }
  if (!job) {
    return (
      <div className="space-y-8">
        <p className="text-muted-foreground">Job not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      <h4 className="text-lg font-bold text-foreground mb-4">
        About this role
      </h4>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-success font-medium">{job.applied || 0} applied</span>
          <span className="text-muted-foreground">of {job.capacity || 0} capacity</span>
        </div>
        <BorderLinearProgress variant="determinate" value={job.applied && job.capacity ? (job.applied / job.capacity) * 100 : 0} />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Apply Before</span>
            <span className="font-medium text-foreground">{job.dueDate ? new Date(job.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Job Posted On</span>
            <span className="font-medium text-foreground">{job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Job Type</span>
            <span className="font-medium text-foreground">{job.type || "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Salary</span>
            <span className="font-medium text-foreground">{job.salary || "N/A"}</span>
          </div>
        </div>
      </div>

      <hr className="border-t border-neutrals-20" />

      <h4 className="text-lg font-bold text-foreground mb-2">Categories</h4>
      <div className="flex flex-wrap gap-2">
        {job.categories?.map((category, index) => (
          <Badge
            key={`category-${category}-${index}`}
            variant="secondary"
            className={`bg-accent-green/10 text-accent-green hover:bg-accent-green/20 px-2.5 py-1.5 rounded-lg`}
          >
            {category}
          </Badge>
        )) || <span className="text-muted-foreground">No categories listed.</span>}
      </div>

      <hr className="border-t border-neutrals-20" />

      <h4 className="text-lg font-bold text-foreground mb-2">Required Skills</h4>
      <div className="flex flex-wrap gap-2">
        {job.requiredSkills?.map((skill, index) => (
          <Badge
            key={`skill-${skill}-${index}`}
            className="rounded-lg bg-background-lightBlue text-primary hover:bg-primary/10 px-2.5 py-1.5"
          >
            {skill}
          </Badge>
        )) || <span className="text-muted-foreground">No skills listed.</span>}
      </div>
    </motion.div>
  );
}
