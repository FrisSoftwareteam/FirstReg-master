import { DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    backendToken?: string;
  }

  interface User {
    backendId?: string;
    roles?: string[];
    backendToken?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    backendId?: string;
    roles?: string[];
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    backendToken?: string;
  }
}
