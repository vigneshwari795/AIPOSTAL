import { useState, useEffect } from 'react';
import trackingService from '../services/trackingService';

export default function AgentDashboard() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        setLoading(true);
        try {
            // Mocking assigned tasks for agent - in real app, fetch assigned tasks
            const data = await trackingService.getAssignedParcels();
            // Filter for 'Out for Delivery' or simply list all for demo
            const relevantTasks = data.filter(p => p.status === 'Out for Delivery' || p.status === 'In Transit');
            setTasks(relevantTasks.length ? relevantTasks : data); // Fallback to all if none
        } catch {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClick = (taskId: string) => {
        setSelectedTask(taskId);
        setOtp(['', '', '', '']);
        setShowOtpModal(true);
        setError('');
    };

    const verifyOtp = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 4) { // Simple check
            // Verify OTP - Mock logic
            if (enteredOtp === '1234') { // Hardcoded correct OTP for demo
                if (selectedTask) {
                    // Update status
                    setTasks(prev => prev.map(t =>
                        t.trackingId === selectedTask ? { ...t, status: 'Delivered' } : t
                    ));
                    setSuccess(`Delivery confirmed for ${selectedTask}!`);
                    setShowOtpModal(false);
                    setTimeout(() => setSuccess(''), 3000);
                }
            } else {
                setError('Invalid OTP. Try 1234');
            }
        } else {
            setError('Enter 4-digit OTP');
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">Agent Dashboard</h1>
                    <p className="text-gray-300">View your assigned deliveries and update status</p>
                </div>

                {success && (
                    <div className="bg-green-900 bg-opacity-50 border border-green-500 text-green-200 px-4 py-3 rounded mb-4 animate-fade-in">
                        {success}
                    </div>
                )}

                {loading ? (
                    <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] p-12 rounded-xl shadow-lg text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F63049] mb-4"></div>
                        <p className="text-gray-300">Loading assignments...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {tasks.map(task => (
                            <div key={task.trackingId} className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] p-6 rounded-xl shadow-lg hover:border-[#F63049] transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{task.recipient}</h3>
                                    <p className="text-gray-300 mb-2">{task.destination}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#111F35] px-2 py-1 rounded text-xs font-mono text-gray-400 border border-[#8A244B]">
                                            {task.trackingId}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${task.status === 'Delivered'
                                            ? 'bg-green-500 bg-opacity-20 text-green-400 border-green-500'
                                            : 'bg-yellow-500 bg-opacity-20 text-yellow-400 border-yellow-500'
                                        }`}>
                                        {task.status}
                                    </span>
                                    {task.status !== 'Delivered' && (
                                        <button
                                            onClick={() => handleUpdateClick(task.trackingId)}
                                            className="w-full sm:w-auto bg-[#F63049] hover:bg-[#D02752] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                        >
                                            Update Status
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {tasks.length === 0 && (
                            <div className="text-center py-12 bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl">
                                <p className="text-gray-400">No active delivery assignments found.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* OTP Modal */}
                {showOtpModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-[#111F35] border border-[#8A244B] rounded-xl shadow-2xl p-8 max-w-sm w-full transform transition-all scale-100">
                            <h3 className="text-2xl font-bold text-white mb-4 text-center">Verify Delivery</h3>
                            <p className="text-gray-300 mb-8 text-center text-sm">
                                Ask the recipient for the 4-digit OTP sent to their mobile number.
                            </p>

                            <div className="flex justify-center space-x-4 mb-8">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        className="w-14 h-14 text-center bg-[#0d1829] border-2 border-[#8A244B] rounded-xl focus:border-[#F63049] focus:outline-none text-2xl text-white font-bold transition-colors duration-200"
                                    />
                                ))}
                            </div>

                            {error && <p className="text-[#F63049] text-sm text-center mb-6 bg-[#F63049] bg-opacity-10 p-2 rounded">{error}</p>}

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowOtpModal(false)}
                                    className="flex-1 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold py-3 rounded-lg transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={verifyOtp}
                                    className="flex-1 bg-[#F63049] hover:bg-[#D02752] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                                >
                                    Verify
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
