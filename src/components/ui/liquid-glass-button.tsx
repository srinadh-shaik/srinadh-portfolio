"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton }

const liquidbuttonVariants = cva(
  "group relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] disabled:pointer-events-none disabled:opacity-50 outline-none hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive: "text-red-100 focus-visible:ring-destructive/40",
        outline: "text-white border border-white/10 hover:border-white/20",
        secondary: "text-slate-200",
        ghost: "hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 text-xs px-4",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        xxl: "h-16 px-12 text-xl",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xl",
    },
  }
)

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(liquidbuttonVariants({ variant, size, className }))}
        {...props}
      >
        {/* Ambient Outer Glow (Siri / Spatial OS style) */}
        <div className="absolute -inset-2 z-0 rounded-full bg-gradient-to-r from-emerald-500/0 via-cyan-500/0 to-purple-500/0 blur-xl transition-all duration-500 group-hover:from-emerald-500/30 group-hover:via-cyan-500/30 group-hover:to-purple-500/30 opacity-0 group-hover:opacity-100" />

        {/* Liquid Glass Base Body */}
        <div className="absolute inset-0 z-0 h-full w-full rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-2xl transition-colors duration-500 group-hover:bg-white/10 dark:group-hover:bg-white/10" />

        {/* Specular Highlights (1px inner border catching light) */}
        <div className="absolute inset-0 z-10 h-full w-full pointer-events-none rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.6),0_8px_20px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:shadow-[inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.2),0_12px_24px_rgba(0,0,0,0.4)]" />

        {/* SVG Liquid Distortion Fluid Layer */}
        <div
          className="absolute inset-0 -z-10 h-full w-full overflow-hidden rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-screen dark:mix-blend-color-dodge"
          style={{ filter: 'url("#container-glass")' }}
        >
          {/* Animated Chromatic Mesh inside the glass */}
          <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#06b6d4_33%,#8b5cf6_66%,#10b981_100%)] opacity-30 blur-2xl" />
          
          {/* Sweeping Light Ray */}
          <div className="absolute inset-0 translate-y-[-100%] bg-gradient-to-b from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-y-[100%] blur-sm" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex items-center justify-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tracking-wide">
          {children}
        </div>
        
        <GlassFilter />
      </Comp>
    </>
  )
}

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          {/* Slower, smoother liquid turbulence */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.015"
            numOctaves="2"
            seed="4"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise" />
          
          {/* Adjusted displacement for a gel-like fluidity instead of sharp noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
          <feComposite in="finalBlur" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}