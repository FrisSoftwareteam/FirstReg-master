"use client";

import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [values, setValues] = useState<SignupValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupValues, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = (field: keyof SignupValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof SignupValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof SignupValues;
        if (path) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // Replace with your sign-up logic (e.g., RTK Query mutation)
    alert(`Account created for ${parsed.data.email}`);
  };

  return (
    <main className="mx-auto max-w-sm p-6">
      <div className="space-y-2 mb-6 text-center">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-muted-foreground">Sign up to get started.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={values.name} onChange={onChange("name")} />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={values.email} onChange={onChange("email")} />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={values.password} onChange={onChange("password")} />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={onChange("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
        {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        <Button type="submit" className="w-full">Create account</Button>
      </form>

      <p className="mt-4 text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link className="text-primary underline-offset-4 hover:underline" href="/">Sign in</Link>
      </p>
    </main>
  );
}
