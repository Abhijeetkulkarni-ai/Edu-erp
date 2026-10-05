// This file contains all API service functions for the ERP system

// Mock data for dashboard
export const getDashboardData = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    data: {
      metrics: {
        enquiry: 25230,
        lsqEnquiry: 18456,
        grossAdmission: 12789,
        quit: 345,
        transferIn: 567,
        transferOut: 432,
        fcrDeposited: 10234,
        fcrPending: 2555,
        paymentDue: 3456,
        receivable: 4567890,
        collection: 3456789,
        creditNote: 234567,
      },
      charts: {
        enquiryData: [
          { name: "Play Group", value: 47, count: 7, fill: "#3b82f6" },
          { name: "Nursery", value: 33, count: 5, fill: "#1e3a8a" },
          { name: "Euro Junior", value: 13, count: 2, fill: "#84cc16" },
          { name: "Euro Senior", value: 7, count: 1, fill: "#b91c1c" },
        ],
        admissionData: [
          { name: "Play Group", value: 60, count: 6, fill: "#3b82f6" },
          { name: "Nursery", value: 30, count: 3, fill: "#1e3a8a" },
          { name: "Euro Junior", value: 10, count: 1, fill: "#84cc16" },
        ],
        enrollmentTrendsData: [
          { month: "Jan", playGroup: 40, nursery: 24, euroJunior: 10, euroSenior: 5 },
          { month: "Feb", playGroup: 42, nursery: 26, euroJunior: 12, euroSenior: 6 },
          { month: "Mar", playGroup: 45, nursery: 28, euroJunior: 13, euroSenior: 7 },
          { month: "Apr", playGroup: 47, nursery: 33, euroJunior: 13, euroSenior: 7 },
          { month: "May", playGroup: 50, nursery: 35, euroJunior: 15, euroSenior: 8 },
          { month: "Jun", playGroup: 52, nursery: 37, euroJunior: 16, euroSenior: 9 },
        ],
        feeCollectionData: [
          { month: "Jan", amount: 120000 },
          { month: "Feb", amount: 140000 },
          { month: "Mar", amount: 160000 },
          { month: "Apr", amount: 180000 },
          { month: "May", amount: 200000 },
          { month: "Jun", amount: 220000 },
        ],
      },
      shortageData: [
        {
          id: "SD001",
          reportDate: "2023-04-10",
          quantity: 5,
          status: "Pending",
          remarks: "Missing textbooks",
          asOn: "2023-04-15",
        },
        {
          id: "SD002",
          reportDate: "2023-04-12",
          quantity: 3,
          status: "Resolved",
          remarks: "Damaged uniforms",
          asOn: "2023-04-18",
        },
      ],
      feeStructure: {
        euroJunior: [
          { description: "Registration Fee", rate: 8800, royaltyPercentage: 0 },
          { description: "Term Fee", rate: 3300, royaltyPercentage: 0 },
          { description: "Tuition Fee", rate: 24800, royaltyPercentage: 0 },
          { description: "Uniforms", rate: 2150, royaltyPercentage: 0 },
        ],
        euroSenior: [
          { description: "Registration Fee", rate: 8900, royaltyPercentage: 0 },
          { description: "Term Fee", rate: 3300, royaltyPercentage: 0 },
          { description: "Tuition Fee", rate: 27400, royaltyPercentage: 0 },
          { description: "Uniforms", rate: 2150, royaltyPercentage: 0 },
        ],
      },
    },
  }
}

// Mock data for enquiries
const enquiryData = [
  {
    id: "ENQ001",
    name: "John Smith",
    phone: "9876543210",
    email: "john@example.com",
    course: "Computer Science",
    date: "2023-04-10",
    status: "New",
    source: "Website",
    notes: "Interested in evening classes",
  },
  {
    id: "ENQ002",
    name: "Sarah Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    course: "Business Administration",
    date: "2023-04-09",
    status: "Contacted",
    source: "Referral",
    notes: "Called and scheduled a campus visit",
  },
  {
    id: "ENQ003",
    name: "Michael Brown",
    phone: "7654321098",
    email: "michael@example.com",
    course: "Electrical Engineering",
    date: "2023-04-08",
    status: "Interested",
    source: "Social Media",
    notes: "Wants more information about scholarships",
  },
  {
    id: "ENQ004",
    name: "Emily Davis",
    phone: "6543210987",
    email: "emily@example.com",
    course: "Psychology",
    date: "2023-04-07",
    status: "Not Interested",
    source: "Education Fair",
    notes: "Looking for a different program",
  },
  {
    id: "ENQ005",
    name: "David Wilson",
    phone: "5432109876",
    email: "david@example.com",
    course: "Mechanical Engineering",
    date: "2023-04-06",
    status: "Enrolled",
    source: "Google Ad",
    notes: "Completed enrollment process",
  },
]

// Enquiry API functions
export const getEnquiries = async () => {
  try {
    const res = await fetch( "https://erp-backend-ed55.onrender.com/api/enquiries", {
      credentials: "include",
    })
    const data = await res.json()
    return { success: true, data: data.data }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Failed to fetch enquiries", err.message)
      return { success: false, error: err.message }
    } else {
      console.error("Failed to fetch enquiries", err)
      return { success: false, error: "An unexpected error occurred" }
    }
  }
}
export const getEnquiryCount = async () => {
  try {
    const res = await fetch( "https://erp-backend-ed55.onrender.com/api/enquiries", {
      credentials: "include",
    })
    const data = await res.json()
    if (Array.isArray(data.data)) {
      return { success: true, count: data.data.length }
    }
    return { success: false, count: 0 }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Failed to fetch enquiry count:", err.message)
      return { success: false, count: 0 }
    }
    return { success: false, count: 0 }
  }
}


export const getEnquiryById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const enquiry = enquiryData.find((e) => e.id === id)
  return enquiry ? { success: true, data: enquiry } : { success: false, error: "Enquiry not found" }
}

export const createEnquiry = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `ENQ${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newEnquiry = {
    id: newId,
    ...data,
    date: new Date().toISOString().split("T")[0],
    status: "New",
  }
  enquiryData.push(newEnquiry)
  return { success: true, data: newEnquiry }
}

export const updateEnquiry = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = enquiryData.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "Enquiry not found" }
  }
  enquiryData[index] = { ...enquiryData[index], ...data }
  return { success: true, data: enquiryData[index] }
}

export const deleteEnquiry = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = enquiryData.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "Enquiry not found" }
  }
  enquiryData.splice(index, 1)
  return { success: true }
}

// LSQ Enquiry API functions
const lsqEnquiryData = [
  {
    id: "LSQ001",
    name: "John Smith",
    phone: "9876543210",
    email: "john@example.com",
    course: "Computer Science",
    source: "Website",
    date: "2023-04-10",
    status: "New",
    notes: "Interested in scholarship options",
  },
  {
    id: "LSQ002",
    name: "Sarah Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    course: "Business Administration",
    source: "Social Media",
    date: "2023-04-09",
    status: "Contacted",
    notes: "Called and discussed course details",
  },
  {
    id: "LSQ003",
    name: "Michael Brown",
    phone: "7654321098",
    email: "michael@example.com",
    course: "Electrical Engineering",
    source: "Referral",
    date: "2023-04-08",
    status: "Interested",
    notes: "Wants to visit campus next week",
  },
  {
    id: "LSQ004",
    name: "Emily Davis",
    phone: "6543210987",
    email: "emily@example.com",
    course: "Psychology",
    source: "Google",
    date: "2023-04-07",
    status: "Not Interested",
    notes: "Looking for a different program",
  },
  {
    id: "LSQ005",
    name: "David Wilson",
    phone: "5432109876",
    email: "david@example.com",
    course: "Mechanical Engineering",
    source: "Exhibition",
    date: "2023-04-06",
    status: "Converted",
    notes: "Completed admission process",
  },
]

export const getLSQEnquiries = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: lsqEnquiryData }
}

export const getLSQEnquiryById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const enquiry = lsqEnquiryData.find((e) => e.id === id)
  return enquiry ? { success: true, data: enquiry } : { success: false, error: "LSQ Enquiry not found" }
}

export const createLSQEnquiry = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `LSQ${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newEnquiry = {
    id: newId,
    ...data,
    date: new Date().toISOString().split("T")[0],
    status: "New",
  }
  lsqEnquiryData.push(newEnquiry)
  return { success: true, data: newEnquiry }
}

export const updateLSQEnquiry = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = lsqEnquiryData.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "LSQ Enquiry not found" }
  }
  lsqEnquiryData[index] = { ...lsqEnquiryData[index], ...data }
  return { success: true, data: lsqEnquiryData[index] }
}

export const deleteLSQEnquiry = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = lsqEnquiryData.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "LSQ Enquiry not found" }
  }
  lsqEnquiryData.splice(index, 1)
  return { success: true }
}

// Admission API functions
const admissionData = [
  {
    id: "ADM001",
    studentId: "STU1001",
    name: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    admissionDate: "2023-04-10",
    status: "Active",
    fee: 75000,
    feeStatus: "Paid",
    enquiryId: "ENQ001",
  },
  {
    id: "ADM002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    admissionDate: "2023-04-09",
    status: "Active",
    fee: 65000,
    feeStatus: "Partial",
    enquiryId: "ENQ002",
  },
  {
    id: "ADM003",
    studentId: "STU1003",
    name: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-08",
    status: "Pending",
    fee: 80000,
    feeStatus: "Pending",
    enquiryId: "ENQ003",
  },
  {
    id: "ADM004",
    studentId: "STU1004",
    name: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    admissionDate: "2023-04-07",
    status: "Active",
    fee: 60000,
    feeStatus: "Paid",
    enquiryId: "ENQ004",
  },
  {
    id: "ADM005",
    studentId: "STU1005",
    name: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-06",
    status: "Cancelled",
    fee: 80000,
    feeStatus: "Refunded",
    enquiryId: "ENQ005",
  },
]

export const getAdmissions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: admissionData }
}

export const getAdmissionById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const admission = admissionData.find((a) => a.id === id)
  return admission ? { success: true, data: admission } : { success: false, error: "Admission not found" }
}

export const createAdmission = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `ADM${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const studentId = `STU${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`
  const newAdmission = {
    id: newId,
    studentId,
    ...data,
    admissionDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  }
  admissionData.push(newAdmission)
  return { success: true, data: newAdmission }
}

export const updateAdmission = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = admissionData.findIndex((a) => a.id === id)
  if (index === -1) {
    return { success: false, error: "Admission not found" }
  }
  admissionData[index] = { ...admissionData[index], ...data }
  return { success: true, data: admissionData[index] }
}

export const deleteAdmission = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = admissionData.findIndex((a) => a.id === id)
  if (index === -1) {
    return { success: false, error: "Admission not found" }
  }
  admissionData.splice(index, 1)
  return { success: true }
}

// Transfer Stage API functions
const transferData = [
  {
    id: "TRF001",
    studentId: "STU1001",
    name: "John Smith",
    currentSchool: "EuroKids Andheri",
    targetSchool: "EuroKids Bandra",
    requestDate: "2023-04-10",
    status: "Pending",
    reason: "Relocation",
    notes: "Family moving to Bandra area",
  },
  {
    id: "TRF002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    currentSchool: "EuroKids Juhu",
    targetSchool: "EuroKids Powai",
    requestDate: "2023-04-09",
    status: "Approved",
    reason: "Convenience",
    notes: "Parent's workplace changed",
  },
  {
    id: "TRF003",
    studentId: "STU1003",
    name: "Michael Brown",
    currentSchool: "EuroKids Malad",
    targetSchool: "EuroKids Goregaon",
    requestDate: "2023-04-08",
    status: "Rejected",
    reason: "Preference",
    notes: "No seats available in target school",
  },
  {
    id: "TRF004",
    studentId: "STU1004",
    name: "Emily Davis",
    currentSchool: "EuroKids Dadar",
    targetSchool: "EuroKids Worli",
    requestDate: "2023-04-07",
    status: "Completed",
    reason: "Relocation",
    notes: "Transfer completed on April 15",
  },
  {
    id: "TRF005",
    studentId: "STU1005",
    name: "David Wilson",
    currentSchool: "EuroKids Thane",
    targetSchool: "EuroKids Mulund",
    requestDate: "2023-04-06",
    status: "Pending",
    reason: "Convenience",
    notes: "Sibling studying in target school",
  },
]

export const getTransfers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: transferData }
}

export const getTransferById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const transfer = transferData.find((t) => t.id === id)
  return transfer ? { success: true, data: transfer } : { success: false, error: "Transfer request not found" }
}

export const createTransfer = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `TRF${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newTransfer = {
    id: newId,
    ...data,
    requestDate: new Date().toISOString().split("T")[0],
    status: "Pending",
  }
  transferData.push(newTransfer)
  return { success: true, data: newTransfer }
}

export const updateTransfer = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = transferData.findIndex((t) => t.id === id)
  if (index === -1) {
    return { success: false, error: "Transfer request not found" }
  }
  transferData[index] = { ...transferData[index], ...data }
  return { success: true, data: transferData[index] }
}

export const deleteTransfer = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = transferData.findIndex((t) => t.id === id)
  if (index === -1) {
    return { success: false, error: "Transfer request not found" }
  }
  transferData.splice(index, 1)
  return { success: true }
}

// DTP View API functions
const dtpData = [
  {
    id: "DTP001",
    studentId: "STU1001",
    name: "John Smith",
    program: "Play Group",
    dtpDate: "2023-04-15",
    status: "Scheduled",
    teacherId: "TCH001",
    teacherName: "Ms. Priya Sharma",
    notes: "First DTP session",
  },
  {
    id: "DTP002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    program: "Nursery",
    dtpDate: "2023-04-16",
    status: "Completed",
    teacherId: "TCH002",
    teacherName: "Mr. Rajesh Kumar",
    notes: "Good progress in language skills",
  },
  {
    id: "DTP003",
    studentId: "STU1003",
    name: "Michael Brown",
    program: "Euro Junior",
    dtpDate: "2023-04-17",
    status: "Cancelled",
    teacherId: "TCH003",
    teacherName: "Ms. Anita Desai",
    notes: "Student was unwell",
  },
  {
    id: "DTP004",
    studentId: "STU1004",
    name: "Emily Davis",
    program: "Euro Senior",
    dtpDate: "2023-04-18",
    status: "Scheduled",
    teacherId: "TCH001",
    teacherName: "Ms. Priya Sharma",
    notes: "Follow-up session",
  },
  {
    id: "DTP005",
    studentId: "STU1005",
    name: "David Wilson",
    program: "Play Group",
    dtpDate: "2023-04-19",
    status: "Pending",
    teacherId: "TCH002",
    teacherName: "Mr. Rajesh Kumar",
    notes: "Initial assessment",
  },
]

export const getDTPSessions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: dtpData }
}

export const getDTPSessionById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const session = dtpData.find((d) => d.id === id)
  return session ? { success: true, data: session } : { success: false, error: "DTP session not found" }
}

export const createDTPSession = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `DTP${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newSession = {
    id: newId,
    ...data,
    status: "Scheduled",
  }
  dtpData.push(newSession)
  return { success: true, data: newSession }
}

export const updateDTPSession = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = dtpData.findIndex((d) => d.id === id)
  if (index === -1) {
    return { success: false, error: "DTP session not found" }
  }
  dtpData[index] = { ...dtpData[index], ...data }
  return { success: true, data: dtpData[index] }
}

export const deleteDTPSession = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = dtpData.findIndex((d) => d.id === id)
  if (index === -1) {
    return { success: false, error: "DTP session not found" }
  }
  dtpData.splice(index, 1)
  return { success: true }
}

// Payment Details API functions
const onlinePayments = [
  {
    id: "ONL001",
    studentId: "STU1001",
    name: "John Smith",
    amount: 15000,
    date: "2023-04-10",
    status: "Completed",
    transactionId: "TXN78945612",
  },
  {
    id: "ONL002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    amount: 12500,
    date: "2023-04-09",
    status: "Completed",
    transactionId: "TXN78945613",
  },
  {
    id: "ONL003",
    studentId: "STU1003",
    name: "Michael Brown",
    amount: 18000,
    date: "2023-04-08",
    status: "Pending",
    transactionId: "TXN78945614",
  },
  {
    id: "ONL004",
    studentId: "STU1004",
    name: "Emily Davis",
    amount: 9500,
    date: "2023-04-07",
    status: "Failed",
    transactionId: "TXN78945615",
  },
  {
    id: "ONL005",
    studentId: "STU1005",
    name: "David Wilson",
    amount: 21000,
    date: "2023-04-06",
    status: "Completed",
    transactionId: "TXN78945616",
  },
]

const cashPayments = [
  {
    id: "CSH001",
    studentId: "STU1006",
    name: "Jennifer Lee",
    amount: 10000,
    date: "2023-04-10",
    receiptNo: "RCP78945612",
  },
  {
    id: "CSH002",
    studentId: "STU1007",
    name: "Robert Taylor",
    amount: 8500,
    date: "2023-04-09",
    receiptNo: "RCP78945613",
  },
  {
    id: "CSH003",
    studentId: "STU1008",
    name: "Jessica Clark",
    amount: 15000,
    date: "2023-04-08",
    receiptNo: "RCP78945614",
  },
  {
    id: "CSH004",
    studentId: "STU1009",
    name: "William Moore",
    amount: 12000,
    date: "2023-04-07",
    receiptNo: "RCP78945615",
  },
  {
    id: "CSH005",
    studentId: "STU1010",
    name: "Elizabeth White",
    amount: 9000,
    date: "2023-04-06",
    receiptNo: "RCP78945616",
  },
]

const chequePayments = [
  {
    id: "CHQ001",
    studentId: "STU1011",
    name: "Thomas Anderson",
    amount: 18000,
    date: "2023-04-10",
    chequeNo: "123456",
    bankName: "HDFC Bank",
    status: "Cleared",
  },
  {
    id: "CHQ002",
    studentId: "STU1012",
    name: "Patricia Martin",
    amount: 14500,
    date: "2023-04-09",
    chequeNo: "123457",
    bankName: "ICICI Bank",
    status: "Pending",
  },
  {
    id: "CHQ003",
    studentId: "STU1013",
    name: "Charles Harris",
    amount: 22000,
    date: "2023-04-08",
    chequeNo: "123458",
    bankName: "SBI",
    status: "Cleared",
  },
  {
    id: "CHQ004",
    studentId: "STU1014",
    name: "Linda Robinson",
    amount: 16500,
    date: "2023-04-07",
    chequeNo: "123459",
    bankName: "Axis Bank",
    status: "Bounced",
  },
  {
    id: "CHQ005",
    studentId: "STU1015",
    name: "Richard Lewis",
    amount: 19000,
    date: "2023-04-06",
    chequeNo: "123460",
    bankName: "Kotak Bank",
    status: "Cleared",
  },
]

export const getOnlinePayments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: onlinePayments }
}

export const getCashPayments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: cashPayments }
}

export const getChequePayments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: chequePayments }
}

export const getAllPayments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    success: true,
    data: {
      online: onlinePayments,
      cash: cashPayments,
      cheque: chequePayments,
    },
  }
}

export const createPayment = async (type: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  let newId
  let newPayment

  if (type === "online") {
    newId = `ONL${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, "0")}`
    newPayment = {
      id: newId,
      ...data,
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
    }
    onlinePayments.push(newPayment)
  } else if (type === "cash") {
    newId = `CSH${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, "0")}`
    const receiptNo = `RCP${Math.floor(Math.random() * 100000000)}`
    newPayment = {
      id: newId,
      ...data,
      date: new Date().toISOString().split("T")[0],
      receiptNo,
    }
    cashPayments.push(newPayment)
  } else if (type === "cheque") {
    newId = `CHQ${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, "0")}`
    newPayment = {
      id: newId,
      ...data,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    }
    chequePayments.push(newPayment)
  } else {
    return { success: false, error: "Invalid payment type" }
  }

  return { success: true, data: newPayment }
}

// Staff Attendance API functions
const staffAttendanceData = [
  {
    id: "ATT001",
    staffId: "STF001",
    name: "Priya Sharma",
    designation: "Teacher",
    date: "2023-04-10",
    status: "Present",
    checkIn: "08:45",
    checkOut: "16:30",
    remarks: "",
  },
  {
    id: "ATT002",
    staffId: "STF002",
    name: "Rajesh Kumar",
    designation: "Teacher",
    date: "2023-04-10",
    status: "Present",
    checkIn: "08:30",
    checkOut: "16:45",
    remarks: "",
  },
  {
    id: "ATT003",
    staffId: "STF003",
    name: "Anita Desai",
    designation: "Teacher",
    date: "2023-04-10",
    status: "Absent",
    checkIn: "",
    checkOut: "",
    remarks: "Sick leave",
  },
  {
    id: "ATT004",
    staffId: "STF004",
    name: "Suresh Patel",
    designation: "Admin",
    date: "2023-04-10",
    status: "Present",
    checkIn: "09:00",
    checkOut: "17:00",
    remarks: "",
  },
  {
    id: "ATT005",
    staffId: "STF005",
    name: "Meera Joshi",
    designation: "Helper",
    date: "2023-04-10",
    status: "Late",
    checkIn: "10:15",
    checkOut: "17:30",
    remarks: "Traffic issue",
  },
]

export const getStaffAttendance = async (date?: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  if (date) {
    const filteredData = staffAttendanceData.filter((a) => a.date === date)
    return { success: true, data: filteredData }
  }
  return { success: true, data: staffAttendanceData }
}

export const updateStaffAttendance = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = staffAttendanceData.findIndex((a) => a.id === id)
  if (index === -1) {
    return { success: false, error: "Attendance record not found" }
  }
  staffAttendanceData[index] = { ...staffAttendanceData[index], ...data }
  return { success: true, data: staffAttendanceData[index] }
}

// Staff Details API functions
const staffDetailsData = [
  {
    id: "STF001",
    name: "Priya Sharma",
    designation: "Teacher",
    department: "Academic",
    joiningDate: "2020-06-15",
    email: "priya.sharma@example.com",
    phone: "9876543210",
    address: "123, ABC Colony, Mumbai",
    qualification: "B.Ed, M.A. in Education",
    experience: "5 years",
    status: "Active",
  },
  {
    id: "STF002",
    name: "Rajesh Kumar",
    designation: "Teacher",
    department: "Academic",
    joiningDate: "2019-08-10",
    email: "rajesh.kumar@example.com",
    phone: "8765432109",
    address: "456, XYZ Society, Mumbai",
    qualification: "B.Ed, M.Sc. in Mathematics",
    experience: "7 years",
    status: "Active",
  },
  {
    id: "STF003",
    name: "Anita Desai",
    designation: "Teacher",
    department: "Academic",
    joiningDate: "2021-02-20",
    email: "anita.desai@example.com",
    phone: "7654321098",
    address: "789, PQR Apartments, Mumbai",
    qualification: "B.Ed, B.A. in English",
    experience: "3 years",
    status: "Active",
  },
  {
    id: "STF004",
    name: "Suresh Patel",
    designation: "Admin",
    department: "Administration",
    joiningDate: "2018-11-05",
    email: "suresh.patel@example.com",
    phone: "6543210987",
    address: "101, LMN Heights, Mumbai",
    qualification: "MBA in HR",
    experience: "8 years",
    status: "Active",
  },
  {
    id: "STF005",
    name: "Meera Joshi",
    designation: "Helper",
    department: "Support",
    joiningDate: "2022-01-10",
    email: "meera.joshi@example.com",
    phone: "5432109876",
    address: "202, DEF Road, Mumbai",
    qualification: "High School",
    experience: "2 years",
    status: "Active",
  },
]

export const getStaffDetails = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: staffDetailsData }
}

export const getStaffById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const staff = staffDetailsData.find((s) => s.id === id)
  return staff ? { success: true, data: staff } : { success: false, error: "Staff not found" }
}

export const createStaff = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `STF${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newStaff = {
    id: newId,
    ...data,
    status: "Active",
  }
  staffDetailsData.push(newStaff)
  return { success: true, data: newStaff }
}

export const updateStaff = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = staffDetailsData.findIndex((s) => s.id === id)
  if (index === -1) {
    return { success: false, error: "Staff not found" }
  }
  staffDetailsData[index] = { ...staffDetailsData[index], ...data }
  return { success: true, data: staffDetailsData[index] }
}

export const deleteStaff = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = staffDetailsData.findIndex((s) => s.id === id)
  if (index === -1) {
    return { success: false, error: "Staff not found" }
  }
  staffDetailsData.splice(index, 1)
  return { success: true }
}

// Teaching Subject API functions
const teachingSubjectData = [
  {
    id: "SUB001",
    staffId: "STF001",
    staffName: "Priya Sharma",
    subject: "English",
    grade: "Nursery",
    section: "A",
    schedule: "Monday, Wednesday, Friday",
    timings: "09:00 - 10:00",
    status: "Active",
  },
  {
    id: "SUB002",
    staffId: "STF001",
    staffName: "Priya Sharma",
    subject: "EVS",
    grade: "Nursery",
    section: "B",
    schedule: "Tuesday, Thursday",
    timings: "10:00 - 11:00",
    status: "Active",
  },
  {
    id: "SUB003",
    staffId: "STF002",
    staffName: "Rajesh Kumar",
    subject: "Mathematics",
    grade: "Euro Junior",
    section: "A",
    schedule: "Monday, Wednesday, Friday",
    timings: "11:00 - 12:00",
    status: "Active",
  },
  {
    id: "SUB004",
    staffId: "STF002",
    staffName: "Rajesh Kumar",
    subject: "Science",
    grade: "Euro Junior",
    section: "B",
    schedule: "Tuesday, Thursday",
    timings: "09:00 - 10:00",
    status: "Active",
  },
  {
    id: "SUB005",
    staffId: "STF003",
    staffName: "Anita Desai",
    subject: "Art & Craft",
    grade: "Play Group",
    section: "A",
    schedule: "Monday, Wednesday",
    timings: "10:00 - 11:00",
    status: "Active",
  },
]

export const getTeachingSubjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: teachingSubjectData }
}

export const getTeachingSubjectsByStaffId = async (staffId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const subjects = teachingSubjectData.filter((s) => s.staffId === staffId)
  return { success: true, data: subjects }
}

export const createTeachingSubject = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `SUB${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newSubject = {
    id: newId,
    ...data,
    status: "Active",
  }
  teachingSubjectData.push(newSubject)
  return { success: true, data: newSubject }
}

export const updateTeachingSubject = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = teachingSubjectData.findIndex((s) => s.id === id)
  if (index === -1) {
    return { success: false, error: "Teaching subject not found" }
  }
  teachingSubjectData[index] = { ...teachingSubjectData[index], ...data }
  return { success: true, data: teachingSubjectData[index] }
}

export const deleteTeachingSubject = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = teachingSubjectData.findIndex((s) => s.id === id)
  if (index === -1) {
    return { success: false, error: "Teaching subject not found" }
  }
  teachingSubjectData.splice(index, 1)
  return { success: true }
}

// Admission Details Report API functions
export const getAdmissionDetailsReport = async (filters?: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  let filteredData = [...admissionData]

  if (filters) {
    if (filters.status) {
      filteredData = filteredData.filter((a) => a.status === filters.status)
    }
    if (filters.dateFrom && filters.dateTo) {
      filteredData = filteredData.filter(
        (a) =>
          new Date(a.admissionDate) >= new Date(filters.dateFrom) &&
          new Date(a.admissionDate) <= new Date(filters.dateTo),
      )
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filteredData = filteredData.filter(
        (a) =>
          a.name.toLowerCase().includes(term) ||
          a.studentId.toLowerCase().includes(term) ||
          a.id.toLowerCase().includes(term) ||
          a.course.toLowerCase().includes(term),
      )
    }
  }

  return { success: true, data: filteredData }
}

// Fee Card Details Report API functions
const feeCardData = [
  {
    id: "FCD001",
    studentId: "STU1001",
    name: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    totalFee: 75000,
    paidAmount: 75000,
    dueAmount: 0,
    lastPaymentDate: "2023-03-15",
    status: "Paid",
  },
  {
    id: "FCD002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    totalFee: 65000,
    paidAmount: 40000,
    dueAmount: 25000,
    lastPaymentDate: "2023-02-20",
    status: "Partial",
  },
  {
    id: "FCD003",
    studentId: "STU1003",
    name: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    totalFee: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    lastPaymentDate: "",
    status: "Pending",
  },
  {
    id: "FCD004",
    studentId: "STU1004",
    name: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    totalFee: 60000,
    paidAmount: 60000,
    dueAmount: 0,
    lastPaymentDate: "2023-01-10",
    status: "Paid",
  },
  {
    id: "FCD005",
    studentId: "STU1005",
    name: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    totalFee: 80000,
    paidAmount: 80000,
    dueAmount: 0,
    lastPaymentDate: "2023-03-05",
    status: "Paid",
  },
]

export const getFeeCardDetails = async (filters?: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  let filteredData = [...feeCardData]

  if (filters) {
    if (filters.status) {
      filteredData = filteredData.filter((f) => f.status === filters.status)
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filteredData = filteredData.filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.studentId.toLowerCase().includes(term) ||
          f.id.toLowerCase().includes(term) ||
          f.course.toLowerCase().includes(term),
      )
    }
  }

  return { success: true, data: filteredData }
}

// Exchange Order API functions
const exchangeOrderData = [
  {
    id: "EXO001",
    orderDate: "2023-04-10",
    studentId: "STU1001",
    studentName: "John Smith",
    itemName: "School Uniform",
    oldSize: "M",
    newSize: "L",
    reason: "Size too small",
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
  },
  {
    id: "EXO002",
    orderDate: "2023-04-09",
    studentId: "STU1002",
    studentName: "Sarah Johnson",
    itemName: "School Bag",
    oldSize: "Standard",
    newSize: "Large",
    reason: "Defective zipper",
    status: "Approved",
    approvedBy: "Admin",
    approvalDate: "2023-04-11",
  },
  {
    id: "EXO003",
    orderDate: "2023-04-08",
    studentId: "STU1003",
    name: "Michael Brown",
    itemName: "School Shoes",
    oldSize: "6",
    newSize: "7",
    reason: "Size too small",
    status: "Completed",
    approvedBy: "Admin",
    approvalDate: "2023-04-10",
  },
  {
    id: "EXO004",
    orderDate: "2023-04-07",
    studentId: "STU1004",
    name: "Emily Davis",
    itemName: "School Uniform",
    oldSize: "S",
    newSize: "M",
    reason: "Size too small",
    status: "Rejected",
    approvedBy: "Admin",
    approvalDate: "2023-04-09",
  },
  {
    id: "EXO005",
    orderDate: "2023-04-06",
    studentId: "STU1005",
    name: "David Wilson",
    itemName: "School Belt",
    oldSize: "M",
    newSize: "L",
    reason: "Size too small",
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
  },
]

export const getExchangeOrders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: exchangeOrderData }
}

export const getExchangeOrderById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const order = exchangeOrderData.find((o) => o.id === id)
  return order ? { success: true, data: order } : { success: false, error: "Exchange order not found" }
}

export const createExchangeOrder = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `EXO${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newOrder = {
    id: newId,
    ...data,
    orderDate: new Date().toISOString().split("T")[0],
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
  }
  exchangeOrderData.push(newOrder)
  return { success: true, data: newOrder }
}

export const updateExchangeOrder = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = exchangeOrderData.findIndex((o) => o.id === id)
  if (index === -1) {
    return { success: false, error: "Exchange order not found" }
  }
  exchangeOrderData[index] = { ...exchangeOrderData[index], ...data }
  return { success: true, data: exchangeOrderData[index] }
}

export const deleteExchangeOrder = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = exchangeOrderData.findIndex((o) => o.id === id)
  if (index === -1) {
    return { success: false, error: "Exchange order not found" }
  }
  exchangeOrderData.splice(index, 1)
  return { success: true }
}

// Purchase Order API functions
const purchaseOrderData = [
  {
    id: "PO001",
    orderDate: "2023-04-10",
    vendorName: "ABC Supplies",
    vendorContact: "9876543210",
    items: [
      { name: "School Uniform", quantity: 50, unitPrice: 500, totalPrice: 25000 },
      { name: "School Bag", quantity: 30, unitPrice: 800, totalPrice: 24000 },
    ],
    totalAmount: 49000,
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
    deliveryDate: "2023-04-20",
  },
  {
    id: "PO002",
    orderDate: "2023-04-09",
    vendorName: "XYZ Stationers",
    vendorContact: "8765432109",
    items: [
      { name: "Notebooks", quantity: 100, unitPrice: 50, totalPrice: 5000 },
      { name: "Pencils", quantity: 200, unitPrice: 10, totalPrice: 2000 },
      { name: "Erasers", quantity: 100, unitPrice: 5, totalPrice: 500 },
    ],
    totalAmount: 7500,
    status: "Approved",
    approvedBy: "Admin",
    approvalDate: "2023-04-11",
    deliveryDate: "2023-04-15",
  },
  {
    id: "PO003",
    orderDate: "2023-04-08",
    vendorName: "PQR Books",
    vendorContact: "7654321098",
    items: [
      { name: "Textbooks", quantity: 50, unitPrice: 300, totalPrice: 15000 },
      { name: "Workbooks", quantity: 50, unitPrice: 150, totalPrice: 7500 },
    ],
    totalAmount: 22500,
    status: "Delivered",
    approvedBy: "Admin",
    approvalDate: "2023-04-10",
    deliveryDate: "2023-04-12",
  },
  {
    id: "PO004",
    orderDate: "2023-04-07",
    vendorName: "LMN Sports",
    vendorContact: "6543210987",
    items: [
      { name: "Sports Equipment", quantity: 10, unitPrice: 1000, totalPrice: 10000 },
      { name: "Sports Uniform", quantity: 20, unitPrice: 600, totalPrice: 12000 },
    ],
    totalAmount: 22000,
    status: "Cancelled",
    approvedBy: "Admin",
    approvalDate: "2023-04-09",
    deliveryDate: "",
  },
  {
    id: "PO005",
    orderDate: "2023-04-06",
    vendorName: "DEF Electronics",
    vendorContact: "5432109876",
    items: [
      { name: "Projector", quantity: 2, unitPrice: 25000, totalPrice: 50000 },
      { name: "Speakers", quantity: 5, unitPrice: 2000, totalPrice: 10000 },
    ],
    totalAmount: 60000,
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
    deliveryDate: "2023-04-25",
  },
]

export const getPurchaseOrders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: purchaseOrderData }
}

export const getPurchaseOrderById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const order = purchaseOrderData.find((o) => o.id === id)
  return order ? { success: true, data: order } : { success: false, error: "Purchase order not found" }
}

export const createPurchaseOrder = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `PO${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newOrder = {
    id: newId,
    ...data,
    orderDate: new Date().toISOString().split("T")[0],
    status: "Pending",
    approvedBy: "",
    approvalDate: "",
  }
  purchaseOrderData.push(newOrder)
  return { success: true, data: newOrder }
}

export const updatePurchaseOrder = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = purchaseOrderData.findIndex((o) => o.id === id)
  if (index === -1) {
    return { success: false, error: "Purchase order not found" }
  }
  purchaseOrderData[index] = { ...purchaseOrderData[index], ...data }
  return { success: true, data: purchaseOrderData[index] }
}

export const deletePurchaseOrder = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = purchaseOrderData.findIndex((o) => o.id === id)
  if (index === -1) {
    return { success: false, error: "Purchase order not found" }
  }
  purchaseOrderData.splice(index, 1)
  return { success: true }
}

// Static Data API functions
const staticDataCategories = [
  {
    id: "CAT001",
    name: "Academic Year",
    items: [
      { id: "AY001", name: "2022-23", isActive: false },
      { id: "AY002", name: "2023-24", isActive: true },
      { id: "AY003", name: "2024-25", isActive: false },
    ],
  },
  {
    id: "CAT002",
    name: "Programs",
    items: [
      { id: "PRG001", name: "Play Group", isActive: true },
      { id: "PRG002", name: "Nursery", isActive: true },
      { id: "PRG003", name: "Euro Junior", isActive: true },
      { id: "PRG004", name: "Euro Senior", isActive: true },
    ],
  },
  {
    id: "CAT003",
    name: "Fee Types",
    items: [
      { id: "FT001", name: "Registration Fee", isActive: true },
      { id: "FT002", name: "Term Fee", isActive: true },
      { id: "FT003", name: "Tuition Fee", isActive: true },
      { id: "FT004", name: "Uniform Fee", isActive: true },
      { id: "FT005", name: "Transportation Fee", isActive: true },
    ],
  },
  {
    id: "CAT004",
    name: "Discount Types",
    items: [
      { id: "DT001", name: "Sibling Discount", isActive: true },
      { id: "DT002", name: "Staff Discount", isActive: true },
      { id: "DT003", name: "Early Bird Discount", isActive: true },
      { id: "DT004", name: "Special Discount", isActive: true },
    ],
  },
  {
    id: "CAT005",
    name: "Enquiry Sources",
    items: [
      { id: "ES001", name: "Website", isActive: true },
      { id: "ES002", name: "Social Media", isActive: true },
      { id: "ES003", name: "Referral", isActive: true },
      { id: "ES004", name: "Google", isActive: true },
      { id: "ES005", name: "Exhibition", isActive: true },
      { id: "ES006", name: "Newspaper", isActive: true },
      { id: "ES007", name: "TV Ad", isActive: true },
      { id: "ES008", name: "Direct Walk-in", isActive: true },
    ],
  },
]

export const getStaticDataCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: staticDataCategories }
}

export const getStaticDataByCategoryId = async (categoryId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const category = staticDataCategories.find((c) => c.id === categoryId)
  return category ? { success: true, data: category } : { success: false, error: "Category not found" }
}

export const createStaticDataCategory = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `CAT${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newCategory = {
    id: newId,
    ...data,
    items: [],
  }
  staticDataCategories.push(newCategory)
  return { success: true, data: newCategory }
}

export const addStaticDataItem = async (categoryId: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const categoryIndex = staticDataCategories.findIndex((c) => c.id === categoryId)
  if (categoryIndex === -1) {
    return { success: false, error: "Category not found" }
  }

  const itemPrefix = categoryId.substring(0, 3)
  const newItemId = `${itemPrefix}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newItem = {
    id: newItemId,
    name: data.name,
    isActive: data.isActive || true,
  }

  staticDataCategories[categoryIndex].items.push(newItem)
  return { success: true, data: newItem }
}

export const updateStaticDataItem = async (categoryId: string, itemId: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const categoryIndex = staticDataCategories.findIndex((c) => c.id === categoryId)
  if (categoryIndex === -1) {
    return { success: false, error: "Category not found" }
  }

  const itemIndex = staticDataCategories[categoryIndex].items.findIndex((i) => i.id === itemId)
  if (itemIndex === -1) {
    return { success: false, error: "Item not found" }
  }

  staticDataCategories[categoryIndex].items[itemIndex] = {
    ...staticDataCategories[categoryIndex].items[itemIndex],
    ...data,
  }
  return { success: true, data: staticDataCategories[categoryIndex].items[itemIndex] }
}

export const deleteStaticDataItem = async (categoryId: string, itemId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const categoryIndex = staticDataCategories.findIndex((c) => c.id === categoryId)
  if (categoryIndex === -1) {
    return { success: false, error: "Category not found" }
  }

  const itemIndex = staticDataCategories[categoryIndex].items.findIndex((i) => i.id === itemId)
  if (itemIndex === -1) {
    return { success: false, error: "Item not found" }
  }

  staticDataCategories[categoryIndex].items.splice(itemIndex, 1)
  return { success: true }
}

// SOA (Statement of Account) API functions
const soaSummaryData = [
  {
    id: "SOA001",
    studentId: "STU1001",
    studentName: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    totalAmount: 75000,
    paidAmount: 75000,
    dueAmount: 0,
    lastPaymentDate: "2023-03-15",
    status: "Paid",
  },
  {
    id: "SOA002",
    studentId: "STU1002",
    studentName: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    totalAmount: 65000,
    paidAmount: 40000,
    dueAmount: 25000,
    lastPaymentDate: "2023-02-20",
    status: "Partial",
  },
  {
    id: "SOA003",
    studentId: "STU1003",
    studentName: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    totalAmount: 80000,
    paidAmount: 0,
    dueAmount: 80000,
    lastPaymentDate: "",
    status: "Pending",
  },
  {
    id: "SOA004",
    studentId: "STU1004",
    studentName: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    totalAmount: 60000,
    paidAmount: 60000,
    dueAmount: 0,
    lastPaymentDate: "2023-01-10",
    status: "Paid",
  },
  {
    id: "SOA005",
    studentId: "STU1005",
    studentName: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    totalAmount: 80000,
    paidAmount: 80000,
    dueAmount: 0,
    lastPaymentDate: "2023-03-05",
    status: "Paid",
  },
]

const soaDetailsData = [
  {
    id: "SOAD001",
    soaId: "SOA001",
    studentId: "STU1001",
    studentName: "John Smith",
    transactions: [
      {
        id: "TRX001",
        date: "2023-01-15",
        description: "Registration Fee",
        amount: 10000,
        type: "Debit",
      },
      {
        id: "TRX002",
        date: "2023-01-15",
        description: "Term Fee",
        amount: 15000,
        type: "Debit",
      },
      {
        id: "TRX003",
        date: "2023-01-15",
        description: "Tuition Fee",
        amount: 50000,
        type: "Debit",
      },
      {
        id: "TRX004",
        date: "2023-01-15",
        description: "Payment - Online",
        amount: 75000,
        type: "Credit",
      },
    ],
  },
  {
    id: "SOAD002",
    soaId: "SOA002",
    studentId: "STU1002",
    studentName: "Sarah Johnson",
    transactions: [
      {
        id: "TRX005",
        date: "2023-01-20",
        description: "Registration Fee",
        amount: 10000,
        type: "Debit",
      },
      {
        id: "TRX006",
        date: "2023-01-20",
        description: "Term Fee",
        amount: 15000,
        type: "Debit",
      },
      {
        id: "TRX007",
        date: "2023-01-20",
        description: "Tuition Fee",
        amount: 40000,
        type: "Debit",
      },
      {
        id: "TRX008",
        date: "2023-02-20",
        description: "Payment - Cheque",
        amount: 40000,
        type: "Credit",
      },
    ],
  },
]

export const getSOASummary = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: soaSummaryData }
}

export const getSOADetails = async (soaId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const details = soaDetailsData.find((d) => d.soaId === soaId)
  return details ? { success: true, data: details } : { success: false, error: "SOA details not found" }
}

// Franchise API functions
const franchiseInvoiceData = [
  {
    id: "INV001",
    franchiseId: "FRN001",
    franchiseName: "EuroKids Andheri",
    invoiceDate: "2023-04-10",
    dueDate: "2023-05-10",
    amount: 50000,
    status: "Paid",
    paymentDate: "2023-04-25",
    paymentMethod: "Online",
    transactionId: "TXN78945612",
  },
  {
    id: "INV002",
    franchiseId: "FRN002",
    franchiseName: "EuroKids Bandra",
    invoiceDate: "2023-04-09",
    dueDate: "2023-05-09",
    amount: 45000,
    status: "Pending",
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
  },
  {
    id: "INV003",
    franchiseId: "FRN003",
    franchiseName: "EuroKids Juhu",
    invoiceDate: "2023-04-08",
    dueDate: "2023-05-08",
    amount: 55000,
    status: "Paid",
    paymentDate: "2023-04-20",
    paymentMethod: "Cheque",
    transactionId: "CHQ123456",
  },
  {
    id: "INV004",
    franchiseId: "FRN004",
    franchiseName: "EuroKids Malad",
    invoiceDate: "2023-04-07",
    dueDate: "2023-05-07",
    amount: 40000,
    status: "Overdue",
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
  },
  {
    id: "INV005",
    franchiseId: "FRN005",
    franchiseName: "EuroKids Dadar",
    invoiceDate: "2023-04-06",
    dueDate: "2023-05-06",
    amount: 60000,
    status: "Paid",
    paymentDate: "2023-04-15",
    paymentMethod: "Online",
    transactionId: "TXN78945613",
  },
]

const franchiseHolderData = [
  {
    id: "FRN001",
    name: "Andheri Franchise",
    ownerName: "Rajesh Mehta",
    contactNumber: "9876543210",
    email: "rajesh.mehta@example.com",
    address: "123, ABC Colony, Andheri East, Mumbai",
    startDate: "2020-06-15",
    status: "Active",
    franchiseType: "Premium",
  },
  {
    id: "FRN002",
    name: "Bandra Franchise",
    ownerName: "Priya Sharma",
    contactNumber: "8765432109",
    email: "priya.sharma@example.com",
    address: "456, XYZ Society, Bandra West, Mumbai",
    startDate: "2019-08-10",
    status: "Active",
    franchiseType: "Standard",
  },
  {
    id: "FRN003",
    name: "Juhu Franchise",
    ownerName: "Amit Patel",
    contactNumber: "7654321098",
    email: "amit.patel@example.com",
    address: "789, PQR Apartments, Juhu, Mumbai",
    startDate: "2021-02-20",
    status: "Active",
    franchiseType: "Premium",
  },
  {
    id: "FRN004",
    name: "Malad Franchise",
    ownerName: "Neha Singh",
    contactNumber: "6543210987",
    email: "neha.singh@example.com",
    address: "101, LMN Heights, Malad West, Mumbai",
    startDate: "2018-11-05",
    status: "Active",
    franchiseType: "Standard",
  },
  {
    id: "FRN005",
    name: "Dadar Franchise",
    ownerName: "Vikram Joshi",
    contactNumber: "5432109876",
    email: "vikram.joshi@example.com",
    address: "202, DEF Road, Dadar, Mumbai",
    startDate: "2022-01-10",
    status: "Active",
    franchiseType: "Premium",
  },
]

export const getFranchiseInvoices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: franchiseInvoiceData }
}

export const getFranchiseHolders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: franchiseHolderData }
}

export const getFranchiseById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const franchise = franchiseHolderData.find((f) => f.id === id)
  return franchise ? { success: true, data: franchise } : { success: false, error: "Franchise not found" }
}

export const createFranchise = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newId = `FRN${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(3, "0")}`
  const newFranchise = {
    id: newId,
    ...data,
    startDate: new Date().toISOString().split("T")[0],
    status: "Active",
  }
  franchiseHolderData.push(newFranchise)
  return { success: true, data: newFranchise }
}

export const updateFranchise = async (id: string, data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = franchiseHolderData.findIndex((f) => f.id === id)
  if (index === -1) {
    return { success: false, error: "Franchise not found" }
  }
  franchiseHolderData[index] = { ...franchiseHolderData[index], ...data }
  return { success: true, data: franchiseHolderData[index] }
}

export const deleteFranchise = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = franchiseHolderData.findIndex((f) => f.id === id)
  if (index === -1) {
    return { success: false, error: "Franchise not found" }
  }
  franchiseHolderData.splice(index, 1)
  return { success: true }
}

// User authentication functions
export const loginUser = async (credentials: { username: string; password: string; institute: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock authentication - in a real app this would validate against a database
  if (credentials.username === "admin" && credentials.password === "password") {
    return {
      success: true,
      data: {
        id: "USR001",
        name: "Vinit Bari",
        role: "ERP Office",
        token: "mock-jwt-token",
      },
    }
  }

  return { success: false, error: "Invalid credentials" }
}

export const registerUser = async (userData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Mock registration - in a real app this would create a user in the database
  return {
    success: true,
    data: {
      id: `USR${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(3, "0")}`,
      name: userData.name,
      email: userData.email,
      role: "User",
      token: "mock-jwt-token",
    },
  }
}

export const getUserProfile = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    data: {
      id: "USR001",
      name: "Vinit Bari",
      email: "vinit.bari@example.com",
      role: "ERP Office",
      institute: "Institute One",
      phone: "9876543210",
      lastLogin: "2023-04-14T10:30:00Z",
    },
  }
}

export const updateUserProfile = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    data: {
      id: "USR001",
      name: data.name || "Vinit Bari",
      email: data.email || "vinit.bari@example.com",
      role: "ERP Office",
      institute: data.institute || "Institute One",
      phone: data.phone || "9876543210",
      lastLogin: "2023-04-14T10:30:00Z",
    },
  }
}

// Staff Assessment API functions
const staffAssessmentData = [
  {
    id: "SA001",
    staffId: "STF001",
    staffName: "Priya Sharma",
    designation: "Teacher",
    department: "Pre-Primary",
    assessmentDate: "2023-04-10",
    assessmentType: "Quarterly",
    overallRating: 4.5,
    strengths: "Excellent communication skills, strong classroom management",
    areasOfImprovement: "Needs to focus on individual student needs",
    actionPlan: "Attend training on personalized learning",
    assessor: "Admin",
    assessorComments: "Overall a very good teacher",
    staffComments: "Will work on the feedback",
    status: "Completed",
    criteria: [
      { name: "Classroom Management", rating: 4, comments: "Good control over the class" },
      { name: "Communication Skills", rating: 5, comments: "Excellent communication with students and parents" },
      { name: "Subject Knowledge", rating: 4, comments: "Strong understanding of the subject" },
      { name: "Student Engagement", rating: 4, comments: "Engages students well in class activities" },
    ],
  },
  {
    id: "SA002",
    staffId: "STF002",
    name: "Rajesh Kumar",
    designation: "Teacher",
    department: "Primary",
    assessmentDate: "2023-04-09",
    assessmentType: "Annual",
    overallRating: 3.8,
    strengths: "Good subject knowledge, punctual",
    areasOfImprovement: "Needs to improve classroom management",
    actionPlan: "Attend training on classroom management techniques",
    assessor: "Admin",
    assessorComments: "Needs to work on engaging students",
    staffComments: "Will attend the training",
    status: "Completed",
    criteria: [
      { name: "Classroom Management", rating: 3, comments: "Needs improvement" },
      { name: "Communication Skills", rating: 4, comments: "Good communication with students" },
      { name: "Subject Knowledge", rating: 4, comments: "Strong understanding of the subject" },
      { name: "Student Engagement", rating: 4, comments: "Engages students well in class activities" },
    ],
  },
]

export const getStaffAssessments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: staffAssessmentData }
}

export const getStaffAssessmentById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const assessment = staffAssessmentData.find((s) => s.id === id)
  return assessment ? { success: true, data: assessment } : { success: false, error: "Assessment not found" }
}

/* ==========================================================================
   CENTRALISED DEMO DATA LAYER
   --------------------------------------------------------------------------
   Realistic, strictly-typed mock data for the ERP demo. Object shapes mirror
   exactly what the pages currently expect from the REST backend (raw JSON
   arrays/objects for fetch, axios `response.data` payloads). Every function
   simulates network latency, consistent with the rest of this service.
   All exports above are preserved unchanged.
   ========================================================================== */

const demoDelay = (ms = 700): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

const demoNotFound = (entity: string): Error => new Error(`${entity} not found`)

const pad = (value: number, length = 3): string => String(value).padStart(length, "0")

const demoSeq = (start: number): (() => number) => {
  let current = start
  return () => ++current
}

const toNumber = (value: string | number | undefined, fallback = 0): number => {
  if (typeof value === "number") return value
  const parsed = Number(value)
  return Number.isNaN(parsed) ? fallback : parsed
}

const DEMO_MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

const formatDemoDisplayDate = (date: Date): string =>
  `${String(date.getDate()).padStart(2, "0")} ${DEMO_MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`

const toISODate = (date: Date): string => date.toISOString().slice(0, 10)

/** Mutate-in-place helper for records keyed by Mongo-style `_id`. */
const demoUpdateInPlace = <T extends { _id: string }>(
  list: T[],
  id: string,
  patch: Partial<Omit<T, "_id">>,
  entity: string,
): T => {
  const index = list.findIndex((item) => item._id === id)
  if (index === -1) throw demoNotFound(entity)
  list[index] = { ...list[index], ...patch, _id: list[index]._id } as T
  return list[index]
}

/** Remove helper for records keyed by Mongo-style `_id`. */
const demoRemove = <T extends { _id: string }>(list: T[], id: string, entity: string): void => {
  const index = list.findIndex((item) => item._id === id)
  if (index === -1) throw demoNotFound(entity)
  list.splice(index, 1)
}

/* ------------------------------ Enquiries ------------------------------ */

export type DemoEnquiryStatus = "New" | "Contacted" | "Interested" | "Enrolled"

export interface DemoEnquiry {
  id: string
  studentName: string
  parentName: string
  email: string
  mobile: string
  program: string
  source: string
  status: DemoEnquiryStatus
  date: string
  followUp: string
  dob?: string
  gender?: string
  locality?: string
  admissionForm?: boolean
  notes?: string
}

export interface DemoEnquiryInput {
  studentName: string
  dob?: string
  gender?: string
  program?: string
  enquirerName?: string
  email?: string
  mobile?: string
  alternateMobile?: string
  locality?: string
  referralSource?: string
  followupDate?: string
  admissionForm?: boolean
  notes?: string
}

const demoEnquiries: DemoEnquiry[] = [
  {
    id: "ENQ-1027",
    studentName: "Sai Krishna Reddy",
    parentName: "Padma Reddy",
    email: "padma.reddy@example.com",
    mobile: "+91 99890 21145",
    program: "Euro Junior",
    source: "Referral",
    status: "New",
    date: "05 Oct 2026",
    followUp: "08 Oct 2026",
    dob: "2021-11-14",
    gender: "Male",
    locality: "Kondapur, Hyderabad",
    admissionForm: false,
    notes: "Sibling studies in Nursery; prefers the morning batch.",
  },
  {
    id: "ENQ-1026",
    studentName: "Anika Bhatt",
    parentName: "Rohan Bhatt",
    email: "rohan.bhatt@example.com",
    mobile: "+91 98330 71245",
    program: "Play Group",
    source: "Walk-in",
    status: "Contacted",
    date: "05 Oct 2026",
    followUp: "09 Oct 2026",
    dob: "2023-02-08",
    gender: "Female",
    locality: "Bandra West, Mumbai",
    admissionForm: false,
    notes: "Visited campus with grandparents; asked about day-care hours.",
  },
  {
    id: "ENQ-1025",
    studentName: "Zoya Sheikh",
    parentName: "Imran Sheikh",
    email: "imran.sheikh@example.com",
    mobile: "+91 90045 33217",
    program: "Nursery",
    source: "Website",
    status: "Interested",
    date: "04 Oct 2026",
    followUp: "10 Oct 2026",
    dob: "2021-06-30",
    gender: "Female",
    locality: "Koramangala, Bengaluru",
    admissionForm: true,
    notes: "Requested the fee structure and transport routes.",
  },
  {
    id: "ENQ-1024",
    studentName: "Aarav Sharma",
    parentName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    mobile: "+91 98765 43210",
    program: "Play Group",
    source: "Website",
    status: "New",
    date: "04 Oct 2026",
    followUp: "05 Oct 2026",
  },
  {
    id: "ENQ-1023",
    studentName: "Anaya Patel",
    parentName: "Neha Patel",
    email: "neha.patel@example.com",
    mobile: "+91 98234 56120",
    program: "Nursery",
    source: "Walk-in",
    status: "Contacted",
    date: "03 Oct 2026",
    followUp: "06 Oct 2026",
  },
  {
    id: "ENQ-1022",
    studentName: "Vihaan Mehta",
    parentName: "Amit Mehta",
    email: "amit.mehta@example.com",
    mobile: "+91 97654 32109",
    program: "Euro Junior",
    source: "Referral",
    status: "Interested",
    date: "02 Oct 2026",
    followUp: "07 Oct 2026",
  },
  {
    id: "ENQ-1021",
    studentName: "Myra Shah",
    parentName: "Priya Shah",
    email: "priya.shah@example.com",
    mobile: "+91 98987 65432",
    program: "Euro Senior",
    source: "Website",
    status: "Enrolled",
    date: "01 Oct 2026",
    followUp: "—",
    notes: "Admission confirmed; see ADM/2026/0147.",
  },
  {
    id: "ENQ-1020",
    studentName: "Reyansh Joshi",
    parentName: "Kunal Joshi",
    email: "kunal.joshi@example.com",
    mobile: "+91 98123 45678",
    program: "Nursery",
    source: "Instagram",
    status: "New",
    date: "30 Sep 2026",
    followUp: "06 Oct 2026",
  },
  {
    id: "ENQ-1019",
    studentName: "Krish Malhotra",
    parentName: "Neha Malhotra",
    email: "neha.malhotra@example.com",
    mobile: "+91 99100 28461",
    program: "Euro Senior",
    source: "Referral",
    status: "Contacted",
    date: "29 Sep 2026",
    followUp: "07 Oct 2026",
  },
  {
    id: "ENQ-1018",
    studentName: "Tara Subramanian",
    parentName: "Vignesh Subramanian",
    email: "vignesh.s@example.com",
    mobile: "+91 98400 76213",
    program: "Play Group",
    source: "Helpline",
    status: "Enrolled",
    date: "28 Sep 2026",
    followUp: "—",
  },
]

const nextEnquirySeq = demoSeq(1027)

/* -------------------- Admissions & admission status -------------------- */

export type DemoFeeStatus = "Paid" | "Partially Paid" | "Unpaid"
export type DemoDocumentStatus = "Complete" | "Pending" | "Incomplete"
export type DemoEnrollmentStatus = "Enrolled" | "Provisional" | "Pending"

export interface DemoAdmission {
  id: string
  admissionId: string
  studentId: string
  name: string
  course: string
  batch: string
  admissionDate: string
  feeStatus: DemoFeeStatus
  documentStatus: DemoDocumentStatus
  enrollmentStatus: DemoEnrollmentStatus
  notes?: string
}

/** Student lookup shape used by fee-deposit search & exchange-order autofill. */
export interface DemoStudent {
  studentId: string
  name: string
  course: string
  batch: string
}

const demoAdmissions: DemoAdmission[] = [
  {
    id: "ADM001",
    admissionId: "ADM/2026/0101",
    studentId: "STU26001",
    name: "Ahaan Kapadia",
    course: "Play Group",
    batch: "2026-27",
    admissionDate: "2026-04-08",
    feeStatus: "Paid",
    documentStatus: "Complete",
    enrollmentStatus: "Enrolled",
    notes: "Route 2 transport opted; sibling studying in Nursery.",
  },
  {
    id: "ADM002",
    admissionId: "ADM/2026/0114",
    studentId: "STU26002",
    name: "Saanvi Kulkarni",
    course: "Nursery",
    batch: "2026-27",
    admissionDate: "2026-04-15",
    feeStatus: "Paid",
    documentStatus: "Complete",
    enrollmentStatus: "Enrolled",
    notes: "Merit aid of 10% applied to tuition.",
  },
  {
    id: "ADM003",
    admissionId: "ADM/2026/0132",
    studentId: "STU26003",
    name: "Ayaan Qureshi",
    course: "Euro Junior",
    batch: "2026-27",
    admissionDate: "2026-05-02",
    feeStatus: "Partially Paid",
    documentStatus: "Complete",
    enrollmentStatus: "Enrolled",
    notes: "Term-2 instalment due 15 Nov 2026.",
  },
  {
    id: "ADM004",
    admissionId: "ADM/2026/0147",
    studentId: "STU26004",
    name: "Myra Shah",
    course: "Euro Senior",
    batch: "2026-27",
    admissionDate: "2026-05-21",
    feeStatus: "Paid",
    documentStatus: "Complete",
    enrollmentStatus: "Enrolled",
    notes: "Admitted via enquiry ENQ-1021; all documents verified.",
  },
  {
    id: "ADM005",
    admissionId: "ADM/2026/0156",
    studentId: "STU26005",
    name: "Vihaan Iyer",
    course: "Play Group",
    batch: "2026-27",
    admissionDate: "2026-06-11",
    feeStatus: "Unpaid",
    documentStatus: "Pending",
    enrollmentStatus: "Provisional",
    notes: "Birth certificate and photographs awaited from parents.",
  },
  {
    id: "ADM006",
    admissionId: "ADM/2026/0163",
    studentId: "STU26006",
    name: "Ananya Pillai",
    course: "Nursery",
    batch: "2026-27",
    admissionDate: "2026-07-03",
    feeStatus: "Partially Paid",
    documentStatus: "Complete",
    enrollmentStatus: "Enrolled",
    notes: "Sibling discount of 5% on tuition.",
  },
  {
    id: "ADM007",
    admissionId: "ADM/2026/0178",
    studentId: "STU26007",
    name: "Devansh Menon",
    course: "Euro Junior",
    batch: "2026-27",
    admissionDate: "2026-08-19",
    feeStatus: "Unpaid",
    documentStatus: "Incomplete",
    enrollmentStatus: "Pending",
    notes: "Transfer certificate from previous school still pending.",
  },
  {
    id: "ADM008",
    admissionId: "ADM/2026/0185",
    studentId: "STU26008",
    name: "Kiara Fernandes",
    course: "Play Group",
    batch: "2026-27",
    admissionDate: "2026-09-07",
    feeStatus: "Partially Paid",
    documentStatus: "Pending",
    enrollmentStatus: "Provisional",
    notes: "3 of 5 documents received; admission fee balance outstanding.",
  },
]

/* ------------- Graduation / name change confirmation ------------------- */

export type DemoNameChangeStatus = "Pending" | "Approved" | "Rejected"

export interface DemoNameChangeRequest {
  _id: string
  studentId: string
  oldName: string
  newName: string
  reason: string
  status: DemoNameChangeStatus
  supportingDocs: string[]
  submittedAt: string
}

export interface DemoNameChangeRequestInput {
  studentId: string
  oldName: string
  newName: string
  reason: string
  supportingDocs?: string[]
}

export type DemoNameChangeRequestPatch = Partial<Omit<DemoNameChangeRequest, "_id">>

const demoNameChangeRequests: DemoNameChangeRequest[] = [
  {
    _id: "nmc_001",
    studentId: "STU26002",
    oldName: "Saanvi Kulkarni",
    newName: "Sanvi Kulkarni",
    reason: "Spelling correction as per birth certificate.",
    status: "Pending",
    supportingDocs: ["uploads/birth-certificate-saanvi.pdf", "uploads/parent-affidavit.pdf"],
    submittedAt: "2026-10-02",
  },
  {
    _id: "nmc_002",
    studentId: "STU26005",
    oldName: "Vihaan Iyer",
    newName: "Vihaan R. Iyer",
    reason: "Include initials to match passport spelling.",
    status: "Approved",
    supportingDocs: ["uploads/passport-vihaan.pdf"],
    submittedAt: "2026-09-24",
  },
  {
    _id: "nmc_003",
    studentId: "STU26007",
    oldName: "Devansh Menon",
    newName: "Devan Menon",
    reason: "Shorten name as per notary affidavit by parents.",
    status: "Pending",
    supportingDocs: ["uploads/notary-affidavit-devansh.pdf", "uploads/school-id-card.pdf"],
    submittedAt: "2026-10-04",
  },
  {
    _id: "nmc_004",
    studentId: "STU26008",
    oldName: "Kiara Fernandes",
    newName: "Kiara Marie Fernandes",
    reason: "Add middle name as per baptism certificate.",
    status: "Rejected",
    supportingDocs: ["uploads/baptism-certificate-kiara.pdf"],
    submittedAt: "2026-09-18",
  },
  {
    _id: "nmc_005",
    studentId: "STU26001",
    oldName: "Ahaan Kapadia",
    newName: "Aahan Kapadia",
    reason: "Correct spelling as per hospital record.",
    status: "Pending",
    supportingDocs: ["uploads/hospital-record-ahaan.pdf"],
    submittedAt: "2026-10-05",
  },
]

const nextNameChangeSeq = demoSeq(5)

/* --------------------------- Inventory --------------------------------- */

export interface DemoInventoryItem {
  _id: string
  name: string
  category: string
  quantity: number
  price: number
  supplier: string
  description?: string
}

export interface DemoInventoryItemInput {
  name: string
  category: string
  quantity: string | number
  price: string | number
  supplier: string
  description?: string
}

const demoInventoryItems: DemoInventoryItem[] = [
  {
    _id: "inv_001",
    name: "Alphabet Flash Cards (Pack of 50)",
    category: "Books",
    quantity: 240,
    price: 120,
    supplier: "Academic Publishers",
    description: "Laminated cards for daily circle-time reading.",
  },
  {
    _id: "inv_002",
    name: "Number Mats – A2 Laminated",
    category: "Books",
    quantity: 150,
    price: 210,
    supplier: "Academic Publishers",
    description: "Floor mats for counting activities.",
  },
  {
    _id: "inv_003",
    name: "Kids Science Microscope Kit",
    category: "Lab Equipment",
    quantity: 12,
    price: 3450,
    supplier: "Science Supplies Co.",
    description: "For Euro Senior activity corners.",
  },
  {
    _id: "inv_004",
    name: "Wi-Fi Lesson Projector (3200 lm)",
    category: "Electronics",
    quantity: 6,
    price: 28500,
    supplier: "Tech Solutions",
    description: "One per wing; lamp replaced annually.",
  },
  {
    _id: "inv_005",
    name: "Napping Cot – Nursery (Foldable)",
    category: "Furniture",
    quantity: 60,
    price: 2400,
    supplier: "Furniture Mart",
    description: "Nap-time cots with wipe-clean covers.",
  },
  {
    _id: "inv_006",
    name: "Polo Uniform Shirts – Nursery",
    category: "Uniforms",
    quantity: 300,
    price: 380,
    supplier: "Uniform Manufacturers",
    description: "Sizes 2–5, white with navy trim.",
  },
  {
    _id: "inv_007",
    name: "A4 Exercise Books (Ruled, 40 pp)",
    category: "Stationery",
    quantity: 1200,
    price: 28,
    supplier: "Office Supplies Ltd.",
    description: "Bulk order for activity records.",
  },
  {
    _id: "inv_008",
    name: "Washable Markers – 12 Pack",
    category: "Stationery",
    quantity: 400,
    price: 95,
    supplier: "Office Supplies Ltd.",
    description: "Non-toxic; restocked every term.",
  },
]

const nextInventorySeq = demoSeq(8)

/* --------------- Suppliers & purchase orders --------------------------- */

export interface DemoSupplier {
  _id: string
  id: string
  supplierId: string
  name: string
  contact: string
  email: string
}

export interface DemoSupplierInput {
  id?: string
  name: string
  contact: string
  email: string
}

const demoSuppliers: DemoSupplier[] = [
  { _id: "sup_001", id: "SUP001", supplierId: "SUP001", name: "Academic Publishers", contact: "98200 41123", email: "sales@academicpublishers.in" },
  { _id: "sup_002", id: "SUP002", supplierId: "SUP002", name: "Science Supplies Co.", contact: "98450 33471", email: "orders@sciencesupplies.co.in" },
  { _id: "sup_003", id: "SUP003", supplierId: "SUP003", name: "Tech Solutions", contact: "98715 22084", email: "hello@techsolutions.in" },
  { _id: "sup_004", id: "SUP004", supplierId: "SUP004", name: "Office Supplies Ltd.", contact: "98220 55619", email: "service@officesupplies.in" },
  { _id: "sup_005", id: "SUP005", supplierId: "SUP005", name: "Furniture Mart", contact: "98330 90447", email: "sales@furnituremart.in" },
  { _id: "sup_006", id: "SUP006", supplierId: "SUP006", name: "Uniform Manufacturers", contact: "97690 11283", email: "orders@schooluniforms.in" },
]

const nextSupplierSeq = demoSeq(6)

export type DemoPurchaseOrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled"

export interface DemoPurchaseOrder {
  _id: string
  id: string
  supplierId: string
  supplier: string
  items: string
  quantity: string
  totalAmount: string
  orderDate: string
  expectedDelivery: string
  status: DemoPurchaseOrderStatus
  notes?: string
}

export interface DemoPurchaseOrderInput {
  supplierId?: string
  supplier?: string
  items?: string
  quantity?: string
  totalAmount?: string
  orderDate?: string
  expectedDelivery?: string
  status?: DemoPurchaseOrderStatus
  notes?: string
}

export type DemoPurchaseOrderPatch = Partial<Omit<DemoPurchaseOrder, "_id">>

const demoPurchaseOrders: DemoPurchaseOrder[] = [
  {
    _id: "po_041",
    id: "PO-26-0041",
    supplierId: "sup_006",
    supplier: "Uniform Manufacturers",
    items: "Polo Uniform Shirts – Nursery, Grey School Trousers",
    quantity: "200, 150",
    totalAmount: "₹1,54,000.00",
    orderDate: "2026-09-18",
    expectedDelivery: "2026-10-20",
    status: "Shipped",
    notes: "Delivery to Gate 2; 30% advance paid.",
  },
  {
    _id: "po_042",
    id: "PO-26-0042",
    supplierId: "sup_001",
    supplier: "Academic Publishers",
    items: "Alphabet Flash Cards (Pack of 50), Number Mats – A2 Laminated",
    quantity: "120, 80",
    totalAmount: "₹31,200.00",
    orderDate: "2026-09-25",
    expectedDelivery: "2026-10-12",
    status: "Delivered",
    notes: "Received by stores; invoice INV-2291 matched.",
  },
  {
    _id: "po_043",
    id: "PO-26-0043",
    supplierId: "sup_003",
    supplier: "Tech Solutions",
    items: "Wi-Fi Lesson Projector (3200 lm)",
    quantity: "4",
    totalAmount: "₹1,14,000.00",
    orderDate: "2026-10-01",
    expectedDelivery: "2026-10-28",
    status: "Pending",
    notes: "Awaiting finance approval for balance payment.",
  },
  {
    _id: "po_044",
    id: "PO-26-0044",
    supplierId: "sup_004",
    supplier: "Office Supplies Ltd.",
    items: "A4 Exercise Books (Ruled, 40 pp), Washable Markers – 12 Pack",
    quantity: "600, 250",
    totalAmount: "₹41,050.00",
    orderDate: "2026-10-03",
    expectedDelivery: "2026-10-15",
    status: "Pending",
    notes: "Term-3 stationery restock.",
  },
  {
    _id: "po_045",
    id: "PO-26-0045",
    supplierId: "sup_005",
    supplier: "Furniture Mart",
    items: "Napping Cot – Nursery (Foldable)",
    quantity: "40",
    totalAmount: "₹96,000.00",
    orderDate: "2026-08-30",
    expectedDelivery: "2026-09-20",
    status: "Cancelled",
    notes: "Cancelled – vendor could not meet fire-safety specification.",
  },
]

const nextPurchaseOrderSeq = demoSeq(45)

/* --------------------------- Fee deposits ------------------------------ */

export type DemoPaymentMode = "Cash" | "Cheque" | "Online"
export type DemoDepositStatus = "Completed" | "Pending" | "Failed"

export interface DemoDeposit {
  _id: string
  studentId: string
  name: string
  amount: number
  date: string
  paymentMode: DemoPaymentMode
  transactionId: string
  status: DemoDepositStatus
  remarks?: string
  receivedBy?: string
}

export interface DemoDepositInput {
  studentId: string
  name: string
  amount: number | string
  date?: string
  paymentMode?: string
  transactionId?: string
  status?: string
  remarks?: string
  receivedBy?: string
}

const demoDeposits: DemoDeposit[] = [
  {
    _id: "DEP-26-0101",
    studentId: "STU26001",
    name: "Ahaan Kapadia",
    amount: 12500,
    date: "2026-09-28",
    paymentMode: "Cash",
    transactionId: "RCPT-26104",
    status: "Completed",
    remarks: "Term-2 tuition instalment 1 of 2.",
    receivedBy: "Sunita Verma",
  },
  {
    _id: "DEP-26-0102",
    studentId: "STU26002",
    name: "Saanvi Kulkarni",
    amount: 18000,
    date: "2026-09-29",
    paymentMode: "Online",
    transactionId: "UPI-8241590371",
    status: "Completed",
    remarks: "Paid via UPI by parent.",
    receivedBy: "Anil Deshpande",
  },
  {
    _id: "DEP-26-0103",
    studentId: "STU26003",
    name: "Ayaan Qureshi",
    amount: 9500,
    date: "2026-09-30",
    paymentMode: "Cheque",
    transactionId: "CHQ-004581",
    status: "Pending",
    remarks: "Cheque clearing expected on 03 Oct.",
    receivedBy: "Sunita Verma",
  },
  {
    _id: "DEP-26-0104",
    studentId: "STU26004",
    name: "Myra Shah",
    amount: 25000,
    date: "2026-10-01",
    paymentMode: "Online",
    transactionId: "TXN78945612",
    status: "Completed",
    remarks: "Full term fee; receipt emailed to parent.",
    receivedBy: "Anil Deshpande",
  },
  {
    _id: "DEP-26-0105",
    studentId: "STU26006",
    name: "Ananya Pillai",
    amount: 7500,
    date: "2026-10-02",
    paymentMode: "Cash",
    transactionId: "RCPT-26118",
    status: "Completed",
    remarks: "Sibling discount applied after payment.",
    receivedBy: "Sunita Verma",
  },
  {
    _id: "DEP-26-0106",
    studentId: "STU26008",
    name: "Kiara Fernandes",
    amount: 4500,
    date: "2026-10-03",
    paymentMode: "Online",
    transactionId: "PAY-55910274",
    status: "Failed",
    remarks: "Payment declined by issuing bank; parent notified.",
    receivedBy: "Anil Deshpande",
  },
  {
    _id: "DEP-26-0107",
    studentId: "STU26005",
    name: "Vihaan Iyer",
    amount: 6000,
    date: "2026-10-04",
    paymentMode: "Cash",
    transactionId: "RCPT-26125",
    status: "Pending",
    remarks: "Admission formalities fee; receipt awaiting counter signature.",
    receivedBy: "Sunita Verma",
  },
]

const nextDepositSeq = demoSeq(107)

/* ----------------- Fund transfer accounts & transfers ------------------ */

export interface DemoFundAccount {
  _id: string
  accountId: string
  name: string
  bank: string
  accountNumber: string
  balance: number
}

export interface DemoFundAccountInput {
  name: string
  bank: string
  accountNumber: string
  balance: number | string
}

export type DemoFundTransferStatus = "Pending" | "Completed" | "Rejected"

export interface DemoFundTransfer {
  _id: string
  transferId: string
  fromAccountId?: string
  toAccountId?: string
  fromAccount: string
  toAccount: string
  amount: number
  date: string
  reference: string
  approvedBy: string
  status: DemoFundTransferStatus
  notes?: string
}

export interface DemoFundTransferInput {
  amount: number | string
  reference?: string
  transferDate?: string
  approvedBy?: string
  notes?: string
  fromAccountId?: string
  toAccountId?: string
  fromAccount?: string
  toAccount?: string
}

const demoFundAccounts: DemoFundAccount[] = [
  { _id: "acc_001", accountId: "ACC001", name: "School Operations Account", bank: "HDFC Bank", accountNumber: "50100234567891", balance: 482750.5 },
  { _id: "acc_002", accountId: "ACC002", name: "Fee Collection Account", bank: "ICICI Bank", accountNumber: "000701501234", balance: 1265430.75 },
  { _id: "acc_003", accountId: "ACC003", name: "Payroll Account", bank: "State Bank of India", accountNumber: "38123456789", balance: 342100 },
  { _id: "acc_004", accountId: "ACC004", name: "Petty Cash – Campus", bank: "Axis Bank", accountNumber: "918020045678901", balance: 18450 },
]

const nextAccountSeq = demoSeq(4)

const demoFundTransfers: DemoFundTransfer[] = [
  {
    _id: "trf_111",
    transferId: "TRF-26-0111",
    fromAccountId: "ACC002",
    toAccountId: "ACC001",
    fromAccount: "Fee Collection Account",
    toAccount: "School Operations Account",
    amount: 450000,
    date: "2026-09-30",
    reference: "Month-end sweep – Sep 2026 collections",
    approvedBy: "Anil Deshpande",
    status: "Completed",
    notes: "Reconciliation statement filed with auditor.",
  },
  {
    _id: "trf_112",
    transferId: "TRF-26-0112",
    fromAccountId: "ACC001",
    toAccountId: "ACC003",
    fromAccount: "School Operations Account",
    toAccount: "Payroll Account",
    amount: 312000,
    date: "2026-10-01",
    reference: "October payroll funding",
    approvedBy: "Anil Deshpande",
    status: "Completed",
    notes: "Salaries scheduled for 05 Oct.",
  },
  {
    _id: "trf_113",
    transferId: "TRF-26-0113",
    fromAccountId: "ACC001",
    toAccountId: "ACC004",
    fromAccount: "School Operations Account",
    toAccount: "Petty Cash – Campus",
    amount: 15000,
    date: "2026-10-02",
    reference: "Petty cash top-up – campus supplies",
    approvedBy: "Sunita Verma",
    status: "Completed",
    notes: "Counterfoil signed by admin office.",
  },
  {
    _id: "trf_114",
    transferId: "TRF-26-0114",
    fromAccountId: "ACC002",
    toAccountId: "ACC003",
    fromAccount: "Fee Collection Account",
    toAccount: "Payroll Account",
    amount: 180000,
    date: "2026-10-04",
    reference: "Partial payroll support – October",
    approvedBy: "Anil Deshpande",
    status: "Pending",
    notes: "Awaiting trustee approval.",
  },
  {
    _id: "trf_115",
    transferId: "TRF-26-0115",
    fromAccountId: "ACC004",
    toAccountId: "ACC001",
    fromAccount: "Petty Cash – Campus",
    toAccount: "School Operations Account",
    amount: 4200,
    date: "2026-10-05",
    reference: "Surplus petty cash returned",
    approvedBy: "Sunita Verma",
    status: "Pending",
    notes: "End-of-week cash reconciliation.",
  },
]

const nextTransferSeq = demoSeq(115)

/* -------------------------- Exchange orders ---------------------------- */

export type DemoExchangeOrderStatus = "Pending" | "Approved" | "Completed" | "Rejected"

export interface DemoExchangeOrder {
  _id: string
  id: string
  studentId: string
  name: string
  oldItem: string
  newItem: string
  reason: string
  date: string
  status: DemoExchangeOrderStatus
}

export interface DemoExchangeOrderInput {
  id?: string
  studentId?: string
  name?: string
  oldItem: string
  newItem: string
  reason: string
  date?: string
  status?: DemoExchangeOrderStatus
}

export type DemoExchangeOrderPatch = Partial<Omit<DemoExchangeOrder, "_id">>

const demoExchangeOrders: DemoExchangeOrder[] = [
  {
    _id: "exo_021",
    id: "EXO-26-0021",
    studentId: "STU26002",
    name: "Saanvi Kulkarni",
    oldItem: "Nursery Uniform Set – Size 4",
    newItem: "Nursery Uniform Set – Size 6",
    reason: "Outgrown after term start.",
    date: "2026-10-01",
    status: "Pending",
  },
  {
    _id: "exo_022",
    id: "EXO-26-0022",
    studentId: "STU26001",
    name: "Ahaan Kapadia",
    oldItem: "Play Group Shoes – Size 8",
    newItem: "Play Group Shoes – Size 9",
    reason: "Rubbing at toes during play hour.",
    date: "2026-09-29",
    status: "Approved",
  },
  {
    _id: "exo_023",
    id: "EXO-26-0023",
    studentId: "STU26003",
    name: "Ayaan Qureshi",
    oldItem: "School Bag – Navy (damaged zip)",
    newItem: "School Bag – Navy (replacement)",
    reason: "Zip broken within warranty period.",
    date: "2026-09-27",
    status: "Completed",
  },
  {
    _id: "exo_024",
    id: "EXO-26-0024",
    studentId: "STU26006",
    name: "Ananya Pillai",
    oldItem: "Euro Junior Uniform Set – Size 6",
    newItem: "Euro Junior Uniform Set – Size 7",
    reason: "Sleeves too short.",
    date: "2026-09-25",
    status: "Rejected",
  },
  {
    _id: "exo_025",
    id: "EXO-26-0025",
    studentId: "STU26004",
    name: "Myra Shah",
    oldItem: "Sports Trousers – Medium",
    newItem: "Sports Trousers – Large",
    reason: "Comfort during PE sessions.",
    date: "2026-10-03",
    status: "Pending",
  },
]

const nextExchangeSeq = demoSeq(25)

/* ------------- Static / operation master data -------------------------- */

export interface DemoCourse {
  _id: string
  id: string
  name: string
  code: string
  duration: string
  type: string
}

export interface DemoDepartment {
  _id: string
  id: string
  name: string
  code: string
  head: string
}

export interface DemoSubject {
  _id: string
  id: string
  name: string
  code: string
  department: string
  credits: number
}

export type DemoCourseInput = Partial<Omit<DemoCourse, "_id">>
export type DemoDepartmentInput = Partial<Omit<DemoDepartment, "_id">>
export type DemoSubjectInput = Partial<Omit<DemoSubject, "_id">>

const demoCourses: DemoCourse[] = [
  { _id: "crs_001", id: "CRS01", name: "Play Group", code: "PG-01", duration: "1 Year", type: "Full Time" },
  { _id: "crs_002", id: "CRS02", name: "Nursery", code: "NUR-01", duration: "1 Year", type: "Full Time" },
  { _id: "crs_003", id: "CRS03", name: "Euro Junior", code: "EJ-01", duration: "2 Years", type: "Full Time" },
  { _id: "crs_004", id: "CRS04", name: "Euro Senior", code: "ES-01", duration: "2 Years", type: "Full Time" },
  { _id: "crs_005", id: "CRS05", name: "After-School Enrichment", code: "ASE-01", duration: "6 Months", type: "Part Time" },
]

const nextCourseSeq = demoSeq(5)

const demoDepartments: DemoDepartment[] = [
  { _id: "dpt_001", id: "DPT01", name: "Early Years", code: "EY", head: "Priya Menon" },
  { _id: "dpt_002", id: "DPT02", name: "Primary Wing", code: "PW", head: "Rajesh Kulkarni" },
  { _id: "dpt_003", id: "DPT03", name: "Finance & Accounts", code: "FA", head: "Anil Deshpande" },
  { _id: "dpt_004", id: "DPT04", name: "Administration", code: "AD", head: "Sunita Verma" },
  { _id: "dpt_005", id: "DPT05", name: "Activities & Sports", code: "AS", head: "Farhan Qureshi" },
]

const nextDepartmentSeq = demoSeq(5)

const demoSubjects: DemoSubject[] = [
  { _id: "sub_001", id: "SUB01", name: "Phonics & Reading", code: "EY-PH-101", department: "Early Years", credits: 4 },
  { _id: "sub_002", id: "SUB02", name: "Number Sense & Shapes", code: "EY-MA-102", department: "Early Years", credits: 4 },
  { _id: "sub_003", id: "SUB03", name: "Environmental Studies", code: "PW-EV-201", department: "Primary Wing", credits: 3 },
  { _id: "sub_004", id: "SUB04", name: "Art & Craft", code: "EY-AR-103", department: "Early Years", credits: 2 },
  { _id: "sub_005", id: "SUB05", name: "Music & Movement", code: "AS-MU-104", department: "Activities & Sports", credits: 2 },
  { _id: "sub_006", id: "SUB06", name: "Physical Education & Games", code: "AS-PE-205", department: "Activities & Sports", credits: 3 },
  { _id: "sub_007", id: "SUB07", name: "Storytelling & Drama", code: "EY-ST-105", department: "Early Years", credits: 2 },
]

const nextSubjectSeq = demoSeq(7)

/* ------------------------------- Staff --------------------------------- */

export type DemoStaffStatus = "Active" | "On Leave" | "Former"

export interface DemoStaff {
  _id: string
  id: string
  name: string
  department: string
  designation: string
  email: string
  phone: string
  joiningDate: string
  status: DemoStaffStatus
}

export type DemoStaffInput = Partial<Omit<DemoStaff, "_id">>

const demoStaff: DemoStaff[] = [
  {
    _id: "staff_001", id: "STF001", name: "Priya Menon", department: "Early Years",
    designation: "Senior Pre-Primary Teacher", email: "priya.menon@institute1.edu",
    phone: "+91 98200 11234", joiningDate: "2018-06-11", status: "Active",
  },
  {
    _id: "staff_002", id: "STF002", name: "Rajesh Kulkarni", department: "Primary Wing",
    designation: "Head Teacher", email: "rajesh.kulkarni@institute1.edu",
    phone: "+91 98210 55480", joiningDate: "2016-04-04", status: "Active",
  },
  {
    _id: "staff_003", id: "STF003", name: "Anita Desai", department: "Early Years",
    designation: "Activity Coordinator", email: "anita.desai@institute1.edu",
    phone: "+91 98330 21764", joiningDate: "2019-07-22", status: "Active",
  },
  {
    _id: "staff_004", id: "STF004", name: "Farhan Qureshi", department: "Activities & Sports",
    designation: "Sports Instructor", email: "farhan.qureshi@institute1.edu",
    phone: "+91 98450 66109", joiningDate: "2020-01-13", status: "On Leave",
  },
  {
    _id: "staff_005", id: "STF005", name: "Sunita Verma", department: "Administration",
    designation: "Office Administrator", email: "sunita.verma@institute1.edu",
    phone: "+91 98715 44320", joiningDate: "2015-09-01", status: "Active",
  },
  {
    _id: "staff_006", id: "STF006", name: "Anil Deshpande", department: "Finance & Accounts",
    designation: "Accountant", email: "anil.deshpande@institute1.edu",
    phone: "+91 98900 73215", joiningDate: "2017-11-20", status: "Active",
  },
  {
    _id: "staff_007", id: "STF007", name: "Kavita Joshi", department: "Early Years",
    designation: "Pre-Primary Teacher", email: "kavita.joshi@institute1.edu",
    phone: "+91 99600 81247", joiningDate: "2021-06-15", status: "Active",
  },
  {
    _id: "staff_008", id: "STF008", name: "Neha Iyer", department: "Administration",
    designation: "Front Office Executive", email: "neha.iyer@institute1.edu",
    phone: "+91 98860 39012", joiningDate: "2022-03-07", status: "Active",
  },
  {
    _id: "staff_009", id: "STF009", name: "Vikram Shetty", department: "Activities & Sports",
    designation: "Facilities Supervisor", email: "vikram.shetty@institute1.edu",
    phone: "+91 98190 44670", joiningDate: "2017-08-14", status: "Former",
  },
]

const nextStaffSeq = demoSeq(9)

/* --------------------------- Attendance -------------------------------- */

export type DemoAttendanceStatus = "Present" | "Absent" | "Late"

export interface DemoAttendanceRecord {
  _id: string
  staffId: string
  name: string
  department: string
  date: string
  checkIn: string
  checkOut: string
  status: DemoAttendanceStatus
}

export interface DemoAttendanceQuery {
  date?: string
  search?: string
  status?: string
}

/** Generates attendance for every staff member over the last 7 days. */
const buildDemoAttendance = (): DemoAttendanceRecord[] => {
  const records: DemoAttendanceRecord[] = []
  const now = Date.now()
  for (let day = 0; day < 7; day++) {
    const date = toISODate(new Date(now - day * 24 * 60 * 60 * 1000))
    demoStaff.forEach((member, index) => {
      const code = (index * 3 + day) % 11
      let status: DemoAttendanceStatus = "Present"
      if (code === 4) status = "Absent"
      else if ((index + day) % 7 === 3) status = "Late"
      const checkIn =
        status === "Absent" ? "" : status === "Late" ? "09:27 AM" : index % 2 === 0 ? "08:41 AM" : "08:52 AM"
      const checkOut =
        status === "Absent" ? "" : status === "Late" ? "04:38 PM" : index % 3 === 0 ? "04:12 PM" : "04:25 PM"
      records.push({
        _id: `att_${day}_${index}`,
        staffId: member.id,
        name: member.name,
        department: member.department,
        date,
        checkIn,
        checkOut,
        status,
      })
    })
  }
  return records
}

const demoAttendanceRecords: DemoAttendanceRecord[] = buildDemoAttendance()

/* -------------------- Teaching subject allocations --------------------- */

export interface DemoTeachingAllocation {
  _id: string
  allocId: string
  staffId: string
  staffName: string
  department: string
  subject: string
  course: string
  batch: string
  semester: string
}

export type DemoTeachingAllocationInput = Partial<Omit<DemoTeachingAllocation, "_id">>

const demoTeachingAllocations: DemoTeachingAllocation[] = [
  {
    _id: "alloc_001", allocId: "ALLOC-001", staffId: "STF001", staffName: "Priya Menon",
    department: "Early Years", subject: "Phonics & Reading",
    course: "Play Group", batch: "2026-27", semester: "Sem 1",
  },
  {
    _id: "alloc_002", allocId: "ALLOC-002", staffId: "STF001", staffName: "Priya Menon",
    department: "Early Years", subject: "Number Sense & Shapes",
    course: "Nursery", batch: "2026-27", semester: "Sem 1",
  },
  {
    _id: "alloc_003", allocId: "ALLOC-003", staffId: "STF007", staffName: "Kavita Joshi",
    department: "Early Years", subject: "Art & Craft",
    course: "Euro Junior", batch: "2026-27", semester: "Sem 1",
  },
  {
    _id: "alloc_004", allocId: "ALLOC-004", staffId: "STF003", staffName: "Anita Desai",
    department: "Early Years", subject: "Storytelling & Drama",
    course: "Nursery", batch: "2026-27", semester: "Sem 1",
  },
  {
    _id: "alloc_005", allocId: "ALLOC-005", staffId: "STF004", staffName: "Farhan Qureshi",
    department: "Activities & Sports", subject: "Physical Education & Games",
    course: "Euro Senior", batch: "2026-27", semester: "Sem 1",
  },
  {
    _id: "alloc_006", allocId: "ALLOC-006", staffId: "STF002", staffName: "Rajesh Kulkarni",
    department: "Primary Wing", subject: "Environmental Studies",
    course: "Euro Senior", batch: "2026-27", semester: "Sem 1",
  },
  {
    _id: "alloc_007", allocId: "ALLOC-007", staffId: "STF003", staffName: "Anita Desai",
    department: "Activities & Sports", subject: "Music & Movement",
    course: "Play Group", batch: "2026-27", semester: "Sem 1",
  },
]

const nextAllocationSeq = demoSeq(7)

/* ------------------------------ Profile -------------------------------- */

export interface DemoProfilePreferences {
  emailNotifications: boolean
  smsAlerts: boolean
  darkMode: boolean
}

export interface DemoProfile {
  _id: string
  name: string
  email: string
  institute: string
  phone: string
  address: string
  photoUrl: string
  preferences: DemoProfilePreferences
  twoFactorEnabled: boolean
}

export type DemoProfilePatch = Partial<Omit<DemoProfile, "_id" | "preferences">> & {
  preferences?: Partial<DemoProfilePreferences>
}

let demoProfile: DemoProfile = {
  _id: "prof_001",
  name: "Vinit Bari",
  email: "vinit.bari@example.com",
  institute: "Institute One",
  phone: "9876543210",
  address: "221B, Lakeview Road, Baner, Pune, Maharashtra 411045",
  photoUrl: "",
  preferences: { emailNotifications: true, smsAlerts: false, darkMode: false },
  twoFactorEnabled: false,
}

const demoInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()

/** Generated avatar used when no uploaded photo is available. */
const demoAvatarDataUrl = (label: string): string => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">` +
    `<rect width="160" height="160" rx="80" fill="#4f46e5"/>` +
    `<text x="80" y="86" font-family="Arial, sans-serif" font-size="60" font-weight="600"` +
    ` fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/* ==========================================================================
   Demo service functions
   ========================================================================== */

/* ------------------------------ Enquiries ------------------------------ */

export const getDemoEnquiries = async (): Promise<DemoEnquiry[]> => {
  await demoDelay(600)
  return clone(demoEnquiries)
}

export const createDemoEnquiry = async (
  input: DemoEnquiryInput,
): Promise<{ success: true; message: string; data: DemoEnquiry }> => {
  await demoDelay(800)
  const record: DemoEnquiry = {
    id: `ENQ-${nextEnquirySeq()}`,
    studentName: input.studentName,
    parentName: input.enquirerName ?? "",
    email: input.email ?? "",
    mobile: input.mobile ?? "",
    program: input.program ?? "",
    source: input.referralSource || "Walk-in",
    status: "New",
    date: formatDemoDisplayDate(new Date()),
    followUp: input.followupDate || "—",
    dob: input.dob,
    gender: input.gender,
    locality: input.locality,
    admissionForm: input.admissionForm ?? false,
    notes: input.notes,
  }
  demoEnquiries.unshift(record)
  return { success: true, message: "Enquiry created", data: clone(record) }
}

/* -------------------- Admissions & admission status -------------------- */

export const getDemoAdmissions = async (): Promise<DemoAdmission[]> => {
  await demoDelay(700)
  return clone(demoAdmissions)
}

export const updateDemoAdmission = async (
  id: string,
  update: Partial<DemoAdmission>,
): Promise<DemoAdmission> => {
  await demoDelay(700)
  const index = demoAdmissions.findIndex((admission) => admission.id === id)
  if (index === -1) throw demoNotFound("Admission")
  demoAdmissions[index] = { ...demoAdmissions[index], ...update, id: demoAdmissions[index].id }
  return clone(demoAdmissions[index])
}

export const getDemoStudentByStudentId = async (studentId: string): Promise<DemoStudent> => {
  await demoDelay(600)
  const key = studentId.trim().toLowerCase()
  const found = demoAdmissions.find((admission) => admission.studentId.toLowerCase() === key)
  if (!found) throw demoNotFound("Student")
  return clone({
    studentId: found.studentId,
    name: found.name,
    course: found.course,
    batch: found.batch,
  })
}

/* ------------- Graduation / name change confirmation ------------------- */

export const getDemoNameChangeRequests = async (): Promise<DemoNameChangeRequest[]> => {
  await demoDelay(700)
  return clone(demoNameChangeRequests)
}

export const createDemoNameChangeRequest = async (
  input: DemoNameChangeRequestInput,
): Promise<DemoNameChangeRequest> => {
  await demoDelay(800)
  const record: DemoNameChangeRequest = {
    _id: `nmc_${pad(nextNameChangeSeq())}`,
    studentId: input.studentId,
    oldName: input.oldName,
    newName: input.newName,
    reason: input.reason,
    status: "Pending",
    supportingDocs: input.supportingDocs ?? [],
    submittedAt: toISODate(new Date()),
  }
  demoNameChangeRequests.unshift(record)
  return clone(record)
}

export const updateDemoNameChangeRequest = async (
  id: string,
  patch: DemoNameChangeRequestPatch,
): Promise<DemoNameChangeRequest> => {
  await demoDelay(700)
  return clone(demoUpdateInPlace(demoNameChangeRequests, id, patch, "Name change request"))
}

export const deleteDemoNameChangeRequest = async (id: string): Promise<{ success: true }> => {
  await demoDelay(600)
  demoRemove(demoNameChangeRequests, id, "Name change request")
  return { success: true }
}

export const setDemoNameChangeRequestStatus = async (
  id: string,
  action: "approve" | "reject",
): Promise<DemoNameChangeRequest> => {
  await demoDelay(600)
  const status: DemoNameChangeStatus = action === "approve" ? "Approved" : "Rejected"
  return clone(demoUpdateInPlace(demoNameChangeRequests, id, { status }, "Name change request"))
}

/* ------------------------------ Inventory ------------------------------ */

export const getDemoInventoryItems = async (): Promise<DemoInventoryItem[]> => {
  await demoDelay(700)
  return clone(demoInventoryItems)
}

export const createDemoInventoryItem = async (
  input: DemoInventoryItemInput,
): Promise<DemoInventoryItem> => {
  await demoDelay(700)
  const record: DemoInventoryItem = {
    _id: `inv_${pad(nextInventorySeq())}`,
    name: input.name,
    category: input.category,
    quantity: toNumber(input.quantity),
    price: toNumber(input.price),
    supplier: input.supplier,
    description: input.description,
  }
  demoInventoryItems.unshift(record)
  return clone(record)
}

/* ----------------------- Suppliers & purchase orders ------------------- */

export const getDemoSuppliers = async (): Promise<DemoSupplier[]> => {
  await demoDelay(600)
  return clone(demoSuppliers)
}

export const createDemoSupplier = async (input: DemoSupplierInput): Promise<DemoSupplier> => {
  await demoDelay(700)
  const number = nextSupplierSeq()
  const code = input.id || `SUP${pad(number)}`
  const record: DemoSupplier = {
    _id: `sup_${pad(number)}`,
    id: code,
    supplierId: code,
    name: input.name,
    contact: input.contact,
    email: input.email,
  }
  demoSuppliers.push(record)
  return clone(record)
}

export const updateDemoSupplier = async (
  id: string,
  patch: Partial<Omit<DemoSupplier, "_id">>,
): Promise<DemoSupplier> => {
  await demoDelay(600)
  return clone(demoUpdateInPlace(demoSuppliers, id, patch, "Supplier"))
}

export const getDemoPurchaseOrders = async (): Promise<DemoPurchaseOrder[]> => {
  await demoDelay(700)
  return clone(demoPurchaseOrders)
}

export const createDemoPurchaseOrder = async (
  input: DemoPurchaseOrderInput,
): Promise<DemoPurchaseOrder> => {
  await demoDelay(800)
  const number = nextPurchaseOrderSeq()
  const record: DemoPurchaseOrder = {
    _id: `po_${pad(number, 4)}`,
    id: `PO-26-${pad(number, 4)}`,
    supplierId: input.supplierId ?? "",
    supplier: input.supplier ?? "",
    items: input.items ?? "",
    quantity: input.quantity ?? "",
    totalAmount: input.totalAmount ?? "",
    orderDate: input.orderDate || toISODate(new Date()),
    expectedDelivery: input.expectedDelivery ?? "",
    status: input.status ?? "Pending",
    notes: input.notes,
  }
  demoPurchaseOrders.unshift(record)
  return clone(record)
}

export const updateDemoPurchaseOrder = async (
  id: string,
  patch: DemoPurchaseOrderPatch,
): Promise<DemoPurchaseOrder> => {
  await demoDelay(700)
  return clone(demoUpdateInPlace(demoPurchaseOrders, id, patch, "Purchase order"))
}

export const deleteDemoPurchaseOrder = async (id: string): Promise<{ success: true }> => {
  await demoDelay(600)
  demoRemove(demoPurchaseOrders, id, "Purchase order")
  return { success: true }
}

/* ----------------------------- Fee deposits ---------------------------- */

export const getDemoDeposits = async (): Promise<DemoDeposit[]> => {
  await demoDelay(700)
  return clone(demoDeposits)
}

export const createDemoDeposit = async (input: DemoDepositInput): Promise<DemoDeposit> => {
  await demoDelay(800)
  const paymentMode: DemoPaymentMode =
    input.paymentMode === "Online" || input.paymentMode === "Cheque" ? input.paymentMode : "Cash"
  const status: DemoDepositStatus =
    input.status === "Pending" || input.status === "Failed" ? input.status : "Completed"
  const record: DemoDeposit = {
    _id: `DEP-26-${pad(nextDepositSeq(), 4)}`,
    studentId: input.studentId,
    name: input.name,
    amount: toNumber(input.amount),
    date: input.date || toISODate(new Date()),
    paymentMode,
    transactionId: input.transactionId || `RCPT-${pad(nextDepositSeq(), 4)}`,
    status,
    remarks: input.remarks,
    receivedBy: input.receivedBy,
  }
  demoDeposits.unshift(record)
  return clone(record)
}

/* ------------------- Fund transfer accounts & transfers ---------------- */

export const getDemoFundAccounts = async (): Promise<DemoFundAccount[]> => {
  await demoDelay(600)
  return clone(demoFundAccounts)
}

export const createDemoFundAccount = async (
  input: DemoFundAccountInput,
): Promise<DemoFundAccount> => {
  await demoDelay(700)
  const number = nextAccountSeq()
  const record: DemoFundAccount = {
    _id: `acc_${pad(number)}`,
    accountId: `ACC${pad(number)}`,
    name: input.name,
    bank: input.bank,
    accountNumber: input.accountNumber,
    balance: toNumber(input.balance),
  }
  demoFundAccounts.push(record)
  return clone(record)
}

const resolveDemoAccount = (
  accountId?: string,
  name?: string,
): DemoFundAccount | undefined => {
  if (accountId) {
    const byId = demoFundAccounts.find((account) => account.accountId === accountId)
    if (byId) return byId
  }
  if (name) {
    const byName = demoFundAccounts.find((account) => account.name === name)
    if (byName) return byName
  }
  return undefined
}

export const getDemoFundTransfers = async (): Promise<DemoFundTransfer[]> => {
  await demoDelay(700)
  return clone(demoFundTransfers)
}

export const createDemoFundTransfer = async (
  input: DemoFundTransferInput,
): Promise<DemoFundTransfer> => {
  await demoDelay(800)
  const from = resolveDemoAccount(input.fromAccountId, input.fromAccount)
  const to = resolveDemoAccount(input.toAccountId, input.toAccount)
  if (!from || !to) throw new Error("Both from and to accounts are required")
  if (from._id === to._id) throw new Error("From and To accounts cannot be the same")
  const amount = toNumber(input.amount)
  if (!amount || amount <= 0) throw new Error("Amount must be greater than 0")

  const number = nextTransferSeq()
  const record: DemoFundTransfer = {
    _id: `trf_${number}`,
    transferId: `TRF-26-${pad(number, 4)}`,
    fromAccountId: from.accountId,
    toAccountId: to.accountId,
    fromAccount: from.name,
    toAccount: to.name,
    amount,
    date: input.transferDate || toISODate(new Date()),
    reference: input.reference ?? "",
    approvedBy: input.approvedBy ?? "",
    status: "Pending",
    notes: input.notes,
  }
  demoFundTransfers.unshift(record)
  from.balance = Number((from.balance - amount).toFixed(2))
  to.balance = Number((to.balance + amount).toFixed(2))
  return clone(record)
}

/* ---------------------------- Exchange orders -------------------------- */

export const getDemoExchangeOrders = async (): Promise<DemoExchangeOrder[]> => {
  await demoDelay(700)
  return clone(demoExchangeOrders)
}

export const createDemoExchangeOrder = async (
  input: DemoExchangeOrderInput,
): Promise<DemoExchangeOrder> => {
  await demoDelay(800)
  const number = nextExchangeSeq()
  const record: DemoExchangeOrder = {
    _id: `exo_${pad(number, 4)}`,
    id: input.id || `EXO-26-${pad(number, 4)}`,
    studentId: input.studentId ?? "",
    name: input.name ?? "",
    oldItem: input.oldItem,
    newItem: input.newItem,
    reason: input.reason,
    date: input.date || toISODate(new Date()),
    status: input.status ?? "Pending",
  }
  demoExchangeOrders.unshift(record)
  return clone(record)
}

export const updateDemoExchangeOrder = async (
  id: string,
  patch: DemoExchangeOrderPatch,
): Promise<DemoExchangeOrder> => {
  await demoDelay(600)
  return clone(demoUpdateInPlace(demoExchangeOrders, id, patch, "Exchange order"))
}

export const deleteDemoExchangeOrder = async (id: string): Promise<{ success: true }> => {
  await demoDelay(600)
  demoRemove(demoExchangeOrders, id, "Exchange order")
  return { success: true }
}

/* ------------------------- Static master data -------------------------- */

export const getDemoCourses = async (): Promise<DemoCourse[]> => {
  await demoDelay(600)
  return clone(demoCourses)
}

export const createDemoCourse = async (input: DemoCourseInput): Promise<DemoCourse> => {
  await demoDelay(700)
  const number = nextCourseSeq()
  const record: DemoCourse = {
    _id: `crs_${pad(number)}`,
    id: input.id || `CRS${pad(number, 2)}`,
    name: input.name ?? "",
    code: input.code ?? "",
    duration: input.duration ?? "",
    type: input.type ?? "Full Time",
  }
  demoCourses.push(record)
  return clone(record)
}

export const updateDemoCourse = async (
  id: string,
  patch: Partial<Omit<DemoCourse, "_id">>,
): Promise<DemoCourse> => {
  await demoDelay(600)
  return clone(demoUpdateInPlace(demoCourses, id, patch, "Course"))
}

export const deleteDemoCourse = async (id: string): Promise<{ success: true }> => {
  await demoDelay(600)
  demoRemove(demoCourses, id, "Course")
  return { success: true }
}

export const getDemoDepartments = async (): Promise<DemoDepartment[]> => {
  await demoDelay(600)
  return clone(demoDepartments)
}

export const createDemoDepartment = async (
  input: DemoDepartmentInput,
): Promise<DemoDepartment> => {
  await demoDelay(700)
  const number = nextDepartmentSeq()
  const record: DemoDepartment = {
    _id: `dpt_${pad(number)}`,
    id: input.id || `DPT${pad(number, 2)}`,
    name: input.name ?? "",
    code: input.code ?? "",
    head: input.head ?? "",
  }
  demoDepartments.push(record)
  return clone(record)
}

export const updateDemoDepartment = async (
  id: string,
  patch: Partial<Omit<DemoDepartment, "_id">>,
): Promise<DemoDepartment> => {
  await demoDelay(600)
  return clone(demoUpdateInPlace(demoDepartments, id, patch, "Department"))
}

export const deleteDemoDepartment = async (id: string): Promise<{ success: true }> => {
  await demoDelay(600)
  demoRemove(demoDepartments, id, "Department")
  return { success: true }
}

export const getDemoSubjects = async (): Promise<DemoSubject[]> => {
  await demoDelay(600)
  return clone(demoSubjects)
}

export const createDemoSubject = async (input: DemoSubjectInput): Promise<DemoSubject> => {
  await demoDelay(700)
  const number = nextSubjectSeq()
  const record: DemoSubject = {
    _id: `sub_${pad(number)}`,
    id: input.id || `SUB${pad(number, 2)}`,
    name: input.name ?? "",
    code: input.code ?? "",
    department: input.department ?? "",
    credits: toNumber(input.credits),
  }
  demoSubjects.push(record)
  return clone(record)
}

export const updateDemoSubject = async (
  id: string,
  patch: Partial<Omit<DemoSubject, "_id">>,
): Promise<DemoSubject> => {
  await demoDelay(600)
  return clone(demoUpdateInPlace(demoSubjects, id, patch, "Subject"))
}

export const deleteDemoSubject = async (id: string): Promise<{ success: true }> => {
  await demoDelay(600)
  demoRemove(demoSubjects, id, "Subject")
  return { success: true }
}

/* -------------------------------- Staff -------------------------------- */

export const getDemoStaff = async (): Promise<DemoStaff[]> => {
  await demoDelay(700)
  return clone(demoStaff)
}

export const createDemoStaff = async (input: DemoStaffInput): Promise<DemoStaff> => {
  await demoDelay(800)
  const number = nextStaffSeq()
  const record: DemoStaff = {
    _id: `staff_${pad(number)}`,
    id: input.id || `STF${pad(number)}`,
    name: input.name ?? "",
    department: input.department ?? "",
    designation: input.designation ?? "",
    email: input.email ?? "",
    phone: input.phone ?? "",
    joiningDate: input.joiningDate || toISODate(new Date()),
    status: input.status ?? "Active",
  }
  demoStaff.push(record)
  return clone(record)
}

export const updateDemoStaff = async (
  id: string,
  patch: Partial<Omit<DemoStaff, "_id">>,
): Promise<DemoStaff> => {
  await demoDelay(700)
  return clone(demoUpdateInPlace(demoStaff, id, patch, "Staff member"))
}

export const deleteDemoStaff = async (id: string): Promise<{ success: true }> => {
  await demoDelay(600)
  demoRemove(demoStaff, id, "Staff member")
  return { success: true }
}

/* ------------------------------ Attendance ----------------------------- */

export const getDemoAttendance = async (
  query: DemoAttendanceQuery = {},
): Promise<DemoAttendanceRecord[]> => {
  await demoDelay(600)
  const term = (query.search ?? "").trim().toLowerCase()
  const status = (query.status ?? "all").toLowerCase()
  return clone(
    demoAttendanceRecords.filter((record) => {
      if (query.date && record.date !== query.date) return false
      if (status !== "all" && record.status.toLowerCase() !== status) return false
      if (term) {
        const haystack = `${record.staffId} ${record.name} ${record.department}`.toLowerCase()
        if (!haystack.includes(term)) return false
      }
      return true
    }),
  )
}

export const markDemoAttendancePresent = async (
  id: string,
  checkIn?: string,
): Promise<DemoAttendanceRecord> => {
  await demoDelay(500)
  const record = demoAttendanceRecords.find((item) => item._id === id)
  if (!record) throw demoNotFound("Attendance record")
  record.status = "Present"
  record.checkIn =
    checkIn ?? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  return clone(record)
}

/* ---------------------- Teaching subject allocations ------------------- */

export const getDemoTeachingSubjects = async (): Promise<DemoTeachingAllocation[]> => {
  await demoDelay(700)
  return clone(demoTeachingAllocations)
}

export const createDemoTeachingSubject = async (
  input: DemoTeachingAllocationInput,
): Promise<DemoTeachingAllocation> => {
  await demoDelay(800)
  const number = nextAllocationSeq()
  const record: DemoTeachingAllocation = {
    _id: `alloc_${pad(number)}`,
    allocId: input.allocId || `ALLOC-${pad(number)}`,
    staffId: input.staffId ?? "",
    staffName: input.staffName ?? "",
    department: input.department ?? "",
    subject: input.subject ?? "",
    course: input.course ?? "",
    batch: input.batch ?? "",
    semester: input.semester ?? "",
  }
  demoTeachingAllocations.unshift(record)
  return clone(record)
}

export const updateDemoTeachingSubject = async (
  id: string,
  patch: Partial<Omit<DemoTeachingAllocation, "_id">>,
): Promise<DemoTeachingAllocation> => {
  await demoDelay(700)
  return clone(demoUpdateInPlace(demoTeachingAllocations, id, patch, "Teaching allocation"))
}

export const deleteDemoTeachingSubject = async (id: string): Promise<{ success: true }> => {
  await demoDelay(600)
  demoRemove(demoTeachingAllocations, id, "Teaching allocation")
  return { success: true }
}

/* -------------------------------- Profile ------------------------------ */

export const getDemoProfile = async (): Promise<DemoProfile> => {
  await demoDelay(700)
  return clone(demoProfile)
}

export const updateDemoProfile = async (patch: DemoProfilePatch): Promise<DemoProfile> => {
  await demoDelay(800)
  const { preferences, ...rest } = patch
  demoProfile = {
    ...demoProfile,
    ...rest,
    _id: demoProfile._id,
    preferences: { ...demoProfile.preferences, ...(preferences ?? {}) },
  }
  return clone(demoProfile)
}

/**
 * Simulated photo upload. Returns an object URL for the chosen file when
 * running in the browser, otherwise a generated initials avatar.
 */
export const uploadDemoProfilePhoto = async (
  file?: File | Blob | string | null,
): Promise<{ url: string }> => {
  await demoDelay(600)
  if (
    file &&
    typeof file !== "string" &&
    typeof URL !== "undefined" &&
    typeof URL.createObjectURL === "function"
  ) {
    return { url: URL.createObjectURL(file) }
  }
  return { url: demoAvatarDataUrl(demoInitials(demoProfile.name)) }
}




















