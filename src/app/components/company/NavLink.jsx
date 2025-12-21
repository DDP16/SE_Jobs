import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const NavLink = forwardRef(({ className, activeClassName, pendingClassName, to, children, ...props }, ref) => {
  return (
    <RouterNavLink
      ref={ref}
      to={to}
      className={({ isActive, isPending }) => {
        if (typeof className === "function") {
          return className({ isActive, isPending });
        }
        return cn(className, isActive && activeClassName, isPending && pendingClassName);
      }}
      {...props}
    >
      {({ isActive, isPending }) => {
        if (typeof children === "function") {
          return children({ isActive, isPending });
        }
        return children;
      }}
    </RouterNavLink>
  );
});

NavLink.displayName = "NavLink";

export default NavLink;