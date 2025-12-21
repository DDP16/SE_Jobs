import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PerksSection({ job }) {
  const { t } = useTranslation();

  const benefits = job?.benefit || [];

  const isObjectArray = benefits.every(item => typeof item === 'object' && item !== null);

  // const perks = [
  //   {
  //     icon: Stethoscope,
  //     title: "Full Healthcare",
  //     description: "We believe in thriving communities and that starts with our team being happy and healthy.",
  //     color: "text-red-500",
  //   },
  //   {
  //     icon: Umbrella,
  //     title: "Unlimited Vacation",
  //     description: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
  //     color: "text-blue-500",
  //   },
  //   {
  //     icon: Video,
  //     title: "Skill Development",
  //     description: "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
  //     color: "text-purple-500",
  //   },
  //   {
  //     icon: Mountain,
  //     title: "Team Summits",
  //     description: "Every 6 months we have a full team summit where we fly the whole team to an amazing retreat.",
  //     color: "text-indigo-500",
  //   },
  //   {
  //     icon: Coffee,
  //     title: "Remote Working",
  //     description: "You know how you perform your best. Work from home, coffee shop, or anywhere when you feel most productive.",
  //     color: "text-cyan-500",
  //   },
  //   {
  //     icon: Bus,
  //     title: "Commuter Benefits",
  //     description: "We're grateful for all the time and energy each team member puts into getting to work every day.",
  //     color: "text-pink-500",
  //   },
  //   {
  //     icon: HandHeart,
  //     title: "We give back.",
  //     description: "We anonymously match any donations our employees make (up to $/€ 600) so they can support the organizations they care about.",
  //     color: "text-green-500",
  //   },
  // ];

  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent || Icons.Gift;
  };

  // Default perks display
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h4 className="text-2xl font-bold text-foreground mb-2">{t("company.perks_benefits.title")}</h4>
      <p className="text-muted-foreground mb-8">{t("company.perks_benefits.description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {isObjectArray ? (
          benefits.map((benefit, index) => {
            const IconComponent = getIcon(benefit.icon);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="space-y-3 content-center"
              >
                {benefit.icon && <IconComponent className="w-10 h-10 text-primary" />}
                {benefit.title && <h5 className="font-bold text-foreground">{benefit.title}</h5>}
                {benefit.description && <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>}
              </motion.div>
            );
          })
        ) : (
          <ul className="space-y-2 col-span-full">
            {benefits.map((item, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <Icons.CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.section>
  );
};