export const authService = {
    isAuthenticated: async () => {
        return localStorage.getItem('token') !== null;
    },
    getCurrentUser: async () => {
        return JSON.parse(localStorage.getItem('user') || 'null');
    },
    getUserRole: async () => {
        return localStorage.getItem('role');
    },
    logout: () => {
        localStorage.clear();
    }
};

export default authService;
