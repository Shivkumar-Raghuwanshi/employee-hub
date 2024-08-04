import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const employees = await prisma.employee.findMany({
      where: { clerkId: userId },
    });
    return NextResponse.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const employeeData = await request.json();
    employeeData.clerkId = userId;

    const employee = await prisma.employee.create({
      data: employeeData,
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error:any) {
    console.error('Error creating employee:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An employee with this ID already exists', code: 'P2002' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}