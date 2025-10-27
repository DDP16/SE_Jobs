import { motion } from "framer-motion";
import { Badge } from "../../../components/ui/badge";

export default function JobSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-10"
    >
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

      <hr className="border-t border-neutrals-20"/>

      <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
      
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="bg-accent-yellow/10 text-accent-yellow hover:bg-accent-yellow/20 px-2.5 py-1.5 rounded-lg"
        >
          Marketing
        </Badge>
        <Badge
          variant="secondary"
          className="bg-accent-green/10 text-accent-green hover:bg-accent-green/20 px-2.5 py-1.5 rounded-lg"
        >
          Design
        </Badge>
      </div>

      <hr className="border-t border-neutrals-20"/>

      <h3 className="text-lg font-bold text-foreground mb-4">
        Required Skills
      </h3>
      
      <div className="flex flex-wrap gap-2">
        <Badge className="rounded-lg bg-background-lightBlue text-primary hover:bg-primary/10 px-2.5 py-1.5">
          Project Management
        </Badge>
        <Badge className="rounded-lg bg-background-lightBlue text-primary hover:bg-primary/10 px-2.5 py-1.5">
          Copywriting
        </Badge>
        <Badge className="rounded-lg bg-background-lightBlue text-primary hover:bg-primary/10 px-2.5 py-1.5">
          Social Media Marketing
        </Badge>
        <Badge className="rounded-lg bg-background-lightBlue text-primary hover:bg-primary/10 px-2.5 py-1.5">
          English
        </Badge>
        <Badge className="rounded-lg bg-background-lightBlue text-primary hover:bg-primary/10 px-2.5 py-1.5">
          Copy Editing
        </Badge>
      </div>
    </motion.div>
  );
}
