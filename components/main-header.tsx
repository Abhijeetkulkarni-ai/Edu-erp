"use client";

import { useState } from "react";
import {
  Bell,
  Menu,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useSidebar } from "@/components/sidebar-provider";
import UserProfileMenu from "@/components/user-profile-menu";
import { useToast } from "@/hooks/use-toast";

export function MainHeader() {
  const { isOpen, setIsOpen } = useSidebar();
  const { toast } = useToast();

  // Demo user — no API call
  const [notificationCount, setNotificationCount] = useState(3);

  const userName = "Luky Thakur";


  const handleNotificationClick = () => {
    if (notificationCount > 0) {
      toast({
        title: "Notifications",
        description: `You have ${notificationCount} unread notifications.`,
      });

      setNotificationCount(0);
    } else {
      toast({
        title: "You're all caught up",
        description: "There are no new notifications.",
      });
    }
  };

  const handleSearch = () => {
    toast({
      title: "Search",
      description: "Global search is ready for your content.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings panel coming soon.",
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/95 px-3 backdrop-blur md:px-6">
      {/* Mobile Menu */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="size-9 rounded-xl md:hidden"
      >
        <Menu className="size-5" />

        <span className="sr-only">
          Toggle Menu
        </span>
      </Button>

      {/* Brand */}
     
      {/* Spacer */}
      <div className="flex-1" />

      {/* Header Actions */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSearch}
          className="size-9 rounded-xl text-muted-foreground transition-colors hover:text-foreground"
        >
          <Search className="size-[18px]" />

          <span className="sr-only">
            Search
          </span>
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettings}
          className="hidden size-9 rounded-xl text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          <Settings className="size-[18px]" />

          <span className="sr-only">
            Settings
          </span>
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotificationClick}
            className="size-9 rounded-xl text-muted-foreground transition-colors hover:text-foreground"
          >
            <Bell className="size-[18px]" />

            {notificationCount > 0 && (
              <Badge
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  flex
                  size-[18px]
                  items-center
                  justify-center
                  rounded-full
                  p-0
                  text-[9px]
                "
              >
                {notificationCount > 9
                  ? "9+"
                  : notificationCount}
              </Badge>
            )}

            <span className="sr-only">
              Notifications
            </span>
          </Button>
        </div>

        {/* Divider */}
        <div className="mx-1 hidden h-7 w-px bg-border sm:block" />

        {/* User */}
      <div className="flex items-center gap-3">
  {/* Avatar */}
  <Avatar className="size-9 rounded-xl ring-1 ring-border">
    <AvatarFallback
      className="
        rounded-xl
        bg-primary/10
        text-xs
        font-semibold
        text-primary
      "
    >
      LT
    </AvatarFallback>
  </Avatar>

  {/* User Info */}
  <div className="hidden sm:block leading-tight">
    <p className="text-sm font-semibold text-foreground">
      Luky Thakur
    </p>
    <p className="text-[11px] text-muted-foreground">
      Administrator
    </p>
  </div>
</div>
      </div>
    </header>
  );
}