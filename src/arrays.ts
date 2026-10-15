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
  const studentEnrolments = enrolments.filter(
      e => e.studentId === studentId
  );

  const lines = studentEnrolments.map(enrolment => {
    const course = courses.find(c => c.courseId === enrolment.courseId);

    const gradeText = enrolment.grade !== null
        ? enrolment.grade
        : "not awarded";

    return `${enrolment.courseId} ${course?.title}: ${gradeText}`;
  });

  return lines.join('\n');
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
  const gradedEnrolments = enrolments.filter(
    enrolment => enrolment.studentId === studentId && enrolment.grade !== null

  );

  if (gradedEnrolments.length === 0){
    return 0;
}

  const total = gradedEnrolments.reduce(
      (sum, enrolment) => sum + Number(enrolment.grade),
      0
  );

  const average = total / gradedEnrolments.length;

  return Math.round(average * 10) / 10;

}

// --- A3. Who is missing a grade ------------------------------------------

/**
 * The names of the students who have at least one enrolment without a grade,
 * sorted alphabetically and without repeats.
 */
export function awaitingGrades(): string[] {
  const ungradedEnrolment = enrolments.filter(
      enrolment => enrolment.grade === null
  );

  const studentNames = ungradedEnrolment.map(enrolment => {
    const student = students.find( e => e.id === enrolment.studentId)
    return student ? student.name : '';
  });

  const validNames = studentNames.filter(name => name !== '');

  const uniqueNames = [...new Set(validNames)]

  return uniqueNames.sort((a, b) => a.localeCompare(b));
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
export function formatterFor(FormatStyle: 'short' | 'long'): (student: Student) => string {
  if (FormatStyle === 'short') {
    return (student: Student) => student.name;
  }
  return (student: Student) => `${student.name} (${student.deptName}), ${student.totCred} credits`;

}

// --- A5. Changing nothing -------------------------------------------------

/**
 * A new array in which the students of one department have extra credits.
 * Everyone else is unchanged, and the students array itself must not change
 * at all: build new objects with the three dots.
 */
export function raiseCredits(list: Student[], deptName: string, extra: number): Student[] {
  const result = list.map(s => {

    if (s.deptName === deptName) {
      return { ...s, totCred: s.totCred + extra };
    }
    else {
      return { ...s };
    }

  });

  return result;
}
