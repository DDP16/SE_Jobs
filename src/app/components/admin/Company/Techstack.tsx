import { Plus, Pencil, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/admin/button";
import { ActionButton } from "./ActionButton";

const techStack = [
  { name: "HTML 5", color: "bg-orange-500" },
  { name: "CSS 3", color: "bg-blue-500" },
  { name: "JavaScript", color: "bg-yellow-400" },
  { name: "Ruby", color: "bg-red-600" },
  { name: "Mixpanel", color: "bg-purple-500" },
  { name: "Framer", color: "bg-gray-900" },
];

export const TechStack = () => {
  return (
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Tech Stack</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add contact" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit contact" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center gap-2 p-4 hover:bg-accent rounded-lg transition-colors"
          >
            <div
              className={`w-16 h-16 ${tech.color} rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md`}
            >
              {tech.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-foreground">{tech.name}</span>
          </div>
        ))}
      </div>

      <Button variant="link" className="text-primary p-0 h-auto font-medium">
        View tech stack
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};
