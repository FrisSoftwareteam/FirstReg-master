"use client";

import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = (field: keyof LoginValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof LoginValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof LoginValues;
        if (path) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // Replace this with your auth logic (e.g., RTK Query mutation)
    alert(`Logged in as ${parsed.data.email}`);
  };

  return (
    <main className="mx-auto max-w-sm p-6">
      <div className="space-y-2 mb-6 text-center">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-muted-foreground">Welcome back. Please sign in.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
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
        {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        <Button type="submit" className="w-full">Sign in</Button>
      </form>

      <p className="mt-4 text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link className="text-primary underline-offset-4 hover:underline" href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
