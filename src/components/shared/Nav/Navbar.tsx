"use client";

import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Use Next.js Link
import { usePathname } from "next/navigation"; // Use Next.js usePathname
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Menu, X, LogOut, User, Settings, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { useAuth, useUser as useClerkUser } from "@clerk/nextjs"; // Import Clerk's useAuth and useUser
import { useUser } from "@/hooks/useUser"; // Your custom useUser hook for logout

// --- Type Definitions ---
interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

interface NavbarProps {
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface NavItemsProps {
  items: NavigationItem[];
  className?: string;
}

interface NavItemComponentProps {
  item: NavigationItem;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isActive?: boolean;
}

interface MobileNavItemProps {
  item: NavigationItem;
  onItemClick: () => void;
}

interface MobileNavFooterProps {
  onClose: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

interface NavbarLogoProps {
  size?: number;
  className?: string;
  isFooter?: boolean;
}

// --- Animation Constants ---
const NAVBAR_ANIMATIONS = {
  backdrop: {
    blur: "blur(8px)",
    shadow:
      "0 0 2px 0 oklch(0.69 0.0242 248.18 / 20%), 0 12px 24px -4px oklch(0.69 0.0242 248.18 / 12%)",
  },
  spring: {
    stiffness: 300,
    damping: 50,
  },
  navDot: {
    stiffness: 500,
    damping: 30,
  },
};

const SCROLL_THRESHOLD = 0;

// --- Default Navigation Items ---
const defaultNavigation: readonly NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Academics", href: "/academics" },
  { name: "Resources", href: "/resources" },
  { name: "Events", href: "/events" },
  { name: "Orientation", href: "/orientation" },
] as const;

// --- Navbar Logo Component ---
export const NavbarLogo: React.FC<NavbarLogoProps> = React.memo(
  ({ size = 32, className, isFooter }) => {
    const subTitleColor = isFooter ? "text-gray-400" : "currentColor";

    return (
      <Link
        href="/home"
        className={cn("flex flex-shrink-0 items-center space-x-2", className)}
        aria-label="Go to homepage"
      >
        <Image
          src={"/public/favicon.png"}
          alt="IUT Douala Logo"
          width={size}
          height={size}
          className="rounded-full object-contain"
        />
        <div>
          <h4 className="text-brand-main text-lg font-bold">Orient Express</h4>
          <p className={cn("-mt-1 text-xs", subTitleColor)}>
            Academic Orientation Platform
          </p>
        </div>
      </Link>
    );
  },
);
NavbarLogo.displayName = "NavbarLogo";

// --- Desktop Navigation Items ---
const NavItems: React.FC<NavItemsProps> = ({ items, className }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const handleMouseLeave = useCallback(() => setHovered(null), []);
  const pathname = usePathname();

  return (
    <motion.ul
      onMouseLeave={handleMouseLeave}
      className={cn("hidden items-center space-x-6 md:flex", className)}
    >
      {items.map((item, idx) => (
        <NavItemComponent
          key={`nav-item-${item.href}-${idx}`}
          item={item}
          index={idx}
          isActive={pathname === item.href}
          isHovered={hovered === idx}
          onHover={() => setHovered(idx)}
          onLeave={() => setHovered(null)}
        />
      ))}
    </motion.ul>
  );
};

// Individual Desktop Navigation Item Component
const NavItemComponent: React.FC<NavItemComponentProps> = React.memo(
  ({ item, isActive, isHovered, onHover, onLeave }) => {
    return (
      <li className="relative" onMouseEnter={onHover} onMouseLeave={onLeave}>
        <Link
          className={cn(
            "group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors select-none",
            isActive
              ? "text-primary bg-primary/10 font-semibold"
              : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
          )}
          href={item.href}
          aria-label={item.name}
        >
          <span>{item.name}</span>
          {isActive && (
            <span className="bg-primary absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full" />
          )}
        </Link>
      </li>
    );
  },
);
NavItemComponent.displayName = "NavItemComponent";

// --- Mobile Navigation Toggle (Sheet Trigger and Content) ---
interface MobileNavToggleProps extends NavItemsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  isAdminOrAdvisor: boolean;
  dashboardHref: string;
  dashboardButtonText: string;
}

const MobileNavToggle: React.FC<MobileNavToggleProps> = ({
  items,
  isOpen,
  onOpenChange,
  onClose,
  isAuthenticated,
  onLogout,
  isAdminOrAdvisor,
  dashboardHref,
  dashboardButtonText,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="rounded-full"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
          <span className="sr-only">
            {isOpen ? "Close menu" : "Toggle menu"}
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className={cn("flex w-[280px] flex-col p-4 sm:w-[320px]")}
        id="mobile-menu"
        aria-label="Mobile navigation menu"
      >
        <SheetHeader className="border-border items-start border-b pb-4">
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
          <NavbarLogo size={28} />
        </SheetHeader>

        <ScrollArea className="flex-1 py-4">
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <MobileNavItem
                key={`mobile-nav-${item.href}`}
                item={item}
                onItemClick={onClose}
              />
            ))}

            {isAdminOrAdvisor && (
              <Link href={dashboardHref} passHref>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onClose}
                  className="mt-2 w-full justify-start text-base"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  {dashboardButtonText}
                </Button>
              </Link>
            )}
          </nav>
        </ScrollArea>

        <MobileNavFooter
          isAuthenticated={isAuthenticated}
          onClose={onClose}
          onLogout={onLogout}
        />
      </SheetContent>
    </Sheet>
  );
};

// Mobile Navigation Item
const MobileNavItem: React.FC<MobileNavItemProps> = React.memo(
  ({ item, onItemClick }) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center rounded-md px-3 py-2 font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-foreground hover:bg-muted hover:text-primary",
        )}
        onClick={onItemClick}
      >
        <div className="flex items-start gap-4">
          <p>{item.name}</p>
        </div>
      </Link>
    );
  },
);
MobileNavItem.displayName = "MobileNavItem";

// Mobile Navigation Footer (Login/Signup/Logout)
const MobileNavFooter: React.FC<MobileNavFooterProps> = ({
  onClose,
  isAuthenticated,
  onLogout,
}) => {
  return (
    <SheetFooter className="border-border flex flex-col gap-2 border-t pt-4">
      {isAuthenticated ? (
        <Button
          variant="outline"
          className="w-full rounded-full"
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {"Logout"}
        </Button>
      ) : (
        <>
          <Button variant="outline" asChild className="w-full rounded-full">
            <Link href="/sign-in" onClick={onClose}>
              {"Login"}
            </Link>
          </Button>
          <Button asChild className="w-full rounded-full">
            <Link href="/sign-up" onClick={onClose}>
              {"Sign Up"}
            </Link>
          </Button>
        </>
      )}
    </SheetFooter>
  );
};

// --- Main Navbar Component (exported as Navbar) ---
export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  }) as { scrollY: MotionValue<number> };

  const [visible, setVisible] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setVisible(latest > SCROLL_THRESHOLD);
  });

  const animationProps = useMemo(
    () => ({
      animate: {
        backdropFilter: visible ? NAVBAR_ANIMATIONS.backdrop.blur : "none",
        backgroundColor: visible ? "rgba(255,255,255,0.8)" : "transparent",
        boxShadow: visible ? NAVBAR_ANIMATIONS.backdrop.shadow : "none",
      },
      transition: {
        type: "spring" as const,
        ...NAVBAR_ANIMATIONS.spring,
      },
    }),
    [visible],
  );

  // Use Clerk's useUser hook to get user data
  const { user: clerkUser, isLoaded: clerkUserLoaded } = useClerkUser();
  // Use your custom useUser hook for the logout action
  const { signOut: customSignOut } = useUser();

  // Map Clerk user data to your profile structure for Navbar display
  const isAuthenticated = clerkUserLoaded && !!clerkUser;
  const user = isAuthenticated
    ? {
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        schoolId: (clerkUser.publicMetadata?.schoolId as string) || null,
        // Clerk roles might be different, map them as needed or get from publicMetadata
        role:
          (clerkUser.publicMetadata?.role as
            | "ADMIN"
            | "ADVISOR"
            | "STUDENT"
            | "GUEST") || "GUEST",
      }
    : null;

  const isAdminOrAdvisor =
    isAuthenticated && (user?.role === "ADMIN" || user?.role === "ADVISOR");
  const dashboardHref =
    user?.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/advisor";
  const dashboardButtonText =
    user?.role === "ADMIN" ? "Admin Dashboard" : "Advisor Dashboard";

  return (
    <motion.header
      {...animationProps}
      ref={ref}
      className={cn("fixed top-0 z-50 w-full", className)}
    >
      <NavBody className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          <NavbarLogo />
          <NavItems items={defaultNavigation} />
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full transition-transform duration-200 hover:scale-105"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.imageUrl || "/placeholder-avatar.jpg"}
                      alt={user?.firstName || user?.email?.charAt(0) || "User"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.firstName?.charAt(0) ||
                        user?.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="text-foreground font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-muted-foreground w-[200px] truncate text-sm">
                      {user?.email}
                    </p>
                    {user?.schoolId && (
                      <p className="text-muted-foreground text-xs">
                        ID: {user.schoolId}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>User Profile</span>
                  </Link>
                </DropdownMenuItem>
                {isAdminOrAdvisor && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={dashboardHref} className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{dashboardButtonText}</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={customSignOut} // Use your custom signOut from useUser
                  className="flex cursor-pointer items-center text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center space-x-2 md:flex">
              <Button
                variant="outline"
                asChild
                className="rounded-full px-4 py-2"
              >
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-4 py-2">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}

          <MobileNavToggle
            items={defaultNavigation}
            isOpen={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            isAuthenticated={isAuthenticated}
            onLogout={customSignOut} // Use your custom signOut
            isAdminOrAdvisor={isAdminOrAdvisor}
            dashboardHref={dashboardHref}
            dashboardButtonText={dashboardButtonText}
          />
        </div>
      </NavBody>
    </motion.header>
  );
};

const NavBody: React.FC<NavBodyProps> = ({ children, className }) => {
  return (
    <nav className={cn("flex h-16 items-center justify-between", className)}>
      {children}
    </nav>
  );
};
