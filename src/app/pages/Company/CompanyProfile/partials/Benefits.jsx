import { Plus, Pencil, Heart, Waves, Video, Mountain, Coffee, Plane } from "lucide-react";
import { ActionButton } from "./ActionButton";

const benefits = [
  {
    icon: Heart,
    title: "Full Healthcare",
    description: "We believe in thriving communities and that starts with our team being happy and healthy.",
    color: "text-blue-500",
  },
  {
    icon: Waves,
    title: "Unlimited Vacation",
    description: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    color: "text-blue-500",
  },
  {
    icon: Video,
    title: "Skill Development",
    description:
      "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
    color: "text-blue-500",
  },
  {
    icon: Mountain,
    title: "Team Summits",
    description:
      "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
    color: "text-blue-500",
  },
  {
    icon: Coffee,
    title: "Remote Working",
    description: "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.",
    color: "text-blue-500",
  },
  {
    icon: Plane,
    title: "Commuter Benefits",
    description: "We're grateful for all the time and energy each team member puts into getting to work every day.",
    color: "text-blue-500",
  },
];

export default function Benefits() {
  return (
    <div className="bg-card border-b border-gray-300 p-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Benefit</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add contact" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit contact" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
            </div>
            <div>
              <h5 className="font-semibold text-sm text-foreground mb-2">{benefit.title}</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
