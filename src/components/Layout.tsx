import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, BarChart3, Settings, LogOut } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  userRole: "homeowner" | "admin" | "government";
  onRoleChange: (role: "homeowner" | "admin" | "government") => void;
}

export function Layout({ children, userRole, onRoleChange }: LayoutProps) {
  const [currentUser] = useState({
    name:
      userRole === "homeowner"
        ? "Fake user"
        : userRole === "admin"
        ? "Admin User"
        : "Gov Official",
    email:
      userRole === "homeowner"
        ? "FakeUser@gmail.com"
        : userRole === "admin"
        ? "admin@wumd.gov"
        : "official@gov.sg",
    avatar: "",
  });

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-water-50 to-ocean-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-water-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💧</span>
                </div>
                <span className="text-xl font-bold text-gray-900">WUMD</span>
              </div>

              {/* Role Switcher for Demo */}
              <div className="flex gap-2 ml-8">
                <Button
                  variant={userRole === "homeowner" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRoleChange("homeowner")}
                >
                  Homeowner
                </Button>
                <Button
                  variant={userRole === "admin" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRoleChange("admin")}
                >
                  Admin
                </Button>
                <Button
                  variant={userRole === "government" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRoleChange("government")}
                >
                  Government
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="bg-water-500 text-white">
                  {getUserInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  {currentUser.name}
                </div>
                <div className="text-xs text-gray-500">{currentUser.email}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  window.location.href = "/login";
                }}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
