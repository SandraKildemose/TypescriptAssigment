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

  const awaitGrades = enrolments.filter(
      enrolment => enrolment.grade === null);
  // Her skaber vi et array der hedder awaitGrades, dette array anvender datasættet enrolments hvor vi
  // .filter efter studerende der ikke har en karakter. Dette betyder vi kun får rows med studerende er ikke har en karakter aka grade.
  const studentIds: string[] = awaitGrades.map(
      enrolment => enrolment.studentId
  );
// Her skaber vi et array kaldt studentids som anvender .map på vores tidligere array "awaitGrades" hvor vi ændre den data som befinder sig inde
// i "awaitGrades" her siger vi at vi kun ønsker visuelt at få studentId vist når vi søger efter en studerende med en karakter der er NULL
  const studentNames = studentIds.map(studentId => {
    const student: Student | undefined = students.find(
        student => student.id === studentId
    );
// Her forsøger vi at sætte "enrollments" datasættet sammen med "students" datasættet. Vi laver et array kaldt studentNames som anvender .map til
    // at ændre eksisterende data inde i "studentIds" array. Formålet er at bruge id'et fra "enrollments" til at finde tilsvarende id fra "students"
      // hvor vi derefter så kan kalde på navnet fra "students" for at kunne kende vores studerende ved navn.
    return student?.name;

  });

  const validNames = studentNames.filter(
      name => name !== undefined
  );
// Vi lover i funktionen at retunere string, idet vi har sagt i "studentNames" arry undifiend, så kan return ikke lig det, fordi vi lover
  // at give den en string, så den brokker sig fordi der er en chance for at undefiend forkommer. denne const sørger for at hvis undefiend forkommer
  // så fjeren vi den fra arrayet
  const uniqueNames = new Set(validNames);
// Her sørger vi for at der kun kan forekomme en unik værdi så et navn ikke oppper op to gange, derefter omdanner vi "uniqueNames" til et array.
  // og til sidst så sotere i abc
  const uniqueNamesArray = Array.from(uniqueNames);

  return uniqueNamesArray.sort();
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
// Husk dette er en higher-order function fordi den retuner en anden funtion som output.
export function formatterFor(style: 'short' | 'long'): (student: Student) => string {
// Her er der to måder denne funktion kan opføre sig på. man kan inputte "short" eller "long" vi definer hvad disse to mugliheder gør
  //inden i funktionen, derefter siger funktionen at vores yder funktion anvender vi ti at få fat på ønsket resultat "(student: Student) => string
  if (style === 'short') {
    return (student: Student) => {
      return student.name;
    };
  }
  //Nu siger vi at hvis inputter er short så skal den ydre funktion kun retunere student.name, så dette er student: student funktionens opførelse.
  return (student: Student) => {
    return `${student.name} (${student.deptName}), ${student.totCred} credits`;
  };
  //Dette er samme princip som short, men fordi "short" enten er sandt eller falsk så behøver vi ikke at definere "long" her, vi kan
  // bare sige hvad vi ønsker funktioner gør i tilfælde af false.
}

// --- A5. Changing nothing -------------------------------------------------

/**
 * A new array in which the students of one department have extra credits.
 * Everyone else is unchanged, and the students array itself must not change
 * at all: build new objects with the three dots.
 */
export function raiseCredits(list: Student[], deptName: string, extra: number): Student[] {
  // Så denne funktion har tre inputs. det første input giver information omkring hvilke datasæt vi arbedjer med hvilke er students. derefter deptName og credits.
  return list.map(student => {
// Vi siger at vores student array skal fremvises anderledes ved hjælp af .map, vi siger at vi ønsker kun den studerende der matcher et deptName vi har indsat.
    // derefter ønsker vi at tage alt information fra student array og laver et nyt student array ved hjælp af "...student" derefter siger vi at
    // totCred skal + i inputfeltet "extra"
    if (student.deptName === deptName) {
      return {
        ...student,
        totCred: student.totCred + extra
      };
    }

    return student;
  });

}
