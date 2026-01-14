"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
// import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, fetchUserProfile } from "@/lib/redux/slices/authSlice";
import { toast } from "sonner";
import { RootState } from "@/lib/redux/store";

const MicrosoftLogo = () => (
  <span className="grid grid-cols-2 grid-rows-2 gap-[2px] h-5 w-5">
    <span className="bg-[#F25022]" />
    <span className="bg-[#7FBA00]" />
    <span className="bg-[#00A4EF]" />
    <span className="bg-[#FFB900]" />
  </span>
);

const DebugLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDebugLogin = async () => {
    // Hardcoded email as requested by the user
    // "replace the debug login flow with actual api endpoint ... request body: { email: 'superadmin@company.com' }"
    const emailToSimulate = "superadmin@company.com";
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/simulate`, { email: emailToSimulate });
      if (res.data?.success && res.data?.token) {
        dispatch(
          setCredentials({
            token: res.data.token,
            user: res.data.user || { id: "debug", email: emailToSimulate },
            // permissions: res.data.permissions,
          })
        );
        // @ts-ignore
        dispatch(fetchUserProfile());
        toast.success("Debug login successful");
        router.push("/dashboard");
      } else {
        toast.error("Debug login failed");
      }
    } catch (error) {
      console.error("Debug login error:", error);
      toast.error("Debug login failed");
    }
  };

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="mt-4 p-4 border-2 border-dashed border-red-200 rounded-xl bg-red-50/50">
      <div className="space-y-3">
        <label className="text-xs font-bold text-red-500 uppercase tracking-wider">
          🚧 Debug Login (Dev Only)
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={handleDebugLogin}
            className="w-full h-10 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Simulate Super Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
};

// type LoginPageProps = {
//   searchParams: {
//     id?: string;
//     sort?: string;
//   };
// };

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const { isAuthenticated } = auth || { isAuthenticated: false };
  // const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const params = useParams();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const dispatch = useDispatch();

  const runFetch=async()=>{
   const statusParam = searchParams.get("status");
    const token = searchParams.get("token");
    const userId = searchParams.get("user_id");
    const email = searchParams.get("email");
    const message = searchParams.get("message");

    if (statusParam) {
      if (statusParam === "success" && token && userId && email) {
        // Dispatch credentials to Redux
        dispatch(
          setCredentials({
            user: { id: userId, email },
            token,
            // permissions: [],
          })
        );
        
        // @ts-ignore
        dispatch(fetchUserProfile());
        
        // Success feedback
        const successMsg = message || "Login successful";
        toast.success(successMsg);
        router.push("/dashboard");
      } else {
        // Failure feedback
        const errorMsg = message || "Login failed";
        toast.error(errorMsg);
      }
    }
  }

  useEffect(() => {
    runFetch()
  }, [searchParams, dispatch, router]);

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true);
    try {
    //   if (process.env.NEXT_PUBLIC_API_URL) {
    //   const endpoint =
    //     `/auth/microsoft/redirect`
      
    // }else{
    //     const endpoint =
    //     `/auth/microsoft/redirect/local`
    // }

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/microsoft/redirect`
      );

      if (res.data && res.data.redirect_url) {
        window.location.href = res.data.redirect_url;
        // console.log(res.data.redirect_url);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Microsoft sign-in failed:", error);
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  /*
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A225D] mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  */

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#f5f7fb] via-white to-[#eef2ff] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/login.png')",
      }}
    >
      <div className="min-h-screen flex bg-white/60 backdrop-blur-sm">
        {/* Left side - Login Form to see*/}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10">
          <div className="w-full max-w-[620px] bg-white shadow-2xl border border-gray-100 rounded-3xl py-12 px-10 space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-[32px] leading-tight font-ubuntu font-semibold text-[#0f172a] text-balance">
                Welcome to E-Stock
              </h1>
              <p className="text-[17px] text-gray-700 font-poppins">
                Sign in with your official Microsoft account
              </p>
            </div>

            <div className="space-y-6">
              <Button
                type="button"
                onClick={handleMicrosoftSignIn}
                className="w-full h-12 bg-[#1A225D] hover:bg-[#111844] text-white rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                disabled={isLoading}
                asChild
              >
                <span className="flex items-center gap-2">
                  <MicrosoftLogo />
                  {isLoading ? "Signing in..." : "Sign in with Microsoft"}
                </span>
              </Button>
              <DebugLogin />
              <p className="text-center text-sm text-gray-700 font-poppins">
                You'll be redirected to Microsoft to continue signing in.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Marketing Content */}
        <div className="hidden lg:flex flex-1 items-center justify-start px-8 xl:px-16">
          <div className="max-w-md space-y-8">
            <div className="space-y-6">
              <h2 className="text-[40px] font-ubuntu font-[500] text-primaryDarkText leading-tight text-balance mb-11">
                Solution For The
                <br />
                Registrars Industry
              </h2>
              <p className="font-ubuntu text-primaryDarkText font-[500] text-nowrap text-xl sm:text-2xl lg:text-xl xl:text-2xl">
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
