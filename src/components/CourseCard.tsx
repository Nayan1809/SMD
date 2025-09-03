import React from 'react';
import { BookOpen, User, Clock } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const enrollmentPercentage = (course.enrolledStudents / course.maxStudents) * 100;

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
              {course.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              by {course.instructor}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-600 dark:text-slate-300 rounded-full shadow-sm">
          {course.category}
        </span>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
        {course.description}
      </p>

      <div className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span className="font-medium">{course.enrolledStudents}/{course.maxStudents} enrolled</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Enrollment</span>
            <span className="font-bold">{enrollmentPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-700 shadow-lg"
              style={{ width: `${enrollmentPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}