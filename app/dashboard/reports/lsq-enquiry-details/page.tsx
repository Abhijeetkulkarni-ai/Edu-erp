"use client"

// Mock data for LSQ enquiry details
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
    followUpDate: "2023-04-15",
    assignedTo: "Sarah Johnson",
    lsqId: "LSQID123456",
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
    followUpDate: "2023-04-14",
    assignedTo: "Michael Brown",
    lsqId: "LSQID123457",
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
    followUpDate: "2023-04-13",
    assignedTo: "Emily Davis",
    lsqId: "LSQID123458",
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
    followUpDate: "-",
    assignedTo: "David Wilson",
    lsqId: "LSQID123459",
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
    followUpDate: "-",
    assignedTo: "John Smith",
    lsqId: "LSQID123460",
  },
]

export default function LsqEnquiryDetailsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">LSQ Enquiry Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Source</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Follow-Up</th>
              <th className="p-2 border">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {lsqEnquiryData.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.phone}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.course}</td>
                <td className="border p-2">{item.source}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2">{item.followUpDate}</td>
                <td className="border p-2">{item.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
