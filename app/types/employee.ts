
export interface Employee {
  id: string;
  name: string;
  addressLine1: string;
  addressCity: string;
  addressCountry: string;
  addressZipCode: string;
  contactMethods: {
    contactMethod: 'EMAIL' | 'PHONE';
    value: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}