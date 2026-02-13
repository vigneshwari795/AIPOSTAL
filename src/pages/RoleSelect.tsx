import { useNavigate } from 'react-router-dom';

function RoleSelect() {
    const navigate = useNavigate();

    const roles = [
        {
            id: 'admin',
            title: 'Admin',
            description: 'Manage system operations, users, and post offices',
            icon: (
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            path: '/admin'
        },
        {
            id: 'staff',
            title: 'Post Office Staff',
            description: 'Process parcels, manage inventory, and handle bookings',
            icon: (
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            path: '/staff'
        },
        {
            id: 'agent',
            title: 'Delivery Agent',
            description: 'View assigned deliveries and update parcel status',
            icon: (
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
            ),
            path: '/confirm-delivery'
        }
    ];

    const handleRoleSelect = (roleId: string, path: string) => {
        localStorage.setItem('role', roleId);
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-[#111F35] text-white py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F63049] to-[#D02752] bg-clip-text text-transparent">
                        Select Your Role
                    </h1>
                    <p className="text-xl text-gray-300">
                        Choose your role to access the appropriate dashboard
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            onClick={() => handleRoleSelect(role.id, role.path)}
                            className="bg-gradient-to-br from-[#111F35] to-[#8A244B] border-2 border-[#8A244B] rounded-2xl p-8 cursor-pointer hover:border-[#F63049] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 group"
                        >
                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                    {role.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold text-center mb-4 text-white">
                                {role.title}
                            </h2>

                            {/* Description */}
                            <p className="text-gray-300 text-center leading-relaxed mb-6">
                                {role.description}
                            </p>

                            {/* Select Button */}
                            <div className="flex justify-center">
                                <button className="bg-[#F63049] hover:bg-[#D02752] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full group-hover:shadow-lg">
                                    Select Role
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-[#F63049] transition-colors duration-200 underline"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoleSelect;