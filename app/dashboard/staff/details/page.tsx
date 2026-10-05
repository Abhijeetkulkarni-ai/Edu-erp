"use client";

import { useEffect, useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import {
  Search, FileDown, Filter, Eye, UserPlus,
  Mail, Phone, Edit as Pencil, Trash, Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  createDemoStaff,
  deleteDemoStaff,
  getDemoStaff,
  updateDemoStaff,
  type DemoStaff,
  type DemoStaffInput,
} from "@/lib/api-service";

/* ───────── PDF export ───────── */
const exportPDF = (rows: DemoStaff[]) => {
  if (!rows.length) return;
  const doc = new jsPDF();
  doc.text("SL-Staff Details Report", 14, 16);
  autoTable(doc, {
    head: [[
      "ID","Name","Department","Designation",
      "Email","Phone","Joining Date","Status"]],
    body: rows.map(r => [
      r.id, r.name, r.department, r.designation,
      r.email, r.phone, new Date(r.joiningDate).toLocaleDateString(), r.status,
    ]),
    startY: 25, styles: { fontSize: 8 },
  });
  doc.save(`SL-staff-${Date.now()}.pdf`);
};

/* ───────── utils ───────── */
const fmt = (d?: string) => d ? new Date(d).toISOString().split("T")[0] : "-";

/* ===================================================================== */
export default function StaffDetailsPage() {
  const { toast } = useToast();

  /* ---------- state ---------- */
  const [all,         setAll]         = useState<DemoStaff[]>([]);
  const [filtered,    setFiltered]    = useState<DemoStaff[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [tab,         setTab]         = useState("all");
  const [query,       setQuery]       = useState("");

  const blank: DemoStaffInput = {
    name:"", department:"", designation:"", email:"",
    phone:"", joiningDate:"", status:"Active",
  };
  const [form,       setForm]       = useState<DemoStaffInput>(blank);
  const [sel,        setSel]        = useState<DemoStaff | null>(null);
  const [dlgAdd,     setDlgAdd]     = useState(false);
  const [dlgView,    setDlgView]    = useState(false);
  const [dlgEdit,    setDlgEdit]    = useState(false);
  const [dlgDel,     setDlgDel]     = useState(false);

  /* ---------- fetch ---------- */
  useEffect(() => {
    async function fetchStaff() {
      setLoading(true);
      try {
        const data = await getDemoStaff();
        setAll(data);
        filterByTab(data, tab);
      } catch (err: unknown) {
        toast({ title:"Error", description: err instanceof Error ? err.message : "Failed to fetch staff", variant:"destructive" });
      } finally {
        setLoading(false);
      }
    }
    fetchStaff();
  }, []);                               // ← run once

  /* ---------- helpers ---------- */
  const filterByTab = (rows: DemoStaff[], t = tab) => {
    setFiltered(
      t === "all"
        ? rows
        : rows.filter(r =>
            r.status.toLowerCase() === t.replace("-"," ").toLowerCase())
    );
  };

  const runSearch = () => {
    const q = query.toLowerCase();
    const rows = all.filter(r =>
      r.name.toLowerCase().includes(q)  || r.id?.toLowerCase?.().includes(q) ||
      r.department.toLowerCase().includes(q)      ||
      r.designation.toLowerCase().includes(q)     ||
      r.email.toLowerCase().includes(q)           ||
      r.phone.includes(q));
    filterByTab(rows);
  };

  /* ---------- CRUD ---------- */
  const addStaff = async () => {
    try {
      const created = await createDemoStaff(form);
      toast({ title:"Added", description:`${form.name} created.` });
      const updated = [...all, created];
      setAll(updated); filterByTab(updated);
      setDlgAdd(false); setForm(blank);
    } catch (err: unknown) {
      toast({ title:"Add Failed", description: err instanceof Error ? err.message : "Failed to add", variant:"destructive" });
    }
  };

// ⬇️ make saveEdit async (it already is)
const saveEdit = async () => {
  if (!sel) return;
  try {
    // 👇 updated record comes straight from the demo service
    const updatedRecord = await updateDemoStaff(sel._id, form);

    toast({ title: "Updated", description: `${form.name} saved.` });

    // then replace the item synchronously
    const updated = all.map((r) =>
      r._id === sel._id ? updatedRecord : r
    );

    setAll(updated);
    filterByTab(updated);
    setDlgEdit(false);
  } catch (err: unknown) {
    toast({
      title: "Update Failed",
      description: err instanceof Error ? err.message : "Failed to update staff",
      variant: "destructive",
    });
  }
};


  const confirmDel = async () => {
    if (!sel) return;
    try {
      await deleteDemoStaff(sel._id);
      toast({ title:"Deleted", description:`${sel.name} removed.` });
      const updated = all.filter(r => r._id !== sel._id);
      setAll(updated); filterByTab(updated);
    } catch (err: unknown) {
      toast({ title:"Delete Failed", description: err instanceof Error ? err.message : "Failed to delete", variant:"destructive" });
    }
    setDlgDel(false);
  };

  /* ---------- tab change effect ---------- */
  useEffect(() => { filterByTab(all); }, [tab]);  /* no async here */

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Staff Details</h1>

        <Dialog open={dlgAdd} onOpenChange={setDlgAdd}>
          <DialogTrigger asChild>
            <Button><UserPlus className="mr-2 h-4 w-4"/> Add New Staff</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader><DialogTitle>Add Staff</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              {(["name","department","designation","email","phone"] as const).map(f=>(
                <Input key={f} placeholder={f} value={form[f] ?? ""}
                       onChange={e=>setForm({...form,[f]:e.target.value})}/>
              ))}
              <Input type="date" value={form.joiningDate ?? ""}
                     onChange={e=>setForm({...form,joiningDate:e.target.value})}/>
              <Select value={form.status ?? "Active"}
                      onValueChange={s=>setForm({...form,status:s as DemoStaff["status"]})}>
                <SelectTrigger><SelectValue placeholder="Status"/></SelectTrigger>
                <SelectContent>
                  {["Active","On Leave","Former"].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter><Button onClick={addStaff}>Add</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs / Search / Export */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {["all","active","on-leave","former"].map(v=>(
            <TabsTrigger key={v} value={v}>{v.replace("-"," ").replace(/\b\w/g,c=>c.toUpperCase())}</TabsTrigger>
          ))}
        </TabsList>

        <div className="flex gap-3 mt-4">
          <Input className="max-w-md" placeholder="Search…" value={query} onChange={e=>setQuery(e.target.value)}/>
          <Button variant="outline" onClick={runSearch}><Search className="h-4 w-4 mr-2"/>Search</Button>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2"/>Filter</Button>
          <Button variant="outline" onClick={()=>exportPDF(filtered)}><FileDown className="h-4 w-4 mr-2"/>Export</Button>
        </div>

        {/* Table */}
        <TabsContent value={tab}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Staff Members</CardTitle>
              <CardDescription>Manage staff records</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-6"><Loader2 className="h-6 w-6 animate-spin"/></div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                    {["ID","Name","Dept","Designation","Contact",
                      "Join Date","Status","Actions"].map(h=>(
                      <TableHead key={h}>{h}</TableHead>
                    ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(r=>(
                      <TableRow key={r._id}>
                        <TableCell>{r.id}</TableCell>
                        <TableCell>{r.name}</TableCell>
                        <TableCell>{r.department}</TableCell>
                        <TableCell>{r.designation}</TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs">
                            <span className="flex items-center"><Mail className="h-3 w-3 mr-1"/>{r.email}</span>
                            <span className="flex items-center mt-1"><Phone className="h-3 w-3 mr-1"/>{r.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>{fmt(r.joiningDate)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            r.status==="Active" ? "bg-green-100 text-green-800"
                              : r.status==="On Leave" ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"}`}>
                            {r.status}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Button size="icon" variant="ghost"
                                  onClick={()=>{setSel(r);setDlgView(true);}}>
                            <Eye className="h-4 w-4"/></Button>
                          <Button size="icon" variant="ghost"
                                  onClick={()=>{setSel(r);setForm(r);setDlgEdit(true);}}>
                            <Pencil className="h-4 w-4"/></Button>
                          <Button size="icon" variant="ghost" className="text-red-600"
                                  onClick={()=>{setSel(r);setDlgDel(true);}}>
                            <Trash className="h-4 w-4"/></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View dialog */}
      <Dialog open={dlgView} onOpenChange={setDlgView}>
        <DialogContent>
          <DialogHeader><DialogTitle>Staff Details</DialogTitle></DialogHeader>
          {sel && (
            <Table className="w-full">
              <TableBody>
                {Object.entries(sel).filter(([k])=>!["__v","_id"].includes(k))
                  .map(([k,v])=>(
                    <TableRow key={k}>
                      <TableCell className="font-medium w-40 capitalize">
                        {k.replace(/([A-Z])/g," $1")}
                      </TableCell>
                      <TableCell>{String(v)}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={dlgEdit} onOpenChange={setDlgEdit}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader><DialogTitle>Edit Staff</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            {(["name","department","designation","email","phone"] as const).map(f=>(
              <Input key={f} placeholder={f} value={form[f] ?? ""}
                     onChange={e=>setForm({...form,[f]:e.target.value})}/>
            ))}
            <Input type="date" value={fmt(form.joiningDate)}
                   onChange={e=>setForm({...form,joiningDate:e.target.value})}/>
            <Select value={form.status ?? "Active"}
                    onValueChange={s=>setForm({...form,status:s as DemoStaff["status"]})}>
              <SelectTrigger><SelectValue/></SelectTrigger>
              <SelectContent>
                {["Active","On Leave","Former"].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter><Button onClick={saveEdit}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={dlgDel} onOpenChange={setDlgDel}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader><DialogTitle>Delete Staff</DialogTitle></DialogHeader>
          <p>Are you sure you want to delete&nbsp;
            <span className="font-semibold">{sel?.name}</span>?</p>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setDlgDel(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDel}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
