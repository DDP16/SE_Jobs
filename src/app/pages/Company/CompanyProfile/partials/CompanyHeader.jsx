import { Eye, Settings2, Users, MapPin, Building } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import { srcAsset } from "../../../../lib";
import { Business, CalendarToday, LocationOn, People } from "@mui/icons-material";
import React from "react";

export default function CompanyHeader({ company }) {
  const { t } = useTranslation();

  const name = company.name || "";
  const logo = company.logo || srcAsset.nomadIcon;
  const firstBranch = company.company_branches?.[0];
  const location = firstBranch
    ? `${[
        firstBranch.address,
        firstBranch.ward?.name,
        firstBranch.province?.name,
        firstBranch.country?.name
      ].filter(Boolean).join(', ')}`
    : "";
  const industry = company.company_types?.length > 0
    ? company.company_types.map(type => type.name).join(", ")
    : "Industry";

  const stats = [
    {
      icon: <CalendarToday sx={{ fontSize: 20, color: "primary.main" }} />,
      label: t("company.header.founded"),
      value: `${company.created_at ? new Date(company.created_at).getFullYear() : "Unknown"}`,
    },
    {
      icon: <People sx={{ fontSize: 20, color: "primary.main" }} />,
      label: t("company.header.employees"),
      value: `${company.employee_count || 0}+`,
    },
    {
      icon: <LocationOn sx={{ fontSize: 20, color: "primary.main" }} />,
      label: t("company.header.location"),
      value: t("company.header.locations", { count: company.company_branches?.length || 0 }),
    },
    {
      icon: <Business sx={{ fontSize: 20, color: "primary.main" }} />,
      label: t("company.header.industry"),
      value: industry,
    },
  ];

  const foundedYear = company.created_at ? new Date(company.created_at).getFullYear() : "Unknown";

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 flex items-center gap-3 md:gap-4">
        <div className="
          h-20 sm:h-22 md:h-25 lg:h-30 
          w-20 sm:w-22 md:w-25 lg:w-30
          aspect-square rounded-2xl flex 
          items-center justify-center shadow-lg 
          p-3 border border-gray-200
        ">
          <img
            src={logo}
            alt={`${name} Logo`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
            onError={(e) => {
              e.target.src = srcAsset.fallback;
            }}
          />
        </div>

        <div className="flex-1 flex-col space-y-2">
          <div className="flex items-center justify-between gap-4 md:gap-6">
            <h4 className="font-bold text-foreground">{name}</h4>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-primary hover:text-primary">
                <Eye className="w-4 h-4 mr-2" /> {t("company.header.publicView")}
              </Button>
              <Button variant="ghost" className="text-primary hover:text-primary">
                <Settings2 className="w-4 h-4 mr-2" /> {t("companyProfile.profileSettings")}
              </Button>
            </div>
          </div>

          {location && (
            <div className="flex items-center gap-1">
              <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, color: "red" }} />
              <p className="text-xs sm:text-sm text-muted-foreground">{location}</p>
            </div>
          )}

          {company.website_url && (
            <a
              href={company.website_url.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm hover:underline inline-block"
            >
              {company.website_url.trim()}
            </a>
          )}

          <div className="flex gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 lg:gap-3">
                <div className="
                    bg-background-lightBlue 
                    rounded-full 
                    w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                    flex items-center 
                    justify-center"
                >
                  {React.cloneElement(stat.icon, {
                    sx: { fontSize: { xs: 16, sm: 18, lg: 20 }, color: "primary.main" }
                  })}
                </div>
                <div>
                  <p className="text-[0.7rem] sm:text-xs lg:text-sm text-muted-foreground whitespace-nowrap">{stat.label}</p>
                  <p className="text-[0.8rem] sm:text-[0.85rem] lg:text-[0.95rem] font-semibold text-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
