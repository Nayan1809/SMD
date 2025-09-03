import React from 'react';
import { Users, BookOpen, TrendingUp, UserPlus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DashboardStats as Stats } from '../types';

interface DashboardStatsProps {
  stats: Stats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      change: '+12%',
      trend: 'up',
      description: 'Students enrolled in the system'
    },
    {
      title: 'Active Courses',
      value: stats.activeCourses,
      icon: BookOpen,
      change: '+5%',
      trend: 'up',
      description: 'Available courses in catalog'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      change: '+8%',
      trend: 'up',
      description: 'Students actively participating'
    },
    {
      title: 'New Enrollments',
      value: stats.newEnrollments,
      icon: UserPlus,
      change: '+15%',
      trend: 'up',
      description: 'New students this week'
    }
  ];

  return (
    <section className="dashboard-stats" aria-label="Dashboard statistics overview">
      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
          return (
            <article
              key={stat.title}
              className="stat-card"
              aria-labelledby={`stat-title-${index}`}
              aria-describedby={`stat-description-${index}`}
            >
              <div className="stat-card__header">
                <div className="stat-info">
                  <h3 id={`stat-title-${index}`} className="stat-title">
                    {stat.title}
                  </h3>
                  <div className="stat-value" aria-label={`${stat.title}: ${stat.value}`}>
                    {stat.value}
                  </div>
                </div>
                <div className="stat-icon" aria-hidden="true">
                  <Icon className="icon" />
                </div>
              </div>
              
              <div className="stat-card__footer">
                <div className={`stat-trend ${stat.trend === 'up' ? 'stat-trend--positive' : 'stat-trend--negative'}`}>
                  <TrendIcon className="trend-icon" aria-hidden="true" />
                  <span className="trend-value">{stat.change}</span>
                </div>
                <span className="trend-period">vs last month</span>
              </div>
              
              <p id={`stat-description-${index}`} className="stat-description">
                {stat.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}