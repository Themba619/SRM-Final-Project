import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPwd = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f8fc]">
      <div
        className="relative w-[1200px] h-[675px] rounded-[40px] bg-white flex overflow-hidden shadow-2xl"
        style={{ boxShadow: "0px 4px 100px rgba(0,0,0,0.1)" }}
      >
        {/* Left illustration */}
        <div className="flex-1 flex items-center justify-center bg-[#f5f8fc] p-0 m-0 h-full">
          <img
            src={
              process.env.NODE_ENV === "production"
                ? "/SRM-Final-Project/forgotPwd.png"
                : "/forgotPwd.png"
            }
            alt="Forgot password illustration"
            className="w-full h-auto object-contain"
          />
        </div>
        {/* Right form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-8">
            <div className="mb-8 flex flex-row items-center gap-4">
              <div className="w-14 h-14 bg-water-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-3xl">💧</span>
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                Welcome Back
              </div>
            </div>
            {submitted ? (
              <div className="text-center text-gray-800 space-y-4 bg-white/80 p-6 rounded-2xl shadow">
                <p>
                  If an account exists for{" "}
                  <span className="font-bold">{email}</span>, a reset link has
                  been sent.
                </p>
                <Link to="/login" className="text-blue-600 underline">
                  Back to Login
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white/80 p-6 rounded-2xl shadow"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-900 text-sm font-medium"
                  >
                    User Name
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="fakeUser@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#f5f8fc] border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg"
                  >
                    Send Reset Link
                  </Button>
                  <Link to="/login" className="w-full">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-lg"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;
