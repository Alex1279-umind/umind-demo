export default function Navbar() {
  return (
    <div
      style={{
        width: '100%',
        background: '#003d7c',
        color: '#fff',
        padding: '14px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div>
        <div style={{ fontWeight: 700, fontSize: 20 }}>UMiND</div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>
          Microlearning platform for university teaching, research and faculty development
        </div>
      </div>

      <div style={{ display: 'flex', gap: 18 }}>
        <a href="/" style={linkStyle}>Home</a>
        <a href="/dashboard" style={linkStyle}>Dashboard</a>
        <a href="/modules" style={linkStyle}>Moduli</a>
        <a href="/admin/modules" style={linkStyle}>Admin</a>
      </div>
    </div>
  );
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 600,
};