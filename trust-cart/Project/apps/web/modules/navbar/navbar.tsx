"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/mode-toggle";
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    
      <svg data-logo="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 40" width={30} height={30}>
        <g id="logogram" transform="translate(0, 0) rotate(0) "><path d="M28.7089 33.1053L1.9434 14.6424C-0.768963 12.7715 0.15306 8.87601 3.53531 7.95996L31.9823 0.239132C32.5849 0.0216955 33.2306 -0.0488885 33.866 0.0332432C34.5013 0.115375 35.1079 0.34785 35.6355 0.711378C36.1629 1.07491 36.5961 1.559 36.899 2.12348C37.2018 2.68795 37.3658 3.31654 37.3771 3.95706L35.6912 30.1393C35.4913 33.247 31.4213 34.9762 28.7089 33.1053Z" fill="#E9327C"/><path d="M20.2197 37.6632L4.45132 6.82618C4.09087 6.12072 3.93226 5.32941 3.99297 4.53953C4.05367 3.74965 4.33135 2.99187 4.79536 2.34978C5.25939 1.70769 5.89172 1.20622 6.62264 0.900668C7.35356 0.595117 8.15466 0.497365 8.93761 0.618198L38.1604 5.12834C38.8331 5.23219 39.4717 5.49425 40.0236 5.89298C40.5753 6.29172 41.0245 6.81572 41.3344 7.42191C41.6441 8.0281 41.8057 8.69917 41.8055 9.37994C41.8054 10.0607 41.6437 10.7317 41.3338 11.3378L27.8719 37.6647C27.5104 38.3681 26.962 38.9583 26.2869 39.3703C25.6118 39.7823 24.8363 40.0002 24.0454 40C23.2545 39.9999 22.479 39.7817 21.804 39.3695C21.1291 38.9571 20.5809 38.3668 20.2197 37.6632Z" fill="#1DACE3"/><path d="M37.3055 4.9955L22.7382 2.74713L4.85269 7.60342L11.9917 21.5695L28.7089 33.1053C29.0777 33.357 29.4834 33.5497 29.9114 33.6767L36.2612 21.2592L37.3055 4.9955Z" fill="#001A49"/></g>
        <g id="logotype" transform="translate(42, 20)"></g>
        
      </svg>
    
  )
}

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    aria-label="Menu"
    className={cn("pointer-events-none", className)}
    fill="none"
    height={16}
    role="img"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...(props as any)}
  >
    <path
      className="origin-center -translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
      d="M4 12L20 12"
    />
    <path
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
      d="M4 12H20"
    />
    <path
      className="origin-center translate-y-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
      d="M4 12H20"
    />
  </svg>
)

// Types
export interface NavbarNavLink {
  href: string
  label: string
  active?: boolean
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  logoHref?: string
  navigationLinks?: NavbarNavLink[]
  signInText?: string
  signInHref?: string
  ctaText?: string
  ctaHref?: string
  onSignInClick?: () => void
  onCtaClick?: () => void
}

// Default navigation links
const defaultNavigationLinks: NavbarNavLink[] = [
  { href: "/", label: "Home", active:true },
  { href: "/file-upload", label: "Admin" },
  { href: "/shop", label: "Shop" },
  { href: "/orders", label: "Orders" },
]



import { AppContext } from "@/contexts/AppContext"
import { toast } from "sonner"
import { ethers } from "ethers"

const formatAccountAddress = (account:string)=>{
  return `${account.slice(0,6)}...${account.slice(38,42)}`;
}


export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      logo = <Logo className="h-6 w-auto" />,
      logoHref = "#",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "#signin",
      ctaText = "Get Started",
      ctaHref = "#get-started",
      onSignInClick,
      onCtaClick,
      ...props
    },
    ref,
  ) => {
    const [isMobile, setIsMobile] = useState(false)
    const containerRef = useRef<HTMLElement>(null)

    const context  = React.useContext(AppContext);

    if(!context){
      toast.error("Context Is Not loaded in Navbar!!");
      toast.error("You Can't Continue With The Web ");
      return <h1>Loading...</h1>
    }

    const {account,connectWallet} = context;






    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth
          setIsMobile(width < 768) // 768px is md breakpoint
        }
      }

      checkWidth()

      const resizeObserver = new ResizeObserver(checkWidth)
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current)
      }

      return () => {
        resizeObserver.disconnect()
      }
    }, [])

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref],
    );

    const pathname = usePathname();

    const router = useRouter();

    return (
      <header
        className={cn(
          `${pathname=="/shop" ? "w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 **:no-underline": "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 **:no-underline"}`,
          className,
        )}
        ref={combinedRef}
        {...(props as any)}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    size="icon"
                    variant="ghost"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem className="w-full" key={index}>
                          <NavigationMenuLink
                            asChild
                            className={`${navigationMenuTriggerStyle()} ${pathname==link.href && "bg-accent text-accent-foreground"} `}
                          >
                            <Link href={link.href} > {link.label} </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                onClick={(e) => {e.preventDefault(); router.push("/")}}
              >
                <div className="text-2xl">{logo}</div>
                <span className="hidden font-bold text-xl sm:inline-block">Trust-Cart</span>
              </button>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem className="w-full" key={index}>
                          <NavigationMenuLink
                            asChild
                            className={`${navigationMenuTriggerStyle()} ${pathname==link.href && "bg-accent text-accent-foreground"} `}
                          >
                            <Link href={link.href} > {link.label} </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-3">
            <ModeToggle/>
            {
              account ? 
              <Button className="text-sm font-medium px-4 h-9 rounded-md shadow-sm">
                {formatAccountAddress(account)}
              </Button>
              :

            <Button
            className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
            onClick={e => {
              e.preventDefault()
              connectWallet();
            }}
            size="sm"
            >
              Connect
            </Button>

            }
          </div>
        </div>
      </header>
    )
  },
)

Navbar.displayName = "Navbar"

export { Logo, HamburgerIcon }

// Demo
export function Demo() {
  return (
    <div className="fixed inset-0">
      <Navbar />
    </div>
  )
}
