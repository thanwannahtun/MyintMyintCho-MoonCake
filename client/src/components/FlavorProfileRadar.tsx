import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";

const data = [
  { subject: 'Sweetness', A: 120, B: 110, fullMark: 150 },
  { subject: 'Aroma', A: 98, B: 130, fullMark: 150 },
  { subject: 'Texture', A: 86, B: 130, fullMark: 150 },
  { subject: 'Bitterness', A: 99, B: 100, fullMark: 150 },
  { subject: 'Richness', A: 85, B: 90, fullMark: 150 },
  { subject: 'Aftertaste', A: 65, B: 85, fullMark: 150 },
];

export default function FlavorProfileRadar() {
  return (
    <Card className="w-full h-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-primary">Taste Profile</CardTitle>
        <CardDescription>Sensory Analysis of the Coffee Mooncake</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="MMC Coffee Mooncake"
                dataKey="B"
                stroke="var(--chart-3)"
                fill="var(--chart-3)"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
