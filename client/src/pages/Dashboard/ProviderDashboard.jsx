import React, { useState, useEffect } from 'react';
import { Users, Search, TrendingUp, AlertCircle, CheckCircle, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { providerAPI } from '../../api/axios';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    filterPatientsList();
  }, [searchTerm, filterStatus, patients]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await providerAPI.getPatients();
      setPatients(response.data.data);
      setFilteredPatients(response.data.data);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to load patients list');
    } finally {
      setLoading(false);
    }
  };

  const filterPatientsList = () => {
    let filtered = patients;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by compliance status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(patient => patient.complianceStatus === filterStatus);
    }

    setFilteredPatients(filtered);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Goal Met': {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle,
      },
      'Missed Preventive Checkup': {
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: AlertCircle,
      },
      'Pending': {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        icon: Clock,
      },
    };

    const config = statusConfig[status] || statusConfig['Pending'];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 ${config.bg} ${config.text} rounded-full text-sm font-medium`}>
        <Icon size={16} />
        {status || 'Pending'}
      </span>
    );
  };

  const stats = {
    total: patients.length,
    goalMet: patients.filter(p => p.complianceStatus === 'Goal Met').length,
    missed: patients.filter(p => p.complianceStatus === 'Missed Preventive Checkup').length,
    pending: patients.filter(p => p.complianceStatus === 'Pending' || !p.complianceStatus).length,
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading patients..." />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg">
                <Users size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
                <p className="text-gray-600">Welcome back, Dr. {user?.name}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-600">{error}</p>
                <button
                  onClick={fetchPatients}
                  className="mt-2 text-sm text-red-700 underline hover:text-red-800"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Patients</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users size={24} className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Goals Met</p>
                  <h3 className="text-3xl font-bold text-green-600 mt-1">{stats.goalMet}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Missed Checkups</p>
                  <h3 className="text-3xl font-bold text-red-600 mt-1">{stats.missed}</h3>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <h3 className="text-3xl font-bold text-amber-600 mt-1">{stats.pending}</h3>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Clock size={24} className="text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search patients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="md:w-64">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="Goal Met">Goal Met</option>
                  <option value="Missed Preventive Checkup">Missed Checkup</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Patients List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Assigned Patients ({filteredPatients.length})
              </h2>
            </div>

            {filteredPatients.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchTerm || filterStatus !== 'all'
                    ? 'No patients match your filters'
                    : 'No patients assigned yet'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Patient</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Age</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Contact</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Goals</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredPatients.map((patient) => (
                      <tr key={patient._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-gray-900">{patient.name}</p>
                            <p className="text-sm text-gray-500">{patient.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700">{patient.age}</td>
                        <td className="py-4 px-6 text-gray-700">{patient.phone}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Activity size={16} className="text-teal-600" />
                            <span>{patient.stepsGoal} steps</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {getStatusBadge(patient.complianceStatus)}
                        </td>
                        <td className="py-4 px-6">
                          <Link
                            to={`/provider/patients/${patient._id}`}
                            className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium text-sm"
                          >
                            <TrendingUp size={16} />
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderDashboard;
