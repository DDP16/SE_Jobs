import { Eye, Settings2, Users, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui";

export default function CompanyHeader({ company }) {
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((part) => part.charAt(0))
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "C";
  };

  const foundedYear = company.created_at ? new Date(company.created_at).getFullYear() : "Unknown";

  return (
    <div className="bg-card border-b border-gray-300 p-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-6">
          <div className="h-24 w-24 aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">{getInitials(company.name)}</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{company.name}</h3>
            {company.website_url && (
              <a
                href={company.website_url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline mb-6 inline-block"
              >
                {company.website_url.trim()}
              </a>
            )}

            <div className="grid grid-cols-4 gap-6 mt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Founded</p>
                  <p className="text-sm font-semibold text-foreground">{foundedYear}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Employees</p>
                  <p className="text-sm font-semibold text-foreground">
                    {company.employee_count ? `${company.employee_count}+` : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">Global (Remote)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Industry</p>
                  <p className="text-sm font-semibold text-foreground">Tech & Agriculture</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="ghost" className="text-primary hover:text-primary">
            <Eye className="w-4 h-4 mr-2" /> Public View
          </Button>
          <Button variant="ghost" className="text-primary hover:text-primary">
            <Settings2 className="w-4 h-4 mr-2" /> Profile Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
