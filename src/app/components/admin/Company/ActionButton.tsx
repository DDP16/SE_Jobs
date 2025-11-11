import { Button } from "@/components/ui/admin/button";
import { cn } from "@/lib";

import React from "react";

type ActionButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
};

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick, "aria-label": ariaLabel }) => (
  <Button
    variant="ghost"
    size="icon"
    aria-label={ariaLabel}
    onClick={onClick}
    className={cn("text-primary hover:text-white hover:bg-primary transition-colors duration-150")}
  >
    {icon}
  </Button>
);
