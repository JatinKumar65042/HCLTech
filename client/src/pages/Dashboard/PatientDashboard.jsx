import React, { useState, useEffect } from "react";
import { Activity, Moon, Droplets, Clock, Calendar, Info } from "lucide-react";

const PatientDashboard = () => {
  // Hardcoded data state
  const [metrics, setMetrics] = useState({
    stepsToday: 6500,
    stepsGoal: 10000,
    sleepHours: 7.5,
    sleepGoal: 8,
    activeMinutes: 45,
    activeGoal: 60,
    waterIntake: 1.5,
    waterGoal: 2.5,
  });

  const [reminders, setReminders] = useState([
    {
      _id: "1",
      title: "Annual Blood Test",
      dueDate: "2024-12-15",
      completed: false,
    },
    {
      _id: "2",
      title: "Dental Checkup",
      dueDate: "2024-12-20",
      completed: false,
    },
  ]);

  const [tip, setTip] = useState(
    "Drink at least 8 glasses of water a day to stay hydrated and maintain high energy levels."
  );

  const ProgressCard = ({ label, value, goal, unit, icon: Icon, color }) => {
    const percent = Math.min(100, Math.round((value / goal) * 100 || 0));

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {value}
              <span className="text-sm text-gray-500 font-normal ml-1">{unit}</span>
            </h3>
          </div>
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
          <div
            className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{percent}% of goal</span>
          <span>Goal: {goal}{unit}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John</h1>
          <p className="mt-2 text-gray-600">Here's your daily health overview.</p>
        </header>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            label="Steps"
            value={metrics.stepsToday}
            goal={metrics.stepsGoal}
            unit=""
            icon={Activity}
            color="bg-orange-500"
          />
          <ProgressCard
            label="Sleep"
            value={metrics.sleepHours}
            goal={metrics.sleepGoal}
            unit="h"
            icon={Moon}
            color="bg-indigo-500"
          />
          <ProgressCard
            label="Active Time"
            value={metrics.activeMinutes}
            goal={metrics.activeGoal}
            unit="m"
            icon={Clock}
            color="bg-green-500"
          />
          <ProgressCard
            label="Water Intake"
            value={metrics.waterIntake}
            goal={metrics.waterGoal}
            unit="L"
            icon={Droplets}
            color="bg-blue-500"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reminders Section */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Calendar size={20} className="text-teal-600" />
                Preventive Care Reminders
              </h2>
            </div>
            <div className="p-6">
              {reminders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No upcoming reminders.</p>
              ) : (
                <div className="space-y-4">
                  {reminders.map((r) => (
                    <div key={r._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-teal-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                          {new Date(r.dueDate).getDate()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{r.title}</h4>
                          <p className="text-sm text-gray-500">
                            Due: {new Date(r.dueDate).toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      {!r.completed && (
                        <span className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded-full">
                          Upcoming
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Health Tip Section */}
          <section className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl shadow-sm text-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info size={24} className="text-teal-100" />
              <h2 className="text-lg font-bold">Health Tip of the Day</h2>
            </div>
            <p className="text-teal-50 text-lg leading-relaxed">
              "{tip}"
            </p>
            <div className="mt-6 pt-6 border-t border-teal-500/30">
              <p className="text-sm text-teal-200">
                Daily tips to help you maintain a healthy lifestyle.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
