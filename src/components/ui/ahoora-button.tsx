
import { forwardRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Custom variants for Ahoora buttons
const ahooraButtonVariants = cva("", {
  variants: {
    variant: {
      primary: "bg-ahoora-purple hover:bg-ahoora-purple-dark text-white",
      secondary: "border-ahoora-purple text-ahoora-purple hover:bg-ahoora-purple/10",
      accent: "bg-gradient-to-r from-ahoora-purple to-ahoora-purple-light text-white hover:opacity-90",
      outline: "border-ahoora-purple text-ahoora-purple hover:bg-ahoora-purple/10",
      ghost: "text-ahoora-purple hover:bg-ahoora-purple/10",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-12 px-6 text-lg",
      xl: "h-14 px-8 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export interface AhooraButtonProps
  extends ButtonProps,
    VariantProps<typeof ahooraButtonVariants> {
  ahooraVariant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  ahooraSize?: "default" | "sm" | "lg" | "xl";
}

// Create our custom button by extending the base shadcn button
const AhooraButton = forwardRef<HTMLButtonElement, AhooraButtonProps>(
  ({ className, ahooraVariant, ahooraSize, ...props }, ref) => {
    return (
      <Button
        className={cn(
          ahooraButtonVariants({
            variant: ahooraVariant, 
            size: ahooraSize,
          }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

AhooraButton.displayName = "AhooraButton";

export { AhooraButton };
