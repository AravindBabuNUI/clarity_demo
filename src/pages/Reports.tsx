import { Download, Calendar, TrendingUp, Users, FileText, Award } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const monthlyData = [
  { month: 'Jul', transcripts: 145, credits: 1820 },
  { month: 'Aug', transcripts: 289, credits: 3540 },
  { month: 'Sep', transcripts: 421, credits: 5120 },
  { month: 'Oct', transcripts: 356, credits: 4380 },
  { month: 'Nov', transcripts: 298, credits: 3670 },
  { month: 'Dec', transcripts: 178, credits: 2190 },
  { month: 'Jan', transcripts: 312, credits: 3840 },
];

const statusDistribution = [
  { name: 'Completed', value: 856, color: 'hsl(var(--success))' },
  { name: 'In Review', value: 234, color: 'hsl(var(--warning))' },
  { name: 'Pending', value: 157, color: 'hsl(var(--muted))' },
];

const accuracyTrend = [
  { month: 'Jul', extraction: 94.2, matching: 88.5 },
  { month: 'Aug', extraction: 94.8, matching: 89.2 },
  { month: 'Sep', extraction: 95.3, matching: 90.1 },
  { month: 'Oct', extraction: 95.8, matching: 91.4 },
  { month: 'Nov', extraction: 96.2, matching: 92.0 },
  { month: 'Dec', extraction: 96.5, matching: 92.8 },
  { month: 'Jan', extraction: 96.8, matching: 93.2 },
];

const reports = [
  { name: 'Monthly Processing Summary', date: 'January 2024', type: 'PDF' },
  { name: 'Transfer Credit Analysis', date: 'December 2023', type: 'Excel' },
  { name: 'Equivalency Accuracy Report', date: 'Q4 2023', type: 'PDF' },
  { name: 'Student Satisfaction Survey', date: 'Fall 2023', type: 'PDF' },
];

const Reports = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Executive summaries and performance insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="semester">
              <SelectTrigger className="w-40 bg-card">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                  <p className="text-sm text-muted-foreground">Total Transcripts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[hsl(var(--success))]/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[hsl(var(--success))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.2 min</p>
                  <p className="text-sm text-muted-foreground">Avg. Processing Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[hsl(var(--warning))]/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[hsl(var(--warning))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">892</p>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">96.8%</p>
                  <p className="text-sm text-muted-foreground">Extraction Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Monthly Processing Volume</CardTitle>
              <CardDescription>Transcripts and credits processed per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="transcripts" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Transcripts" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>AI Accuracy Trends</CardTitle>
              <CardDescription>Extraction and matching accuracy over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={accuracyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis domain={[85, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="extraction" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Extraction %" />
                    <Line type="monotone" dataKey="matching" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Matching %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
              <CardDescription>Current evaluation status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {statusDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-card">
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Recent automated reports and summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{report.type}</Badge>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
