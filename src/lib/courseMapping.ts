import { COLLEGE_COURSES } from '@/data/collegeCourses';
import { EquivalencyMatch } from '@/types/transcript';

/**
 * Maps department codes found in student transcripts to our college's
 * canonical department codes. Handles abbreviation variants across institutions.
 */
const DEPT_NORMALIZE: Record<string, string> = {
  // English variants
  ENGLISH: 'ENGL',
  ENG: 'ENGL',

  // Biology variants (Anatomy and Microbiology map to BIOL since we have those courses there)
  BIOLOGY: 'BIOL',
  BIO: 'BIOL',
  ANATOMY: 'BIOL',
  MICRO: 'BIOL',

  // Psychology variants
  PSYCH: 'PSYC',
  PSY: 'PSYC',

  // Philosophy variants
  PHILOS: 'PHIL',
  PHI: 'PHIL',
  PHILOSOPHY: 'PHIL',
  // Religious Studies → Ethics / Philosophy
  RST: 'PHIL',

  // History variants
  HISTORY: 'HIST',

  // Economics variants
  ECO: 'ECON',

  // Math variants
  MTH: 'MATH',

  // Speech → Communications
  SPE: 'COMM',

  // Sociology-adjacent disciplines
  SW: 'SOC',       // Social Work
  ETHS: 'SOC',     // Ethnic Studies
  CHICANO: 'SOC',  // Chicano Studies
};

/**
 * Extracts the department prefix from a course code.
 * Works for both spaced codes ("MATH 201") and compact codes ("NUR062T", "BIO005").
 */
function getDeptCode(courseCode: string): string {
  // Take the first whitespace-delimited token, then strip any trailing digits/symbols
  return courseCode.split(/\s+/)[0].replace(/\d.*$/, '').toUpperCase();
}

function normalizeDept(rawDept: string): string {
  return DEPT_NORMALIZE[rawDept] ?? rawDept;
}

/**
 * Checks if two words are equivalent, including prefix matching for abbreviations.
 * e.g. "intro" matches "introduction", "anat" matches "anatomy"
 */
function wordMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length >= 4 && b.startsWith(a)) return true;
  if (b.length >= 4 && a.startsWith(b)) return true;
  return false;
}

/**
 * Computes a Jaccard-style similarity score between two course titles.
 * Uses prefix matching to handle abbreviated words.
 * Returns a value in [0, 1].
 */
function titleSimilarity(titleA: string, titleB: string): number {
  const tokenize = (s: string) =>
    s.toLowerCase().split(/\W+/).filter(w => w.length > 2);

  const wordsA = tokenize(titleA);
  const wordsB = tokenize(titleB);

  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  let matches = 0;
  const usedB = new Set<number>();

  for (const wa of wordsA) {
    for (let i = 0; i < wordsB.length; i++) {
      if (!usedB.has(i) && wordMatch(wa, wordsB[i])) {
        matches++;
        usedB.add(i);
        break;
      }
    }
  }

  const union = wordsA.length + wordsB.length - matches;
  return union === 0 ? 0 : matches / union;
}

type StudentCourse = {
  id: string;
  course_code: string;
  course_title: string;
  credits_earned: number;
  grade: string | null;
  term: string;
};

/**
 * For each course in our college catalog (source), finds the best matching
 * course from the student's transcript (target) using department normalization
 * and title similarity scoring.
 *
 * Confidence scoring:
 *   base 40 (dept match) + up to 55 points from title similarity = max 95
 *
 * Status assignment:
 *   ≥ 85  → auto-matched
 *   < 85  → faculty-review
 *   no dept match → manual (confidence 0)
 */
export function computeEquivalencies(studentCourses: StudentCourse[]): EquivalencyMatch[] {
  return COLLEGE_COURSES.map(sourceCourse => {
    const sourceDept = normalizeDept(getDeptCode(sourceCourse.code));

    // Find all student courses whose normalized dept matches
    const candidates = studentCourses.filter(sc => {
      const scDept = normalizeDept(getDeptCode(sc.course_code));
      return scDept === sourceDept;
    });

    if (candidates.length === 0) {
      return {
        sourceCode: sourceCourse.code,
        sourceName: sourceCourse.title,
        targetCode: '',
        targetName: '',
        confidenceScore: 0,
        credits: sourceCourse.credits,
        status: 'manual' as const,
      };
    }

    // Pick the candidate with the highest title similarity
    let bestCandidate = candidates[0];
    let bestSimilarity = titleSimilarity(sourceCourse.title, candidates[0].course_title);

    for (let i = 1; i < candidates.length; i++) {
      const sim = titleSimilarity(sourceCourse.title, candidates[i].course_title);
      if (sim > bestSimilarity) {
        bestSimilarity = sim;
        bestCandidate = candidates[i];
      }
    }

    const confidence = Math.min(95, Math.round(40 + bestSimilarity * 55));
    const status: EquivalencyMatch['status'] = confidence >= 85 ? 'auto-matched' : 'faculty-review';

    return {
      sourceCode: sourceCourse.code,
      sourceName: sourceCourse.title,
      targetCode: bestCandidate.course_code,
      targetName: bestCandidate.course_title,
      confidenceScore: confidence,
      credits: bestCandidate.credits_earned,
      status,
    };
  });
}
