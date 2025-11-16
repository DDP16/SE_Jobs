import { Plus, Pencil } from "lucide-react";
import { ActionButton } from "./ActionButton";

export default function WorkingAtCompany() {
  return (
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Working at Company</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add info" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit info" />
        </div>
      </div>
      <div className="text-muted-foreground text-sm">
        <p>
          Our company culture is built on collaboration, innovation, and respect. We value diversity and encourage our
          team members to bring their unique perspectives to the table.
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Flexible working hours</li>
          <li>Remote-friendly environment</li>
          <li>Continuous learning opportunities</li>
          <li>Supportive leadership</li>
        </ul>
      </div>
    </div>
  );
};
