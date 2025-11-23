import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { ApplicationModal, uiButton as Button } from "../../../../components";
import { srcAsset } from "../../../../lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function JobHeader({ job }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 shadow-sm mb-8 border border-gray-200 "
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <img
              src={srcAsset.stripeIcon}
              alt="Stripe Logo"
              className="w-14 h-14 object-contain"
            />
            <div>
              <h4 className="text-3xl font-bold text-foreground mb-2">
                {job.title || "Job Title"}
              </h4>
              <p className="text-muted-foreground">
                {job.company || "Company Name"} • {job.location || "Location"} •{" "}
                {job.type || "Job Type"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-8"
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
