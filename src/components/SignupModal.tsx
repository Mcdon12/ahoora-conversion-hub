
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setShowLogin?: (show: boolean) => void;
}

export function SignupModal({
  open,
  onOpenChange,
  setShowLogin
}: SignupModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup submitted", formData);
    
    // Track signup event in GTM
    window.dataLayer?.push({
      event: 'signup_success',
      user_type: 'new',
      user_email_domain: formData.email.split('@')[1] || 'unknown'
    });
    
    onOpenChange(false);
    
    // Navigate to dashboard after successful signup
    setTimeout(() => {
      navigate('/dashboard');
    }, 100);
  };

  const switchToLogin = () => {
    onOpenChange(false);
    if (setShowLogin) {
      setTimeout(() => setShowLogin(true), 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Get Started with Ahoora AI</DialogTitle>
          <DialogDescription>
            Sign up to see how Ahoora can transform your Google Ads performance
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                placeholder="John" 
                required 
                value={formData.firstName} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                placeholder="Doe" 
                required 
                value={formData.lastName} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@company.com" 
              required 
              value={formData.email} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Input 
              id="organization" 
              placeholder="Your Company" 
              required 
              value={formData.organization} 
              onChange={handleInputChange} 
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-ahoora-purple hover:bg-ahoora-purple/90"
            onClick={() => {
              window.dataLayer?.push({
                event: 'form_submit',
                form_name: 'signup'
              });
            }}
          >
            SUBMIT
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account? <button 
                type="button" 
                className="text-ahoora-purple hover:underline" 
                onClick={switchToLogin}
              >
                Login
              </button>
            </p>
          </div>
          
          <p className="text-center text-xs text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
