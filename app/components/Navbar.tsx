'use client';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

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
        <a href="/" style={linkStyle(isActive('/'))}>Home</a>
        <a href="/dashboard" style={linkStyle(isActive('/dashboard'))}>Dashboard</a>
        <a href="/modules" style={linkStyle(isActive('/modules'))}>Moduli</a>
        <a href="/admin" style={linkStyle(isActive('/admin'))}>Admin</a>
      </div>
    </div>
  );
}

const linkStyle = (active: boolean) => ({
  color: '#fff',
  textDecoration: 'none',
  fontWeight: active ? 800 : 600,
  borderBottom: active ? '2px solid #a6894d' : 'none',
  paddingBottom: 4,
});