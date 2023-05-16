export interface Student {
  studentId: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  graduationYear: number;
  listings: Listing[];
}

export interface Listing {
  listingId: string;
  title: string;
  description: string;
  address: string;
  price: number;
  city: string;
  state: string;
  zip: string;
  image: string;
  studentDto: Student;
}
