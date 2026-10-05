"use client"



import type React from "react"

import { useEffect, useMemo, useState } from "react"

import Link from "next/link"

import { usePathname } from "next/navigation"

import {

  BookOpen,

  Building2,

  ChevronRight,

  ClipboardList,

  DollarSign,

  FileText,

  Home,

  Package,

  Search,

  Settings2,

  Users,

  X,
  PanelLeftClose,
  PanelLeftOpen,

} from "lucide-react"



import { useSidebar } from "@/components/sidebar-provider"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Sheet, SheetContent } from "@/components/ui/sheet"



type SidebarSubItem = {

  title: string

  href: string

}



type SidebarItem = {

  title: string

  href?: string

  icon: React.ElementType

  submenu?: SidebarSubItem[]

}



const sidebarItems: SidebarItem[] = [

  {

    title: "Dashboard",

    href: "/dashboard",

    icon: Home,

  },

  {

    title: "Enrollment",

    icon: BookOpen,

    submenu: [

      { title: "Enquiry", href: "/dashboard/enrollment/enquiry" },

      { title: "Leadersquare Enquiry", href: "/dashboard/enrollment/lsq-enquiry" },

      { title: "Admission", href: "/dashboard/enrollment/admission" },

      { title: "Manage Transfer Stage", href: "/dashboard/enrollment/transfer-stage" },

      { title: "DTP View", href: "/dashboard/enrollment/dtp-view" },

      { title: "Graduation Name Changed Confirmation", href: "/dashboard/enrollment/graduation-name-change" },

      { title: "Inventory/Purchase Order", href: "/dashboard/enrollment/inventory" },

      { title: "Admission Status", href: "/dashboard/enrollment/admission-status" },

    ],

  },

  {

    title: "Staff Assessment",

    icon: Users,

    submenu: [

      { title: "Staff Attendance", href: "/dashboard/staff/attendance" },

      { title: "Staff Details", href: "/dashboard/staff/details" },

      { title: "Teaching Subject", href: "/dashboard/staff/teaching-subject" },

    ],

  },

  {

    title: "Operation",

    icon: Settings2,

    submenu: [

      { title: "Exchange Order", href: "/dashboard/operation/exchange-order" },

      { title: "Purchase Order", href: "/dashboard/operation/purchase-order" },

      { title: "Static Data", href: "/dashboard/operation/static-data" },

    ],

  },

  {

    title: "Account Statement",

    icon: FileText,

    submenu: [

      { title: "SOA Summary", href: "/dashboard/account/soa-summary" },

      { title: "SOA Details", href: "/dashboard/account/soa-details" },

    ],

  },

  {

    title: "Fee Collection",

    icon: DollarSign,

    submenu: [

      { title: "Deposit Amount", href: "/dashboard/fee/deposit-amount" },

      { title: "Deposit Status", href: "/dashboard/fee/deposit-status" },

      { title: "Fund Transfer", href: "/dashboard/fee/fund-transfer" },

      { title: "Fee Structure", href: "/dashboard/fee/structure" },

      { title: "Discount Type", href: "/dashboard/fee/discount-type" },

      { title: "Payment Detail", href: "/dashboard/fee/payment-detail" },

      { title: "Convert Amount", href: "/dashboard/fee/convert-amount" },

    ],

  },

  {

    title: "Franchise",

    icon: Building2,

    submenu: [

      { title: "Invoice Details", href: "/dashboard/franchise/invoice-details" },

      { title: "Invoice Download", href: "/dashboard/franchise/invoice-download" },

      { title: "Receipt Dashboard", href: "/dashboard/franchise/receipt-dashboard" },

      { title: "Franchise Holder", href: "/dashboard/franchise/holder" },

      { title: "Franchise Profile", href: "/dashboard/franchise/profile" },

      { title: "Franchise Type", href: "/dashboard/franchise/type" },

    ],

  },

  {

    title: "Tools",

    icon: Settings2,

    submenu: [

      { title: "Fee Calculator", href: "/dashboard/tools/fee-calculator" },

      { title: "Calendar", href: "/dashboard/tools/calendar" },

      { title: "Academic", href: "/dashboard/tools/academic" },

    ],

  },

  {

    title: "Reports",

    icon: ClipboardList,

    submenu: [

      { title: "Admission Details", href: "/dashboard/reports/admission-details" },

      { title: "Fee Card Details", href: "/dashboard/reports/fee-card-details" },

      { title: "Enquiry Details", href: "/dashboard/reports/enquiry-details" },

      { title: "LSQ Enquiry Detail", href: "/dashboard/reports/lsq-enquiry-details" },

      { title: "Payment Due Reports", href: "/dashboard/reports/payment-due" },

      { title: "Cancelled Receipt Details", href: "/dashboard/reports/cancelled-receipt" },

      { title: "Transferred Student Report", href: "/dashboard/reports/transferred-student" },

      { title: "FCR", href: "/dashboard/reports/fcr" },

      { title: "Admission Count", href: "/dashboard/reports/admission-count" },

      { title: "Student Forecasted Royalty Report", href: "/dashboard/reports/forecasted-royalty" },

    ],

  },

  {

    title: "Shortage/Damage",

    icon: Package,

    submenu: [

      { title: "Report Shortage", href: "/dashboard/shortage/report" },

      { title: "Damage Shortage", href: "/dashboard/shortage/damage" },

      { title: "Download Shortage/Damage Report", href: "/dashboard/shortage/download-report" },

    ],

  },

]



function NavIcon({

  icon: Icon,

  active,

}: {

  icon: React.ElementType

  active?: boolean

}) {

  return (

    <span

      className={cn(

        "flex size-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",

        active

          ? "bg-primary text-primary-foreground shadow-sm"

          : "text-muted-foreground group-hover:bg-muted group-hover:text-foreground",

      )}

    >

      <Icon className="size-[18px]" strokeWidth={1.8} />

    </span>

  )

}



function SidebarContent({

  isOpen,

  isMobile,

  onClose,

  onToggle,

}: {

  isOpen: boolean

  isMobile?: boolean

  onClose?: () => void

  onToggle?: () => void

}) {

const pathname = usePathname()

const [openItem, setOpenItem] = useState<string | null>(null)

const [query, setQuery] = useState("")



const isActive = (href: string) =>

    pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`))



const activeParent = useMemo(

    () =>

      sidebarItems.find(

        (item) => item.submenu?.some((subItem) => isActive(subItem.href)),

      )?.title ?? null,

    [pathname],

  )



  useEffect(() => {

    if (activeParent) setOpenItem(activeParent)

  }, [activeParent])



const filteredItems = useMemo(() => {

const value = query.trim().toLowerCase()

    if (!value) return sidebarItems



    return sidebarItems

      .map((item) => {

const parentMatch = item.title.toLowerCase().includes(value)

const submenu = item.submenu?.filter((sub) =>

          sub.title.toLowerCase().includes(value),

        )



        if (parentMatch) return item

        if (submenu?.length) return { ...item, submenu }



        return null

      })

      .filter(Boolean) as SidebarItem[]

  }, [query])



  return (

    <div className="relative flex h-full min-h-0 flex-col bg-background">
      {!isMobile && onToggle && (
        <div className="absolute -right-3 top-[22px] z-50">
          <Button type="button" variant="outline" size="icon" onClick={onToggle}
            className="size-7 rounded-full border bg-background shadow-sm hover:bg-muted"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}>
            {isOpen ? <PanelLeftClose className="size-3.5" /> : <PanelLeftOpen className="size-3.5" />}
          </Button>
        </div>
      )}

      {/* Brand */}

      <div className={cn(

        "flex h-[72px] shrink-0 items-center border-b px-3",

        isOpen ? "justify-between" : "justify-center",

      )}>

        <Link

          href="/dashboard"

          className={cn(

            "group flex items-center gap-3 rounded-xl outline-none",

            "focus-visible:ring-2 focus-visible:ring-primary/30",

          )}

          onClick={onClose}

        >

          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">

            <Building2 className="size-5" strokeWidth={2} />

          </span>



          {isOpen && (

            <span className="min-w-0">

              <span className="block truncate text-[14px] font-semibold tracking-tight">

                Aarohan Learning

              </span>

              <span className="block text-[11px] text-muted-foreground">

                Learning Management

              </span>

            </span>

          )}

        </Link>



        {isMobile && (

          <Button

            variant="ghost"

            size="icon"

            className="size-9 rounded-xl"

            onClick={onClose}

          >

            <X className="size-4" />

            <span className="sr-only">Close sidebar</span>

          </Button>

        )}

      </div>



      {/* Search */}

      {isOpen && (

        <div className="px-3 pb-2 pt-3">

          <div className="relative">

            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input

              value={query}

              onChange={(event) => setQuery(event.target.value)}

              placeholder="Search menu..."

              className="h-10 w-full rounded-xl border bg-muted/40 pl-9 pr-3 text-sm outline-none transition focus:border-primary/30 focus:bg-background focus:ring-2 focus:ring-primary/10"

            />

          </div>

        </div>

      )}



      {/* Navigation */}

      <ScrollArea className="min-h-0 flex-1 px-2">

        <nav className="space-y-1 py-3">

          {isOpen && (

            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">

              Workspace

            </div>

          )}



          {filteredItems.map((item) => {

const Icon = item.icon

const itemActive = item.href ? isActive(item.href) : false

const childActive = item.submenu?.some((sub) => isActive(sub.href)) ?? false

const expanded = openItem === item.title



            if (!item.submenu) {

              return (

                <Link

                  key={item.title}

                  href={item.href || "#"}

                  title={!isOpen ? item.title : undefined}

                  onClick={onClose}

                  className={cn(

                    "group relative flex h-11 items-center rounded-xl px-2 transition-all duration-200",

                    isOpen ? "gap-2" : "justify-center",

                    itemActive

                      ? "bg-primary/[0.08] text-foreground"

                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",

                  )}

                >

                  {itemActive && (

                    <span className="absolute left-0 h-6 w-1 rounded-r-full bg-primary" />

                  )}

                  <NavIcon icon={Icon} active={itemActive} />

                  {isOpen && (

                    <span className="truncate text-[13px] font-medium">

                      {item.title}

                    </span>

                  )}

                </Link>

              )

            }



            return (

              <div key={item.title}>

                <button

                  type="button"

                  title={!isOpen ? item.title : undefined}

                  onClick={() => {

                    if (!isOpen) return

                    setOpenItem(expanded ? null : item.title)

                  }}

                  className={cn(

                    "group relative flex h-11 w-full items-center rounded-xl px-2 text-left transition-all duration-200",

                    isOpen ? "gap-2" : "justify-center",

                    childActive

                      ? "bg-primary/[0.06] text-foreground"

                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",

                  )}

                >

                  {childActive && (

                    <span className="absolute left-0 h-6 w-1 rounded-r-full bg-primary" />

                  )}



                  <NavIcon icon={Icon} active={childActive} />



                  {isOpen && (

                    <>

                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium">

                        {item.title}

                      </span>

                      <ChevronRight

                        className={cn(

                          "size-4 shrink-0 transition-transform duration-200",

                          expanded && "rotate-90",

                        )}

                      />

                    </>

                  )}

                </button>



                {isOpen && (

                  <div

                    className={cn(

                      "grid transition-[grid-template-rows,opacity] duration-200",

                      expanded

                        ? "grid-rows-[1fr] opacity-100"

                        : "grid-rows-[0fr] opacity-0",

                    )}

                  >

                    <div className="min-h-0 overflow-hidden">

                      <div className="relative ml-[28px] space-y-0.5 border-l pl-3 py-1.5">

                        {item.submenu.map((subItem) => {

const active = isActive(subItem.href)



                          return (

                            <Link

                              key={subItem.href}

                              href={subItem.href}

                              onClick={onClose}

                              className={cn(

                                "relative flex min-h-9 items-center rounded-lg px-3 text-[12px] leading-5 transition-all duration-150",

                                active

                                  ? "bg-primary/10 font-medium text-primary"

                                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",

                              )}

                            >

                              {active && (

                                <span className="absolute -left-[17px] size-1.5 rounded-full bg-primary ring-4 ring-background" />

                              )}

                              <span className="truncate">{subItem.title}</span>

                            </Link>

                          )

                        })}

                      </div>

                    </div>

                  </div>

                )}

              </div>

            )

          })}



          {filteredItems.length === 0 && isOpen && (

            <div className="px-3 py-10 text-center">

              <Search className="mx-auto mb-2 size-5 text-muted-foreground/50" />

              <p className="text-xs text-muted-foreground">No menu found</p>

            </div>

          )}

        </nav>

      </ScrollArea>



      {/* Bottom status */}

      <div className="shrink-0 border-t p-3">

        <div

          className={cn(

            "flex items-center rounded-xl bg-muted/50",

            isOpen ? "gap-3 px-3 py-2.5" : "justify-center py-2",

          )}

        >

          <span className="relative flex size-8 items-center justify-center rounded-lg bg-background shadow-sm">

            <span className="size-2 rounded-full bg-emerald-500" />

            <span className="absolute size-2 animate-ping rounded-full bg-emerald-500/40" />

          </span>



          {isOpen && (

            <div className="min-w-0">

              <p className="text-xs font-medium">System Online</p>

              <p className="truncate text-[10px] text-muted-foreground">

                All services operational

              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  )

}



export function MainSidebar() {

const { isOpen, setIsOpen, isMobile } = useSidebar()



const sidebar = (

    <SidebarContent

      isOpen={isOpen}

      isMobile={isMobile}

      onClose={() => setIsOpen(false)}
      onToggle={() => setIsOpen(!isOpen)}

    />

  )



  if (isMobile) {

    return (

      <Sheet open={isOpen} onOpenChange={setIsOpen}>

        <SheetContent

          side="left"

          className="w-[290px] border-r p-0 shadow-2xl"

        >

          {sidebar}

        </SheetContent>

      </Sheet>

    )

  }



  return (

    <aside

      className={cn(

        "relative z-40 flex h-screen shrink-0 flex-col border-r bg-background",

        "transition-[width] duration-300 ease-out",

        isOpen ? "w-[280px]" : "w-[76px]",

      )}

    >

      {sidebar}

    </aside>

  )

}
