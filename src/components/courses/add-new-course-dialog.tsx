"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCourseFormSchema, CourseFormValues } from "@/lib/schemas/course-schema";
import { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X, RotateCcw } from "lucide-react";

interface AddNewCourseDialogProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
}

export function AddNewCourseDialog({ courses, onAddCourse }: AddNewCourseDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(createCourseFormSchema(courses)),
    mode: "onBlur",
    defaultValues: {
      id: "",
      title: "",
      program: "",
      semester: "",
      description: "",
      instructors: [{ name: "", email: "" }],
      notifyByEmail: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "instructors",
  });

  const descriptionValue = form.watch("description") || "";

  const onSubmit = (data: CourseFormValues) => {
    onAddCourse(data);
    form.reset();
    setOpen(false);
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> เพิ่มวิชา
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>เพิ่มวิชาใหม่</DialogTitle>
          <p className="text-sm text-muted-foreground">
            ลองใส่รหัสวิชาไม่ครบ 6 หลัก ใส่รหัสที่มีอยู่แล้ว ใส่อีเมลผู้สอนที่ไม่ใช่ @cmu.ac.th หรือพิมพ์คำบรรยายรายละเอียดเกิน 100 ตัวอักษร แล้วกดบันทึก
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="space-y-2">
            <Label>รหัสวิชา</Label>
            <Controller
              name="id"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <Input {...field} placeholder="261305" aria-invalid={!!fieldState.error} />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>ชื่อวิชา</Label>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <Input {...field} placeholder="Mobile Application Development" aria-invalid={!!fieldState.error} />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>หลักสูตร</Label>
            <Controller
              name="program"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger aria-invalid={!!fieldState.error}>
                      <SelectValue placeholder="เลือกหลักสูตร" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CPE — วิศวกรรมคอมพิวเตอร์">CPE — วิศวกรรมคอมพิวเตอร์</SelectItem>
                      <SelectItem value="ISNE — วิศวกรรมระบบสารสนเทศและเครือข่าย">ISNE — วิศวกรรมระบบสารสนเทศและเครือข่าย</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>ภาคการศึกษา</Label>
            <Controller
              name="semester"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ภาคการศึกษาที่ 1" id="sem1" />
                      <Label htmlFor="sem1">ภาคการศึกษาที่ 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ภาคการศึกษาที่ 2" id="sem2" />
                      <Label htmlFor="sem2">ภาคการศึกษาที่ 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ภาคฤดูร้อน" id="summer" />
                      <Label htmlFor="summer">ภาคฤดูร้อน</Label>
                    </div>
                  </RadioGroup>
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>รายละเอียด (ไม่บังคับ)</Label>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <Textarea {...field} placeholder="พัฒนาแอปพลิเคชันบนอุปกรณ์เคลื่อนที่ด้วย React Native" aria-invalid={!!fieldState.error} />
                  <div className={`text-sm mt-1 text-right ${descriptionValue.length > 100 ? "text-red-500 font-semibold" : "text-muted-foreground"}`}>
                    {descriptionValue.length}/100 ตัวอักษร
                  </div>
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>ผู้สอน ({fields.length}/3 คน — กรอกชื่อผู้สอน และอีเมล name@cmu.ac.th)</Label>
            </div>

            {fields.map((item, index) => (
              <div key={item.id} className="flex items-start gap-2 bg-secondary/20 p-3 rounded-lg">
                <span className="mt-2 text-sm font-medium">{index + 1}.</span>
                <div className="flex-1 space-y-1">
                  <Controller
                    name={`instructors.${index}.name`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Input {...field} placeholder="กรอกชื่อผู้สอน" aria-invalid={!!fieldState.error} />
                    )}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Controller
                    name={`instructors.${index}.email`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <div>
                        <Input {...field} placeholder="name@cmu.ac.th" aria-invalid={!!fieldState.error} />
                        {fieldState.error && (
                          <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={fields.length <= 1}
                  onClick={() => remove(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {form.formState.errors.instructors?.root && (
              <p className="text-sm text-red-500">{form.formState.errors.instructors.root.message}</p>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={fields.length >= 3}
              onClick={() => append({ name: "", email: "" })}
            >
              + เพิ่มผู้สอน
            </Button>
          </div>

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <div className="space-y-0.5">
              <Label>รับข่าวสารทางอีเมล</Label>
              <p className="text-xs text-muted-foreground">แจ้งเตือนผู้สอนเมื่อเปิดลงทะเบียน</p>
            </div>
            <Controller
              name="notifyByEmail"
              control={form.control}
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" /> ล้างฟอร์ม
            </Button>
            <Button type="submit">บันทึก</Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}