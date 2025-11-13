import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Benefits } from "@/components/admin/Company/Benefits";
import { CompanyHeader } from "@/components/admin/Company/CompanyHeader";
import { CompanyDescription } from "@/components/admin/Company/CompanyDescription";
import { Contact } from "@/components/admin/Company/Contact";

import { Techstack } from "@/components/admin/Company/Techstack";
import { WorkingAtCompany } from "@/components/admin/Company/WorkingAtCompany";
import { Team } from "@/components/admin/Company/Team";
import { TopBar } from "@/components/admin/TopBar";
import { OfficeLocations } from "../../components/admin/Company/OfficeLocation";

const CompanyProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="p-2 pl-10">
        <div className="max-w-7xl mx-auto p-6 space-y-2">
          <CompanyHeader />

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-2">
              <CompanyDescription />
              <Contact />
              <WorkingAtCompany />
              <Team />
              <Benefits />
            </div>

            <div className="space-y-6">
              <Techstack />
              <OfficeLocations />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyProfile;
