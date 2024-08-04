'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Employee } from '@/types/employee';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Eye, UserPlus, AlertCircle, Loader2, Users } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  useEffect(() => {
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setError('Failed to fetch employees');
        setIsLoading(false);
      });
  }, []);

  const deleteEmployee = async (id: string) => {
    try {
      const response = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setEmployees(employees.filter(emp => emp.id !== id));
      } else {
        throw new Error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Failed to delete employee');
    }
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      await deleteEmployee(employeeToDelete.id);
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-5xl mx-auto shadow-md rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-8">
          <CardTitle className="text-2xl font-semibold text-white flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-3" />
              Employee Directory
            </div>
            <Link href="/add-employee">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300">
                <UserPlus className="h-4 w-4 mr-2" /> Add Employee
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {employees.length === 0 ? (
            <EmptyState />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 py-4">Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Employee ID</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map(employee => (
                  <TableRow key={employee.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <TableCell className="font-medium text-gray-900">{employee.name}</TableCell>
                    <TableCell className="text-gray-600">{employee.id}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/employee/${employee.id}`}>
                        <Button variant="outline" size="sm" className="mr-2 text-blue-600 border-blue-300 hover:bg-blue-50">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </Link>
                      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(employee)} className="bg-red-500 hover:bg-red-600">
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the employee
                              {employeeToDelete && ` ${employeeToDelete.name}`} and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading employees...</p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <p className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</p>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <p className="text-xl font-semibold text-gray-800 mb-2">No Employees Found</p>
      <p className="text-gray-600 mb-6">Get started by adding your first employee to the system.</p>
      <Link href="/add-employee">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
          <UserPlus className="h-5 w-5 mr-2" /> Add Your First Employee
        </Button>
      </Link>
    </div>
  );
}