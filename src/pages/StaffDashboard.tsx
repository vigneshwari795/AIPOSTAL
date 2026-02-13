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

      // Reload parcels
      await loadParcels();

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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '2.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid #F63049',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            color: '#111F35',
            marginBottom: '0.5rem',
            fontSize: '2rem'
          }}>
            Staff Dashboard
          </h1>
          <p style={{
            color: '#8A244B',
            margin: '0',
            fontSize: '0.9rem'
          }}>
            Manage assigned parcels and update delivery status
          </p>
        </div>

        {successMessage && (
          <div style={{
            backgroundColor: '#e6f7e6',
            color: '#2d5a2d',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            border: '2px solid #4CAF50'
          }}>
            {successMessage}
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#ffe6e6',
            color: '#F63049',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            border: '1px solid #F63049'
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{
            backgroundColor: '#ffffff',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#8A244B'
          }}>
            Loading parcels...
          </div>
        ) : parcels.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            padding: '3rem',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#8A244B',
            border: '2px solid #D02752'
          }}>
            No parcels assigned
          </div>
        ) : (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '2px solid #D02752',
            overflow: 'hidden'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  backgroundColor: '#111F35',
                  color: '#ffffff'
                }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600'
                  }}>
                    Tracking ID
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600'
                  }}>
                    Recipient
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600'
                  }}>
                    Destination
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600'
                  }}>
                    Current Status
                  </th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600'
                  }}>
                    Update Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel, index) => (
                  <tr
                    key={parcel.trackingId}
                    style={{
                      borderBottom: index < parcels.length - 1 ? '1px solid #e0e0e0' : 'none',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9'
                    }}
                  >
                    <td style={{
                      padding: '1rem',
                      color: '#111F35',
                      fontWeight: '500'
                    }}>
                      {parcel.trackingId}
                    </td>
                    <td style={{
                      padding: '1rem',
                      color: '#111F35'
                    }}>
                      {parcel.recipient}
                    </td>
                    <td style={{
                      padding: '1rem',
                      color: '#8A244B'
                    }}>
                      {parcel.destination}
                    </td>
                    <td style={{
                      padding: '1rem'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        backgroundColor: parcel.status === 'Delivered' ? '#e6f7e6' :
                          parcel.status === 'In Transit' ? '#fff3e6' : '#ffe6e6',
                        color: parcel.status === 'Delivered' ? '#2d5a2d' :
                          parcel.status === 'In Transit' ? '#8B4513' : '#F63049'
                      }}>
                        {parcel.status}
                      </span>
                    </td>
                    <td style={{
                      padding: '1rem'
                    }}>
                      <select
                        value={parcel.status}
                        onChange={(e) => handleStatusUpdate(parcel.trackingId, e.target.value)}
                        style={{
                          padding: '0.5rem',
                          border: '2px solid #D02752',
                          borderRadius: '4px',
                          fontSize: '0.9rem',
                          color: '#111F35',
                          backgroundColor: '#ffffff',
                          cursor: 'pointer',
                          outline: 'none',
                          width: '100%',
                          maxWidth: '180px'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#F63049'}
                        onBlur={(e) => e.target.style.borderColor = '#D02752'}
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}