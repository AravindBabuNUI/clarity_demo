export interface TranscriptCourse {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  term: string;
  institution: string;
  equivalentCourse?: string;
  confidenceScore?: number;
  status: 'pending' | 'approved' | 'rejected' | 'review';
}

export interface TranscriptData {
  id: string;
  studentName: string;
  studentId: string;
  institution: string;
  dateReceived: string;
  cumulativeGPA: number;
  totalCredits: number;
  courses: TranscriptCourse[];
  status: 'processing' | 'extracted' | 'reviewed' | 'completed';
}

export interface EquivalencyMatch {
  sourceCode: string;
  sourceName: string;
  targetCode: string;
  targetName: string;
  confidenceScore: number;
  credits: number;
  status: 'auto-matched' | 'faculty-review' | 'manual' | 'rejected';
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  sourceInstitution: string;
  targetProgram: string;
  submittedDate: string;
  status: 'pending' | 'in-review' | 'completed';
  creditsTransferred: number;
  creditsTotal: number;
}
