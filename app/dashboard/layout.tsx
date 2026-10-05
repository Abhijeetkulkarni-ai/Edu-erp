"use client"

import type React from "react"
import { SidebarProvider } from "@/components/sidebar-provider"
import { MainSidebar } from "@/components/main-sidebar"
import { MainHeader } from "@/components/main-header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <MainSidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <MainHeader />
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
