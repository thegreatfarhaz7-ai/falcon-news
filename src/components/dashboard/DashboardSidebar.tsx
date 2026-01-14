'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Logo from '@/components/shared/Logo';
import { LayoutDashboard, Newspaper, Sparkles, Users, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/articles', label: 'Articles', icon: Newspaper },
    { href: '/dashboard/summarize', label: 'Summarize AI', icon: Sparkles },
    { href: '/dashboard/users', label: 'Users', icon: Users },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <SidebarHeader className="border-b">
        <div className="flex w-full items-center justify-between p-2">
            <Logo />
            <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
