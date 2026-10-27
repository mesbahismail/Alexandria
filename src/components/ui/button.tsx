import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-[#d9b780] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181918] [&_svg]:shrink-0 [&_svg]:size-4",
  { variants: {
    variant: { default: "bg-[#dfbd88] text-[#191a18] hover:bg-[#edcf9f]", outline: "border border-white/20 bg-transparent text-white hover:bg-white/10", ghost: "text-white hover:bg-white/10" },
    size: { default: "h-12 px-6", sm: "h-9 px-4", icon: "size-10" },
  }, defaultVariants: { variant: "default", size: "default" } },
);
function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
export { Button, buttonVariants };
