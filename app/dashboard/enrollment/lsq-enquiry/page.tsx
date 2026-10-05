"use client"

import { useMemo, useState } from "react"
import {
  ArrowUpRight,
  CheckCircle2,
  Download,
  Edit3,
  Eye,
  Filter,
  Phone,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type Status = "New" | "Contacted" | "Interested" | "Not Interested" | "Converted"

type Enquiry = {
  id: string
  name: string
  phone: string
  email: string
  course: string
  source: string
  date: string
  status: Status
  notes: string
}

const initialEnquiries: Enquiry[] = [
  {
    id: "LSQ-1048",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    email: "aarav.sharma@example.com",
    course: "Computer Science",
    source: "Website",
    date: "04 Oct 2026",
    status: "New",
    notes: "Interested in the upcoming academic intake.",
  },
  {
    id: "LSQ-1047",
    name: "Ishita Mehta",
    phone: "+91 98204 11872",
    email: "ishita.mehta@example.com",
    course: "Business Administration",
    source: "Google",
    date: "04 Oct 2026",
    status: "Contacted",
    notes: "Counsellor spoke with the parent. Follow-up requested.",
  },
  {
    id: "LSQ-1046",
    name: "Rohan Patil",
    phone: "+91 97654 23109",
    email: "rohan.patil@example.com",
    course: "Information Technology",
    source: "Referral",
    date: "03 Oct 2026",
    status: "Interested",
    notes: "Requested fee structure and admission timeline.",
  },
  {
    id: "LSQ-1045",
    name: "Meera Desai",
    phone: "+91 98193 60421",
    email: "meera.desai@example.com",
    course: "Psychology",
    source: "Social Media",
    date: "03 Oct 2026",
    status: "Converted",
    notes: "Admission completed successfully.",
  },
  {
    id: "LSQ-1044",
    name: "Kabir Joshi",
    phone: "+91 98920 44718",
    email: "kabir.joshi@example.com",
    course: "Mechanical Engineering",
    source: "Exhibition",
    date: "02 Oct 2026",
    status: "Not Interested",
    notes: "Candidate is considering another programme.",
  },
  {
    id: "LSQ-1043",
    name: "Ananya Kulkarni",
    phone: "+91 99201 38144",
    email: "ananya.k@example.com",
    course: "Data Science",
    source: "Website",
    date: "02 Oct 2026",
    status: "Interested",
    notes: "Asked for a campus visit and programme brochure.",
  },
  {
    id: "LSQ-1042",
    name: "Vihaan Shah",
    phone: "+91 98331 75620",
    email: "vihaan.shah@example.com",
    course: "Civil Engineering",
    source: "Direct Walk-in",
    date: "01 Oct 2026",
    status: "Contacted",
    notes: "Walk-in enquiry recorded by admissions team.",
  },
  {
    id: "LSQ-1041",
    name: "Sara Khan",
    phone: "+91 99872 14560",
    email: "sara.khan@example.com",
    course: "Electrical Engineering",
    source: "Social Media",
    date: "30 Sep 2026",
    status: "New",
    notes: "Requested a callback in the evening.",
  },
]

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

const sourceOptions = [
  "Website",
  "Social Media",
  "Referral",
  "Google",
  "Exhibition",
  "Newspaper",
  "TV Ad",
  "Direct Walk-in",
]

const statusOptions: Status[] = [
  "New",
  "Contacted",
  "Interested",
  "Not Interested",
  "Converted",
]

const statusStyles: Record<Status, string> = {
  New: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
  Contacted: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
  Interested: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
  "Not Interested": "bg-rose-500/10 text-rose-600 ring-rose-500/20",
  Converted: "bg-violet-500/10 text-violet-600 ring-violet-500/20",
}

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  course: "",
  source: "",
  notes: "",
}

export default function LSQEnquiryPage() {
  const { toast } = useToast()
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeStatus, setActiveStatus] = useState<"All" | Status>("All")
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [followUpNotes, setFollowUpNotes] = useState("")

  const stats = useMemo(() => {
    const count = (status: Status) =>
      enquiries.filter((item) => item.status === status).length

    return {
      total: enquiries.length,
      new: count("New"),
      contacted: count("Contacted"),
      interested: count("Interested"),
      converted: count("Converted"),
    }
  }, [enquiries])

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return enquiries.filter((item) => {
      const matchesStatus =
        activeStatus === "All" || item.status === activeStatus

      const matchesSearch =
        !term ||
        [
          item.id,
          item.name,
          item.phone,
          item.email,
          item.course,
          item.source,
          item.status,
        ].some((value) => value.toLowerCase().includes(term))

      return matchesStatus && matchesSearch
    })
  }, [enquiries, searchTerm, activeStatus])

  const updateForm = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }))

  const openAdd = () => {
    setForm(emptyForm)
    setIsAddOpen(true)
  }

  const addEnquiry = () => {
    if (!form.name || !form.phone || !form.course || !form.source) {
      toast({
        title: "Complete the required fields",
        description: "Name, phone, course and source are required.",
        variant: "destructive",
      })
      return
    }

    const nextNumber =
      Math.max(
        ...enquiries.map((item) => Number(item.id.replace(/\D/g, ""))),
        1048,
      ) + 1

    const newItem: Enquiry = {
      id: `LSQ-${nextNumber}`,
      ...form,
      date: "05 Oct 2026",
      status: "New",
    }

    setEnquiries((current) => [newItem, ...current])
    setIsAddOpen(false)

    toast({
      title: "Enquiry added",
      description: `${newItem.name} has been added to LSQ enquiries.`,
    })
  }

  const saveEdit = () => {
    if (!selectedEnquiry) return

    setEnquiries((current) =>
      current.map((item) =>
        item.id === selectedEnquiry.id ? selectedEnquiry : item,
      ),
    )
    setIsEditOpen(false)

    toast({
      title: "Enquiry updated",
      description: `${selectedEnquiry.name}'s details have been updated.`,
    })
  }

  const deleteEnquiry = () => {
    if (!selectedEnquiry) return

    setEnquiries((current) =>
      current.filter((item) => item.id !== selectedEnquiry.id),
    )
    setIsDeleteOpen(false)

    toast({
      title: "Enquiry deleted",
      description: `${selectedEnquiry.name} was removed from the list.`,
    })
  }

  const saveFollowUp = () => {
    if (!selectedEnquiry) return

    const updated = {
      ...selectedEnquiry,
      notes: followUpNotes || selectedEnquiry.notes,
      status:
        selectedEnquiry.status === "New"
          ? ("Contacted" as Status)
          : selectedEnquiry.status,
    }

    setEnquiries((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    )
    setSelectedEnquiry(updated)
    setIsFollowUpOpen(false)

    toast({
      title: "Follow-up recorded",
      description: `Follow-up for ${updated.name} has been saved.`,
    })
  }

  const convertToAdmission = (enquiry: Enquiry) => {
    const updated = { ...enquiry, status: "Converted" as Status }

    setEnquiries((current) =>
      current.map((item) => (item.id === enquiry.id ? updated : item)),
    )
    setSelectedEnquiry(updated)
    setIsViewOpen(false)

    toast({
      title: "Converted to admission",
      description: `${enquiry.name} is now marked as converted.`,
    })
  }

  const exportData = () => {
    const rows = [
      ["ID", "Name", "Phone", "Email", "Course", "Source", "Date", "Status"],
      ...filtered.map((item) => [
        item.id,
        item.name,
        item.phone,
        item.email,
        item.course,
        item.source,
        item.date,
        item.status,
      ]),
    ]

    const csv = rows
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "aarohan-lsq-enquiries.csv"
    anchor.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export ready",
      description: `${filtered.length} enquiries exported as CSV.`,
    })
  }

  const statusTabs: Array<{ label: string; value: "All" | Status; count: number }> =
    [
      { label: "All Enquiries", value: "All", count: stats.total },
      { label: "New", value: "New", count: stats.new },
      { label: "Contacted", value: "Contacted", count: stats.contacted },
      { label: "Interested", value: "Interested", count: stats.interested },
      { label: "Converted", value: "Converted", count: stats.converted },
    ]

  return (
    <div className="min-h-full space-y-6 bg-background p-1">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
            <span className="size-2 rounded-full bg-primary" />
            Aarohan Learning
            <span className="text-muted-foreground">/</span>
            Enrollment
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Leadersquare Enquiries
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage enquiries, follow-ups and admission conversions from one place.
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd} className="rounded-xl shadow-sm">
              <Plus className="mr-2 size-4" />
              New Enquiry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add new LSQ enquiry</DialogTitle>
              <DialogDescription>
                Add a prospective student to the Aarohan Learning enquiry pipeline.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2 sm:grid-cols-2">
              <Field label="Full name" required>
                <Input
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="Enter full name"
                />
              </Field>
              <Field label="Phone number" required>
                <Input
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="Email address" className="sm:col-span-2">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="student@example.com"
                />
              </Field>
              <Field label="Interested course" required>
                <Select
                  value={form.course}
                  onValueChange={(value) => updateForm("course", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOptions.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Enquiry source" required>
                <Select
                  value={form.source}
                  onValueChange={(value) => updateForm("source", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceOptions.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Notes" className="sm:col-span-2">
                <Textarea
                  value={form.notes}
                  onChange={(e) => updateForm("notes", e.target.value)}
                  placeholder="Add additional notes..."
                  rows={4}
                />
              </Field>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addEnquiry}>Save Enquiry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total enquiries"
          value={stats.total}
          detail="All active enquiries"
          icon={Users}
          featured
        />
        <StatCard
          title="New"
          value={stats.new}
          detail="Awaiting first contact"
          icon={UserPlus}
        />
        <StatCard
          title="Contacted"
          value={stats.contacted}
          detail="Follow-up in progress"
          icon={Phone}
        />
        <StatCard
          title="Interested"
          value={stats.interested}
          detail="High-intent prospects"
          icon={CheckCircle2}
        />
        <StatCard
          title="Converted"
          value={stats.converted}
          detail="Moved to admission"
          icon={ArrowUpRight}
        />
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/60 shadow-sm">
        <CardContent className="p-0">
          <div className="border-b border-border/60 px-4 pt-4 sm:px-6">
            <div className="flex gap-1 overflow-x-auto pb-0">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveStatus(tab.value)}
                  className={`flex shrink-0 items-center gap-2 rounded-t-xl border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeStatus === tab.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      activeStatus === tab.value
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, ID, phone, email, course..."
                className="h-10 rounded-xl pl-9"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl">
                <Filter className="mr-2 size-4" />
                Filter
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={exportData}
              >
                <Download className="mr-2 size-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-sm">
              <thead className="bg-muted/30">
                <tr className="border-b border-border/60">
                  {["Enquiry", "Contact", "Course", "Source", "Date", "Status", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {filtered.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="border-b border-border/50 transition-colors hover:bg-muted/20"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                          {enquiry.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold">{enquiry.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {enquiry.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium">{enquiry.phone}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {enquiry.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">
                        {enquiry.course}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {enquiry.source}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {enquiry.date}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[enquiry.status]}`}
                      >
                        <span className="size-1.5 rounded-full bg-current" />
                        {enquiry.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <ActionButton
                          label="View"
                          onClick={() => {
                            setSelectedEnquiry(enquiry)
                            setIsViewOpen(true)
                          }}
                        >
                          <Eye className="size-4" />
                        </ActionButton>
                        <ActionButton
                          label="Edit"
                          onClick={() => {
                            setSelectedEnquiry(enquiry)
                            setIsEditOpen(true)
                          }}
                        >
                          <Edit3 className="size-4" />
                        </ActionButton>
                        <ActionButton
                          label="Follow up"
                          onClick={() => {
                            setSelectedEnquiry(enquiry)
                            setFollowUpNotes(enquiry.notes)
                            setIsFollowUpOpen(true)
                          }}
                        >
                          <CheckCircle2 className="size-4" />
                        </ActionButton>
                        <ActionButton
                          label="Delete"
                          onClick={() => {
                            setSelectedEnquiry(enquiry)
                            setIsDeleteOpen(true)
                          }}
                        >
                          <Trash2 className="size-4 text-rose-500" />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-muted">
                  <Search className="size-5 text-muted-foreground" />
                </div>
                <p className="font-semibold">No enquiries found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or status filter.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-border/60 px-5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing <strong className="text-foreground">{filtered.length}</strong>{" "}
              of <strong className="text-foreground">{enquiries.length}</strong>{" "}
              enquiries
            </span>
            <span>Last updated just now</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry details</DialogTitle>
            <DialogDescription>
              Complete information for the selected LSQ enquiry.
            </DialogDescription>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="space-y-5">
              <div className="flex items-center gap-4 rounded-2xl bg-muted/40 p-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                  {selectedEnquiry.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{selectedEnquiry.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedEnquiry.id}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[selectedEnquiry.status]}`}
                >
                  {selectedEnquiry.status}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Detail label="Phone" value={selectedEnquiry.phone} />
                <Detail label="Email" value={selectedEnquiry.email} />
                <Detail label="Course" value={selectedEnquiry.course} />
                <Detail label="Source" value={selectedEnquiry.source} />
                <Detail label="Enquiry date" value={selectedEnquiry.date} />
                <Detail label="Enquiry ID" value={selectedEnquiry.id} />
              </div>

              <div className="rounded-xl border bg-muted/20 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Notes
                </p>
                <p className="text-sm leading-6">
                  {selectedEnquiry.notes || "No notes added yet."}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
            {selectedEnquiry && selectedEnquiry.status !== "Converted" && (
              <Button onClick={() => convertToAdmission(selectedEnquiry)}>
                <CheckCircle2 className="mr-2 size-4" />
                Convert to Admission
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit enquiry</DialogTitle>
            <DialogDescription>
              Update the enquiry information and current pipeline status.
            </DialogDescription>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="grid gap-4 py-2 sm:grid-cols-2">
              <Field label="Full name">
                <Input
                  value={selectedEnquiry.name}
                  onChange={(e) =>
                    setSelectedEnquiry({
                      ...selectedEnquiry,
                      name: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={selectedEnquiry.phone}
                  onChange={(e) =>
                    setSelectedEnquiry({
                      ...selectedEnquiry,
                      phone: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Email" className="sm:col-span-2">
                <Input
                  value={selectedEnquiry.email}
                  onChange={(e) =>
                    setSelectedEnquiry({
                      ...selectedEnquiry,
                      email: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Course">
                <Select
                  value={selectedEnquiry.course}
                  onValueChange={(value) =>
                    setSelectedEnquiry({
                      ...selectedEnquiry,
                      course: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOptions.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Status">
                <Select
                  value={selectedEnquiry.status}
                  onValueChange={(value) =>
                    setSelectedEnquiry({
                      ...selectedEnquiry,
                      status: value as Status,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Notes" className="sm:col-span-2">
                <Textarea
                  value={selectedEnquiry.notes}
                  onChange={(e) =>
                    setSelectedEnquiry({
                      ...selectedEnquiry,
                      notes: e.target.value,
                    })
                  }
                  rows={4}
                />
              </Field>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFollowUpOpen} onOpenChange={setIsFollowUpOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Record follow-up</DialogTitle>
            <DialogDescription>
              Update the enquiry after your latest conversation.
            </DialogDescription>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="space-y-4 py-2">
              <Field label="Update status">
                <Select
                  value={selectedEnquiry.status}
                  onValueChange={(value) =>
                    setSelectedEnquiry({
                      ...selectedEnquiry,
                      status: value as Status,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Follow-up notes">
                <Textarea
                  value={followUpNotes}
                  onChange={(e) => setFollowUpNotes(e.target.value)}
                  placeholder="Record the conversation, next action or parent response..."
                  rows={5}
                />
              </Field>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFollowUpOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveFollowUp}>Save Follow-up</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete enquiry?</DialogTitle>
            <DialogDescription>
              This will remove the enquiry from the current Aarohan Learning
              list. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="font-semibold">{selectedEnquiry.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {selectedEnquiry.id} · {selectedEnquiry.course}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteEnquiry}>
              <Trash2 className="mr-2 size-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string
  children: React.ReactNode
  required?: boolean
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {children}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 break-words text-sm font-medium">{value}</p>
    </div>
  )
}

function ActionButton({
  label,
  children,
  onClick,
}: {
  label: string
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
      onClick={onClick}
      title={label}
      aria-label={label}
    >
      {children}
    </Button>
  )
}

function StatCard({
  title,
  value,
  detail,
  icon: Icon,
  featured = false,
}: {
  title: string
  value: number
  detail: string
  icon: React.ElementType
  featured?: boolean
}) {
  return (
    <Card
      className={`rounded-2xl border-border/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        featured ? "border-primary/20 bg-primary/[0.035]" : ""
      }`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          </div>
          <div
            className={`flex size-10 items-center justify-center rounded-xl ${
              featured ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <Icon className="size-4" />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  )
}
