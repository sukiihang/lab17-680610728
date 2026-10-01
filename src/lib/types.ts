export interface Instructor {
  name: string;
  email: string;
}

export interface Course {
  id: string;
  courseId: string;
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
  interests?: string[];
  emails?: EmailItem[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  semester: string;
}