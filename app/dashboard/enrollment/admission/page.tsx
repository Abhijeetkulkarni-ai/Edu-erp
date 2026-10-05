"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  FileDown,
  Filter,
  Eye,
  Download,
  UserPlus,
  Edit3,
  Trash2,
  CheckCircle2,
  GraduationCap,
  Clock3,
  XCircle,
  Users,
  MoreHorizontal,
} from "lucide-react"

type AdmissionStatus = "Pending" | "Approved" | "Rejected"
type FeeStatus = "Pending" | "Partially Paid" | "Paid" | "Refunded"

type Admission = {
  id: string
  admissionId: string
  studentId: string
  name: string
  phone: string
  email: string
  course: string
  batch: string
  date: string
  status: AdmissionStatus
  feeStatus: FeeStatus
  documents: string[]
  notes: string
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

const batchOptions = ["2024-25", "2025-26", "2026-27"]

const requiredDocuments = [
  "ID Proof",
  "Address Proof",
  "Previous Marksheet",
  "Transfer Certificate",
  "Character Certificate",
  "Photographs",
  "Medical Certificate",
]

const INITIAL_ADMISSIONS: Admission[] = [
  {
    id: "1",
    admissionId: "ADM1042",
    studentId: "STU20481",
    name: "Aarav Mehta",
    phone: "+91 98765 21430",
    email: "aarav.mehta@example.com",
    course: "Computer Science",
    batch: "2026-27",
    date: "2026-09-28",
    status: "Approved",
    feeStatus: "Paid",
    documents: ["ID Proof", "Address Proof", "Previous Marksheet", "Photographs"],
    notes: "Documents verified and admission approved.",
  },
  {
    id: "2",
    admissionId: "ADM1043",
    studentId: "STU20482",
    name: "Anaya Shah",
    phone: "+91 98231 44720",
    email: "anaya.shah@example.com",
    course: "Business Administration",
    batch: "2026-27",
    date: "2026-09-29",
    status: "Pending",
    feeStatus: "Partially Paid",
    documents: ["ID Proof", "Address Proof", "Photographs"],
    notes: "Waiting for transfer certificate.",
  },
  {
    id: "3",
    admissionId: "ADM1044",
    studentId: "STU20483",
    name: "Vihaan Kapoor",
    phone: "+91 97654 18290",
    email: "vihaan.kapoor@example.com",
    course: "Data Science",
    batch: "2026-27",
    date: "2026-09-30",
    status: "Pending",
    feeStatus: "Pending",
    documents: ["ID Proof", "Previous Marksheet"],
    notes: "Fee payment and remaining documents pending.",
  },
  {
    id: "4",
    admissionId: "ADM1045",
    studentId: "STU20484",
    name: "Myra Joshi",
    phone: "+91 98901 67210",
    email: "myra.joshi@example.com",
    course: "Psychology",
    batch: "2026-27",
    date: "2026-10-01",
    status: "Approved",
    feeStatus: "Partially Paid",
    documents: ["ID Proof", "Address Proof", "Previous Marksheet", "Transfer Certificate", "Photographs"],
    notes: "Approved with balance fee due.",
  },
  {
    id: "5",
    admissionId: "ADM1046",
    studentId: "STU20485",
    name: "Reyansh Patil",
    phone: "+91 98122 53018",
    email: "reyansh.patil@example.com",
    course: "Mechanical Engineering",
    batch: "2025-26",
    date: "2026-09-24",
    status: "Rejected",
    feeStatus: "Refunded",
    documents: ["ID Proof", "Address Proof"],
    notes: "Application did not meet admission criteria.",
  },
  {
    id: "6",
    admissionId: "ADM1047",
    studentId: "STU20486",
    name: "Ishita Rao",
    phone: "+91 99301 81244",
    email: "ishita.rao@example.com",
    course: "Information Technology",
    batch: "2026-27",
    date: "2026-10-02",
    status: "Pending",
    feeStatus: "Pending",
    documents: ["ID Proof", "Photographs"],
    notes: "Application is under document verification.",
  },
  {
    id: "7",
    admissionId: "ADM1048",
    studentId: "STU20487",
    name: "Kabir Nair",
    phone: "+91 97854 63012",
    email: "kabir.nair@example.com",
    course: "Civil Engineering",
    batch: "2026-27",
    date: "2026-10-03",
    status: "Approved",
    feeStatus: "Paid",
    documents: ["ID Proof", "Address Proof", "Previous Marksheet", "Transfer Certificate", "Character Certificate", "Photographs"],
    notes: "All required documents submitted.",
  },
  {
    id: "8",
    admissionId: "ADM1049",
    studentId: "STU20488",
    name: "Sara Khan",
    phone: "+91 98670 45128",
    email: "sara.khan@example.com",
    course: "Electrical Engineering",
    batch: "2026-27",
    date: "2026-10-03",
    status: "Pending",
    feeStatus: "Partially Paid",
    documents: ["ID Proof", "Address Proof", "Previous Marksheet"],
    notes: "Awaiting medical certificate.",
  },
]

const emptyAdmission = {
  name: "",
  phone: "",
  email: "",
  course: "",
  batch: "",
  notes: "",
  documents: [] as string[],
}

function statusClass(status: AdmissionStatus) {
  if (status === "Approved") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  if (status === "Rejected") return "bg-rose-500/10 text-rose-600 dark:text-rose-400"
  return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
}

function feeClass(status: FeeStatus) {
  if (status === "Paid") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  if (status === "Refunded") return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  if (status === "Partially Paid") return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  return "bg-muted text-muted-foreground"
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default function AdmissionPage() {
  const { toast } = useToast()

  const [admissions, setAdmissions] = useState<Admission[]>(INITIAL_ADMISSIONS)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null)

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false)
  const [isApproveOpen, setIsApproveOpen] = useState(false)

  const [newAdmission, setNewAdmission] = useState(emptyAdmission)

  const filteredAdmissions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return admissions.filter((item) => {
      const matchesTab = activeTab === "all" || item.status.toLowerCase() === activeTab
      if (!matchesTab) return false
      if (!query) return true

      return [
        item.name,
        item.id,
        item.admissionId,
        item.studentId,
        item.phone,
        item.email,
        item.course,
        item.batch,
      ].some((value) => value.toLowerCase().includes(query))
    })
  }, [admissions, activeTab, searchTerm])

  const stats = useMemo(() => ({
    total: admissions.length,
    pending: admissions.filter((item) => item.status === "Pending").length,
    approved: admissions.filter((item) => item.status === "Approved").length,
    rejected: admissions.filter((item) => item.status === "Rejected").length,
  }), [admissions])

  const updateSelected = (changes: Partial<Admission>) => {
    setSelectedAdmission((current) => (current ? { ...current, ...changes } : current))
  }

  const toggleNewDocument = (document: string) => {
    setNewAdmission((current) => ({
      ...current,
      documents: current.documents.includes(document)
        ? current.documents.filter((item) => item !== document)
        : [...current.documents, document],
    }))
  }

  const toggleDocument = (document: string) => {
    setSelectedAdmission((current) => {
      if (!current) return current
      return {
        ...current,
        documents: current.documents.includes(document)
          ? current.documents.filter((item) => item !== document)
          : [...current.documents, document],
      }
    })
  }

  const handleAddAdmission = () => {
    if (!newAdmission.name || !newAdmission.phone || !newAdmission.course || !newAdmission.batch) {
      toast({
        title: "Complete required fields",
        description: "Name, phone, course and batch are required.",
        variant: "destructive",
      })
      return
    }

    const number = 1050 + admissions.length
    const created: Admission = {
      id: crypto.randomUUID(),
      admissionId: `ADM${number}`,
      studentId: `STU${30000 + admissions.length}`,
      name: newAdmission.name,
      phone: newAdmission.phone,
      email: newAdmission.email || "—",
      course: newAdmission.course,
      batch: newAdmission.batch,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      feeStatus: "Pending",
      documents: newAdmission.documents,
      notes: newAdmission.notes || "New admission application.",
    }

    setAdmissions((current) => [created, ...current])
    setNewAdmission(emptyAdmission)
    setIsAddOpen(false)

    toast({
      title: "Admission added",
      description: `${created.name} has been added to the admission list.`,
    })
  }

  const handleSaveEdit = () => {
    if (!selectedAdmission) return

    setAdmissions((current) =>
      current.map((item) => item.id === selectedAdmission.id ? selectedAdmission : item)
    )
    setIsEditOpen(false)

    toast({
      title: "Admission updated",
      description: `${selectedAdmission.name}'s admission details were updated.`,
    })
  }

  const handleDelete = () => {
    if (!selectedAdmission) return

    setAdmissions((current) => current.filter((item) => item.id !== selectedAdmission.id))
    setIsDeleteOpen(false)

    toast({
      title: "Admission removed",
      description: `${selectedAdmission.name} was removed from the admission list.`,
    })

    setSelectedAdmission(null)
  }

  const handleApprove = () => {
    if (!selectedAdmission) return

    const updated = {
      ...selectedAdmission,
      status: "Approved" as AdmissionStatus,
    }

    setAdmissions((current) =>
      current.map((item) => item.id === updated.id ? updated : item)
    )
    setSelectedAdmission(updated)
    setIsApproveOpen(false)

    toast({
      title: "Admission approved",
      description: `${updated.name} has been approved successfully.`,
    })
  }

  const handleSaveDocuments = () => {
    if (!selectedAdmission) return

    setAdmissions((current) =>
      current.map((item) => item.id === selectedAdmission.id ? selectedAdmission : item)
    )
    setIsDocumentsOpen(false)

    toast({
      title: "Documents updated",
      description: `Documents for ${selectedAdmission.name} have been updated.`,
    })
  }

  const handleExport = () => {
    const headers = ["Admission ID", "Student ID", "Name", "Phone", "Email", "Course", "Batch", "Date", "Status", "Fee Status"]
    const rows = filteredAdmissions.map((item) => [
      item.admissionId,
      item.studentId,
      item.name,
      item.phone,
      item.email,
      item.course,
      item.batch,
      item.date,
      item.status,
      item.feeStatus,
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "aarohan-admissions.csv"
    anchor.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export ready",
      description: `${filteredAdmissions.length} admission records exported.`,
    })
  }

  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <GraduationCap className="size-4 text-primary" />
            Enrollment
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Admissions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage student applications, documents and admission approvals.
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl shadow-sm">
              <UserPlus className="mr-2 size-4" />
              New Admission
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[640px]">
            <DialogHeader>
              <DialogTitle>New Admission</DialogTitle>
              <DialogDescription>
                Add a new student admission application.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 py-2">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={newAdmission.name}
                    onChange={(e) => setNewAdmission({ ...newAdmission, name: e.target.value })}
                    placeholder="Enter student name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={newAdmission.phone}
                    onChange={(e) => setNewAdmission({ ...newAdmission, phone: e.target.value })}
                    placeholder="+91"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={newAdmission.email}
                  onChange={(e) => setNewAdmission({ ...newAdmission, email: e.target.value })}
                  placeholder="student@example.com"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select
                    value={newAdmission.course}
                    onValueChange={(value) => setNewAdmission({ ...newAdmission, course: value })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>
                      {courseOptions.map((course) => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Batch</Label>
                  <Select
                    value={newAdmission.batch}
                    onValueChange={(value) => setNewAdmission({ ...newAdmission, batch: value })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                    <SelectContent>
                      {batchOptions.map((batch) => (
                        <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Required Documents</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {requiredDocuments.map((document) => (
                    <label key={document} className="flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-sm hover:bg-muted/50">
                      <Checkbox
                        checked={newAdmission.documents.includes(document)}
                        onCheckedChange={() => toggleNewDocument(document)}
                      />
                      {document}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  value={newAdmission.notes}
                  onChange={(e) => setNewAdmission({ ...newAdmission, notes: e.target.value })}
                  placeholder="Add notes about this admission..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAdmission}>Save Admission</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Admissions", value: stats.total, icon: Users, hint: "All applications", iconClass: "bg-primary/10 text-primary" },
          { label: "Pending", value: stats.pending, icon: Clock3, hint: "Awaiting approval", iconClass: "bg-amber-500/10 text-amber-600" },
          { label: "Approved", value: stats.approved, icon: CheckCircle2, hint: "Successfully approved", iconClass: "bg-emerald-500/10 text-emerald-600" },
          { label: "Rejected", value: stats.rejected, icon: XCircle, hint: "Not approved", iconClass: "bg-rose-500/10 text-rose-600" },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label} className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">{item.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
                </div>
                <div className={`flex size-11 items-center justify-center rounded-xl ${item.iconClass}`}>
                  <Icon className="size-5" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main table */}
      <Card className="overflow-hidden rounded-2xl border-border/60 shadow-sm">
        <CardHeader className="border-b border-border/50 pb-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-lg">Admission Applications</CardTitle>
              <CardDescription>
                Review and manage student applications.
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative min-w-[240px] flex-1 sm:flex-none">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search admissions..."
                  className="rounded-xl pl-9"
                />
              </div>
              <Button variant="outline" className="rounded-xl">
                <Filter className="mr-2 size-4" />
                Filter
              </Button>
              <Button variant="outline" className="rounded-xl" onClick={handleExport}>
                <FileDown className="mr-2 size-4" />
                Export
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="pt-3">
            <TabsList className="h-auto flex-wrap justify-start rounded-xl bg-muted/60 p-1">
              <TabsTrigger value="all" className="rounded-lg">All <span className="ml-1 text-xs text-muted-foreground">{stats.total}</span></TabsTrigger>
              <TabsTrigger value="pending" className="rounded-lg">Pending <span className="ml-1 text-xs text-muted-foreground">{stats.pending}</span></TabsTrigger>
              <TabsTrigger value="approved" className="rounded-lg">Approved <span className="ml-1 text-xs text-muted-foreground">{stats.approved}</span></TabsTrigger>
              <TabsTrigger value="rejected" className="rounded-lg">Rejected <span className="ml-1 text-xs text-muted-foreground">{stats.rejected}</span></TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="px-5 py-3 font-medium text-muted-foreground">Student</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Admission ID</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Course</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Batch</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Fee</th>
                  <th className="px-5 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmissions.map((admission) => (
                  <tr key={admission.id} className="border-b transition-colors hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                          {initials(admission.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{admission.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{admission.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium">{admission.admissionId}</td>
                    <td className="px-4 py-4">
                      <div className="max-w-[190px] truncate">{admission.course}</div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{admission.batch}</td>
                    <td className="px-4 py-4 text-muted-foreground">{admission.date}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(admission.status)}`}>
                        {admission.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${feeClass(admission.feeStatus)}`}>
                        {admission.feeStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg"
                          onClick={() => { setSelectedAdmission(admission); setIsViewOpen(true) }}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg"
                          onClick={() => { setSelectedAdmission(admission); setIsEditOpen(true) }}
                        >
                          <Edit3 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg"
                          onClick={() => { setSelectedAdmission(admission); setIsDocumentsOpen(true) }}
                        >
                          <Download className="size-4" />
                        </Button>
                        {admission.status === "Pending" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg text-emerald-600 hover:text-emerald-600"
                            onClick={() => { setSelectedAdmission(admission); setIsApproveOpen(true) }}
                          >
                            <CheckCircle2 className="size-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg text-destructive hover:text-destructive"
                          onClick={() => { setSelectedAdmission(admission); setIsDeleteOpen(true) }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAdmissions.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-muted">
                  <Search className="size-5 text-muted-foreground" />
                </div>
                <p className="font-semibold">No admissions found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try changing your search or status filter.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
            <span>Showing {filteredAdmissions.length} of {admissions.length} admissions</span>
            <span>Aarohan Learning • Admission Management</span>
          </div>
        </CardContent>
      </Card>

      {/* View */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Admission Details</DialogTitle>
            <DialogDescription>Review the complete admission record.</DialogDescription>
          </DialogHeader>

          {selectedAdmission && (
            <div className="space-y-5">
              <div className="flex items-center gap-4 rounded-2xl border bg-muted/20 p-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                  {initials(selectedAdmission.name)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{selectedAdmission.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedAdmission.studentId} · {selectedAdmission.admissionId}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(selectedAdmission.status)}`}>
                  {selectedAdmission.status}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Phone", selectedAdmission.phone],
                  ["Email", selectedAdmission.email],
                  ["Course", selectedAdmission.course],
                  ["Batch", selectedAdmission.batch],
                  ["Application Date", selectedAdmission.date],
                  ["Fee Status", selectedAdmission.feeStatus],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border p-3">
                    <p className="text-xs font-medium text-muted-foreground">{label}</p>
                    <p className="mt-1 text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Documents Submitted</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAdmission.documents.length ? selectedAdmission.documents.map((document) => (
                    <span key={document} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {document}
                    </span>
                  )) : (
                    <span className="text-sm text-muted-foreground">No documents submitted.</span>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <p className="text-xs font-medium text-muted-foreground">Notes</p>
                <p className="mt-1 text-sm">{selectedAdmission.notes || "No notes added."}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
            {selectedAdmission?.status === "Pending" && (
              <Button onClick={() => { setIsViewOpen(false); setIsApproveOpen(true) }}>
                <CheckCircle2 className="mr-2 size-4" />
                Approve Admission
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[620px]">
          <DialogHeader>
            <DialogTitle>Edit Admission</DialogTitle>
            <DialogDescription>Update student and admission information.</DialogDescription>
          </DialogHeader>

          {selectedAdmission && (
            <div className="grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={selectedAdmission.name} onChange={(e) => updateSelected({ name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={selectedAdmission.phone} onChange={(e) => updateSelected({ phone: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={selectedAdmission.email} onChange={(e) => updateSelected({ email: e.target.value })} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select value={selectedAdmission.course} onValueChange={(value) => updateSelected({ course: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{courseOptions.map((course) => <SelectItem key={course} value={course}>{course}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Batch</Label>
                  <Select value={selectedAdmission.batch} onValueChange={(value) => updateSelected({ batch: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{batchOptions.map((batch) => <SelectItem key={batch} value={batch}>{batch}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Admission Status</Label>
                  <Select value={selectedAdmission.status} onValueChange={(value) => updateSelected({ status: value as AdmissionStatus })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fee Status</Label>
                  <Select value={selectedAdmission.feeStatus} onValueChange={(value) => updateSelected({ feeStatus: value as FeeStatus })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea value={selectedAdmission.notes} onChange={(e) => updateSelected({ notes: e.target.value })} rows={3} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents */}
      <Dialog open={isDocumentsOpen} onOpenChange={setIsDocumentsOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Manage Documents</DialogTitle>
            <DialogDescription>Update documents submitted by the student.</DialogDescription>
          </DialogHeader>

          {selectedAdmission && (
            <div className="space-y-4">
              <div className="grid gap-2">
                {requiredDocuments.map((document) => (
                  <label key={document} className="flex cursor-pointer items-center justify-between rounded-xl border p-3 hover:bg-muted/40">
                    <span className="text-sm">{document}</span>
                    <Checkbox
                      checked={selectedAdmission.documents.includes(document)}
                      onCheckedChange={() => toggleDocument(document)}
                    />
                  </label>
                ))}
              </div>
              <Textarea
                value={selectedAdmission.notes}
                onChange={(e) => updateSelected({ notes: e.target.value })}
                placeholder="Document notes..."
                rows={3}
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDocumentsOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveDocuments}>Save Documents</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[430px]">
          <DialogHeader>
            <DialogTitle>Remove Admission?</DialogTitle>
            <DialogDescription>
              This will remove {selectedAdmission?.name || "this admission"} from the local admission list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 size-4" />
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Approve Admission</DialogTitle>
            <DialogDescription>Confirm this student's admission approval.</DialogDescription>
          </DialogHeader>

          {selectedAdmission && (
            <div className="space-y-4">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="font-semibold">{selectedAdmission.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedAdmission.course} · {selectedAdmission.batch}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Document Verification</p>
                {requiredDocuments.map((document) => {
                  const submitted = selectedAdmission.documents.includes(document)
                  return (
                    <div key={document} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={submitted} disabled />
                      <span className={submitted ? "" : "text-muted-foreground"}>{document}</span>
                      {!submitted && <span className="text-xs text-muted-foreground">(Not submitted)</span>}
                    </div>
                  )
                })}
              </div>

              <Textarea
                value={selectedAdmission.notes}
                onChange={(e) => updateSelected({ notes: e.target.value })}
                placeholder="Approval notes..."
                rows={3}
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveOpen(false)}>Cancel</Button>
            <Button onClick={handleApprove}>
              <CheckCircle2 className="mr-2 size-4" />
              Approve Admission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
