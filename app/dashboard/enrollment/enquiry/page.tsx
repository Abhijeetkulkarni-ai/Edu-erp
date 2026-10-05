"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { getDemoEnquiries, type DemoEnquiry } from "@/lib/api-service"
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  UserPlus,
  Users,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type EnquiryStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Enrolled"


const STATUS_STYLES: Record<EnquiryStatus, string> = {
  New: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",
  Contacted:
    "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
  Interested:
    "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-50",
  Enrolled:
    "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
}

const STATUS_ICONS: Record<EnquiryStatus, typeof Clock3> = {
  New: UserPlus,
  Contacted: Phone,
  Interested: ArrowUpRight,
  Enrolled: CheckCircle2,
}

export default function EnquiryPage() {
  const router = useRouter()

  const [enquiries, setEnquiries] = useState<DemoEnquiry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    getDemoEnquiries()
      .then(setEnquiries)
      .catch((error) => console.error("Error fetching enquiries:", error))
  }, [])

  const counts = useMemo(
    () => ({
      all: enquiries.length,
      new: enquiries.filter((item) => item.status === "New").length,
      contacted: enquiries.filter((item) => item.status === "Contacted").length,
      interested: enquiries.filter(
        (item) => item.status === "Interested",
      ).length,
      enrolled: enquiries.filter((item) => item.status === "Enrolled").length,
    }),
    [enquiries],
  )

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return enquiries.filter((item) => {
      const matchesTab =
        activeTab === "all" ||
        item.status.toLowerCase() === activeTab.toLowerCase()

      const matchesSearch =
        !query ||
        item.studentName.toLowerCase().includes(query) ||
        item.parentName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.mobile.includes(query) ||
        item.program.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query)

      return matchesTab && matchesSearch
    })
  }, [activeTab, searchTerm, enquiries])

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <Users className="size-4" />
            Enrollment
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Enquiry Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage student enquiries, follow-ups and admission opportunities.
          </p>
        </div>

        <Button
          onClick={() =>
            router.push("/dashboard/enrollment/enquiry/new")
          }
          className="w-full rounded-xl sm:w-auto"
        >
          <Plus className="mr-2 size-4" />
          New Enquiry
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total enquiries"
          value={counts.all}
          description="All enquiries"
          icon={Users}
          iconClass="bg-blue-50 text-blue-600"
        />

        <SummaryCard
          title="New enquiries"
          value={counts.new}
          description="Needs attention"
          icon={UserPlus}
          iconClass="bg-violet-50 text-violet-600"
        />

        <SummaryCard
          title="Interested"
          value={counts.interested}
          description="Potential admissions"
          icon={ArrowUpRight}
          iconClass="bg-amber-50 text-amber-600"
        />

        <SummaryCard
          title="Enrolled"
          value={counts.enrolled}
          description="Converted enquiries"
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Main content */}
      <Card className="overflow-hidden rounded-2xl border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-white pb-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Enquiries
              </CardTitle>
              <CardDescription className="mt-1">
                Track and manage your latest student enquiries.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="size-4" />
              Academic Year 2026–27
            </div>
          </div>

          {/* Search */}
          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search name, parent, email, phone or program..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                className="h-10 rounded-xl border-slate-200 pl-9"
              />
            </div>

            <Button
              variant="outline"
              className="h-10 rounded-xl"
              onClick={() => setSearchTerm("")}
            >
              <Filter className="mr-2 size-4" />
              Clear
            </Button>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-5"
          >
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1">
              <StatusTab
                value="all"
                label="All"
                count={counts.all}
              />

              <StatusTab
                value="new"
                label="New"
                count={counts.new}
              />

              <StatusTab
                value="contacted"
                label="Contacted"
                count={counts.contacted}
              />

              <StatusTab
                value="interested"
                label="Interested"
                count={counts.interested}
              />

              <StatusTab
                value="enrolled"
                label="Enrolled"
                count={counts.enrolled}
              />
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-0">
          {filteredData.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 bg-slate-50/70 hover:bg-slate-50/70">
                    <TableHead className="pl-6">Student</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Follow-up</TableHead>
                    <TableHead className="pr-6 text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredData.map((enquiry) => {
                    const StatusIcon = STATUS_ICONS[enquiry.status]

                    return (
                      <TableRow
                        key={enquiry.id}
                        className="border-slate-100 transition-colors hover:bg-slate-50/70"
                      >
                        {/* Student */}
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                              {enquiry.studentName
                                .split(" ")
                                .map((name) => name[0])
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <div className="min-w-[150px]">
                              <p className="font-medium text-slate-900">
                                {enquiry.studentName}
                              </p>

                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {enquiry.id} · {enquiry.parentName}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Program */}
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-800">
                              {enquiry.program}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {enquiry.date}
                            </p>
                          </div>
                        </TableCell>

                        {/* Contact */}
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              <Mail className="size-3.5" />
                              {enquiry.email}
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Phone className="size-3.5" />
                              {enquiry.mobile}
                            </div>
                          </div>
                        </TableCell>

                        {/* Source */}
                        <TableCell>
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {enquiry.source}
                          </span>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`gap-1.5 rounded-full px-2.5 py-1 ${STATUS_STYLES[enquiry.status]}`}
                          >
                            <StatusIcon className="size-3.5" />
                            {enquiry.status}
                          </Badge>
                        </TableCell>

                        {/* Follow up */}
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Clock3 className="size-3.5 text-muted-foreground" />
                            {enquiry.followUp}
                          </div>
                        </TableCell>

                        {/* Action */}
                        <TableCell className="pr-6 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-lg"
                            onClick={() =>
                              router.push(
                                `/dashboard/enrollment/enquiry/${enquiry.id}`,
                              )
                            }
                          >
                            View
                            <ArrowUpRight className="ml-1.5 size-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="size-6 text-slate-400" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No enquiries found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try changing your search term or selecting a different
                enquiry status.
              </p>

              <Button
                variant="outline"
                className="mt-4 rounded-xl"
                onClick={() => {
                  setSearchTerm("")
                  setActiveTab("all")
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  title: string
  value: number
  description: string
  icon: typeof Users
  iconClass: string
}) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div
            className={`flex size-10 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusTab({
  value,
  label,
  count,
}: {
  value: string
  label: string
  count: number
}) {
  return (
    <TabsTrigger
      value={value}
      className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
    >
      {label}

      <span className="ml-1.5 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] text-slate-600 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
        {count}
      </span>
    </TabsTrigger>
  )
}