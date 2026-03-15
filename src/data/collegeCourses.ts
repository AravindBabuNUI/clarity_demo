export type CollegeCourse = {
  code: string;
  title: string;
  credits: number;
  department: string;
};

export const COLLEGE_COURSES: CollegeCourse[] = [
  // English / Writing
  { code: 'ENGL 101', title: 'College Composition', credits: 3, department: 'ENGL' },
  { code: 'ENGL 102', title: 'Critical Thinking and Writing', credits: 3, department: 'ENGL' },

  // Mathematics
  { code: 'MATH 101', title: 'College Algebra', credits: 3, department: 'MATH' },
  { code: 'MATH 150', title: 'Pre-Calculus', credits: 4, department: 'MATH' },
  { code: 'MATH 201', title: 'Statistics', credits: 4, department: 'MATH' },
  { code: 'MATH 210', title: 'Calculus I', credits: 4, department: 'MATH' },

  // Biology
  { code: 'BIOL 101', title: 'Introduction to Biology', credits: 4, department: 'BIOL' },
  { code: 'BIOL 201', title: 'Human Anatomy', credits: 4, department: 'BIOL' },
  { code: 'BIOL 202', title: 'Human Physiology', credits: 4, department: 'BIOL' },
  { code: 'BIOL 210', title: 'General Microbiology', credits: 4, department: 'BIOL' },

  // Chemistry
  { code: 'CHEM 101', title: 'General Chemistry I', credits: 5, department: 'CHEM' },
  { code: 'CHEM 201', title: 'General Chemistry II', credits: 5, department: 'CHEM' },

  // Psychology
  { code: 'PSYC 101', title: 'Introduction to Psychology', credits: 3, department: 'PSYC' },
  { code: 'PSYC 201', title: 'Developmental Psychology', credits: 3, department: 'PSYC' },
  { code: 'PSYC 210', title: 'Human Sexuality', credits: 3, department: 'PSYC' },

  // Sociology
  { code: 'SOC 101', title: 'Introduction to Sociology', credits: 3, department: 'SOC' },
  { code: 'SOC 201', title: 'Social Problems in America', credits: 3, department: 'SOC' },
  { code: 'SOC 210', title: 'Race and Ethnic Relations', credits: 3, department: 'SOC' },

  // History
  { code: 'HIST 101', title: 'World History I', credits: 3, department: 'HIST' },
  { code: 'HIST 102', title: 'World History II', credits: 3, department: 'HIST' },
  { code: 'HIST 150', title: 'History of the United States I', credits: 3, department: 'HIST' },

  // Communications / Speech
  { code: 'COMM 101', title: 'Public Speaking', credits: 3, department: 'COMM' },
  { code: 'COMM 110', title: 'Human Communication', credits: 3, department: 'COMM' },

  // Philosophy / Ethics
  { code: 'PHIL 101', title: 'Introduction to Ethics', credits: 3, department: 'PHIL' },
  { code: 'PHIL 102', title: 'Critical Thinking', credits: 3, department: 'PHIL' },
  { code: 'PHIL 110', title: 'Symbolic Logic', credits: 3, department: 'PHIL' },

  // Nursing
  { code: 'NUR 101', title: 'Foundations of Nursing', credits: 7, department: 'NUR' },
  { code: 'NUR 201', title: 'Adult Medical-Surgical Nursing', credits: 7.5, department: 'NUR' },
  { code: 'NUR 210', title: 'Pharmacology', credits: 3, department: 'NUR' },
  { code: 'NUR 220', title: 'Pathophysiology', credits: 3, department: 'NUR' },
  { code: 'NUR 230', title: 'Childbearing Family and Women Health', credits: 4.5, department: 'NUR' },
  { code: 'NUR 240', title: 'Children and Families Nursing', credits: 4.5, department: 'NUR' },

  // Economics / Business
  { code: 'ECON 101', title: 'Principles of Economics', credits: 3, department: 'ECON' },
  { code: 'ECON 210', title: 'World Economic History', credits: 3, department: 'ECON' },
  { code: 'BUS 101', title: 'Introduction to Business', credits: 3, department: 'BUS' },
  { code: 'BUS 169', title: 'Corporate Responsibility and Ethics', credits: 3, department: 'BUS' },

  // Art
  { code: 'ART 101', title: 'Introduction to Art', credits: 3, department: 'ART' },

  // Languages
  { code: 'SPAN 101', title: 'Elementary Spanish I', credits: 5, department: 'SPAN' },
  { code: 'SPAN 102', title: 'Elementary Spanish II', credits: 5, department: 'SPAN' },

  // Geography
  { code: 'GEOG 101', title: 'World Geography', credits: 3, department: 'GEOG' },
];
