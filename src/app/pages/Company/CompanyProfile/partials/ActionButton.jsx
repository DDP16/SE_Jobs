import { Button } from "@/components/ui";
import { cn } from "@/lib";
import React from "react";

export const ActionButton = ({ icon, onClick, "aria-label": ariaLabel, className, disabled }) => (
  <Button
    variant="ghost"
    size="icon"
    aria-label={ariaLabel}
    onClick={onClick}
    disabled={disabled}
    className={cn("text-primary hover:text-white hover:bg-primary transition-colors duration-150", className)}
  >
    {icon}
  </Button>
);
