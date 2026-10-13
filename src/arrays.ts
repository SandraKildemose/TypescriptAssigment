// Part A - arrays and types
//
// Fill in each TODO. Do not change the signatures: the parameter types and
// the return types are part of the task.
//
//     npm run build
//     npm start

import { Student, Enrolment, students, courses, enrolments } from './data.js';

// --- A1. The grade report -------------------------------------------------

/**
 * One line per enrolment of a student, in the order the enrolments appear:
 *
 *     CS-101 Intro. to Computer Science: 12
 *     BIO-301 Genetics: not awarded
 *
 * A grade of null is "not awarded". The lines are joined with a newline, and
 * a student with no enrolments gives an empty string.
 *
 * You need enrolments and courses. filter (filterer ), map (laver om til nyt), find (henter det første der passer), a template literal and
 * join (joiner). No for loops in this file.
 */
export function gradeReport(studentId: string): string {

  const studentEnrollment =
      enrolments.filter(enrolment => enrolment.studentId === studentId);
  //studentEnrollment er vores array som vi forventer at indsætte det endelige resultat i.
  //enrolments er vores dataset, vi anvender et filter til det sæt, som er en korter måde at lave et loop på.
  // derefter laver vi en midlertidlig veriable kalde "Enrolment" og ved hjælp af "=>" gør det til en funktion.
  if (studentEnrollment.length === 0) {
    return "";
  }
  // Her siger vi "hvis vores array studentEnrollment ikke finder noget, så retunere ingen ting" .length er en
  // numerisk måde at tjekke hvor mange items der er
  const lines = studentEnrollment.map(enrolment => {
    const course = courses.find(
        course => course.courseId === enrolment.courseId)

    const gradeText =
        enrolment.grade === null ? "not awarded" : enrolment.grade;

    return `${enrolment.courseId} ${course?.title}: ${gradeText}`;
  });

  return lines.join("\n");

}


// --- A2. Averaging --------------------------------------------------------

/**
 * The average of a student's awarded grades, on the Danish 7-point scale
 * (12, 10, 7, 4, 02, 00, -3), rounded to one decimal.
 *
 * Grades are stored as strings, so '02' and '00' keep their leading zero.
 * Enrolments with no grade yet do not count. A student with no awarded
 * grades gives 0: divide only when there is something to divide by.
 *
 *     averageGrade('00128')   // 11  (12 and 10)
 */
export function averageGrade(studentId: string): number {
const avgGrade = enrolments.filter(enrollment => enrollment.studentId === studentId);

  const awardedGrades = avgGrade.filter(
      enrolment => enrolment.grade !== null);

  if (awardedGrades.length === 0) {
    return 0;
  }

  const stringNumb = awardedGrades.map(enrolment => {
        return Number(enrolment.grade)
      });

  const total = stringNumb.reduce((sum,grade) => {
    return sum + grade;
  },0);

  const average = total / stringNumb.length;
  const roundedAverage = Math.round(average * 10) / 10;


  return roundedAverage;
}

// --- A3. Who is missing a grade ------------------------------------------

/**
 * The names of the students who have at least one enrolment without a grade,
 * sorted alphabetically and without repeats.
 */
export function awaitingGrades(): string[] {

  const awaitGrades = enrolments.filter(enrolment => enrolment.grade === null);

  const studentIds = awaitGrades.map(enrolment => enrolment.studentId);

}

// --- A4. A family of formatters ------------------------------------------

/**
 * Returns a function that formats a student in the chosen style:
 *
 *     formatterFor('short')(student)   // 'Zhang'
 *     formatterFor('long')(student)    // 'Zhang (Comp. Sci.), 102 credits'
 *
 * The style may only be one of two strings. Try passing 'medium' and read
 * the error the compiler gives you.
 */
export function formatterFor(style: 'short' | 'long'): (student: Student) => string {
  // TODO
  throw new Error('not implemented');
}

// --- A5. Changing nothing -------------------------------------------------

/**
 * A new array in which the students of one department have extra credits.
 * Everyone else is unchanged, and the students array itself must not change
 * at all: build new objects with the three dots.
 */
export function raiseCredits(list: Student[], deptName: string, extra: number): Student[] {
  // TODO
  throw new Error('not implemented');
}
