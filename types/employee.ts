export interface Employee {
  id: string;
  clerkId: string;
  name: string;
  addressLine1: string;
  addressCity: string;
  addressCountry: string;
  addressZipCode: string;
  contactMethods: ContactMethod[];
}

export interface ContactMethod {
  contactMethod: 'EMAIL' | 'PHONE';
  value: string;
}