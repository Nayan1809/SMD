import React from 'react';
import { Student } from '../types';

interface StudentChartProps {
  students: Student[];
}

export function StudentChart({ students }: StudentChartProps) {
  const activeStudents = students.filter(s => s.status === 'active').length;
  const inactiveStudents = students.filter(s => s.status === 'inactive').length;
  
  const activePercentage = students.length > 0 ? (activeStudents / students.length) * 100 : 0;
  const inactivePercentage = students.length > 0 ? (inactiveStudents / students.length) * 100 : 0;

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/50 dark:border-slate-700/50">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Student Status Distribution
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg"></div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Active Students
            </span>
          </div>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {activeStudents} ({activePercentage.toFixed(1)}%)
          </span>
        </div>
        
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-700 shadow-lg"
            style={{ width: `${activePercentage}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg"></div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Inactive Students
            </span>
          </div>
          <span className="text-lg font-bold text-red-600 dark:text-red-400">
            {inactiveStudents} ({inactivePercentage.toFixed(1)}%)
          </span>
        </div>
        
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-700 shadow-lg"
            style={{ width: `${inactivePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}