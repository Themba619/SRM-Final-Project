
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, BarChart3, Shield, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingStep = ({ 
  icon: Icon, 
  title, 
  description, 
  features 
}: {
  icon: any;
  title: string;
  description: string;
  features: string[];
}) => (
  <div className="text-center space-y-6">
    <div className="mx-auto w-24 h-24 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
      <Icon className="w-12 h-12 text-white" />
    </div>
    <div className="space-y-4">
      <h2 className="text-4xl font-bold text-white tracking-tight">{title}</h2>
      <p className="text-white/90 text-lg max-w-lg mx-auto leading-relaxed">{description}</p>
    </div>
    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center justify-center gap-3 text-white/90 text-base">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      icon: Droplets,
      title: "Welcome",
      description: "Track your water usage with precision and contribute to a sustainable future.",
      features: [
        "Real-time water monitoring",
        "Daily, weekly, and monthly reports",
        "Smart usage insights"
      ]
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Get detailed insights into your water consumption patterns and optimize usage.",
      features: [
        "Interactive charts and graphs",
        "Usage comparison tools",
        "Conservation recommendations"
      ]
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy controls.",
      features: [
        "End-to-end encryption",
        "Privacy-first approach",
        "Secure data storage"
      ]
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Join thousands of users making a difference in water conservation efforts.",
      features: [
        "Community benchmarking",
        "Conservation challenges",
        "Environmental impact tracking"
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fluid art overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-pink-500/80 to-orange-400/80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="w-full max-w-lg relative z-10">
        <Card className="bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardContent className="p-12">
            <OnboardingStep {...steps[currentStep]} />
            
            {/* Progress Indicators */}
            <div className="flex justify-center space-x-3 mt-10">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-white scale-125' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={nextStep}
                className="bg-white text-black hover:bg-white/90 font-medium px-8"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Skip option */}
            <div className="text-center mt-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-white/70 hover:text-white hover:bg-white/10 text-sm px-4"
              >
                Skip Introduction
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
