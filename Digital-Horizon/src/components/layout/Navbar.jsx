
import React from 'react';
import { Home, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="sticky top-0 z-30 bg-slate-800/70 backdrop-blur-md shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Button onClick={onToggleSidebar} variant="ghost" size="icon" className="md:hidden mr-3 text-sky-200 hover:bg-sky-700/50">
          <Home />
        </Button>
        <div className="hidden md:block">
          <span className="text-xl font-semibold text-sky-100">Digital Marketing Overview</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-sky-200 hover:bg-sky-700/50">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer h-9 w-9">
              <img alt="User Avatar" src="https://images.unsplash.com/photo-1700605293528-6eaf444921d3" />
              <AvatarFallback className="bg-sky-600 text-white">UD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 border-sky-700 text-sky-200 w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-sky-700" />
            <DropdownMenuItem className="hover:bg-sky-700/50 focus:bg-sky-700/50">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-sky-700/50 focus:bg-sky-700/50">Billing</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-sky-700/50 focus:bg-sky-700/50">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-sky-700" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-700/30 focus:bg-red-700/30 focus:text-red-300">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
