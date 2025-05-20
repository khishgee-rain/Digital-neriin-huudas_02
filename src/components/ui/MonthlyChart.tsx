"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", total: 100 },
  { month: "Feb", total: 500 },
  { month: "Mar", total: 0 },
  { month: "Apr", total: 100 },
  { month: "May", total: 1000 },
  { month: "Jun", total: 0 },
]

const chartConfig = {
  total: {
    label: "Total Members",
    color: "hsl(var(--chart-1))",
  },
}

export default function MonthlyChart() {
  return (
    <Card className="w-full h-[40rem]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Сарын өсөлт</CardTitle>
        <CardDescription>Гишүүдийн тооны өсөлт (2024)</CardDescription>
      </CardHeader>
      <CardContent className="h-[22rem]">
        <ChartContainer config={chartConfig}>
          <AreaChart
          
            data={chartData}
      margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="total"
              type="linear"
              fill="#3D4FF4"
              fillOpacity={0.4}
              stroke="#3D4FF4"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
