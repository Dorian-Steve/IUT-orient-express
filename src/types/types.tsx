// Program type
export interface Program {
  id?: string; // Made optional if not always present
  title: string; // Changed from 'name' to 'title'
  description: string;
  duration?: string; // Made optional if not always present
  level?: string; // Made optional if not always present
  department?: string; // Made optional if not always present
  credits?: number; // Made optional if not always present
  icon?: React.ReactNode; // Changed to ReactNode to allow JSX elements
  requirements?: string[];
  careerProspects?: string[];
  modules?: string[];
  // Add other properties as needed based on your program data structure
}

// Staff member type
export interface StaffMember {
  name: string;
  role: string;
  department: string;
  image: string;
  experience: string;
}

// Testimonial type
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface FooterSection {
  title: string;
  links: { href: string; label: string }[];
}

export interface Stat {
  value: string;
  label: string;
  color: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  text: string;
}
