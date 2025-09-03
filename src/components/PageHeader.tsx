import React from 'react';
import { Plus, Search } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: React.ReactNode;
}

export function PageHeader({ 
  title, 
  subtitle, 
  showAddButton, 
  onAddClick, 
  showSearch, 
  searchValue, 
  onSearchChange,
  children 
}: PageHeaderProps) {
  return (
    <header className="page-header" role="banner">
      <div className="page-header__content">
        <div className="page-header__text">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>

        <div className="page-header__actions">
          {showSearch && (
            <div className="search-container" role="search">
              <label htmlFor="global-search" className="sr-only">
                Search students, courses, and content
              </label>
              <div className="search-input-wrapper">
                <Search 
                  className="search-icon" 
                  aria-hidden="true"
                />
                <input
                  id="global-search"
                  type="search"
                  placeholder="Search students, courses..."
                  value={searchValue || ''}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="search-input"
                  aria-describedby="search-help"
                />
              </div>
              <div id="search-help" className="sr-only">
                Search by student name, email, or course name
              </div>
            </div>
          )}
          
          {children}
          
          {showAddButton && (
            <button
              onClick={onAddClick}
              className="btn btn--primary btn--add"
              aria-label="Add new student"
            >
              <Plus className="btn-icon" aria-hidden="true" />
              <span>Add New</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}