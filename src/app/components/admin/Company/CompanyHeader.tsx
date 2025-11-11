import { Eye, Settings2, Flame, Users, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/admin/button";

export const CompanyHeader = () => {
  return (
    <div className="bg-card border-b border-gray-300 p-6 flex">
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-6 h-full">
          <div className="h-full aspect-square bg-linear-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-5xl">N</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Nomad</h3>
            <a href="https://nomad.com" className="text-primary text-sm hover:underline mb-6 inline-block">
              https://nomad.com
            </a>

            <div className="grid grid-cols-4 gap-6 mt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Founded</p>
                  <p className="text-sm font-semibold text-foreground">July 31, 2011</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Employees</p>
                  <p className="text-sm font-semibold text-foreground">4000+</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">20 countries</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Industry</p>
                  <p className="text-sm font-semibold text-foreground">Social & Non-Profit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" className="text-primary hover:text-primary">
            <Eye className="w-4 h-4 mr-2" />
            Public View
          </Button>
          <Button variant="ghost" className="text-primary hover:text-primary">
            <Settings2 className="w-4 h-4 mr-2" />
            Profile Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
