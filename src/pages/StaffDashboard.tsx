import { useState, useEffect } from 'react';
import trackingService from '../services/trackingService';

export default function StaffDashboard() {
  const [parcels, setParcels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadParcels();
  }, []);

  const loadParcels = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await trackingService.getAssignedParcels();
      setParcels(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load parcels');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (trackingId: string, newStatus: string) => {
    setError('');
    setSuccessMessage('');

    try {
      await trackingService.updateStatus(trackingId, newStatus);
      setSuccessMessage(`Status updated to "${newStatus}" for ${trackingId}`);

      // Update local state instead of reloading from mock API
      setParcels(prevParcels =>
        prevParcels.map(parcel =>
          parcel.trackingId === trackingId
            ? { ...parcel, status: newStatus }
            : parcel
        )
      );

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError((err as Error).message || 'Failed to update status');
    }
  };

  const statusOptions = [
    'Pending',
    'Picked Up',
    'In Transit',
    'Out for Delivery',
    'Delivered',
    'Failed Delivery',
    'Returned'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500 bg-opacity-20 text-green-400 border border-green-500';
      case 'In Transit': return 'bg-blue-500 bg-opacity-20 text-blue-400 border border-blue-500';
      case 'Out for Delivery': return 'bg-purple-500 bg-opacity-20 text-purple-400 border border-purple-500';
      case 'Failed Delivery': return 'bg-red-500 bg-opacity-20 text-red-400 border border-red-500';
      default: return 'bg-gray-500 bg-opacity-20 text-gray-400 border border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#111F35] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl p-8 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                Staff Dashboard
              </h1>
              <p className="text-gray-300">
                Manage assigned parcels and update delivery status
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={loadParcels}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-[#F63049] hover:bg-[#D02752] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F63049] transition-all duration-300 transform hover:-translate-y-1"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {successMessage && (
          <div className="bg-green-900 bg-opacity-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-md shadow-sm animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-200">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900 bg-opacity-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md shadow-sm animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] p-12 rounded-xl shadow-lg text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F63049] mb-4"></div>
            <p className="text-gray-300 text-lg">Loading parcels...</p>
          </div>
        ) : parcels.length === 0 ? (
          <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] p-16 rounded-xl shadow-lg text-center border-dashed">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-200">No parcels assigned</h3>
            <p className="mt-1 text-sm text-gray-400">Get started by checking specifically assigned shipments.</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border border-[#8A244B] rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#8A244B] bg-opacity-30 border-b border-[#8A244B]">
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Tracking ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Destination
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Current Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Update Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8A244B] divide-opacity-30">
                  {parcels.map((parcel, index) => (
                    <tr
                      key={parcel.trackingId}
                      className={`hover:bg-[#8A244B] hover:bg-opacity-20 transition-colors duration-150 ${index % 2 === 0 ? 'bg-transparent' : 'bg-[#8A244B] bg-opacity-5'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {parcel.trackingId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {parcel.recipient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {parcel.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(parcel.status)}`}>
                          {parcel.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="relative">
                          <select
                            value={parcel.status}
                            onChange={(e) => handleStatusUpdate(parcel.trackingId, e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base bg-[#111F35] border border-[#8A244B] text-white focus:outline-none focus:border-[#F63049] sm:text-sm rounded-lg shadow-sm transition-colors duration-200"
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status} className="bg-[#111F35] text-white">
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-[#8A244B] border-opacity-30 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">{parcels.length}</span> assigned parcels
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}