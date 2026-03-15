import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ArrowRight, Check, X, AlertTriangle, RefreshCw } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockEquivalencies } from '@/data/mockData';
import { useUploadContext } from '@/context/UploadContext';
import { computeEquivalencies } from '@/lib/courseMapping';
import { cn } from '@/lib/utils';

const CourseEquivalency = () => {
  const { transcript } = useUploadContext();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const baseEquivalencies = useMemo(
    () => transcript?.courseData ? computeEquivalencies(transcript.courseData) : mockEquivalencies,
    [transcript]
  );

  const [equivalencies, setEquivalencies] = useState(baseEquivalencies);

  // Recompute whenever transcript changes (e.g. user navigates back and re-uploads)
  useEffect(() => {
    setEquivalencies(baseEquivalencies);
  }, [baseEquivalencies]);

  const getConfidenceColor = (score: number) => {
    if (score >= 85) return 'text-[hsl(var(--success))]';
    if (score >= 70) return 'text-[hsl(var(--warning))]';
    return 'text-destructive';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'auto-matched':
        return <Badge className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]">Auto-Matched</Badge>;
      case 'faculty-review':
        return <Badge className="bg-[hsl(var(--warning))] hover:bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]">Faculty Review</Badge>;
      case 'manual':
        return <Badge variant="secondary">Manual Entry</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleApprove = (sourceCode: string) => {
    setEquivalencies(prev =>
      prev.map(e => e.sourceCode === sourceCode ? { ...e, status: 'auto-matched' as const } : e)
    );
  };

  const handleReject = (sourceCode: string) => {
    setEquivalencies(prev =>
      prev.map(e => e.sourceCode === sourceCode ? { ...e, status: 'rejected' as const } : e)
    );
  };

  const approvedCount = equivalencies.filter(e => e.status === 'auto-matched').length;
  const reviewCount = equivalencies.filter(e => e.status === 'faculty-review').length;
  const manualCount = equivalencies.filter(e => e.status === 'manual').length;

  const filteredEquivalencies = equivalencies.filter(e => {
    const matchesFilter = filter === 'all' || e.status === filter;
    const q = search.toLowerCase();
    const matchesSearch = !q || (
      e.sourceCode.toLowerCase().includes(q) ||
      e.sourceName.toLowerCase().includes(q) ||
      e.targetCode.toLowerCase().includes(q) ||
      e.targetName.toLowerCase().includes(q)
    );
    return matchesFilter && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Equivalency</h1>
          <p className="text-muted-foreground">
            AI-powered course matching with confidence scores and faculty review workflow
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold text-foreground">{equivalencies.length}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Auto-Matched</p>
                  <p className="text-2xl font-bold text-[hsl(var(--success))]">{approvedCount}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-[hsl(var(--success))]/10 flex items-center justify-center">
                  <Check className="h-5 w-5 text-[hsl(var(--success))]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Needs Review</p>
                  <p className="text-2xl font-bold text-[hsl(var(--warning))]">{reviewCount}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-[hsl(var(--warning))]/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-[hsl(var(--warning))]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Manual Entry</p>
                  <p className="text-2xl font-bold text-foreground">{manualCount}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center">
                  <X className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Equivalency Mappings</CardTitle>
                <CardDescription>
                  Review and approve course equivalencies
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-10 w-64 bg-background"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40 bg-background">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="auto-matched">Auto-Matched</SelectItem>
                    <SelectItem value="faculty-review">Faculty Review</SelectItem>
                    <SelectItem value="manual">Manual Entry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source Course</TableHead>
                  <TableHead className="text-center w-20">Match</TableHead>
                  <TableHead>Target Course</TableHead>
                  <TableHead className="text-center">Confidence</TableHead>
                  <TableHead className="text-center">Credits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquivalencies.map((eq, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{eq.sourceCode}</p>
                        <p className="text-sm text-muted-foreground">{eq.sourceName}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <ArrowRight className="h-4 w-4 mx-auto text-primary" />
                    </TableCell>
                    <TableCell>
                      {eq.targetCode ? (
                        <div>
                          <p className="font-medium text-foreground">{eq.targetCode}</p>
                          <p className="text-sm text-muted-foreground">{eq.targetName}</p>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">No match found</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center gap-1">
                        <span className={cn("font-semibold", getConfidenceColor(eq.confidenceScore))}>
                          {eq.confidenceScore}%
                        </span>
                        <Progress
                          value={eq.confidenceScore}
                          className="h-1 w-16"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium text-foreground">{eq.credits}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(eq.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {eq.status === 'faculty-review' && (
                          <>
                            <Button size="sm" variant="outline" className="h-7" onClick={() => handleApprove(eq.sourceCode)}>
                              <Check className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-destructive" onClick={() => handleReject(eq.sourceCode)}>
                              <X className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {eq.status === 'manual' && (
                          <Button size="sm" variant="outline" className="h-7">
                            Assign Course
                          </Button>
                        )}
                        {eq.status === 'auto-matched' && (
                          <Button size="sm" variant="ghost" className="h-7">
                            Edit
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CourseEquivalency;
