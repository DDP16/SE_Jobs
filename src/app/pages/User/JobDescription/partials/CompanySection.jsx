import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { srcAsset } from "../../../../lib";

export default function CompanySection({ job }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="my-18 mx-30"
    >
      <div className="grid grid-cols-2 gap-10 items-center h-[250px]">
        <div>
          <div className="flex items-center mb-6 gap-4">
            <img
              src={srcAsset.stripeIcon}
              alt="Stripe Logo"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h3 className="text-2xl font-bold text-foreground">{job.company}</h3>
              <a
                href="#"
                className="text-primary flex items-center gap-1 hover:underline mt-1"
              >
                Read more about {job.company}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {job.description || "Job Description"}
          </p>
        </div>

        <div className="flex gap-4 h-[250px]">
          <div className="rounded-md overflow-hidden flex-3">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop"
              alt="Team meeting"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 flex-2">
            <div className="rounded-md overflow-hidden flex-1">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-md overflow-hidden flex-1">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop"
                alt="Office environment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
