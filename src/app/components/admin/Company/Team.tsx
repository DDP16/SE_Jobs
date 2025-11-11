import { Plus, Pencil, ArrowRight, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/admin/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/admin/avatar";
import { ActionButton } from "./ActionButton";

const team = [
  {
    name: "Celestin Gardinier",
    role: "CEO & Co-Founder",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Celestin",
  },
  {
    name: "Reynaud Colbert",
    role: "Co-Founder",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reynaud",
  },
  {
    name: "Arienne Lyon",
    role: "Managing Director",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arienne",
  },
];

export const Team = () => {
  return (
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Team</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add contact" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit contact" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center text-center p-4 border border-border rounded-sm border-gray-300 hover:border-primary hover:bg-accent transition-colors"
          >
            <Avatar className="w-20 h-20 mb-3">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h5 className="font-semibold text-sm text-foreground mb-1">{member.name}</h5>
            <p className="text-xs text-muted-foreground mb-3">{member.role}</p>
            <div className="flex gap-2">
              <button className="p-1.5 hover:bg-accent rounded">
                <Instagram className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="p-1.5 hover:bg-accent rounded">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="link" className="text-primary p-0 h-auto font-medium">
        View all core teams
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};
