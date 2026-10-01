import type { Course, Student, Enrollment } from "./types";

export const initialCourses: Course[] = [
  {
    id: "261207",
    courseId: "261207",
    title: "Basic Computer Engineering Lab",
    program: "CPE — วิศวกรรมคอมพิวเตอร์",
    semester: "ภาคการศึกษาที่ 1",
    description: "ปฏิบัติการพื้นฐานวิศวกรรมคอมพิวเตอร์",
    instructors: [
      { name: "Dome", email: "dome@cmu.ac.th" },
      { name: "Chanadda", email: "chanadda@cmu.ac.th" },
    ],
    notifyByEmail: true,
  },
  {
    id: "261497",
    courseId: "261497",
    title: "Full Stack Development",
    program: "CPE — วิศวกรรมคอมพิวเตอร์",
    semester: "ภาคการศึกษาที่ 2",
    description: "",
    instructors: [
      { name: "Dome", email: "dome@cmu.ac.th" },
      { name: "Nirand", email: "nirand@cmu.ac.th" },
      { name: "Chanadda", email: "chanadda@cmu.ac.th" },
    ],
    notifyByEmail: false,
  },
  {
    id: "269101",
    courseId: "269101",
    title: "Introduction to Information Systems and Network Engineering",
    program: "ISNE — วิศวกรรมระบบสารสนเทศและเครือข่าย",
    semester: "ภาคการศึกษาที่ 1",
    description: "",
    instructors: [
      { name: "KENNETH COSH", email: "kenneth.cosh@cmu.ac.th" },
    ],
    notifyByEmail: false,
  },
];

export const students: Student[] = [
  {
    studentId: "650610001",
    firstName: "สมชาย",
    lastName: "ใจดี",
    program: "CPE",
    interests: ["programming"],
    emails: [{ address: "somchai@cmu.ac.th" }],
  },
];

export const courses: Course[] = initialCourses;

export const enrollments: Enrollment[] = [];