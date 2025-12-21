import { Plus, Pencil, ArrowRight } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { ActionButton } from "./ActionButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const locations = [
  { country: "United States", flag: "🇺🇸", isHeadquarters: true },
  { country: "England", flag: "🏴", isHeadquarters: false },
  { country: "Japan", flag: "🇯🇵", isHeadquarters: false },
  { country: "Australia", flag: "🇦🇺", isHeadquarters: false },
  { country: "China", flag: "🇨🇳", isHeadquarters: false },
];

export default function OfficeLocations({ company }) {
  const { t } = useTranslation();
  const nav = useNavigate();

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 pt-2 md:p-6 md:pt-3 gap-2 flex flex-col">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold text-foreground">{t('company.office_location.title')}</h5>
        <div className="flex gap-2">
          <ActionButton 
            icon={<Pencil className="w-4 h-4" />}
            aria-label="Edit contact"
            onClick={() => nav("/branches")}
          />
        </div>
      </div>

      <div className="space-y-3">
        {company.company_branches && Array.isArray(company.company_branches) && company.company_branches.length > 0 ? (
          <div className='space-y-4'>
            {company.company_branches.map((branch, index) => (
              <div key={index} className=''>
                <h5 className='font-semibold'>
                  {branch.name || `Branch ${index + 1}`}
                </h5>
                <p className='text-muted-foreground'>
                  {[
                    branch.address,
                    branch.ward?.name,
                    branch.province?.name,
                    branch.country?.name
                  ].filter(Boolean).join(', ')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontStyle: 'italic', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            {t('company.office_location.no_locations') || 'No office locations available'}
          </p>
        )}
      </div>

      {company.company_branches && company.company_branches.length > 3 && (
        <Button variant="link" className="text-primary p-0 h-auto font-medium">
          View more
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </div>
  );
};
