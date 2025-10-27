import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function JobHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 shadow-sm mb-8 border border-gray-200 "
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div className="bg-primary w-16 h-16 flex items-center justify-center text-white text-2xl font-bold">
            S
          </div> 
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-2">
              Social Media Assistant
            </h3>
            <p className="text-muted-foreground">
              Stripe • Paris, France • Full-Time
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8">
            Apply
          </Button>
        </div>
      </div>
    </motion.div>
  );
};