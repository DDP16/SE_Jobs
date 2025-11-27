import { Button } from "@/components/ui";
import { cn } from "@/lib";
import React from "react";

export const ActionButton = ({ icon, onClick, "aria-label": ariaLabel }) => (
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
