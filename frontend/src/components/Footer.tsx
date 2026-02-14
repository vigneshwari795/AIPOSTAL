export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#111F35',
            color: '#ffffff',
            padding: '2rem 1rem',
            marginTop: 'auto',
            textAlign: 'center',
            borderTop: '3px solid #F63049'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h3 style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#F63049'
                }}>
                    Postal Management System
                </h3>
                <p style={{
                    margin: '0',
                    fontSize: '0.875rem',
                    opacity: '0.8'
                }}>
                    Academic Project © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}