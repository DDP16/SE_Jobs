import JobHeader from "./partials/JobHeader";
import JobDetails from "./partials/JobDetails";
import JobSidebar from "./partials/JobSidebar";
import PerksSection from "./partials/PerksSection";
import CompanySection from "./partials/CompanySection";
import SimilarJobs from "./partials/SimilarJobs";

export default function JobDescription() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Home / Companies / Nomad / Social Media Assistant
          </p>
        </div>

        <JobHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <JobDetails />
          </div>
          <div>
            <JobSidebar />
          </div>
        </div>

        <PerksSection />
        <CompanySection />
        <SimilarJobs />
      </div>
    </div>
  );
}
