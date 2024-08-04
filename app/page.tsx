
import { auth } from '@clerk/nextjs';
import EmployeeList from '@/components/EmployeeList';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { LockIcon, Users } from 'lucide-react';

export default function Home() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col justify-center items-center px-4">
        <div className="text-center">
          <LockIcon className="h-16 w-16 text-blue-500 mb-4 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Employee Hub</h1>
          <p className="text-xl text-gray-600 mb-8">Please sign in to access the employee management system</p>
          <SignInButton mode="modal">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
              Sign In to Continue
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Users className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Management System</h1>
          <p className="text-xl text-gray-600">Manage your workforce efficiently</p>
        </div>
        <EmployeeList />
      </div>
    </div>
  );
}