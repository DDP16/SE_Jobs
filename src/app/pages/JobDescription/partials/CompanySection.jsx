import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CompanySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-card rounded-2xl p-8 shadow-sm mb-8"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-4">
          <div className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center text-white text-2xl font-bold">
            S
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Stripe</h2>
            <a href="#" className="text-primary flex items-center gap-1 hover:underline mt-1">
              Read more about Stripe
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-6">
        Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-video bg-muted rounded-xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" alt="Office space" className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-muted rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop" alt="Team meeting" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square bg-muted rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop" alt="Team collaboration" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square bg-muted rounded-xl overflow-hidden col-span-2">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop" alt="Office environment" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};