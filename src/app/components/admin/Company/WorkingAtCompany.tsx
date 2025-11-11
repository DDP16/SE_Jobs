import { Plus, Pencil } from "lucide-react";
import { ActionButton } from "./ActionButton";

export const WorkingAtCompany = () => {
  return (
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Working at Nomad</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add contact" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit contact" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
            alt="Office space"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-3">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=300&fit=crop"
              alt="Team meeting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
