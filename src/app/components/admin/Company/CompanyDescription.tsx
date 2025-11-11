import { Pencil } from "lucide-react";
import { ActionButton } from "./ActionButton";

export const CompanyDescription = () => {
  return (
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-xl font-bold text-foreground">Company Profile</h4>
        <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit contact" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on
        Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has been
        at the forefront of expanding internet commerce, powering new business models, and supporting the latest
        platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a
        problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on
        solving the hard technical problems necessary to build global economic infrastructure—from designing highly
        reliable systems to developing advanced machine learning algorithms to prevent fraud.
      </p>
    </div>
  );
};
