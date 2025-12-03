import { Bell, Plus, ChevronDown } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="h-16 border-b border-l border-gray-300 bg-neutral-100 z-10 flex items-center justify-between px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Company</p>
              <p className="text-sm font-semibold text-foreground">Nomad</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>Nomad</DropdownMenuItem>
          <DropdownMenuItem>Switch Company</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-accent rounded-md transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          <Link className="text-inherit" to="/postjob">Post a job</Link>
        </Button>
      </div>
    </header>
  );
};
