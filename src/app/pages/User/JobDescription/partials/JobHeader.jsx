import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { ApplicationModal } from "@/components";
import { layoutType, srcAsset } from "../../../../lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";

export default function JobHeader({ job = {}, layout = layoutType.full }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to get job ID from various fields
  const getJobIdValue = (job) => {
    if (!job) return null;
    return job.id || job.job_id || job.jobId || job._id || job.external_id;
  };

  const jobId = getJobIdValue(job);
  const isPreview = layout === layoutType.preview;

  // Transform API data format to component format if needed
  const jobTitle = job.title || "Job Title";
  const jobCompany = job.company?.name || job.company || "Company Name";

  // Handle location - can be from workLocation array, location string, or company_branches
  const getJobLocation = () => {
    if (Array.isArray(job.workLocation) && job.workLocation.length > 0) {
      return job.workLocation.map(loc => typeof loc === 'string' ? loc : (loc.name || loc.address || loc)).join(', ');
    }
    if (job.location) return job.location;
    if (job.company_branches?.location) return job.company_branches.location;
    if (job.company?.address) return job.company.address;
    return "Location";
  };

  const jobLocation = getJobLocation();

  // Handle job type - can be from workingTime array, working_time, type, or employment_types
  const getJobType = () => {
    if (Array.isArray(job.workingTime) && job.workingTime.length > 0) {
      return job.workingTime.map(wt => typeof wt === 'string' ? wt : (wt.name || wt)).join(', ');
    }
    if (job.working_time) return job.working_time;
    if (job.type) return job.type;
    if (Array.isArray(job.employment_types) && job.employment_types.length > 0) {
      return job.employment_types.map(et => et.name || et).join(', ');
    }
    return "Job Type";
  };

  const jobType = getJobType();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 shadow-sm border border-gray-200 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <img
              src={job.company?.logo || job.logo}
              alt={job.company?.name}
              className="w-14 h-14 object-contain"
            />
            <div>
              {layout === layoutType.preview ? (
                <h5 className="text-3xl font-bold text-foreground mb-2">
                  {jobTitle}
                </h5>
              ) : (
                <h4 className="text-3xl font-bold text-foreground mb-2">
                  {jobTitle}
                </h4>
              )}
              <p className="text-muted-foreground">
                {jobCompany} • {jobLocation} • {jobType}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {!isPreview && (
              <Button variant="outline" size="icon" className="rounded-md">
                <Share2 className="w-5 h-5" />
              </Button>
            )}
            <Button
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 rounded-lg"
              onClick={() => {
                if (isPreview && jobId) {
                  navigate(`/job?id=${jobId}`);
                } else {
                  setIsModalOpen(true);
                }
              }}
            >
              {isPreview ? t("jobListing.table.viewDetails") : t("apply")}
            </Button>
          </div>
        </div>
      </motion.div>

      {!isPreview && <ApplicationModal open={isModalOpen} onOpenChange={setIsModalOpen} />}
    </>
  );
}
