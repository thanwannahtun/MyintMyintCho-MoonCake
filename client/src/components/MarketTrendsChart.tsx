import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { month: "Jan", traditional: 4000, coffee: 2400 },
  { month: "Feb", traditional: 3000, coffee: 1398 },
  { month: "Mar", traditional: 2000, coffee: 3800 },
  { month: "Apr", traditional: 2780, coffee: 3908 },
  { month: "May", traditional: 1890, coffee: 4800 },
  { month: "Jun", traditional: 2390, coffee: 3800 },
  { month: "Jul", traditional: 3490, coffee: 4300 },
];

export default function MarketTrendsChart() {
  return (
    <Card className="w-full h-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-primary">Flavor Trend Analysis</CardTitle>
        <CardDescription>Comparing Traditional vs. Coffee Flavor Demand</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorCoffee" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="var(--muted-foreground)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--muted-foreground)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--card-foreground)'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="coffee" 
                name="Coffee Flavor (New)"
                stroke="var(--chart-1)" 
                fillOpacity={1} 
                fill="url(#colorCoffee)" 
              />
              <Area 
                type="monotone" 
                dataKey="traditional" 
                name="Traditional"
                stroke="var(--chart-2)" 
                fillOpacity={1} 
                fill="url(#colorTrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
