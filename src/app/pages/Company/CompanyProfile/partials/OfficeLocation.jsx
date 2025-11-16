import { Plus, Pencil, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "./ActionButton";

const locations = [
  { country: "United States", flag: "🇺🇸", isHeadquarters: true },
  { country: "England", flag: "🏴", isHeadquarters: false },
  { country: "Japan", flag: "🇯🇵", isHeadquarters: false },
  { country: "Australia", flag: "🇦🇺", isHeadquarters: false },
  { country: "China", flag: "🇨🇳", isHeadquarters: false },
];

export default function OfficeLocations() {
  return (
    <div className="bg-card p-2 pb-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Office Locations</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add contact" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit contact" />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {locations.map((location) => (
          <div key={location.country} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{location.flag}</span>
              <span className="text-lg font-medium text-foreground">{location.country}</span>
            </div>
            {location.isHeadquarters && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                Head Quarters
              </Badge>
            )}
          </div>
        ))}
      </div>

      <Button variant="link" className="text-primary p-0 h-auto font-medium">
        View countries
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};
