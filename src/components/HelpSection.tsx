import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Book, Users, Settings, HelpCircle } from 'lucide-react';

export function HelpSection() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'getting-started': true
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      content: [
        {
          title: 'Adding Your First Student',
          steps: [
            'Navigate to the Students tab from the main navigation',
            'Click the "Add Student" button in the top right',
            'Fill in the required fields: Name and Email',
            'Optionally add a profile image URL',
            'Select one or more courses from the available list',
            'Choose the student status (Active/Inactive)',
            'Click "Add Student" to save'
          ]
        },
        {
          title: 'Managing Existing Students',
          steps: [
            'Use the search bar to find specific students',
            'Filter by status or course enrollment',
            'Click the edit icon (pencil) to modify student details',
            'Click the delete icon (trash) to remove a student',
            'Changes are saved automatically'
          ]
        }
      ]
    },
    {
      id: 'courses',
      title: 'Course Management',
      icon: Users,
      content: [
        {
          title: 'Understanding Courses',
          steps: [
            'Courses are loaded from our course catalog',
            'Each course shows enrollment numbers and capacity',
            'Students can be enrolled in multiple courses',
            'Course progress is tracked automatically'
          ]
        },
        {
          title: 'Assigning Courses',
          steps: [
            'Open the student edit form',
            'Scroll to the "Enrolled Courses" section',
            'Check the boxes for courses you want to assign',
            'Uncheck boxes to remove course enrollments',
            'Save the changes'
          ]
        }
      ]
    },
    {
      id: 'features',
      title: 'Advanced Features',
      icon: Settings,
      content: [
        {
          title: 'Using Filters and Search',
          steps: [
            'Type in the search box to find students by name or email',
            'Use status filter to show only active or inactive students',
            'Filter by specific courses to see enrollment',
            'Combine filters for more precise results',
            'Clear filters by selecting "All" options'
          ]
        },
        {
          title: 'Dashboard Analytics',
          steps: [
            'View key metrics in the dashboard overview',
            'Monitor student status distribution',
            'Track course enrollment trends',
            'Use charts to visualize data patterns'
          ]
        }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I upload a student profile image?',
      answer: 'Currently, you can add a profile image by providing a URL to an existing image. In the student form, paste the image URL in the "Profile Image" field.'
    },
    {
      question: 'Can I bulk import students?',
      answer: 'Bulk import is not available in this version. Students must be added individually through the form interface.'
    },
    {
      question: 'What happens when I delete a student?',
      answer: 'Deleting a student permanently removes them from the system. This action cannot be undone, so please confirm before proceeding.'
    },
    {
      question: 'How do course enrollments work?',
      answer: 'Students can be enrolled in multiple courses. Course capacity limits are displayed but not enforced in this demo version.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Help & Documentation
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Everything you need to know about using the Student Management Dashboard
        </p>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quick Start
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">1</div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Add Students</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Start by adding students to your dashboard with their basic information.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">2</div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Assign Courses</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Enroll students in available courses from the course catalog.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">3</div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Track Progress</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monitor student progress and course completion rates.</p>
          </div>
        </div>
      </div>

      {/* Detailed Guides */}
      <div className="space-y-6">
        {helpSections.map(section => {
          const Icon = section.icon;
          const isOpen = openSections[section.id];
          
          return (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {isOpen && (
                <div className="px-6 pb-6 space-y-6">
                  {section.content.map((item, index) => (
                    <div key={index}>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h4>
                      <ol className="space-y-2">
                        {item.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                              {stepIndex + 1}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mentoring Guide */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🎓 Developer Learning Guide
        </h3>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This dashboard demonstrates key React and JavaScript concepts:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">React Hooks in Action</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <strong>useState:</strong> Managing component state (students, filters, forms)</li>
                <li>• <strong>useEffect:</strong> Data fetching and side effects</li>
                <li>• <strong>useMemo:</strong> Performance optimization for filtering/sorting</li>
                <li>• <strong>Custom hooks:</strong> Reusable logic (useLocalStorage, useToast)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">JavaScript Concepts</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <strong>Async/Await:</strong> API calls with proper error handling</li>
                <li>• <strong>Array methods:</strong> Filter, map, sort for data manipulation</li>
                <li>• <strong>Event handling:</strong> Form validation and user interactions</li>
                <li>• <strong>Local storage:</strong> Persisting user preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}