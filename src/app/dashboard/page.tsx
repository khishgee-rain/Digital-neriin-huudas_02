"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MonthlyChart from "@/components/ui/MonthlyChart"
import { MoreHorizontal } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-[#f9f9fc] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Badge variant="outline">Active</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Members", value: "1,230", change: "+5%" },
          { title: "Active Members", value: "1,100", change: "+3%" },
          { title: "New Signups", value: "130", change: "+10%" },
          { title: "Churn Rate", value: "2%", change: "-1%" },
        ].map((item, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{item.title}</CardTitle>
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-sm text-muted-foreground">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Growth Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Membership Growth</CardTitle>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <MonthlyChart />
          </CardContent>
        </Card>

        {/* Membership Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Membership Data</CardTitle>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-left border-b">
                  <th className="pb-2 font-normal">Month ▼</th>
                  <th className="pb-2 font-normal">Total Members ▼</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: "Jan", total: "200" },
                  { month: "Feb", total: "400" },
                  { month: "Mar", total: "600" },
                  { month: "Apr", total: "800" },
                  { month: "May", total: "1000" },
                  { month: "Jun", total: "1200" },
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3">{row.month}</td>
                    <td className="py-3">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}