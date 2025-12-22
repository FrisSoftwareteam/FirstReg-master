# Microsoft Authentication Setup with NextAuth.js v5

This project now includes Microsoft authentication using NextAuth.js v5 (Auth.js) with Microsoft Entra ID integration.

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your Microsoft Azure AD credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET`: A random secret for JWT encryption
- `AZURE_AD_CLIENT_ID`: Your Azure AD Application (client) ID
- `AZURE_AD_CLIENT_SECRET`: Your Azure AD client secret
- `AZURE_AD_TENANT_ID`: Your Azure AD Directory (tenant) ID
- `BACKEND_API_URL`: Your external backend API URL

### 2. Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to "Azure Active Directory" > "App registrations"
3. Click "New registration"
4. Fill in:
   - Name: Your app name
   - Supported account types: Choose appropriate option
   - Redirect URI: `http://localhost:3000/api/auth/callback/microsoft-entra-id` (for development)
5. After creation, note down:
   - Application (client) ID
   - Directory (tenant) ID
6. Go to "Certificates & secrets" and create a new client secret
7. Go to "Authentication" and add redirect URIs for production

### 3. Features Implemented

- **Microsoft Sign-In**: Users can authenticate using their Microsoft accounts
- **Session Management**: Automatic session handling with NextAuth.js
- **Route Protection**: Dashboard routes are protected and require authentication
- **Backend Integration**: After successful Microsoft auth, the app calls your external backend API
- **User Info Display**: Shows authenticated user's name and email
- **Logout Functionality**: Clean logout with session termination

### 4. How It Works

1. User clicks "Sign in with Microsoft" on the login page
2. NextAuth v5 redirects to Microsoft Entra ID's OAuth endpoint
3. After successful authentication, Microsoft redirects back to your app
4. NextAuth calls your backend API with user information
5. If backend authentication succeeds, user is redirected to dashboard
6. Protected routes check for valid session via middleware

### 5. NextAuth v5 Changes

This setup uses NextAuth v5 (Auth.js) which includes:

- New `microsoft-entra-id` provider (replaces `azure-ad`)
- Simplified configuration with `auth()` function
- Updated middleware syntax
- Improved TypeScript support

### 5. Customization

- **Backend API Integration**: Modify the `signIn` callback in `lib/auth.ts` to match your backend API
- **User Roles**: Add role-based access control in the auth callbacks
- **Additional Providers**: Add more OAuth providers in `lib/auth.ts`
- **Custom Pages**: Customize sign-in and error pages

### 6. Development

Start the development server:

```bash
npm run dev
```

The authentication flow will work at `http://localhost:3000`

### 7. Production Deployment

1. Update `NEXTAUTH_URL` to your production domain
2. Add production redirect URIs in Azure AD app registration
3. Ensure all environment variables are set in your deployment platform
