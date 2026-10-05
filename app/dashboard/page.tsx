"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Clock3,
  CreditCard,
  FileChartColumn,
  Globe2,
  GraduationCap,
  Plus,
  Receipt,
  TrendingDown,
  TrendingUp,
  UserMinus,
  Users,
  Wallet,
  PackageSearch,
  type LucideIcon,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* -------------------------------------------------------------------------- */
/* Dashboard data                                                             */
/* -------------------------------------------------------------------------- */

type Tone = "blue" | "sky" | "green" | "red" | "violet" | "amber";

type Metric = {
  title: string;
  value: string;
  icon: LucideIcon;
  tone: Tone;
  delta: string;
  up: boolean;
  good: boolean;
  route: string;
};

const USER_NAME = "Luky Thakur";
const USER_ROLE = "Administrator";

const ENROLLMENT_METRICS: Metric[] = [
  {
    title: "Enquiries",
    value: "1,248",
    icon: Users,
    tone: "blue",
    delta: "12%",
    up: true,
    good: true,
    route: "/dashboard/enrollment/enquiry",
  },
  {
    title: "Online enquiries",
    value: "436",
    icon: Globe2,
    tone: "sky",
    delta: "8%",
    up: true,
    good: true,
    route: "/dashboard/enrollment/online-enquiry",
  },
  {
    title: "Gross admissions",
    value: "350",
    icon: GraduationCap,
    tone: "green",
    delta: "5%",
    up: true,
    good: true,
    route: "/dashboard/enrollment/admission",
  },
  {
    title: "Quit",
    value: "14",
    icon: UserMinus,
    tone: "red",
    delta: "2%",
    up: false,
    good: true,
    route: "/dashboard/enrollment/admission-status",
  },
  {
    title: "Transfer in",
    value: "22",
    icon: ArrowDownLeft,
    tone: "violet",
    delta: "4%",
    up: true,
    good: true,
    route: "/dashboard/enrollment/transfer-stage",
  },
  {
    title: "Transfer out",
    value: "9",
    icon: ArrowUpRight,
    tone: "amber",
    delta: "1%",
    up: true,
    good: false,
    route: "/dashboard/enrollment/transfer-stage",
  },
];

const FINANCE_METRICS: Metric[] = [
  {
    title: "FCR deposited",
    value: "318",
    icon: BadgeCheck,
    tone: "green",
    delta: "9%",
    up: true,
    good: true,
    route: "/dashboard/fee/deposit-status",
  },
  {
    title: "FCR pending",
    value: "32",
    icon: Clock3,
    tone: "amber",
    delta: "6%",
    up: false,
    good: true,
    route: "/dashboard/fee/deposit-status",
  },
  {
    title: "Payment due",
    value: "47",
    icon: AlertCircle,
    tone: "red",
    delta: "3%",
    up: true,
    good: false,
    route: "/dashboard/fee/payment-detail",
  },
  {
    title: "Receivable",
    value: "₹6.40L",
    icon: Wallet,
    tone: "violet",
    delta: "4%",
    up: false,
    good: true,
    route: "/dashboard/account/soa-details",
  },
  {
    title: "Collection",
    value: "₹18.20L",
    icon: Receipt,
    tone: "blue",
    delta: "11%",
    up: true,
    good: true,
    route: "/dashboard/fee/deposit-amount",
  },
  {
    title: "Credit notes",
    value: "₹0.85L",
    icon: CreditCard,
    tone: "sky",
    delta: "2%",
    up: true,
    good: true,
    route: "/dashboard/fee/discount-type",
  },
];

const ENQUIRY_BY_PROGRAM = [
  { name: "Play Group", value: 420 },
  { name: "Nursery", value: 360 },
  { name: "Junior", value: 280 },
  { name: "Senior", value: 188 },
];

const ADMISSION_BY_PROGRAM = [
  { name: "Play Group", value: 128 },
  { name: "Nursery", value: 96 },
  { name: "Junior", value: 74 },
  { name: "Senior", value: 52 },
];

const ENROLLMENT_TRENDS = [
  { month: "Apr", playGroup: 22, nursery: 18, junior: 12, senior: 8 },
  { month: "May", playGroup: 30, nursery: 24, junior: 16, senior: 10 },
  { month: "Jun", playGroup: 26, nursery: 21, junior: 14, senior: 9 },
  { month: "Jul", playGroup: 34, nursery: 27, junior: 19, senior: 12 },
  { month: "Aug", playGroup: 41, nursery: 31, junior: 22, senior: 15 },
  { month: "Sep", playGroup: 36, nursery: 29, junior: 20, senior: 13 },
];

const FEE_COLLECTION = [
  { month: "Apr", amount: 9.4 },
  { month: "May", amount: 12.1 },
  { month: "Jun", amount: 10.8 },
  { month: "Jul", amount: 15.6 },
  { month: "Aug", amount: 17.3 },
  { month: "Sep", amount: 18.2 },
];

const FEE_TREND = [
  { month: "Apr", collected: 9.4, receivable: 4.8 },
  { month: "May", collected: 12.1, receivable: 5.1 },
  { month: "Jun", collected: 10.8, receivable: 5.8 },
  { month: "Jul", collected: 15.6, receivable: 5.3 },
  { month: "Aug", collected: 17.3, receivable: 5.9 },
  { month: "Sep", collected: 18.2, receivable: 6.4 },
];

const SHORTAGE_REPORTS = [
  {
    id: "SD-1042",
    reportDate: "03 Oct 2026",
    quantity: 12,
    status: "Open",
    remarks: "Activity kits short in carton",
    asOn: "05 Oct 2026",
  },
  {
    id: "SD-1039",
    reportDate: "28 Sep 2026",
    quantity: 4,
    status: "In review",
    remarks: "Damaged workbooks on arrival",
    asOn: "05 Oct 2026",
  },
  {
    id: "SD-1031",
    reportDate: "21 Sep 2026",
    quantity: 20,
    status: "Resolved",
    remarks: "Replacement dispatched",
    asOn: "30 Sep 2026",
  },
  {
    id: "SD-1027",
    reportDate: "15 Sep 2026",
    quantity: 6,
    status: "Resolved",
    remarks: "Uniform size mismatch",
    asOn: "22 Sep 2026",
  },
];

const FEE_STRUCTURE = {
  Junior: [
    { description: "Admission fee", rate: 15000, royalty: "10%" },
    { description: "Tuition fee (annual)", rate: 48000, royalty: "8%" },
    { description: "Activity fee", rate: 6000, royalty: "5%" },
    { description: "Learning kit", rate: 7500, royalty: "0%" },
  ],
  Senior: [
    { description: "Admission fee", rate: 18000, royalty: "10%" },
    { description: "Tuition fee (annual)", rate: 56000, royalty: "8%" },
    { description: "Activity fee", rate: 7000, royalty: "5%" },
    { description: "Learning kit", rate: 9000, royalty: "0%" },
  ],
};

const TONES: Record<Tone, string> = {
  blue: "bg-blue-500/10 text-blue-600",
  sky: "bg-sky-500/10 text-sky-600",
  green: "bg-emerald-500/10 text-emerald-600",
  amber: "bg-amber-500/10 text-amber-600",
  red: "bg-rose-500/10 text-rose-600",
  violet: "bg-violet-500/10 text-violet-600",
};

const STATUS_STYLES: Record<string, string> = {
  Open: "border-rose-200 bg-rose-50 text-rose-700",
  "In review": "border-amber-200 bg-amber-50 text-amber-700",
  Resolved: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const CHART_COLORS = ["#7c3aed", "#2563eb", "#0ea5e9", "#10b981"];

const chartTooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.10)",
};

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

function greeting() {
  const hour = new Date().getHours();
  return hour < 12
    ? "Good morning"
    : hour < 17
      ? "Good afternoon"
      : "Good evening";
}

/* -------------------------------------------------------------------------- */
/* Reusable UI                                                                */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function MetricCard({
  metric,
  onOpen,
}: {
  metric: Metric;
  onOpen: (route: string, title: string) => void;
}) {
  const {
    title,
    value,
    icon: Icon,
    tone,
    delta,
    up,
    good,
    route,
  } = metric;

  const Trend = up ? TrendingUp : TrendingDown;

  return (
    <button
      type="button"
      onClick={() => onOpen(route, title)}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-[0_2px_12px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex size-10 items-center justify-center rounded-xl ${TONES[tone]}`}
        >
          <Icon className="size-[18px]" strokeWidth={1.9} />
        </div>

        <ChevronRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
      </div>

      <p className="mt-5 text-xs font-medium text-slate-500">{title}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>

      <div className="mt-2 flex items-center gap-1.5 text-[11px]">
        <span
          className={`inline-flex items-center gap-1 font-semibold ${
            good ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          <Trend className="size-3.5" />
          {delta}
        </span>
        <span className="text-slate-400">vs last month</span>
      </div>
    </button>
  );
}

function ChartCard({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b border-slate-100/80 pb-4">
        <div>
          <CardTitle className="text-sm font-semibold text-slate-950">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="mt-1 text-xs">
              {description}
            </CardDescription>
          )}
        </div>
        {action}
      </CardHeader>
      <CardContent className="pt-5">{children}</CardContent>
    </Card>
  );
}

function DonutChart({
  data,
  title,
}: {
  data: { name: string; value: number }[];
  title: string;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid items-center gap-5 md:grid-cols-[1fr_180px]">
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={94}
              paddingAngle={4}
              stroke="none"
              cornerRadius={6}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={chartTooltipStyle}
              formatter={(value: number, name: string) => [
                `${value.toLocaleString("en-IN")}`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
            Total
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            {total.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="space-y-2">
          {data.map((item, index) => {
            const percentage = Math.round((item.value / total) * 100);

            return (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor:
                      CHART_COLORS[index % CHART_COLORS.length],
                  }}
                />
                <span className="min-w-0 flex-1 truncate text-xs text-slate-500">
                  {item.name}
                </span>
                <span className="text-xs font-semibold text-slate-800">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [currentDate, setCurrentDate] = useState("");
  const [hello, setHello] = useState("Welcome");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );

    setHello(greeting());
  }, []);

  const open = (route: string, title: string) => {
    toast({
      title,
      description: "Opening section...",
      duration: 1200,
    });

    router.push(route);
  };

  const reportCount = SHORTAGE_REPORTS.length;
  const openReports = SHORTAGE_REPORTS.filter(
    (item) => item.status !== "Resolved",
  ).length;

  const totalAdmissions = useMemo(
    () => ADMISSION_BY_PROGRAM.reduce((sum, item) => sum + item.value, 0),
    [],
  );

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-8">
      {/* Header / welcome */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:px-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(60% 100% at 0% 0%, rgba(124,58,237,.48), transparent 68%), radial-gradient(45% 80% at 100% 100%, rgba(14,165,233,.25), transparent 70%)",
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="size-1.5 rounded-full bg-violet-400" />
              Aarohan Learning
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {hello}, {USER_NAME}
            </h1>

            <p className="mt-2 text-sm text-white/55">
              {currentDate ? `${currentDate} · ` : ""}
              Academic year 2026–27
            </p>
          </div>

          <Button
            onClick={() =>
              router.push("/dashboard/enrollment/enquiry/new")
            }
            className="w-fit rounded-xl bg-white px-4 font-semibold text-slate-950 shadow-lg shadow-black/10 hover:bg-white/90"
          >
            <Plus className="mr-2 size-4" />
            New enquiry
          </Button>
        </div>
      </section>

      {/* Enrollment */}
      <section>
        <SectionHeading
          title="Enrollment"
          description="Current enrollment performance"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {ENROLLMENT_METRICS.map((metric) => (
            <MetricCard
              key={metric.title}
              metric={metric}
              onOpen={open}
            />
          ))}
        </div>
      </section>

      {/* Finance */}
      <section>
        <SectionHeading
          title="Fees & accounts"
          description="Current financial performance"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {FINANCE_METRICS.map((metric) => (
            <MetricCard
              key={metric.title}
              metric={metric}
              onOpen={open}
            />
          ))}
        </div>
      </section>

      {/* Main analytics */}
      <Tabs defaultValue="overview" className="space-y-5">
        <TabsList className="h-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          <TabsTrigger
            value="overview"
            className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-slate-950 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-slate-950 data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-slate-950 data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="fee-structure"
            className="rounded-lg px-4 py-2 text-xs data-[state=active]:bg-slate-950 data-[state=active]:text-white"
          >
            Fee structure
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent
          value="overview"
          className="space-y-5 outline-none"
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <ChartCard
              title="Enquiries by program"
              description="Distribution of current enquiries"
            >
              <DonutChart
                data={ENQUIRY_BY_PROGRAM}
                title="Enquiries"
              />
            </ChartCard>

            <ChartCard
              title="Admissions by program"
              description="Confirmed admissions across programs"
            >
              <DonutChart
                data={ADMISSION_BY_PROGRAM}
                title="Admissions"
              />
            </ChartCard>
          </div>

          <ChartCard
            title="Enrollment performance"
            description="Monthly movement across all programs"
            action={
              <Badge
                variant="secondary"
                className="rounded-full bg-emerald-50 text-emerald-700"
              >
                <TrendingUp className="mr-1 size-3" />
                Positive trend
              </Badge>
            }
          >
            <div className="h-[330px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={ENROLLMENT_TRENDS}
                  margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="playGroupGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#7c3aed"
                        stopOpacity={0.22}
                      />
                      <stop
                        offset="100%"
                        stopColor="#7c3aed"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    vertical={false}
                    stroke="#eef2f7"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />

                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    cursor={{ stroke: "#cbd5e1" }}
                  />

                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: 11,
                      paddingBottom: 20,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="playGroup"
                    name="Play Group"
                    stroke="#7c3aed"
                    strokeWidth={2.5}
                    fill="url(#playGroupGradient)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />

                  <Area
                    type="monotone"
                    dataKey="nursery"
                    name="Nursery"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="transparent"
                    dot={false}
                  />

                  <Area
                    type="monotone"
                    dataKey="junior"
                    name="Junior"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    fill="transparent"
                    dot={false}
                  />

                  <Area
                    type="monotone"
                    dataKey="senior"
                    name="Senior"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="transparent"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </TabsContent>

        {/* Analytics */}
        <TabsContent
          value="analytics"
          className="space-y-5 outline-none"
        >
          <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
            <ChartCard
              title="Enrollment trends"
              description="Monthly admissions by program"
              action={
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() =>
                    toast({
                      title: "Report ready",
                      description:
                        "Enrollment report generation is ready to connect to your reporting service.",
                    })
                  }
                >
                  <FileChartColumn className="mr-2 size-4" />
                  Report
                </Button>
              }
            >
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ENROLLMENT_TRENDS}
                    barGap={5}
                    margin={{
                      top: 8,
                      right: 8,
                      left: -20,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke="#eef2f7"
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                    />

                    <Tooltip
                      contentStyle={chartTooltipStyle}
                      cursor={{ fill: "#f8fafc" }}
                    />

                    <Legend
                      iconType="circle"
                      wrapperStyle={{ fontSize: 11 }}
                    />

                    <Bar
                      dataKey="playGroup"
                      name="Play Group"
                      fill="#7c3aed"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="nursery"
                      name="Nursery"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="junior"
                      name="Junior"
                      fill="#0ea5e9"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="senior"
                      name="Senior"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard
              title="Admissions snapshot"
              description="Current program mix"
            >
              <div className="flex h-[350px] items-center justify-center">
                <DonutChart
                  data={ADMISSION_BY_PROGRAM}
                  title="Admissions"
                />
              </div>
            </ChartCard>
          </div>

          <ChartCard
            title="Fee collection"
            description="Collected and receivable amounts, ₹ lakh"
          >
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={FEE_TREND}
                  margin={{ top: 10, right: 8, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="#eef2f7"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(value) => `₹${value}L`}
                  />

                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    formatter={(value: number, name: string) => [
                      `₹${value}L`,
                      name === "collected"
                        ? "Collected"
                        : "Receivable",
                    ]}
                  />

                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: 11 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="collected"
                    name="Collected"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="receivable"
                    name="Receivable"
                    stroke="#0ea5e9"
                    strokeWidth={2.5}
                    strokeDasharray="6 5"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Collection movement"
            description="Monthly fee collection"
          >
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={FEE_COLLECTION}
                  margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="collectionGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#7c3aed"
                        stopOpacity={0.28}
                      />
                      <stop
                        offset="100%"
                        stopColor="#7c3aed"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    vertical={false}
                    stroke="#eef2f7"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(value) => `₹${value}L`}
                  />

                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    formatter={(value: number) => [
                      `₹${value}L`,
                      "Collected",
                    ]}
                  />

                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    fill="url(#collectionGradient)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="outline-none">
          <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
            <CardHeader className="flex flex-col gap-4 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-sm">
                  Shortage & damage reports
                </CardTitle>
                <CardDescription className="mt-1">
                  {reportCount} recent reports · {openReports} requiring attention
                </CardDescription>
              </div>

              <Button
                size="sm"
                className="rounded-lg"
                onClick={() =>
                  router.push("/dashboard/shortage/report")
                }
              >
                View all
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs text-slate-500">
                      <th className="px-5 py-3 font-medium">Number</th>
                      <th className="px-4 py-3 font-medium">Report date</th>
                      <th className="px-4 py-3 font-medium">Quantity</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Remarks</th>
                      <th className="px-4 py-3 font-medium">As on</th>
                    </tr>
                  </thead>

                  <tbody>
                    {SHORTAGE_REPORTS.map((report) => (
                      <tr
                        key={report.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4 font-semibold text-slate-900">
                          {report.id}
                        </td>
                        <td className="px-4 py-4 text-slate-500">
                          {report.reportDate}
                        </td>
                        <td className="px-4 py-4 font-medium text-slate-800">
                          {report.quantity}
                        </td>
                        <td className="px-4 py-4">
                          <Badge
                            variant="outline"
                            className={`rounded-full ${STATUS_STYLES[report.status]}`}
                          >
                            {report.status}
                          </Badge>
                        </td>
                        <td className="max-w-[260px] px-4 py-4 text-slate-500">
                          {report.remarks}
                        </td>
                        <td className="px-4 py-4 text-slate-500">
                          {report.asOn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fee structure */}
        <TabsContent value="fee-structure" className="outline-none">
          <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
            <CardHeader className="flex flex-col gap-4 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-sm">
                  Fee rate card
                </CardTitle>
                <CardDescription className="mt-1">
                  Current approved rates
                </CardDescription>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="rounded-lg"
                onClick={() =>
                  open("/dashboard/fee/structure", "Fee structure")
                }
              >
                Manage
              </Button>
            </CardHeader>

            <CardContent className="grid gap-5 p-5 lg:grid-cols-2">
              {(
                Object.keys(FEE_STRUCTURE) as Array<
                  keyof typeof FEE_STRUCTURE
                >
              ).map((program) => {
                const rows = FEE_STRUCTURE[program];
                const total = rows.reduce(
                  (sum, row) => sum + row.rate,
                  0,
                );

                return (
                  <div
                    key={program}
                    className="overflow-hidden rounded-2xl border border-slate-200"
                  >
                    <div className="flex items-center justify-between border-b bg-slate-50/80 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-violet-500" />
                        <span className="text-sm font-semibold text-slate-900">
                          {program}
                        </span>
                      </div>

                      <span className="text-xs text-slate-500">
                        {rows.length} components
                      </span>
                    </div>

                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-xs text-slate-400">
                          <th className="px-4 py-3 text-left font-medium">
                            Fee
                          </th>
                          <th className="px-4 py-3 text-right font-medium">
                            Rate
                          </th>
                          <th className="px-4 py-3 text-right font-medium">
                            Royalty
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {rows.map((row) => (
                          <tr
                            key={row.description}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <td className="px-4 py-3 text-slate-600">
                              {row.description}
                            </td>
                            <td className="px-4 py-3 text-right font-medium text-slate-900">
                              {inr(row.rate)}
                            </td>
                            <td className="px-4 py-3 text-right text-slate-500">
                              {row.royalty}
                            </td>
                          </tr>
                        ))}

                        <tr className="bg-violet-50/60">
                          <td className="px-4 py-3 font-semibold text-violet-700">
                            Total fee
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-violet-700">
                            {inr(total)}
                          </td>
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom quick summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Total admissions</p>
            <p className="text-lg font-semibold text-slate-950">
              {totalAdmissions}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <Wallet className="size-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Monthly collection</p>
            <p className="text-lg font-semibold text-slate-950">
              ₹18.20L
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <PackageSearch className="size-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Open reports</p>
            <p className="text-lg font-semibold text-slate-950">
              {openReports}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
