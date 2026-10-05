"use client"

import { useMemo, useState } from "react"
import {
  CalendarDays,
  Download,
  FileDown,
  GraduationCap,
  Search,
  Users,
  UserRound,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type DTPRecord = {
  id: string
  studentId: string
  name: string
  course: string
  batch: string
  startDate: string
  endDate: string
  instructor: string
  status: "Scheduled" | "In Progress" | "Completed"
  notes: string
}

type Student = {
  studentId: string
  name: string
  course: string
  batch: string
}

const courseOptions = [
  "Computer Science",
  "Business Administration",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Psychology",
  "Civil Engineering",
  "Information Technology",
  "Data Science",
]

const batchOptions = ["2023-24", "2024-25", "2025-26"]

const instructorOptions = [
  "Dr. Robert Johnson",
  "Prof. Emily Williams",
  "Dr. James Anderson",
  "Dr. Sarah Thompson",
  "Prof. Michael Clark",
  "Dr. Lisa Martinez",
  "Prof. David Wilson",
]

const students: Student[] = [
  { studentId: "STU-24018", name: "Aarav Mehta", course: "Computer Science", batch: "2025-26" },
  { studentId: "STU-24012", name: "Isha Sharma", course: "Business Administration", batch: "2025-26" },
  { studentId: "STU-23984", name: "Kabir Joshi", course: "Information Technology", batch: "2024-25" },
  { studentId: "STU-23961", name: "Ananya Patel", course: "Data Science", batch: "2024-25" },
  { studentId: "STU-23944", name: "Rohan Desai", course: "Mechanical Engineering", batch: "2024-25" },
  { studentId: "STU-23920", name: "Saanvi Shah", course: "Psychology", batch: "2025-26" },
  { studentId: "STU-23897", name: "Vihaan Kulkarni", course: "Electrical Engineering", batch: "2023-24" },
  { studentId: "STU-23873", name: "Myra Nair", course: "Civil Engineering", batch: "2025-26" },
]

const initialDTPData: DTPRecord[] = [
  {
    id: "DTP-1048",
    studentId: "STU-24018",
    name: "Aarav Mehta",
    course: "Computer Science",
    batch: "2025-26",
    startDate: "2026-10-06",
    endDate: "2026-10-24",
    instructor: "Dr. Robert Johnson",
    status: "Scheduled",
    notes: "Foundation training and academic orientation.",
  },
  {
    id: "DTP-1047",
    studentId: "STU-24012",
    name: "Isha Sharma",
    course: "Business Administration",
    batch: "2025-26",
    startDate: "2026-09-22",
    endDate: "2026-10-10",
    instructor: "Prof. Emily Williams",
    status: "In Progress",
    notes: "Business communication and management fundamentals.",
  },
  {
    id: "DTP-1046",
    studentId: "STU-23984",
    name: "Kabir Joshi",
    course: "Information Technology",
    batch: "2024-25",
    startDate: "2026-09-08",
    endDate: "2026-09-27",
    instructor: "Dr. James Anderson",
    status: "Completed",
    notes: "Technical skills development program.",
  },
  {
    id: "DTP-1045",
    studentId: "STU-23961",
    name: "Ananya Patel",
    course: "Data Science",
    batch: "2024-25",
    startDate: "2026-10-13",
    endDate: "2026-10-31",
    instructor: "Dr. Sarah Thompson",
    status: "Scheduled",
    notes: "Data analytics and project readiness training.",
  },
  {
    id: "DTP-1044",
    studentId: "STU-23944",
    name: "Rohan Desai",
    course: "Mechanical Engineering",
    batch: "2024-25",
    startDate: "2026-08-18",
    endDate: "2026-09-05",
    instructor: "Prof. Michael Clark",
    status: "Completed",
    notes: "Workshop safety and practical training.",
  },
  {
    id: "DTP-1043",
    studentId: "STU-23920",
    name: "Saanvi Shah",
    course: "Psychology",
    batch: "2025-26",
    startDate: "2026-10-20",
    endDate: "2026-11-07",
    instructor: "Dr. Lisa Martinez",
    status: "Scheduled",
    notes: "Professional development and counseling orientation.",
  },
  {
    id: "DTP-1042",
    studentId: "STU-23897",
    name: "Vihaan Kulkarni",
    course: "Electrical Engineering",
    batch: "2023-24",
    startDate: "2026-09-15",
    endDate: "2026-10-03",
    instructor: "Prof. David Wilson",
    status: "In Progress",
    notes: "Electrical systems and workplace readiness.",
  },
  {
    id: "DTP-1041",
    studentId: "STU-23873",
    name: "Myra Nair",
    course: "Civil Engineering",
    batch: "2025-26",
    startDate: "2026-08-04",
    endDate: "2026-08-22",
    instructor: "Dr. James Anderson",
    status: "Completed",
    notes: "Site planning and construction documentation.",
  },
]

const emptyForm = {
  studentId: "",
  name: "",
  course: "",
  batch: "",
  startDate: "",
  endDate: "",
  instructor: "",
  notes: "",
}

export default function DTPViewPage() {
  const { toast } = useToast()
  const [dtpData, setDtpData] = useState<DTPRecord[]>(initialDTPData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [selectedDTP, setSelectedDTP] = useState<DTPRecord | null>(null)
  const [newDTP, setNewDTP] = useState(emptyForm)

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return dtpData.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.studentId.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query) ||
        item.instructor.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter

      const matchesCourse =
        courseFilter === "all" || item.course === courseFilter

      return matchesSearch && matchesStatus && matchesCourse
    })
  }, [dtpData, searchTerm, statusFilter, courseFilter])

  const stats = useMemo(() => {
    return {
      total: dtpData.length,
      scheduled: dtpData.filter((item) => item.status === "Scheduled").length,
      inProgress: dtpData.filter((item) => item.status === "In Progress").length,
      completed: dtpData.filter((item) => item.status === "Completed").length,
    }
  }, [dtpData])

  const handleStudentChange = (studentId: string) => {
    const student = students.find((item) => item.studentId === studentId)

    if (!student) return

    setNewDTP((prev) => ({
      ...prev,
      studentId: student.studentId,
      name: student.name,
      course: student.course,
      batch: student.batch,
    }))
  }

  const resetForm = () => setNewDTP(emptyForm)

  const handleScheduleDTP = () => {
    if (
      !newDTP.studentId ||
      !newDTP.startDate ||
      !newDTP.endDate ||
      !newDTP.instructor
    ) {
      toast({
        title: "Complete the required fields",
        description: "Select a student, instructor, start date and end date.",
        variant: "destructive",
      })
      return
    }

    const nextNumber =
      Math.max(
        ...dtpData.map((item) => Number(item.id.replace("DTP-", ""))),
        1040,
      ) + 1

    const record: DTPRecord = {
      id: `DTP-${nextNumber}`,
      studentId: newDTP.studentId,
      name: newDTP.name,
      course: newDTP.course,
      batch: newDTP.batch,
      startDate: newDTP.startDate,
      endDate: newDTP.endDate,
      instructor: newDTP.instructor,
      status: "Scheduled",
      notes: newDTP.notes,
    }

    setDtpData((prev) => [record, ...prev])
    setIsScheduleDialogOpen(false)
    resetForm()

    toast({
      title: "DTP scheduled",
      description: `Training has been scheduled for ${record.name}.`,
    })
  }

  const handleExport = () => {
    const headers = [
      "DTP ID",
      "Student ID",
      "Name",
      "Course",
      "Batch",
      "Start Date",
      "End Date",
      "Instructor",
      "Status",
    ]

    const rows = filteredData.map((item) => [
      item.id,
      item.studentId,
      item.name,
      item.course,
      item.batch,
      item.startDate,
      item.endDate,
      item.instructor,
      item.status,
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","),
      )
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "aarohan-dtp-report.csv"
    link.click()

    URL.revokeObjectURL(url)

    toast({
      title: "Report exported",
      description: `${filteredData.length} DTP records exported successfully.`,
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setCourseFilter("all")
  }

  const formatDate = (value: string) => {
    if (!value) return "—"

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${value}T00:00:00`))
  }

  const statusClass = (status: DTPRecord["status"]) => {
    if (status === "Completed") {
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-700 ring-blue-600/20"
    }

    return "bg-amber-50 text-amber-700 ring-amber-600/20"
  }

  return (
    <div className="min-h-full space-y-6 bg-muted/20 p-1">
      <div className="flex flex-col gap-4 rounded-2xl border bg-background p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            <GraduationCap className="size-4" />
            Aarohan Learning
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            DTP View
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage student training programs, schedules and instructor assignments.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="mr-2 size-4" />
            Export Report
          </Button>

          <Button
            onClick={() => {
              resetForm()
              setIsScheduleDialogOpen(true)
            }}
          >
            <CalendarDays className="mr-2 size-4" />
            Schedule DTP
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total Programs</p>
              <p className="mt-1 text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <GraduationCap className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="mt-1 text-2xl font-bold">{stats.scheduled}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <CalendarDays className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="mt-1 text-2xl font-bold">{stats.inProgress}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="mt-1 text-2xl font-bold">{stats.completed}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <UserRound className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Search & Filters</CardTitle>
          <CardDescription>
            Find training records by student, course, instructor or DTP ID.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by name, ID, course..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All courses</SelectItem>
                {courseOptions.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              <X className="mr-2 size-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <CardHeader className="border-b bg-background">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">DTP Records</CardTitle>
              <CardDescription>
                {filteredData.length} of {dtpData.length} training programs shown.
              </CardDescription>
            </div>
            <div className="text-xs text-muted-foreground">
              Aarohan Learning · Training Management
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="px-5 py-3 font-medium text-muted-foreground">DTP ID</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Student</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Course</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Batch</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Schedule</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Instructor</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-right font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((dtp) => (
                  <tr
                    key={dtp.id}
                    className="border-b last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-5 py-4 font-semibold">{dtp.id}</td>

                    <td className="px-5 py-4">
                      <div className="font-medium">{dtp.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {dtp.studentId}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="whitespace-nowrap">{dtp.course}</span>
                    </td>

                    <td className="px-5 py-4">{dtp.batch}</td>

                    <td className="px-5 py-4">
                      <div className="whitespace-nowrap font-medium">
                        {formatDate(dtp.startDate)}
                      </div>
                      <div className="whitespace-nowrap text-xs text-muted-foreground">
                        to {formatDate(dtp.endDate)}
                      </div>
                    </td>

                    <td className="px-5 py-4">{dtp.instructor}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusClass(
                          dtp.status,
                        )}`}
                      >
                        {dtp.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDTP(dtp)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-3 rounded-full bg-muted p-3">
                          <Search className="size-5 text-muted-foreground" />
                        </div>
                        <p className="font-medium">No DTP records found</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Try changing your search or filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isScheduleDialogOpen}
        onOpenChange={setIsScheduleDialogOpen}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Schedule DTP</DialogTitle>
            <DialogDescription>
              Select a student and add the training schedule details.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>Select Student</Label>
              <Select
                value={newDTP.studentId}
                onValueChange={handleStudentChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.studentId} value={student.studentId}>
                      {student.name} ({student.studentId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Course</Label>
                <Input value={newDTP.course} readOnly />
              </div>

              <div className="space-y-2">
                <Label>Batch</Label>
                <Input value={newDTP.batch} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Instructor</Label>
              <Select
                value={newDTP.instructor}
                onValueChange={(value) =>
                  setNewDTP((prev) => ({ ...prev, instructor: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructorOptions.map((instructor) => (
                    <SelectItem key={instructor} value={instructor}>
                      {instructor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={newDTP.startDate}
                  onChange={(event) =>
                    setNewDTP((prev) => ({
                      ...prev,
                      startDate: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={newDTP.endDate}
                  onChange={(event) =>
                    setNewDTP((prev) => ({
                      ...prev,
                      endDate: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Enter any additional notes"
                value={newDTP.notes}
                onChange={(event) =>
                  setNewDTP((prev) => ({
                    ...prev,
                    notes: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsScheduleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleScheduleDTP}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedDTP}
        onOpenChange={(open) => {
          if (!open) setSelectedDTP(null)
        }}
      >
        <DialogContent className="sm:max-w-[560px]">
          {selectedDTP && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDTP.name}</DialogTitle>
                <DialogDescription>
                  {selectedDTP.id} · {selectedDTP.studentId}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-2 sm:grid-cols-2">
                <div className="rounded-xl border bg-muted/20 p-4">
                  <p className="text-xs text-muted-foreground">Course</p>
                  <p className="mt-1 font-medium">{selectedDTP.course}</p>
                </div>

                <div className="rounded-xl border bg-muted/20 p-4">
                  <p className="text-xs text-muted-foreground">Batch</p>
                  <p className="mt-1 font-medium">{selectedDTP.batch}</p>
                </div>

                <div className="rounded-xl border bg-muted/20 p-4">
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="mt-1 font-medium">
                    {formatDate(selectedDTP.startDate)}
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/20 p-4">
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="mt-1 font-medium">
                    {formatDate(selectedDTP.endDate)}
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/20 p-4 sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Instructor</p>
                  <p className="mt-1 font-medium">{selectedDTP.instructor}</p>
                </div>

                <div className="rounded-xl border bg-muted/20 p-4 sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Notes</p>
                  <p className="mt-1 text-sm">{selectedDTP.notes || "No notes added."}</p>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => setSelectedDTP(null)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
