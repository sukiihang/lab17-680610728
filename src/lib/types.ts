export interface Instructor {
  name: string;
  email: string;
}

export interface Course {
  id: string;
  courseId?: string; // ป้องกัน Error จาก enrollment-store.ts ที่อาจเรียกใช้ courseId
  title: string;
  program: string;
  semester: string;
  description?: string;
  instructors: Instructor[];
  notifyByEmail: boolean;
}

export interface EmailItem {
  address: string;
}

export interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  program: string;
  interests?: string[]; // ทำให้ออปชันเพื่อไม่ให้ students.tsx ฟ้อง error
  emails?: EmailItem[]; // ทำให้ออปชันเพื่อไม่ให้ students.tsx ฟ้อง error
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  semester: string;
}