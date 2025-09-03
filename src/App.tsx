import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { PageHeader } from './components/PageHeader';
import { DashboardStats } from './components/DashboardStats';
import { StudentChart } from './components/StudentChart';
import { StudentFilters } from './components/StudentFilters';
import { StudentTable } from './components/StudentTable';
import { StudentForm } from './components/StudentForm';
import { CourseCard } from './components/CourseCard';
import { HelpSection } from './components/HelpSection';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ToastContainer } from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToast } from './hooks/useToast';
import { fetchCourses } from './services/mockApi';
import { Student, Course, FilterOptions } from './types';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useLocalStorage<Student[]>('students', []);
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    course: '',
    search: ''
  });

  const { toasts, addToast, removeToast } = useToast();

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load courses on mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setCoursesLoading(true);
      setCoursesError(null);
      const coursesData = await fetchCourses();
      setCourses(coursesData);
    } catch (error) {
      setCoursesError(error instanceof Error ? error.message : 'Failed to load courses');
    } finally {
      setCoursesLoading(false);
    }
  };

  const dashboardStats = useMemo(() => {
    const totalStudents = students.length;
    const activeCourses = courses.length;
    const activeStudents = students.filter(s => s.status === 'active').length;
    const completionRate = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;
    const newEnrollments = students.filter(s => {
      const enrollmentDate = new Date(s.enrollmentDate);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return enrollmentDate >= oneWeekAgo;
    }).length;

    return {
      totalStudents,
      activeCourses,
      completionRate,
      newEnrollments
    };
  }, [students, courses]);

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    if (student && confirm(`Are you sure you want to delete ${student.name}?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
      addToast(`${student.name} has been deleted`, 'success');
    }
  };

  const handleStudentSubmit = (studentData: Omit<Student, 'id'>) => {
    if (selectedStudent) {
      // Update existing student
      setStudents(prev => prev.map(s => 
        s.id === selectedStudent.id 
          ? { ...studentData, id: selectedStudent.id }
          : s
      ));
      addToast(`${studentData.name} has been updated`, 'success');
    } else {
      // Add new student
      const newStudent: Student = {
        ...studentData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setStudents(prev => [...prev, newStudent]);
      addToast(`${studentData.name} has been added`, 'success');
    }
    
    setIsFormOpen(false);
    setSelectedStudent(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedStudent(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    addToast(`Switched to ${!darkMode ? 'dark' : 'light'} mode`, 'info', 2000);
  };

  return (
    <div className="app-container">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main id="main-content" className="main-content" role="main">
        <div className="content-wrapper">
          {activeTab === 'dashboard' && (
            <div className="dashboard-layout">
              <PageHeader
                title="Dashboard Overview"
                subtitle="Monitor your student management metrics and insights"
              />
              
              <DashboardStats stats={dashboardStats} />
              
              <div className="dashboard-grid">
                <section className="chart-section" aria-labelledby="chart-title">
                  <StudentChart students={students} />
                </section>
                
                <aside className="activity-sidebar" aria-labelledby="activity-title">
                  <div className="activity-container">
                    <h3 id="activity-title" className="activity-title">
                      Recent Activity
                    </h3>
                    <div className="activity-list">
                      {students.slice(0, 5).map(student => (
                        <article key={student.id} className="activity-item">
                          <div className="activity-avatar" aria-hidden="true">
                            <span className="avatar-initial">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div className="activity-details">
                            <h4 className="activity-name">{student.name}</h4>
                            <p className="activity-description">
                              Enrolled in {student.courseIds.length} courses
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="students-layout">
              <PageHeader
                title="Student Management"
                subtitle="Add, edit, and manage your students"
                showAddButton
                onAddClick={handleAddStudent}
                showSearch
                searchValue={filters.search}
                onSearchChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
              />
              
              <StudentFilters
                filters={filters}
                courses={courses}
                onFilterChange={setFilters}
              />
              
              <StudentTable
                students={students}
                courses={courses}
                filters={filters}
                onEditStudent={handleEditStudent}
                onDeleteStudent={handleDeleteStudent}
              />
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="courses-layout">
              <PageHeader
                title="Course Catalog"
                subtitle="Available courses and enrollment information"
              />
              
              {coursesLoading && (
                <LoadingSpinner size="lg" message="Loading courses..." />
              )}
              
              {coursesError && (
                <ErrorMessage message={coursesError} onRetry={loadCourses} />
              )}
              
              {!coursesLoading && !coursesError && (
                <section className="courses-grid" aria-label="Available courses">
                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="course-item"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CourseCard course={course} />
                    </div>
                  ))}
                </section>
              )}
            </div>
          )}

          {activeTab === 'help' && (
            <div className="help-layout">
              <PageHeader
                title="Help & Documentation"
                subtitle="Everything you need to know about using the dashboard"
              />
              <HelpSection />
            </div>
          )}
        </div>
      </main>

      <StudentForm
        student={selectedStudent}
        courses={courses}
        onSubmit={handleStudentSubmit}
        onCancel={handleFormCancel}
        isOpen={isFormOpen}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;