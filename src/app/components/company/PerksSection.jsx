import { motion } from "framer-motion";
import { Umbrella, Mountain, Stethoscope, Video, Coffee, Bus, HandHeart } from "lucide-react";

export default function PerksSection() {
  const perks = [
    {
      icon: Stethoscope,
      title: "Full Healthcare",
      description: "We believe in thriving communities and that starts with our team being happy and healthy.",
      color: "text-red-500",
    },
    {
      icon: Umbrella,
      title: "Unlimited Vacation",
      description: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
      color: "text-blue-500",
    },
    {
      icon: Video,
      title: "Skill Development",
      description: "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
      color: "text-purple-500",
    },
    {
      icon: Mountain,
      title: "Team Summits",
      description: "Every 6 months we have a full team summit where we fly the whole team to an amazing retreat.",
      color: "text-indigo-500",
    },
    {
      icon: Coffee,
      title: "Remote Working",
      description: "You know how you perform your best. Work from home, coffee shop, or anywhere when you feel most productive.",
      color: "text-cyan-500",
    },
    {
      icon: Bus,
      title: "Commuter Benefits",
      description: "We're grateful for all the time and energy each team member puts into getting to work every day.",
      color: "text-pink-500",
    },
    {
      icon: HandHeart,
      title: "We give back.",
      description: "We anonymously match any donations our employees make (up to $/€ 600) so they can support the organizations they care about.",
      color: "text-green-500",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="my-18 mx-30"
    >
      <h3 className="text-2xl font-bold text-foreground mb-2">Perks & Benefits</h3>
      <p className="text-muted-foreground mb-8">This job comes with several perks and benefits</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {perks.map((perk, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="space-y-3"
          >
            <perk.icon className={`w-10 h-10 ${perk.color}`} />
            <h5 className="font-bold text-foreground">{perk.title}</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {perk.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};