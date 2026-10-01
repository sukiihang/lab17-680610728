export interface Instructor {
  name: string;
  email: string;
}

export interface Course {
  id: string;
  title: string;
  program: string;
  semester: string;
  description?: string; 
  instructors: Instructor[]; 
  notifyByEmail: boolean; 
}