import { useEffect, useState } from 'react';
import { Check, AlertTriangle, Edit2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TranscriptCourse, TranscriptData } from '@/types/transcript';
import { cn } from '@/lib/utils';
import { useUploadContext } from '@/context/UploadContext';

interface ExtractedDataEditorProps {
  transcript: TranscriptData;
  onSave: (data: TranscriptData) => void;
}

export function ExtractedDataEditor({ transcript, onSave }: ExtractedDataEditorProps) {
  const {transcript: transcriptData} = useUploadContext();
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [editedCourses, setEditedCourses] = useState<TranscriptCourse[]>(transcript.courses);
  const [studentInfo, setStudentInfo] = useState({
    studentName: transcriptData?.studentInfo?.name,
    studentId: transcriptData?.studentInfo?.studentId,
    institution: transcriptData?.studentInfo?.institutionName,
    cumulativeGPA: transcriptData?.studentInfo?.cumulativeGpa,
    totalCredits: transcriptData?.studentInfo?.totalCredits
  });

  const handleCourseEdit = (courseId: string, field: keyof TranscriptCourse, value: string | number) => {
    setEditedCourses(prev =>
      prev.map(course =>
        course.id === courseId ? { ...course, [field]: value } : course
      )
    );
  };

  const handleSaveCourse = (courseId: string) => {
    setEditingCourse(null);
  };

  const handleApprove = (courseId: string) => {
    setEditedCourses(prev =>
      prev.map(course =>
        course.id === courseId ? { ...course, status: 'approved' } : course
      )
    );
  };

  const handleReject = (courseId: string) => {
    setEditedCourses(prev =>
      prev.map(course =>
        course.id === courseId ? { ...course, status: 'rejected' } : course
      )
    );
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 85) return 'text-[hsl(var(--success))] bg-[hsl(var(--success))]/10';
    if (score >= 70) return 'text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10';
    return 'text-destructive bg-destructive/10';
  };

  const getStatusBadge = (status: TranscriptCourse['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'review':
        return <Badge className="bg-[hsl(var(--warning))] hover:bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]">Needs Review</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  useEffect(() => {
    console.log('transcriptData', transcriptData);
  }, [transcriptData]);

  return (
    <Card className="bg-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Extracted Data</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="courses" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student Info</TabsTrigger>
            <TabsTrigger value="courses">Courses ({editedCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="flex-1 mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                  <Input
                    value={studentInfo.studentName}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, studentName: e.target.value }))}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                  <Input
                    value={studentInfo.studentId}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, studentId: e.target.value }))}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Source Institution</label>
                <Input
                  value={studentInfo.institution}
                  onChange={(e) => setStudentInfo(prev => ({ ...prev, institution: e.target.value }))}
                  className="bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Cumulative GPA</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={studentInfo.cumulativeGPA}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, cumulativeGPA: parseFloat(e.target.value) }))}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Total Credits</label>
                  <Input
                    type="number"
                    value={studentInfo.totalCredits}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, totalCredits: parseInt(e.target.value) }))}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-[hsl(var(--success))]" />
                <span className="text-muted-foreground">AI Confidence: 98% extraction accuracy</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="flex-1 overflow-hidden mt-4">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {transcriptData?.courseData.map((course) => (
                  <div
                    key={course.id}
                    className={cn(
                      "p-4 rounded-lg border transition-colors",
                      course.status === 'review' && "border-[hsl(var(--warning))] bg-[hsl(var(--warning))]/5",
                      course.status === 'approved' && "border-[hsl(var(--success))]/50 bg-[hsl(var(--success))]/5",
                      course.status === 'rejected' && "border-destructive/50 bg-destructive/5",
                      course.status === 'pending' && "border-border bg-accent"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {/* {getStatusBadge(course.status)} */}
                        {/* {course. && (
                          <Badge
                            variant="outline"
                            className={cn("text-xs", getConfidenceColor(course.confidenceScore))}
                          >
                            {course.confidenceScore}% match
                          </Badge>
                        )} */}
                      </div>
                      <div className="flex items-center gap-1">
                        {editingCourse === course.id ? (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleSaveCourse(course.id)}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setEditingCourse(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingCourse(course.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {editingCourse === course.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Course Code</label>
                            <Input
                              value={course.course_code}
                              onChange={(e) => handleCourseEdit(course.id, 'courseCode', e.target.value)}
                              className="bg-background h-8 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Credits</label>
                            <Input
                              type="number"
                              value={course.credits_earned}
                              onChange={(e) => handleCourseEdit(course.id, 'credits', parseInt(e.target.value))}
                              className="bg-background h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Course Name</label>
                          <Input
                            value={course.college_name}
                            onChange={(e) => handleCourseEdit(course.id, 'courseName', e.target.value)}
                            className="bg-background h-8 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-muted-foreground">Grade</label>
                            <Input
                              value={course.grade}
                              onChange={(e) => handleCourseEdit(course.id, 'grade', e.target.value)}
                              className="bg-background h-8 text-sm"
                            />
                          </div>
                          {/* <div>
                            <label className="text-xs text-muted-foreground">Equivalent Course</label>
                            <Input
                              value={course.equivalentCourse || ''}
                              onChange={(e) => handleCourseEdit(course.id, 'equivalentCourse', e.target.value)}
                              className="bg-background h-8 text-sm"
                              placeholder="e.g., CS 105"
                            />
                          </div> */}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{course.course_code}</span>
                          <span className="text-sm text-muted-foreground">{course.credits_earned} credits</span>
                        </div>
                        <p className="text-sm text-foreground">{course.college_name}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Grade: {course.grade}</span>
                          <span className="text-muted-foreground">{course.term}</span>
                        </div>
                        {/* {course?.equivalentCourse && (
                          <div className="flex items-center gap-2 text-sm bg-primary/10 p-2 rounded">
                            <span className="text-muted-foreground">Maps to:</span>
                            <span className="font-medium text-primary">{course.equivalentCourse}</span>
                          </div>
                        )} */}
                      </div>
                    )}

                    {course.status === 'review' && editingCourse !== course.id && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                        <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))]" />
                        <span className="text-xs text-muted-foreground flex-1">Requires faculty verification</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => handleApprove(course.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-destructive"
                          onClick={() => handleReject(course.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4 border-t border-border mt-4">
          <Button variant="outline" className="flex-1">
            Request Faculty Review
          </Button>
          <Button className="flex-1" onClick={() => onSave({ ...transcript, courses: editedCourses })}>
            Save & Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
