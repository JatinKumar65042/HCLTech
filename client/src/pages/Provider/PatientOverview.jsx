import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Activity, Droplets, Moon, Clock, Calendar, TrendingUp, AlertCircle, CheckCircle, Save } from 'lucide-react';
import { providerAPI } from '../../api/axios';
import Navbar from '../../components/Navbar';
import LoadingSpinner from '../../components/LoadingSpinner';

const PatientOverview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [patientData, setPatientData] = useState(null);
    const [complianceStatus, setComplianceStatus] = useState('');

    useEffect(() => {
        fetchPatientOverview();
    }, [id]);

    const fetchPatientOverview = async () => {
        try {
            setLoading(true);
            const response = await providerAPI.getPatientOverview(id);
            setPatientData(response.data.data);
            setComplianceStatus(response.data.data.profile.complianceStatus || 'Pending');
        } catch (err) {
            console.error('Error fetching patient overview:', err);
            setError('Failed to load patient data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCompliance = async () => {
        try {
            setSaving(true);
            setError(null);
            await providerAPI.updateCompliance(id, complianceStatus);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            await fetchPatientOverview();
        } catch (err) {
            console.error('Error updating compliance:', err);
            setError(err.response?.data?.message || 'Failed to update compliance status');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <LoadingSpinner size="lg" text="Loading patient overview..." />
                </div>
            </>
        );
    }

    if (error && !patientData) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={() => navigate('/provider/dashboard')}
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const { profile, goals, statistics, recentLogs } = patientData;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/provider/dashboard')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </button>

                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {profile.name.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                                    <p className="text-gray-600">Patient Overview</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Mail size={18} className="text-gray-400" />
                                <span>{profile.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Phone size={18} className="text-gray-400" />
                                <span>{profile.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <User size={18} className="text-gray-400" />
                                <span>{profile.age} years old</span>
                            </div>
                        </div>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-600">Compliance status updated successfully!</p>
                        </div>
                    )}

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Avg Steps</p>
                                <Activity size={20} className="text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{statistics.avgSteps}</h3>
                            <p className="text-xs text-gray-500 mt-1">Goal: {goals.stepsGoal}</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Avg Water</p>
                                <Droplets size={20} className="text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{statistics.avgWater}L</h3>
                            <p className="text-xs text-gray-500 mt-1">Goal: {goals.waterGoal}L</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Avg Sleep</p>
                                <Moon size={20} className="text-indigo-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{statistics.avgSleep}h</h3>
                            <p className="text-xs text-gray-500 mt-1">Goal: {goals.sleepGoal}h</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Avg Active</p>
                                <Clock size={20} className="text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{statistics.avgActive}m</h3>
                            <p className="text-xs text-gray-500 mt-1">Goal: {goals.activeTimeGoal}m</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Goals Met</p>
                                <TrendingUp size={20} className="text-teal-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{statistics.goalsMetPercentage}%</h3>
                            <p className="text-xs text-gray-500 mt-1">{statistics.totalLogs} logs</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Medical Info */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">Medical Information</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Allergies</p>
                                    <p className="text-gray-900">{profile.allergies || 'None reported'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Current Medications</p>
                                    <p className="text-gray-900">{profile.currentMedications || 'None reported'}</p>
                                </div>
                            </div>

                            {/* Recent Logs */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity Logs</h3>
                            </div>
                            <div className="p-6 pt-0">
                                {recentLogs.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No recent logs available</p>
                                ) : (
                                    <div className="space-y-3">
                                        {recentLogs.map((log) => (
                                            <div key={log._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <Calendar size={16} className="text-gray-400" />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {new Date(log.date).toLocaleDateString('en-IN', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>{log.steps} steps</span>
                                                    <span>{log.waterLitres}L water</span>
                                                    <span>{log.sleepHours}h sleep</span>
                                                    {log.goalsMet && (
                                                        <CheckCircle size={16} className="text-green-600" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Compliance Update */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">Update Compliance</h2>
                            </div>
                            <div className="p-6">
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Current Status
                                    </label>
                                    <select
                                        value={complianceStatus}
                                        onChange={(e) => setComplianceStatus(e.target.value)}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                        <option value="Goal Met">Goal Met</option>
                                        <option value="Missed Preventive Checkup">Missed Preventive Checkup</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>

                                <button
                                    onClick={handleUpdateCompliance}
                                    disabled={saving}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-teal-700 hover:to-teal-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            Update Status
                                        </>
                                    )}
                                </button>

                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>Note:</strong> Updating compliance status helps track patient progress and preventive care adherence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientOverview;
