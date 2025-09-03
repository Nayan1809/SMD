import React from 'react';
import { BarChart3, Users, BookOpen, HelpCircle, GraduationCap, Moon, Sun } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Sidebar({ activeTab, setActiveTab, darkMode, toggleDarkMode }: SidebarProps) {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'help', label: 'Help & Guide', icon: HelpCircle },
  ];

  return (
    <aside 
      className="sidebar"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <header className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon" aria-hidden="true">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="logo-text">
            <h1 className="logo-title">EduFlow</h1>
            <p className="logo-subtitle">Student Management</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sidebar-nav" role="navigation" aria-label="Dashboard sections">
        <ul className="nav-list">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id} className="nav-item">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`nav-button ${isActive ? 'nav-button--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon 
                    className="nav-icon" 
                    aria-hidden="true"
                  />
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme Toggle */}
      <footer className="sidebar-footer">
        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          aria-pressed={darkMode}
        >
          {darkMode ? (
            <Sun className="theme-icon" aria-hidden="true" />
          ) : (
            <Moon className="theme-icon" aria-hidden="true" />
          )}
          <span className="theme-label">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </footer>
    </aside>
  );
}