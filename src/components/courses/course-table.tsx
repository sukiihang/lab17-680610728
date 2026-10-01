import type { Course } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface CourseTableProps {
  courses: Course[];
  onDeleteCourse: (id: string) => void;
}

export function CourseTable({ courses, onDeleteCourse }: CourseTableProps) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-muted/50 border-b text-muted-foreground">
          <tr>
            <th className="p-3">รหัสวิชา</th>
            <th className="p-3">ชื่อวิชา</th>
            <th className="p-3">หลักสูตร</th>
            <th className="p-3">ภาคการศึกษา</th>
            <th className="p-3">รายละเอียด</th>
            <th className="p-3">ผู้สอน</th>
            <th className="p-3">รับข่าวสารทางอีเมล</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b hover:bg-muted/30">
              <td className="p-3 font-medium">{course.id}</td>
              <td className="p-3">{course.title}</td>
              <td className="p-3">
                <Badge variant="outline">{course.program.split(" ")[0]}</Badge>
              </td>
              <td className="p-3">{course.semester}</td>
              <td className="p-3">{course.description || "—"}</td>
              <td className="p-3">
                <div className="space-y-1">
                  {course.instructors.map((ins, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="font-semibold">{ins.name}</p>
                      <p className="text-muted-foreground">{ins.email}</p>
                    </div>
                  ))}
                </div>
              </td>
              <td className="p-3">
                <Badge variant={course.notifyByEmail ? "default" : "secondary"}>
                  {course.notifyByEmail ? "รับ" : "ไม่รับ"}
                </Badge>
              </td>
              <td className="p-3 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDeleteCourse(course.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}