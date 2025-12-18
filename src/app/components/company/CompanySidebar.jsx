import {
  Home,
  MessageSquare,
  Building2,
  Users,
  FileText,
  Calendar,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "../ui";
import { Box } from "@mui/material";
import logo from "@/assets/logo.svg";
import NavLink from "./NavLink";
import { logout } from "../../modules";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", icon: Home, badge: null, path: "/" },
  // { name: "Messages", icon: MessageSquare, badge: 1 },
  { name: "Company Profile", icon: Building2, badge: null, path: "/company" },
  { name: "Company Branches", icon: Building2, badge: null, path: "/branches" },
  { name: "All Applicants", icon: Users, badge: null, path: "/applicants/1" },
  { name: "Job Listing", icon: FileText, badge: null, path: "/job-listing" },
  // { name: "My Schedule", icon: Calendar, badge: null },
  // { name: "Employee", icon: User, badge: null },
];

export default function CompanySidebar() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <aside className="h-screen w-1/6 min-w-[220px] border-r border-border bg-white flex flex-col overflow-y-auto border-gray-300">
      {/* Logo */}
      <div className="flex items-center px-3 py-4 justify-center">
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => window.location.assign("/")}
        >
          <img src={logo} alt="SE Jobs Logo" width={"60"} style={{ marginRight: "8px", marginLeft: "10px" }} />
        </Box>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.path ? item.path : "#"}
              className="group w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground rounded-md transition-colors relative hover:bg-primary-50 "
            >
              <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-transparent group-hover:bg-primary group-active:bg-primary transition-colors"></span>
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
              {item.badge && (
                <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>
      {/* Settings Section */}
      <div className="px-3 py-4 border-t border-border space-y-1 border-gray-300">
        <div className="px-3 py-2 text-xs font-medium text-muted-foreground">SETTINGS</div>
        <NavLink
          to="/settings"
          className="group w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground rounded-md transition-colors relative hover:bg-primary-50"
        >
          <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-transparent group-hover:bg-primary group-active:bg-primary transition-colors"></span>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span>Help Center</span>
        </button>
      </div>
      {/* User Profile */}
      <div className="p-4 border-t border-border border-gray-300">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Maria Kelly</p>
            <p className="text-xs text-muted-foreground truncate">mariakelly@email.com</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-red-50 active:bg-red-100 active:text-white"
          onClick={() => {
            // Dispatch logout action
            dispatch(logout());
            nav("/", { replace: true });
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
