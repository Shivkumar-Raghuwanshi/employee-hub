"use client";

import { useState, useEffect } from "react";
import { Employee, ContactMethod } from "@/types/employee";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UpdateEmployee({ id }: { id: string }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleContactMethodChange = (index: number, field: keyof ContactMethod, value: string) => {
    setEmployee((prev) => {
      if (!prev) return null;
      const updatedContactMethods = [...prev.contactMethods];
      updatedContactMethods[index] = { ...updatedContactMethods[index], [field]: value };
      return { ...prev, contactMethods: updatedContactMethods };
    });
  };

  const addContactMethod = () => {
    setEmployee((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        contactMethods: [...prev.contactMethods, { contactMethod: 'EMAIL', value: '' }],
      };
    });
  };

  const removeContactMethod = (index: number) => {
    setEmployee((prev) => {
      if (!prev) return null;
      const updatedContactMethods = prev.contactMethods.filter((_, i) => i !== index);
      return { ...prev, contactMethods: updatedContactMethods };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        router.push(`/employee/${id}`);
      } else {
        setError("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("An error occurred while updating the employee");
    }
  };

  if (isLoading) return <EmployeeUpdateSkeleton />;
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
                <h1 className="text-3xl font-bold">Update Employee</h1>
                <p className="text-lg text-blue-200 mt-2 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" /> {employee.name}
                </p>
              </div>
            </div>
            <CountryFlag country={employee.addressCountry} size="lg" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={employee.name}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                <MapPin className="mr-3 h-6 w-6 text-blue-500" /> Address
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    value={employee.addressLine1}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="addressCity">City</Label>
                  <Input
                    id="addressCity"
                    name="addressCity"
                    value={employee.addressCity}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="addressCountry">Country</Label>
                  <Input
                    id="addressCountry"
                    name="addressCountry"
                    value={employee.addressCountry}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="addressZipCode">Zip Code</Label>
                  <Input
                    id="addressZipCode"
                    name="addressZipCode"
                    value={employee.addressZipCode}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                <Mail className="mr-3 h-6 w-6 text-blue-500" /> Contact Methods
              </h2>
              {employee.contactMethods.map((contact, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <Select
                    value={contact.contactMethod}
                    onValueChange={(value) => handleContactMethodChange(index, 'contactMethod', value as 'EMAIL' | 'PHONE')}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select contact type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMAIL">Email</SelectItem>
                      <SelectItem value="PHONE">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={contact.value}
                    onChange={(e) => handleContactMethodChange(index, 'value', e.target.value)}
                    placeholder={contact.contactMethod === 'EMAIL' ? 'Email address' : 'Phone number'}
                    className="flex-grow"
                  />
                  <Button type="button" variant="destructive" onClick={() => removeContactMethod(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addContactMethod} className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Contact Method
              </Button>
            </div>

            <div className="flex justify-between items-center mt-8">
              <Button
                type="button"
                variant="outline"
                className="flex items-center text-blue-600 border-blue-300 hover:bg-blue-50"
                onClick={() => router.back()}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function EmployeeUpdateSkeleton() {
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