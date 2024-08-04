"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import EmployeeDetails from "@/components/EmployeeDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ShieldAlert } from "lucide-react";

export default function EmployeeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return <LoadingState />;
  }

  if (!userId) {
    return <UnauthenticatedState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-8">
          <CardTitle className="text-2xl font-semibold text-white flex items-center justify-between">
            <div className="flex items-center">Employee Details</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="text-black border-white hover:bg-blue-700 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Suspense fallback={<LoadingState />}>
            <EmployeeDetails id={params.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <span className="ml-2 text-lg text-gray-700">Loading...</span>
    </div>
  );
}

function UnauthenticatedState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-yellow-50 border-b border-yellow-100">
          <CardTitle className="text-xl font-semibold text-yellow-700 flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Authentication Required
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">
            Please sign in to view employee details.
          </p>
          <SignInButton mode="modal">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
              Sign In
            </Button>
          </SignInButton>
        </CardContent>
      </Card>
    </div>
  );
}
