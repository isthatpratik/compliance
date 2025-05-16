import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Pencil, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function ProfileDropdown() {
  const { user, signOut } = useAuth();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState(user?.username || "");

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
  };

  const handleUsernameSave = async () => {
    try {
      // Update the username in Supabase
      const { error } = await supabase.auth.updateUser({
        data: { username }
      });
      
      if (error) throw error;
      
      // Update the local user state
      if (user) {
        user.username = username;
      }
      
      setIsEditingUsername(false);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center space-x-2 bg-[#09090B] cursor-pointer hover:bg-[#111010]">
          <User className="h-4 w-4 hover:text-white" />
          <span className="text-sm text-gray-200 hover:text-white">
            {user?.username || "User"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#111010] border-white/10 text-white" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email}</p>
            <div className="flex items-center justify-between">
              {isEditingUsername ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-xs bg-transparent focus:outline-none hover:border-gray-300"
                    placeholder="Enter username"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4"
                    onClick={handleUsernameSave}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">
                    {username || "Add username"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4"
                    onClick={handleUsernameEdit}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex flex-col space-y-2 hover:bg-[#111010]">
          <div className="flex items-center justify-between w-full hover:bg-[#111010]">
            <span className="text-xs text-gray-400">Token Usage</span>
            <span className="text-xs text-gray-400">0/1000</span>
          </div>
          <Progress value={0} className="h-1" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-gray-400 hover:text-gray-300 cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 