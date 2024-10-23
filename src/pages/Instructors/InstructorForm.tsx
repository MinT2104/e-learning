"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dob: z.string().min(10, {
    message: "Please provide a valid date.",
  }),
  languagesKnown: z.string().min(2, {
    message: "Please enter at least one language.",
  }),
  englishProficiency: z.string().min(2, {
    message: "Please specify your proficiency in English.",
  }),
  qualification: z.string().min(2, {
    message: "Qualification must be at least 2 characters.",
  }),
  marks: z.string().min(1, {
    message: "Please provide your marks or grade.",
  }),
  experience: z.string().min(1, {
    message: "Please specify your experience.",
  }),
});

function InstructorForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      dob: "",
      languagesKnown: "",
      englishProficiency: "",
      qualification: "",
      marks: "",
      experience: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">
        <a href="javascript:void(0)">
          <img
            src=""
            alt="logo"
            className="w-52 inline-block"
          />
        </a>
        <h4 className="text-gray-800 text-base font-semibold mt-6">
          Instructor Registration Form
        </h4>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Username field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Username</label>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                      placeholder="Enter username"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Date of Birth field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Date of Birth</label>
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      type="date"
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Languages Known field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Languages Known</label>
              <FormField
                control={form.control}
                name="languagesKnown"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                      placeholder="Enter languages (e.g., English, Spanish)"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* English Language Proficiency field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">English Proficiency</label>
              <FormField
                control={form.control}
                name="englishProficiency"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                      placeholder="e.g., Beginner, Fluent"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Qualification field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Qualification</label>
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                      placeholder="Enter qualification"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Marks/Grade field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Marks/Grade</label>
              <FormField
                control={form.control}
                name="marks"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                      placeholder="Enter marks/grade"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Experience field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Experience</label>
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                      placeholder="e.g., 5 years"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>
          </div>

          <div className="!mt-12">
            <Button
              type="submit"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default InstructorForm;
