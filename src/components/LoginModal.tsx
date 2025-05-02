
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setShowSignup?: (show: boolean) => void;
}

export function LoginModal({ open, onOpenChange, setShowSignup }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted", formData);

    // Track login event in GTM
    window.dataLayer?.push({
      event: 'login_success',
      user_email_domain: formData.email.split('@')[1] || 'unknown'
    });
    
    onOpenChange(false);
  };

  const switchToSignup = () => {
    onOpenChange(false);
    if (setShowSignup) {
      setTimeout(() => setShowSignup(true), 100);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Login to Ahoora AI</DialogTitle>
            <DialogDescription>
              Access your Ahoora AI dashboard to manage your Google Ads insights
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  required 
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <button 
                type="button"
                className="text-ahoora-purple hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password?
              </button>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-ahoora-purple hover:bg-ahoora-purple/90"
              onClick={() => {
                window.dataLayer?.push({
                  event: 'form_submit',
                  form_name: 'login'
                });
              }}
            >
              Login
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              <p>Don't have an account? <button 
                type="button" 
                className="text-ahoora-purple hover:underline"
                onClick={switchToSignup}
              >
                Sign up
              </button></p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <ForgotPasswordModal 
        open={showForgotPassword} 
        onOpenChange={setShowForgotPassword} 
      />
    </>
  );
}
