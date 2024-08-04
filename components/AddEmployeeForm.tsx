"use client";

// Import necessary dependencies and components
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Employee, ContactMethod } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Plus,
  X,
  Building,
  Globe,
} from "lucide-react";

// Define the type for employee input, excluding the 'id' field
type EmployeeInput = Omit<Employee, "id">;

export default function AddEmployeeForm() {
  // Initialize hooks
  const router = useRouter();
  const { userId } = useAuth();
  const { toast } = useToast();

  // Set up state for employee data
  const [employee, setEmployee] = useState<EmployeeInput>({
    clerkId: userId || "",
    name: "",
    addressLine1: "",
    addressCity: "",
    addressCountry: "",
    addressZipCode: "",
    contactMethods: [],
  });

  // Set up state for new contact method
  const [newContact, setNewContact] = useState<ContactMethod>({
    contactMethod: "EMAIL",
    value: "",
  });

  // Handle changes in the employee form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Handle changes in the new contact method fields
  const handleContactChange = (name: string, value: string) => {
    setNewContact({ ...newContact, [name]: value as "EMAIL" | "PHONE" });
  };

  // Add a new contact method to the employee
  const addContactMethod = () => {
    if (newContact.value) {
      setEmployee({
        ...employee,
        contactMethods: [...employee.contactMethods, newContact],
      });
      setNewContact({ contactMethod: "EMAIL", value: "" });
    }
  };

  // Remove a contact method from the employee
  const removeContactMethod = (index: number) => {
    const updatedContactMethods = [...employee.contactMethods];
    updatedContactMethods.splice(index, 1);
    setEmployee({ ...employee, contactMethods: updatedContactMethods });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send POST request to add new employee
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        // Show success toast and redirect to home page
        toast({
          title: "Success",
          description: "Employee added successfully",
          variant: "default",
        });
        router.push("/");
      } else {
        // Handle errors, including duplicate employee ID
        const errorData = await response.json();
        if (errorData.code === "P2002") {
          toast({
            title: "Error",
            description: "An employee with this ID already exists",
            variant: "destructive",
          });
        } else {
          throw new Error(errorData.message || "Failed to add employee");
        }
      }
    } catch (error) {
      // Log error and show error toast
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  // Render the form
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl mx-auto mt-8 shadow-lg rounded-lg overflow-hidden bg-white border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <CardTitle className="text-2xl font-semibold flex items-center">
            <User className="mr-3 h-6 w-6" /> Enter Employee Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name input field */}
            <div>
              <Label
                htmlFor="name"
                className="text-lg font-medium text-gray-700 flex items-center"
              >
                <User className="mr-2 h-5 w-5 text-blue-500" /> Name
              </Label>
              <Input
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                           disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                           invalid:border-pink-500 invalid:text-pink-600
                           focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>

            {/* Address section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-2">
                <MapPin className="mr-2 h-5 w-5 text-blue-500" /> Address
              </h3>
              {/* Address Line 1 input */}
              <div>
                <Label
                  htmlFor="addressLine1"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <Building className="mr-2 h-4 w-4 text-blue-500" /> Address
                  Line 1
                </Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={employee.addressLine1}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {/* City and Zip Code inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="addressCity"
                    className="text-sm font-medium text-gray-700"
                  >
                    City
                  </Label>
                  <Input
                    id="addressCity"
                    name="addressCity"
                    value={employee.addressCity}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="addressZipCode"
                    className="text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </Label>
                  <Input
                    id="addressZipCode"
                    name="addressZipCode"
                    value={employee.addressZipCode}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* Country input */}
              <div>
                <Label
                  htmlFor="addressCountry"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <Globe className="mr-2 h-4 w-4 text-blue-500" /> Country
                </Label>
                <Input
                  id="addressCountry"
                  name="addressCountry"
                  value={employee.addressCountry}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Contact Methods section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center border-b border-gray-200 pb-2">
                <Phone className="mr-2 h-5 w-5 text-blue-500" /> Contact Methods
              </h3>
              {/* Display existing contact methods */}
              <div className="space-y-2">
                {employee.contactMethods.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-3 rounded-md transition-all duration-300 hover:shadow-md"
                  >
                    {contact.contactMethod === "EMAIL" ? (
                      <Mail className="mr-3 text-blue-500 h-4 w-4" />
                    ) : (
                      <Phone className="mr-3 text-green-500 h-4 w-4" />
                    )}
                    <span className="text-sm text-gray-700">
                      {contact.value}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContactMethod(index)}
                      className="ml-auto text-gray-400 hover:text-red-500 focus:outline-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {/* Add new contact method */}
              <div className="flex space-x-2">
                <Select
                  onValueChange={(value) =>
                    handleContactChange("contactMethod", value)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="PHONE">Phone</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={newContact.value}
                  onChange={(e) => handleContactChange("value", e.target.value)}
                  placeholder="Contact Value"
                  className="flex-grow text-sm"
                />
                <Button
                  type="button"
                  onClick={addContactMethod}
                  className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 px-3 py-2 rounded-md text-sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white text-lg py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Add Employee
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}