import { TopBar } from "@/components";
import CompanyHeader from "./partials/CompanyHeader";
import CompanyDescription from "./partials/CompanyDescription";
import Contact from "./partials/Contact";
import WorkingAtCompany from "./partials/WorkingAtCompany";
import Team from "./partials/Team";
import Benefits from "./partials/Benefits";
import Techstack from "./partials/Techstack";
import OfficeLocations from "./partials/OfficeLocation";

export default function CompanyProfile() {
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