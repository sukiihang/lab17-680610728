import { useState, useEffect } from "react";
import type { Course } from "@/lib/types";
import { initialCourses } from "@/lib/mock-data";
import { AddNewCourseDialog } from "@/components/courses/add-new-course-dialog";
import { CourseTable } from "@/components/courses/course-table";

const LOCAL_STORAGE_KEY = "lab17-2569-680610728";

export default function CourseManagementPage() {
  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialCourses;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6">
      <div className="space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">จัดการวิชาเรียน</h1>
            <p className="text-sm text-muted-foreground">{courses.length} วิชา — เพิ่มวิชาใหม่ได้ที่นี่</p>
          </div>
          <AddNewCourseDialog courses={courses} onAddCourse={handleAddCourse} />
        </div>

        <CourseTable courses={courses} onDeleteCourse={handleDeleteCourse} />
      </div>

      <footer className="text-center py-6 text-sm text-muted-foreground border-t mt-12">
        จัดทำโดย [สุกฤษฏิ์ วงค์อ๊อด] รหัสประจำตัวนักศึกษา 680610728 — 261207 Computer Engineering Lab
      </footer>
    </div>
  );
}