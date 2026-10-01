import { useState, useEffect } from "react";
import type { Course } from "@/lib/types";
import { initialCourses } from "@/lib/mock-data";
import { AddNewCourseDialog } from "@/components/courses/add-new-course-dialog";
import { CourseTable } from "@/components/courses/course-table";

export const createCourseFormSchema = (existingCourses: Course[]) =>
  z.object({
    id: z
      .string()
      .length(6, { message: "รหัสวิชาต้องเป็นตัวเลข 6 หลัก" })
      .regex(/^\d+$/, { message: "รหัสวิชาต้องเป็นตัวเลขเท่านั้น" })
      .refine(
        (val) => !existingCourses.some((course) => course.id === val),
        { message: "รหัสวิชานี้มีอยู่แล้ว" }
      ),
    title: z
      .string()
      .min(1, { message: "กรุณากรอกชื่อวิชา" })
      .max(100, { message: "ชื่อวิชาต้องไม่เกิน 100 ตัวอักษร" }),
    program: z.string().min(1, { message: "เลือกหลักสูตร" }),
    semester: z.string().min(1, { message: "เลือกภาคการศึกษา" }),
    description: z
      .string()
      .max(100, { message: "รายละเอียดยาวไม่เกิน 100 ตัวอักษร" })
      .optional()
      .default(""),
    instructors: z
      .array(
        z.object({
          name: z.string().min(1, { message: "กรอกชื่อผู้สอน" }),
          email: z
            .string()
            .min(1, { message: "กรอกอีเมลผู้สอน" })
            .email({ message: "รูปแบบอีเมลไม่ถูกต้อง" })
            .endsWith("@cmu.ac.th", { message: "ต้องเป็นอีเมล @cmu.ac.th" }),
        })
      )
      .min(1, { message: "ต้องมีผู้สอนอย่างน้อย 1 คน" })
      .max(3, { message: "มีผู้สอนได้สูงสุด 3 คน" })
      .refine(
        (instructors) => {
          const emails = instructors.map((i) => i.email);
          return new Set(emails).size === emails.length;
        },
        {
          message: "อีเมลผู้สอนซ้ำกัน",
          path: ["root"],
        }
      ),
    notifyByEmail: z.boolean().default(false),
  });

export type CourseFormValues = z.infer<ReturnType<typeof createCourseFormSchema>>;