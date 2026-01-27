import { TranscriptCourse, TranscriptData, StudentRecord, EquivalencyMatch } from '@/types/transcript';

export const mockCourses: TranscriptCourse[] = [
  {
    id: '1',
    courseCode: 'CS 101',
    courseName: 'Introduction to Computer Science',
    credits: 3,
    grade: 'A',
    term: 'Fall 2023',
    institution: 'Community College of Denver',
    equivalentCourse: 'CS 105',
    confidenceScore: 95,
    status: 'approved'
  },
  {
    id: '2',
    courseCode: 'MATH 201',
    courseName: 'Calculus I',
    credits: 4,
    grade: 'B+',
    term: 'Fall 2023',
    institution: 'Community College of Denver',
    equivalentCourse: 'MATH 180',
    confidenceScore: 92,
    status: 'approved'
  },
  {
    id: '3',
    courseCode: 'ENG 110',
    courseName: 'English Composition',
    credits: 3,
    grade: 'A-',
    term: 'Spring 2024',
    institution: 'Community College of Denver',
    equivalentCourse: 'ENGL 101',
    confidenceScore: 88,
    status: 'pending'
  },
  {
    id: '4',
    courseCode: 'PHYS 150',
    courseName: 'Physics for Engineers',
    credits: 4,
    grade: 'B',
    term: 'Spring 2024',
    institution: 'Community College of Denver',
    equivalentCourse: 'PHYS 160',
    confidenceScore: 78,
    status: 'review'
  },
  {
    id: '5',
    courseCode: 'CS 201',
    courseName: 'Data Structures',
    credits: 3,
    grade: 'A',
    term: 'Spring 2024',
    institution: 'Community College of Denver',
    equivalentCourse: 'CS 261',
    confidenceScore: 91,
    status: 'approved'
  },
  {
    id: '6',
    courseCode: 'CHEM 101',
    courseName: 'General Chemistry',
    credits: 4,
    grade: 'B+',
    term: 'Fall 2023',
    institution: 'Community College of Denver',
    equivalentCourse: '',
    confidenceScore: 45,
    status: 'review'
  }
];

export const mockTranscript: TranscriptData = {
  id: 'TR-2024-001',
  studentName: 'Sarah Johnson',
  studentId: 'STU-2024-0142',
  institution: 'Community College of Denver',
  dateReceived: '2024-01-15',
  cumulativeGPA: 3.65,
  totalCredits: 21,
  courses: mockCourses,
  status: 'extracted'
};

export const mockStudentRecords: StudentRecord[] = [
  {
    id: 'SR-001',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    sourceInstitution: 'Community College of Denver',
    targetProgram: 'B.S. Computer Science',
    submittedDate: '2024-01-15',
    status: 'in-review',
    creditsTransferred: 17,
    creditsTotal: 21
  },
  {
    id: 'SR-002',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    sourceInstitution: 'Arizona State University',
    targetProgram: 'B.A. Business Administration',
    submittedDate: '2024-01-14',
    status: 'completed',
    creditsTransferred: 45,
    creditsTotal: 52
  },
  {
    id: 'SR-003',
    name: 'Emily Rodriguez',
    email: 'e.rodriguez@email.com',
    sourceInstitution: 'Santa Fe Community College',
    targetProgram: 'B.S. Nursing',
    submittedDate: '2024-01-13',
    status: 'pending',
    creditsTransferred: 0,
    creditsTotal: 34
  },
  {
    id: 'SR-004',
    name: 'James Wilson',
    email: 'jwilson@email.com',
    sourceInstitution: 'University of Texas',
    targetProgram: 'M.S. Engineering',
    submittedDate: '2024-01-12',
    status: 'in-review',
    creditsTransferred: 28,
    creditsTotal: 36
  },
  {
    id: 'SR-005',
    name: 'Ashley Martinez',
    email: 'ashley.m@email.com',
    sourceInstitution: 'UCLA',
    targetProgram: 'B.A. Psychology',
    submittedDate: '2024-01-11',
    status: 'completed',
    creditsTransferred: 62,
    creditsTotal: 68
  }
];

export const mockEquivalencies: EquivalencyMatch[] = [
  {
    sourceCode: 'CS 101',
    sourceName: 'Introduction to Computer Science',
    targetCode: 'CS 105',
    targetName: 'Fundamentals of Computing',
    confidenceScore: 95,
    credits: 3,
    status: 'auto-matched'
  },
  {
    sourceCode: 'MATH 201',
    sourceName: 'Calculus I',
    targetCode: 'MATH 180',
    targetName: 'Elements of Calculus I',
    confidenceScore: 92,
    credits: 4,
    status: 'auto-matched'
  },
  {
    sourceCode: 'PHYS 150',
    sourceName: 'Physics for Engineers',
    targetCode: 'PHYS 160',
    targetName: 'General Physics I',
    confidenceScore: 78,
    credits: 4,
    status: 'faculty-review'
  },
  {
    sourceCode: 'CHEM 101',
    sourceName: 'General Chemistry',
    targetCode: '',
    targetName: 'No Match Found',
    confidenceScore: 45,
    credits: 4,
    status: 'manual'
  }
];

export const dashboardStats = {
  totalTranscripts: 1247,
  pendingReview: 89,
  completedToday: 34,
  avgProcessingTime: '4.2 mins',
  accuracyRate: 96.8,
  creditsProcessed: 15420
};
