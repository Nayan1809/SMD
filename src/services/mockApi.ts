import { Course } from '../types';

// Mock API service for courses
export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to React',
    instructor: 'Sarah Johnson',
    description: 'Learn the fundamentals of React including components, state, and props.',
    duration: '8 weeks',
    category: 'Frontend Development',
    enrolledStudents: 24,
    maxStudents: 30
  },
  {
    id: '2',
    name: 'Advanced JavaScript',
    instructor: 'Michael Chen',
    description: 'Deep dive into ES6+, async programming, and modern JavaScript patterns.',
    duration: '10 weeks',
    category: 'Programming',
    enrolledStudents: 18,
    maxStudents: 25
  },
  {
    id: '3',
    name: 'UI/UX Design Principles',
    instructor: 'Emily Rodriguez',
    description: 'Master the principles of user interface and user experience design.',
    duration: '6 weeks',
    category: 'Design',
    enrolledStudents: 15,
    maxStudents: 20
  },
  {
    id: '4',
    name: 'Node.js Backend Development',
    instructor: 'David Kim',
    description: 'Build scalable backend applications with Node.js and Express.',
    duration: '12 weeks',
    category: 'Backend Development',
    enrolledStudents: 22,
    maxStudents: 28
  },
  {
    id: '5',
    name: 'Database Design & SQL',
    instructor: 'Lisa Thompson',
    description: 'Learn database design principles and master SQL queries.',
    duration: '8 weeks',
    category: 'Database',
    enrolledStudents: 19,
    maxStudents: 25
  }
];

export const fetchCourses = async (): Promise<Course[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate occasional API errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch courses. Please try again.');
  }
  
  return mockCourses;
};

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};