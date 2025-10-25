import { motion } from "framer-motion";
import { Badge } from "../../../components/ui/badge";

export default function JobSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="bg-card rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">
          About this role
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success font-medium">5 applied</span>
            <span className="text-muted-foreground">of 10 capacity</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Apply Before</span>
              <span className="font-medium text-foreground">July 31, 2021</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Job Posted On</span>
              <span className="font-medium text-foreground">July 1, 2021</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Job Type</span>
              <span className="font-medium text-foreground">Full-Time</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Salary</span>
              <span className="font-medium text-foreground">$75k-$85k USD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-warning/10 text-warning hover:bg-warning/20 rounded-lg">
            Marketing
          </Badge>
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground rounded-lg">
            Design
          </Badge>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-lg border-primary text-primary">
            Project Management
          </Badge>
          <Badge variant="outline" className="rounded-lg border-primary text-primary">
            Copywriting
          </Badge>
          <Badge variant="outline" className="rounded-lg border-primary text-primary">
            Social Media Marketing
          </Badge>
          <Badge variant="outline" className="rounded-lg border-primary text-primary">
            English
          </Badge>
          <Badge variant="outline" className="rounded-lg border-primary text-primary">
            Copy Editing
          </Badge>
        </div>
      </div>
    </motion.div>
  );
};