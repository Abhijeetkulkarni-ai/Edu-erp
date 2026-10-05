"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowRight, Check, CheckCircle2, ClipboardList, Edit, Eye, FileDown,
  Search, Trash2, Users, X, Clock3, GraduationCap,
} from "lucide-react"

type Status = "Pending" | "Approved" | "Rejected"

type Transfer = {
  id: string
  studentId: string
  name: string
  currentStage: string
  nextStage: string
  requestDate: string
  status: Status
  notes: string
}

const stageOptions = ["Admission", "Enrollment", "Course Allocation", "Fee Payment", "Class Assignment", "Graduation"]

const initialTransfers: Transfer[] = [
  { id: "TRF-1048", studentId: "STU-24018", name: "Aarav Mehta", currentStage: "Admission", nextStage: "Enrollment", requestDate: "2026-09-28", status: "Pending", notes: "Admission documents verified. Ready for enrollment." },
  { id: "TRF-1047", studentId: "STU-24012", name: "Isha Sharma", currentStage: "Enrollment", nextStage: "Course Allocation", requestDate: "2026-09-27", status: "Approved", notes: "Course preference confirmed by student." },
  { id: "TRF-1046", studentId: "STU-23984", name: "Kabir Joshi", currentStage: "Course Allocation", nextStage: "Fee Payment", requestDate: "2026-09-26", status: "Pending", notes: "Awaiting final fee confirmation." },
  { id: "TRF-1045", studentId: "STU-23961", name: "Ananya Patel", currentStage: "Fee Payment", nextStage: "Class Assignment", requestDate: "2026-09-24", status: "Approved", notes: "Payment cleared. Class allocation can proceed." },
  { id: "TRF-1044", studentId: "STU-23944", name: "Rohan Desai", currentStage: "Enrollment", nextStage: "Course Allocation", requestDate: "2026-09-23", status: "Rejected", notes: "Transfer request requires updated academic documents." },
  { id: "TRF-1043", studentId: "STU-23920", name: "Saanvi Shah", currentStage: "Class Assignment", nextStage: "Graduation", requestDate: "2026-09-21", status: "Approved", notes: "All completion requirements have been verified." },
  { id: "TRF-1042", studentId: "STU-23897", name: "Vihaan Kulkarni", currentStage: "Admission", nextStage: "Enrollment", requestDate: "2026-09-20", status: "Pending", notes: "Counselling completed; pending final review." },
  { id: "TRF-1041", studentId: "STU-23873", name: "Myra Nair", currentStage: "Fee Payment", nextStage: "Class Assignment", requestDate: "2026-09-18", status: "Approved", notes: "Fee status verified by accounts." },
]

const statusStyles: Record<Status, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Approved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Rejected: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
}

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()

export default function TransferStagePage() {
  const { toast } = useToast()
  const [transferData, setTransferData] = useState<Transfer[]>(initialTransfers)
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null)
  const [newTransfer, setNewTransfer] = useState({ studentId: "", name: "", currentStage: "", nextStage: "", notes: "" })
  const [dialog, setDialog] = useState<"add" | "view" | "edit" | "delete" | "approve" | "reject" | null>(null)

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return transferData.filter((item) => {
      const matchesSearch = !term || [item.id, item.studentId, item.name, item.currentStage, item.nextStage].some((value) => value.toLowerCase().includes(term))
      const matchesStage = stageFilter === "all" || item.currentStage.toLowerCase() === stageFilter.toLowerCase()
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStage && matchesStatus
    })
  }, [transferData, searchTerm, stageFilter, statusFilter])

  const stats = useMemo(() => ({
    total: transferData.length,
    pending: transferData.filter((x) => x.status === "Pending").length,
    approved: transferData.filter((x) => x.status === "Approved").length,
    rejected: transferData.filter((x) => x.status === "Rejected").length,
  }), [transferData])

  const closeDialog = () => setDialog(null)

  const handleAdd = () => {
    if (!newTransfer.studentId || !newTransfer.name || !newTransfer.currentStage || !newTransfer.nextStage) {
      toast({ title: "Complete required fields", description: "Student, name and both stages are required.", variant: "destructive" })
      return
    }
    const item: Transfer = {
      id: `TRF-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: newTransfer.studentId,
      name: newTransfer.name,
      currentStage: newTransfer.currentStage,
      nextStage: newTransfer.nextStage,
      requestDate: new Date().toISOString().slice(0, 10),
      status: "Pending",
      notes: newTransfer.notes,
    }
    setTransferData((prev) => [item, ...prev])
    setNewTransfer({ studentId: "", name: "", currentStage: "", nextStage: "", notes: "" })
    closeDialog()
    toast({ title: "Transfer request added", description: `${item.name}'s request is now pending.` })
  }

  const handleEdit = () => {
    if (!selectedTransfer) return
    setTransferData((prev) => prev.map((item) => item.id === selectedTransfer.id ? selectedTransfer : item))
    closeDialog()
    toast({ title: "Request updated", description: `${selectedTransfer.name}'s transfer request was updated.` })
  }

  const handleDelete = () => {
    if (!selectedTransfer) return
    setTransferData((prev) => prev.filter((item) => item.id !== selectedTransfer.id))
    closeDialog()
    toast({ title: "Request deleted", description: `${selectedTransfer.name}'s request was removed.` })
  }

  const handleStatus = (status: Status) => {
    if (!selectedTransfer) return
    const updated = { ...selectedTransfer, status }
    setTransferData((prev) => prev.map((item) => item.id === updated.id ? updated : item))
    setSelectedTransfer(updated)
    closeDialog()
    toast({ title: `Request ${status.toLowerCase()}`, description: `${updated.name}'s transfer request is ${status.toLowerCase()}.` })
  }

  const exportData = () => {
    const header = ["Request ID", "Student ID", "Name", "Current Stage", "Next Stage", "Request Date", "Status"]
    const rows = filteredData.map((x) => [x.id, x.studentId, x.name, x.currentStage, x.nextStage, x.requestDate, x.status])
    const csv = [header, ...rows].map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "aarohan-transfer-stage.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Aarohan Learning</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Manage Transfer Stage</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track and manage student progression between academic stages.</p>
        </div>
        <Button onClick={() => setDialog("add")} className="w-full rounded-xl sm:w-auto">
          <ArrowRight className="mr-2 size-4" /> New Transfer Request
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Requests", value: stats.total, icon: ClipboardList, hint: "All transfer requests" },
          { label: "Pending", value: stats.pending, icon: Clock3, hint: "Awaiting review" },
          { label: "Approved", value: stats.approved, icon: CheckCircle2, hint: "Successfully processed" },
          { label: "Rejected", value: stats.rejected, icon: X, hint: "Needs attention" },
        ].map((stat) => {
          const Icon = stat.icon
          return <Card key={stat.label} className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div><p className="text-sm text-muted-foreground">{stat.label}</p><p className="mt-2 text-3xl font-semibold tracking-tight">{stat.value}</p><p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p></div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></div>
              </div>
            </CardContent>
          </Card>
        })}
      </div>

      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_180px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search student, ID or stage..." className="h-10 rounded-xl pl-9" />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="h-10 rounded-xl"><SelectValue placeholder="Current stage" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All stages</SelectItem>{stageOptions.map((stage) => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10 rounded-xl"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent>
            </Select>
            <Button variant="outline" onClick={exportData} className="h-10 rounded-xl"><FileDown className="mr-2 size-4" /> Export</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20 px-5 py-4">
          <CardTitle className="text-base">Transfer Stage Requests</CardTitle>
          <CardDescription>Showing {filteredData.length} of {transferData.length} requests</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead><tr className="border-b bg-muted/20 text-left text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">Request</th><th className="px-4 py-3 font-medium">Student</th><th className="px-4 py-3 font-medium">Current Stage</th><th className="px-4 py-3 font-medium">Next Stage</th><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {filteredData.map((transfer) => <tr key={transfer.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="px-5 py-4"><div className="font-medium">{transfer.id}</div><div className="text-xs text-muted-foreground">{transfer.studentId}</div></td>
                  <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-semibold text-primary">{initials(transfer.name)}</div><div><div className="font-medium">{transfer.name}</div><div className="text-xs text-muted-foreground">Student</div></div></div></td>
                  <td className="px-4 py-4"><span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">{transfer.currentStage}</span></td>
                  <td className="px-4 py-4"><div className="flex items-center gap-2"><ArrowRight className="size-3.5 text-muted-foreground" /> <span>{transfer.nextStage}</span></div></td>
                  <td className="px-4 py-4 text-muted-foreground">{transfer.requestDate}</td>
                  <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[transfer.status]}`}>{transfer.status}</span></td>
                  <td className="px-4 py-4"><div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="rounded-lg" onClick={() => { setSelectedTransfer(transfer); setDialog("view") }}><Eye className="size-4" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-lg" onClick={() => { setSelectedTransfer(transfer); setDialog("edit") }}><Edit className="size-4" /></Button>
                    {transfer.status === "Pending" && <><Button variant="ghost" size="icon" className="rounded-lg text-emerald-600" onClick={() => { setSelectedTransfer(transfer); setDialog("approve") }}><Check className="size-4" /></Button><Button variant="ghost" size="icon" className="rounded-lg text-rose-600" onClick={() => { setSelectedTransfer(transfer); setDialog("reject") }}><X className="size-4" /></Button></>}
                    <Button variant="ghost" size="icon" className="rounded-lg text-muted-foreground hover:text-destructive" onClick={() => { setSelectedTransfer(transfer); setDialog("delete") }}><Trash2 className="size-4" /></Button>
                  </div></td>
                </tr>)}
              </tbody>
            </table>
            {filteredData.length === 0 && <div className="flex flex-col items-center justify-center py-16 text-center"><Users className="mb-3 size-8 text-muted-foreground" /><p className="font-medium">No transfer requests found</p><p className="mt-1 text-sm text-muted-foreground">Try changing your search or filters.</p></div>}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialog === "add"} onOpenChange={(open) => !open && closeDialog()}><DialogContent className="rounded-2xl sm:max-w-[600px]"><DialogHeader><DialogTitle>New Transfer Request</DialogTitle><DialogDescription>Create a local transfer-stage request.</DialogDescription></DialogHeader><div className="grid gap-4 py-2"><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Student ID</Label><Input value={newTransfer.studentId} onChange={(e) => setNewTransfer({ ...newTransfer, studentId: e.target.value })} placeholder="STU-24025" /></div><div className="space-y-2"><Label>Student Name</Label><Input value={newTransfer.name} onChange={(e) => setNewTransfer({ ...newTransfer, name: e.target.value })} placeholder="Enter student name" /></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Current Stage</Label><Select value={newTransfer.currentStage} onValueChange={(v) => setNewTransfer({ ...newTransfer, currentStage: v })}><SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger><SelectContent>{stageOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Next Stage</Label><Select value={newTransfer.nextStage} onValueChange={(v) => setNewTransfer({ ...newTransfer, nextStage: v })}><SelectTrigger><SelectValue placeholder="Select next stage" /></SelectTrigger><SelectContent>{stageOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div></div><div className="space-y-2"><Label>Notes</Label><Textarea value={newTransfer.notes} onChange={(e) => setNewTransfer({ ...newTransfer, notes: e.target.value })} placeholder="Add notes" rows={3} /></div></div><DialogFooter><Button variant="outline" onClick={closeDialog}>Cancel</Button><Button onClick={handleAdd}>Save Request</Button></DialogFooter></DialogContent></Dialog>

      <Dialog open={dialog === "view"} onOpenChange={(open) => !open && closeDialog()}><DialogContent className="rounded-2xl sm:max-w-[540px]"><DialogHeader><DialogTitle>Transfer Request Details</DialogTitle><DialogDescription>Review the current stage transition.</DialogDescription></DialogHeader>{selectedTransfer && <div className="space-y-5 py-2"><div className="flex items-center gap-3 rounded-xl bg-muted/40 p-4"><div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">{initials(selectedTransfer.name)}</div><div><p className="font-semibold">{selectedTransfer.name}</p><p className="text-sm text-muted-foreground">{selectedTransfer.studentId} · {selectedTransfer.id}</p></div><span className={`ml-auto rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[selectedTransfer.status]}`}>{selectedTransfer.status}</span></div><div className="grid grid-cols-2 gap-4 text-sm"><div><p className="text-muted-foreground">Current Stage</p><p className="mt-1 font-medium">{selectedTransfer.currentStage}</p></div><div><p className="text-muted-foreground">Next Stage</p><p className="mt-1 font-medium">{selectedTransfer.nextStage}</p></div><div><p className="text-muted-foreground">Request Date</p><p className="mt-1 font-medium">{selectedTransfer.requestDate}</p></div></div><div><p className="text-sm text-muted-foreground">Notes</p><p className="mt-1 text-sm">{selectedTransfer.notes || "No notes added."}</p></div></div>}<DialogFooter><Button variant="outline" onClick={closeDialog}>Close</Button>{selectedTransfer?.status === "Pending" && <Button onClick={() => { closeDialog(); setTimeout(() => setDialog("approve"), 0) }}>Approve Request</Button>}</DialogFooter></DialogContent></Dialog>

      <Dialog open={dialog === "edit"} onOpenChange={(open) => !open && closeDialog()}><DialogContent className="rounded-2xl sm:max-w-[600px]"><DialogHeader><DialogTitle>Edit Transfer Request</DialogTitle><DialogDescription>Update the request details.</DialogDescription></DialogHeader>{selectedTransfer && <div className="grid gap-4 py-2"><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Student ID</Label><Input value={selectedTransfer.studentId} onChange={(e) => setSelectedTransfer({ ...selectedTransfer, studentId: e.target.value })} /></div><div className="space-y-2"><Label>Student Name</Label><Input value={selectedTransfer.name} onChange={(e) => setSelectedTransfer({ ...selectedTransfer, name: e.target.value })} /></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Current Stage</Label><Select value={selectedTransfer.currentStage} onValueChange={(v) => setSelectedTransfer({ ...selectedTransfer, currentStage: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{stageOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label>Next Stage</Label><Select value={selectedTransfer.nextStage} onValueChange={(v) => setSelectedTransfer({ ...selectedTransfer, nextStage: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{stageOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div></div><div className="space-y-2"><Label>Status</Label><Select value={selectedTransfer.status} onValueChange={(v: Status) => setSelectedTransfer({ ...selectedTransfer, status: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Approved">Approved</SelectItem><SelectItem value="Rejected">Rejected</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Notes</Label><Textarea value={selectedTransfer.notes} onChange={(e) => setSelectedTransfer({ ...selectedTransfer, notes: e.target.value })} rows={3} /></div></div>}<DialogFooter><Button variant="outline" onClick={closeDialog}>Cancel</Button><Button onClick={handleEdit}>Save Changes</Button></DialogFooter></DialogContent></Dialog>

      <Dialog open={dialog === "delete"} onOpenChange={(open) => !open && closeDialog()}><DialogContent className="rounded-2xl sm:max-w-[420px]"><DialogHeader><DialogTitle>Delete transfer request?</DialogTitle><DialogDescription>This will remove the request from the local dashboard data.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={closeDialog}>Cancel</Button><Button variant="destructive" onClick={handleDelete}>Delete</Button></DialogFooter></DialogContent></Dialog>

      <Dialog open={dialog === "approve"} onOpenChange={(open) => !open && closeDialog()}><DialogContent className="rounded-2xl sm:max-w-[480px]"><DialogHeader><DialogTitle>Approve transfer request</DialogTitle><DialogDescription>Confirm moving this student to the next stage.</DialogDescription></DialogHeader>{selectedTransfer && <div className="rounded-xl bg-muted/40 p-4 text-sm"><p className="font-medium">{selectedTransfer.name}</p><p className="mt-1 text-muted-foreground">{selectedTransfer.currentStage} <ArrowRight className="mx-1 inline size-3" /> {selectedTransfer.nextStage}</p></div>}<DialogFooter><Button variant="outline" onClick={closeDialog}>Cancel</Button><Button onClick={() => handleStatus("Approved")}><Check className="mr-2 size-4" /> Approve</Button></DialogFooter></DialogContent></Dialog>

      <Dialog open={dialog === "reject"} onOpenChange={(open) => !open && closeDialog()}><DialogContent className="rounded-2xl sm:max-w-[480px]"><DialogHeader><DialogTitle>Reject transfer request</DialogTitle><DialogDescription>Confirm rejection of this stage transfer.</DialogDescription></DialogHeader>{selectedTransfer && <Textarea value={selectedTransfer.notes} onChange={(e) => setSelectedTransfer({ ...selectedTransfer, notes: e.target.value })} placeholder="Enter rejection reason" rows={4} />}<DialogFooter><Button variant="outline" onClick={closeDialog}>Cancel</Button><Button variant="destructive" onClick={() => handleStatus("Rejected")}><X className="mr-2 size-4" /> Reject Request</Button></DialogFooter></DialogContent></Dialog>
    </div>
  )
}
