import React, { useState, useMemo } from 'react';
import { Edit, Trash2, Mail, Calendar, User, ChevronUp, ChevronDown } from 'lucide-react';
import { Student, Course, FilterOptions } from '../types';

interface StudentTableProps {
  students: Student[];
  courses: Course[];
  filters: FilterOptions;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
}

export function StudentTable({ students, courses, filters, onEditStudent, onDeleteStudent }: StudentTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Student>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 10;

  const getCourseNames = (courseIds: string[]) => {
    return courseIds
      .map(id => courses.find(course => course.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Status filter
      if (filters.status !== 'all' && student.status !== filters.status) {
        return false;
      }

      // Course filter
      if (filters.course && !student.courseIds.includes(filters.course)) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          student.name.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          getCourseNames(student.courseIds).toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [students, filters, courses]);

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredStudents, sortField, sortDirection]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedStudents, currentPage]);

  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);

  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSortIcon = (field: keyof Student) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="sort-icon" aria-hidden="true" /> : 
      <ChevronDown className="sort-icon" aria-hidden="true" />;
  };

  if (!students.length) {
    return (
      <section className="empty-state" aria-label="No students found">
        <div className="empty-state__content">
          <div className="empty-state__icon" aria-hidden="true">
            <User className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="empty-state__title">No students found</h3>
          <p className="empty-state__description">
            Get started by adding your first student to the system.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="students-table-section" aria-label="Students data table">
      <div className="table-container">
        <div className="table-wrapper">
          <table className="students-table" role="table" aria-label="Students information">
            <thead>
              <tr role="row">
                <th scope="col" className="table-header">
                  <button
                    onClick={() => handleSort('name')}
                    className="sort-button"
                    aria-label={`Sort by student name ${sortField === 'name' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                  >
                    <span>Student</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th scope="col" className="table-header">
                  <span>Courses</span>
                </th>
                <th scope="col" className="table-header">
                  <button
                    onClick={() => handleSort('status')}
                    className="sort-button"
                    aria-label={`Sort by status ${sortField === 'status' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                  >
                    <span>Status</span>
                    {getSortIcon('status')}
                  </button>
                </th>
                <th scope="col" className="table-header">
                  <span>Enrolled</span>
                </th>
                <th scope="col" className="table-header table-header--actions">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, index) => (
                <tr 
                  key={student.id} 
                  className="table-row"
                  role="row"
                >
                  <td className="table-cell table-cell--student">
                    <div className="student-info">
                      <div className="student-avatar">
                        {student.profileImage ? (
                          <img 
                            src={student.profileImage} 
                            alt={`${student.name}'s profile`}
                            className="avatar-image"
                          />
                        ) : (
                          <div className="avatar-placeholder" aria-hidden="true">
                            <User className="w-6 h-6 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="student-details">
                        <div className="student-name">
                          {student.name}
                        </div>
                        <div className="student-email">
                          <Mail className="email-icon" aria-hidden="true" />
                          <a 
                            href={`mailto:${student.email}`}
                            className="email-link"
                            aria-label={`Send email to ${student.name}`}
                          >
                            {student.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="courses-cell">
                      {getCourseNames(student.courseIds) || (
                        <span className="no-courses">No courses assigned</span>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span 
                      className={`status-badge ${student.status === 'active' ? 'status-badge--active' : 'status-badge--inactive'}`}
                      aria-label={`Student status: ${student.status}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="enrollment-date">
                      <Calendar className="date-icon" aria-hidden="true" />
                      <time dateTime={student.enrollmentDate}>
                        {new Date(student.enrollmentDate).toLocaleDateString()}
                      </time>
                    </div>
                  </td>
                  <td className="table-cell table-cell--actions">
                    <div className="action-buttons" role="group" aria-label={`Actions for ${student.name}`}>
                      <button
                        onClick={() => onEditStudent(student)}
                        className="action-btn action-btn--edit"
                        aria-label={`Edit ${student.name}'s information`}
                      >
                        <Edit className="action-icon" aria-hidden="true" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteStudent(student.id)}
                        className="action-btn action-btn--delete"
                        aria-label={`Delete ${student.name} from system`}
                      >
                        <Trash2 className="action-icon" aria-hidden="true" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="pagination" role="navigation" aria-label="Table pagination">
            <div className="pagination-info">
              <span className="pagination-text">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedStudents.length)} of {sortedStudents.length} students
              </span>
            </div>
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn pagination-btn--prev"
                aria-label="Go to previous page"
              >
                Previous
              </button>
              
              <div className="pagination-numbers" role="group" aria-label="Page numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-number ${currentPage === page ? 'pagination-number--active' : ''}`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn pagination-btn--next"
                aria-label="Go to next page"
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </div>
    </section>
  );
}