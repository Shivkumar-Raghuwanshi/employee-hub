"use client";

import { useState, useEffect } from "react";
import { Employee } from "@/types/employee";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CountryFlag } from "./CountryFlag";
import {
  User,
  MapPin,
  Mail,
  Phone,
  AlertCircle,
  ChevronLeft,
  Building,
  Globe,
  MapPinned,
  Briefcase,
  Edit,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function EmployeeDetails({ id }: { id: string }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`/api/employees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmployee(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
        setError("Failed to fetch employee details");
        setIsLoading(false);
      });
  }, [id]);

  const handleUpdateClick = () => {
    toast({
      title: "Update functionality",
      description: "Update employee feature is not implemented yet.",
      variant: "default",
    });
  };

  if (isLoading) return <EmployeeDetailSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!employee) return <ErrorMessage message="Employee not found" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto mt-8 shadow-lg rounded-lg overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
          <CardTitle className="text-3xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full mr-6 shadow-lg">
                <User className="h-12 w-12 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{employee.name}</h1>
                <p className="text-lg text-blue-200 mt-2 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" /> Employee
                </p>
              </div>
            </div>
            <CountryFlag country={employee.addressCountry} size="lg" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
              <MapPin className="mr-3 h-6 w-6 text-blue-500" /> Address
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="flex items-center text-gray-700">
                <Building className="mr-3 h-5 w-5 text-blue-500" /> {employee.addressLine1}
              </p>
              <p className="flex items-center text-gray-700">
                <MapPinned className="mr-3 h-5 w-5 text-blue-500" /> {employee.addressCity}
              </p>
              <p className="flex items-center text-gray-700">
                <Globe className="mr-3 h-5 w-5 text-blue-500" /> {employee.addressCountry}
              </p>
              <p className="flex items-center text-gray-700">
                <MapPin className="mr-3 h-5 w-5 text-blue-500" /> {employee.addressZipCode}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <Mail className="mr-3 h-6 w-6 text-blue-500" /> Contact Methods
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {employee.contactMethods.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 p-4 rounded-lg"
                >
                  {contact.contactMethod === "EMAIL" ? (
                    <Mail className="mr-3 h-5 w-5 text-blue-500" />
                  ) : (
                    <Phone className="mr-3 h-5 w-5 text-green-500" />
                  )}
                  <span className="text-gray-700">{contact.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to List
              </Button>
            </Link>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleUpdateClick}
            >
              <Edit className="mr-2 h-4 w-4" /> Update Employee
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EmployeeDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto mt-8 shadow-lg rounded-lg overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
          <Skeleton className="h-12 w-2/3" />
        </CardHeader>
        <CardContent className="p-8">
          <Skeleton className="h-8 w-1/4 mb-4" />
          <Skeleton className="h-32 w-full mb-8 rounded-lg" />
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-32 mt-8" />
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <AlertCircle className="text-red-500 w-12 h-12 mb-3 mx-auto" />
        <p className="text-lg font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
}