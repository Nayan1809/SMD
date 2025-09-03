import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions, Course } from '../types';

interface StudentFiltersProps {
  filters: FilterOptions;
  courses: Course[];
  onFilterChange: (filters: FilterOptions) => void;
}

export function StudentFilters({ filters, courses, onFilterChange }: StudentFiltersProps) {
  const hasActiveFilters = filters.status !== 'all' || filters.course !== '';

  const clearFilters = () => {
    onFilterChange({
      status: 'all',
      course: '',
      search: filters.search // Keep search intact
    });
  };

  return (
    <section className="filters-section" aria-label="Student filters">
      <div className="filters-container">
        <div className="filters-header">
          <div className="filters-title-group">
            <Filter className="filters-icon" aria-hidden="true" />
            <h2 className="filters-title">Filter Students</h2>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn btn--secondary btn--clear"
              aria-label="Clear all active filters"
            >
              <X className="btn-icon" aria-hidden="true" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        <div className="filters-grid">
          {/* Status Filter */}
          <div className="filter-group">
            <label htmlFor="status-filter" className="filter-label">
              Student Status
            </label>
            <select
              id="status-filter"
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value as FilterOptions['status'] })}
              className="filter-select"
              aria-describedby="status-help"
            >
              <option value="all">All Students</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <div id="status-help" className="sr-only">
              Filter students by their enrollment status
            </div>
          </div>

          {/* Course Filter */}
          <div className="filter-group">
            <label htmlFor="course-filter" className="filter-label">
              Enrolled Course
            </label>
            <select
              id="course-filter"
              value={filters.course}
              onChange={(e) => onFilterChange({ ...filters, course: e.target.value })}
              className="filter-select"
              aria-describedby="course-help"
            >
              <option value="">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <div id="course-help" className="sr-only">
              Filter students by their enrolled courses
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="active-filters" aria-live="polite">
            <span className="active-filters-label">Active filters:</span>
            <div className="active-filters-list">
              {filters.status !== 'all' && (
                <span className="filter-tag">
                  Status: {filters.status}
                </span>
              )}
              {filters.course && (
                <span className="filter-tag">
                  Course: {courses.find(c => c.id === filters.course)?.name}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}