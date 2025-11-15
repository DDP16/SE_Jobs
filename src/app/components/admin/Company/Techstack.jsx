import { Plus, Pencil } from "lucide-react";
import { ActionButton } from "./ActionButton";

const techstack = [
  { name: "React", icon: "/vite.svg" },
  { name: "Node.js", icon: "/vite.svg" },
  { name: "TailwindCSS", icon: "/vite.svg" },
  { name: "MongoDB", icon: "/vite.svg" },
  { name: "TypeScript", icon: "/vite.svg" },
];

export const Techstack = () => {
  return (
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Tech Stack</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add tech" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit tech" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {techstack.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center justify-center w-24 h-24 border border-border rounded-sm border-gray-300 hover:border-primary hover:bg-accent transition-colors"
          >
            <img src={tech.icon} alt={tech.name} className="w-10 h-10 mb-2" />
            <span className="text-xs text-foreground font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
