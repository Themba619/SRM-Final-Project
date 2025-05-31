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
    <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
      <Icon className="w-10 h-10 text-white" />
    </div>
    <div className="space-y-3">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <p className="text-white/80 text-lg max-w-md mx-auto">{description}</p>
    </div>
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center justify-center gap-2 text-white/90">
          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
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
      title: "Welcome to WUMD",
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
      navigate('/login');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-fluid-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardContent className="p-8">
            <OnboardingStep {...steps[currentStep]} />
            
            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-white scale-110' 
                      : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="text-white hover:bg-white/10 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={nextStep}
                className="bg-white text-gray-900 hover:bg-white/90"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Skip option */}
            <div className="text-center mt-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
                className="text-white/70 hover:text-white hover:bg-white/10 text-sm"
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