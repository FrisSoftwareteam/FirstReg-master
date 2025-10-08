"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Key, Check, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });
  const router = useRouter();

  const rememberMe = watch("rememberMe");
  const {
    ref: passwordRef,
    onBlur: rhfPasswordOnBlur,
    ...passwordFieldProps
  } = register("password");

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Login data:", data);
    // Redirect to dashboard
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/login.png')",
      }}
    >
      <div className="min-h-screen flex bg-[rgba(255,255,255,0.5)]">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[550px] bg-white rounded shadow-lg border border-gray-100 py-12 px-8 space-y-6 min-h-[55vh]">
            <div className="text-center space-y-2 mt-16 lg:mt-0 mb-10">
              <h1 className="text-3xl font-ubuntu font-[500] text-textBlack text-balance">
                Welcome to E-Stock
              </h1>
              <p className="text-[18px] text-textBlack font-poppins">
                Please enter your official email details to sign in
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col gap-4"
            >
              <div className="space-y-1">
                <Label htmlFor="email" className="sr-only">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F2F2F2] h-4 w-4 fill-[#5A5A5A]"
                    fill="currentColor"
                  />
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-[#F2F2F2] h-6 w-[0.5px] bg-[#a8a7a7]"></div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className="pl-10 h-12 bg-[#F2F2F2] border border-gray-200 focus:border-gray-300 focus:ring-0 text-sm placeholder:text-gray-400"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A5A5A] h-4 w-4" />
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-[#F2F2F2] h-6 w-[0.5px] bg-[#a8a7a7]"></div>
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="pl-10 h-12 bg-[#F2F2F2] border border-gray-200 focus:border-gray-300 focus:ring-0 text-sm placeholder:text-gray-400"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={(e) => {
                      setIsPasswordFocused(false);
                      rhfPasswordOnBlur(e);
                    }}
                    ref={passwordRef}
                    {...passwordFieldProps}
                  />
                  {isPasswordFocused && (
                    <button
                      type="button"
                      aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5A5A]"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setIsPasswordVisible((v) => !v)}
                    >
                      {isPasswordVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setValue("rememberMe", !!checked)
                    }
                    className="h-4 w-4"
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-gray-700 font-normal"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-full text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}{" "}
                  <User className="ml-2 text-[#F2F2F2]" size={16} />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Marketing Content */}
        <div className="hidden lg:flex flex-1 items-center justify-start px-8 xl:px-16">
          <div className="max-w-md space-y-8">
            <div className="space-y-6">
              <h2 className="text-[35px] font-ubuntu font-[500] text-primaryDarkText leading-tight text-balance mb-11">
                Solution For The
                <br />
                Registrars Industry
              </h2>
              <p className="text-lg font-ubuntu text-[26px] text-primaryDarkText font-[500] text-nowrap">
                {"Manage clients' shareholder data and many more"}
              </p>
            </div>

            <div className="space-y-3 flex flex-col gap-4">
              {[
                "Seamless Setup & Control",
                "Efficient Processes",
                "Powerful Enquiries",
                "Insightful Reporting",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-2 h-2 text-white stroke-[3]" />
                  </div>
                  <span className="text-textBlack font-poppins font-[400] text-[18px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
