export interface Student {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  courseIds: string[];
  status: 'active' | 'inactive';
  enrollmentDate: string;
  lastActive: string;
}

export interface Course {
  id: string;
  name: string;
  instructor: string;
  description: string;
  duration: string;
  category: string;
  enrolledStudents: number;
  maxStudents: number;
}

export interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  completionRate: number;
  newEnrollments: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface FilterOptions {
  status: 'all' | 'active' | 'inactive';
  course: string;
  search: string;
}