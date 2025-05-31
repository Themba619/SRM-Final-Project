
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-fluid-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white">Check Your Email</CardTitle>
                <p className="text-white/70 mt-2">We've sent password reset instructions to your email address</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-white/80">
                  If an account with email <span className="font-medium text-white">{email}</span> exists, 
                  you will receive password reset instructions shortly.
                </p>
                
                <div className="space-y-3">
                  <p className="text-white/70 text-sm">
                    Didn't receive an email? Check your spam folder or try again.
                  </p>
                  
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Try Again
                  </Button>
                </div>

                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fluid-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Reset Password</CardTitle>
              <p className="text-white/70 mt-2">Enter your email to receive reset instructions</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-gray-900 hover:bg-white/90 font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/70">Or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
                
                <p className="text-white/70 text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-white hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
