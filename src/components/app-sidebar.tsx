import { LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

export function AppSidebar({
  items,
}: {
  items: Array<{
    title: string;
    url: string;
    icon: LucideIcon;
  }>;
}) {
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="bg-white pt-20">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={`${
                    pathname === item.url
                      ? "bg-black/90 text-white rounded-xl"
                      : "bg-white text-black rounded-none"
                  } duration-300`}
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
