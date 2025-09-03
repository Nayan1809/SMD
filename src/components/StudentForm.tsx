import React, { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';
import { Student, Course } from '../types';
import { validateName, validateEmail, getValidationMessage } from '../utils/validation';

interface StudentFormProps {
  student: Student | null;
  courses: Course[];
  onSubmit: (studentData: Omit<Student, 'id'>) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function StudentForm({ student, courses, onSubmit, onCancel, isOpen }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profileImage: '',
    courseIds: [] as string[],
    status: 'active' as 'active' | 'inactive',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        profileImage: student.profileImage,
        courseIds: student.courseIds,
        status: student.status,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        profileImage: '',
        courseIds: [],
        status: 'active',
      });
    }
    setErrors({});
    setTouched({});
  }, [student, isOpen]);

  const validateField = (field: string, value: any) => {
    if (field === 'courses') {
      return getValidationMessage(field, formData.courseIds.length > 0 ? 'valid' : '');
    }
    return getValidationMessage(field, value);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = field === 'courses' ? formData.courseIds : formData[field as keyof typeof formData];
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allFields = ['name', 'email', 'courses'];
    const newErrors: Record<string, string> = {};
    
    allFields.forEach(field => {
      const value = field === 'courses' ? formData.courseIds : formData[field as keyof typeof formData];
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(Object.fromEntries(allFields.map(field => [field, true])));

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...formData,
        enrollmentDate: student?.enrollmentDate || new Date().toISOString(),
        lastActive: new Date().toISOString(),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
      aria-describedby="form-description"
    >
      <div className="modal-container">
        <header className="modal-header">
          <div className="modal-title-group">
            <h2 id="form-title" className="modal-title">
              {student ? 'Edit Student' : 'Add New Student'}
            </h2>
            <p id="form-description" className="modal-subtitle">
              {student ? 'Update student information and course enrollments' : 'Enter student details and assign courses'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="modal-close"
            aria-label="Close form"
          >
            <X className="close-icon" aria-hidden="true" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="student-form" noValidate>
          {/* Profile Image */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Profile Information</legend>
            
            <div className="form-group">
              <label htmlFor="profile-image" className="form-label">
                Profile Image
              </label>
              <div className="profile-image-section">
                <div className="profile-preview" aria-hidden="true">
                  {formData.profileImage ? (
                    <img 
                      src={formData.profileImage} 
                      alt="Profile preview" 
                      className="profile-image"
                    />
                  ) : (
                    <User className="profile-placeholder-icon" />
                  )}
                </div>
                <div className="profile-input-wrapper">
                  <input
                    id="profile-image"
                    type="url"
                    placeholder="Enter image URL (optional)"
                    value={formData.profileImage}
                    onChange={(e) => handleInputChange('profileImage', e.target.value)}
                    className="form-input"
                    aria-describedby="profile-image-help"
                  />
                  <div id="profile-image-help" className="form-help">
                    Provide a URL to an image for the student's profile
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Basic Information */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Basic Information</legend>
            
            {/* Name */}
            <div className="form-group">
              <label htmlFor="student-name" className="form-label form-label--required">
                Full Name
              </label>
              <input
                id="student-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                placeholder="Enter student's full name"
                aria-describedby={errors.name ? 'name-error' : 'name-help'}
                aria-invalid={!!errors.name}
                required
              />
              {!errors.name && (
                <div id="name-help" className="form-help">
                  Enter the student's complete name as it should appear in records
                </div>
              )}
              {errors.name && (
                <div id="name-error" className="form-error" role="alert">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="student-email" className="form-label form-label--required">
                Email Address
              </label>
              <input
                id="student-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                placeholder="Enter email address"
                aria-describedby={errors.email ? 'email-error' : 'email-help'}
                aria-invalid={!!errors.email}
                required
              />
              {!errors.email && (
                <div id="email-help" className="form-help">
                  This will be used for communication and login purposes
                </div>
              )}
              {errors.email && (
                <div id="email-error" className="form-error" role="alert">
                  {errors.email}
                </div>
              )}
            </div>
          </fieldset>

          {/* Course Assignment */}
          <fieldset className="form-fieldset">
            <legend className="form-legend form-legend--required">Course Enrollment</legend>
            
            <div className="form-group">
              <div className="courses-container">
                {courses.map(course => (
                  <label
                    key={course.id}
                    className="course-checkbox-label"
                  >
                    <input
                      type="checkbox"
                      checked={formData.courseIds.includes(course.id)}
                      onChange={(e) => {
                        const newCourseIds = e.target.checked
                          ? [...formData.courseIds, course.id]
                          : formData.courseIds.filter(id => id !== course.id);
                        handleInputChange('courseIds', newCourseIds);
                      }}
                      onBlur={() => handleBlur('courses')}
                      className="course-checkbox"
                      aria-describedby={`course-${course.id}-description`}
                    />
                    <div className="course-info">
                      <span className="course-name">{course.name}</span>
                      <span id={`course-${course.id}-description`} className="course-instructor">
                        by {course.instructor}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.courses && (
                <div className="form-error" role="alert">
                  {errors.courses}
                </div>
              )}
            </div>
          </fieldset>

          {/* Status */}
          <fieldset className="form-fieldset">
            <legend className="form-legend">Student Status</legend>
            
            <div className="form-group">
              <label htmlFor="student-status" className="form-label">
                Enrollment Status
              </label>
              <select
                id="student-status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="form-select"
                aria-describedby="status-help"
              >
                <option value="active">Active - Currently enrolled</option>
                <option value="inactive">Inactive - Temporarily suspended</option>
              </select>
              <div id="status-help" className="form-help">
                Active students can access courses and participate in activities
              </div>
            </div>
          </fieldset>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn--secondary btn--cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary btn--submit"
            >
              {student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}