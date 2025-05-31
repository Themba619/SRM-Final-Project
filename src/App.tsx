import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPwd";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import { AdminDashboard } from "./components/AdminDashboard";
import { GovernmentDashboard } from "./components/GovernmentDashboard";
import { HomeownerDashboard } from "./components/HomeownerDashboard";
import { Layout } from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
  const [userRole, setUserRole] = useState<
    "homeowner" | "admin" | "government"
  >("homeowner");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <Layout
                  userRole={userRole}
                  onRoleChange={(role) => {
                    setUserRole(role);
                    window.location.href =
                      role === "homeowner"
                        ? "/dashboard"
                        : role === "admin"
                        ? "/admin"
                        : "/government";
                  }}
                >
                  {userRole === "homeowner" && <HomeownerDashboard />}
                  {userRole === "admin" && <AdminDashboard />}
                  {userRole === "government" && <GovernmentDashboard />}
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <Layout
                  userRole="admin"
                  onRoleChange={(role) => {
                    setUserRole(role);
                    window.location.href =
                      role === "homeowner"
                        ? "/dashboard"
                        : role === "admin"
                        ? "/admin"
                        : "/government";
                  }}
                >
                  <AdminDashboard />
                </Layout>
              }
            />
            <Route
              path="/government"
              element={
                <Layout
                  userRole="government"
                  onRoleChange={(role) => {
                    setUserRole(role);
                    window.location.href =
                      role === "homeowner"
                        ? "/dashboard"
                        : role === "admin"
                        ? "/admin"
                        : "/government";
                  }}
                >
                  <GovernmentDashboard />
                </Layout>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
