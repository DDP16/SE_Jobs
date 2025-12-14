import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { ApplicationModal } from "@/components";
import { layoutType, srcAsset } from "../../../../lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";

export default function JobHeader({ job = {}, layout = layoutType.full }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform API data format to component format if needed
  const jobTitle = job.title || "Job Title";
  const jobCompany = job.company?.name || job.company || "Company Name";
  const jobLocation = job.location || job.company_branches?.location || "Location";
  const jobType = job.working_time || job.type || (Array.isArray(job.employment_types) && job.employment_types.length > 0
    ? job.employment_types.map(et => et.name || et).join(', ')
    : "Job Type");

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
            <Button variant="outline" size="icon" className="rounded-md">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              {t("apply")}
            </Button>
          </div>
        </div>
      </motion.div>

      <ApplicationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
