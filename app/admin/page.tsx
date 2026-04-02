'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: '100vh',
          background: '#f4f7f9',
          padding: '40px 24px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#a6894d',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 1,
              }}
            >
              UMiND · ADMIN
            </p>

            <h1
              style={{
                margin: '10px 0 8px 0',
                fontSize: 34,
                color: '#003d7c',
              }}
            >
              Pannello di gestione
            </h1>

            <p style={{ margin: 0, color: '#444', fontSize: 18 }}>
              Gestisci la Home e i moduli della piattaforma da un unico punto di accesso.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
            }}
          >
            <div
              style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                borderLeft: '4px solid #003d7c',
              }}
            >
              <h2 style={{ marginTop: 0, color: '#003d7c' }}>Gestione Home</h2>
              <p style={{ color: '#333', lineHeight: 1.7 }}>
                Modifica il messaggio di benvenuto, il video principale e la presentazione iniziale della piattaforma.
              </p>
              <a
                href="/admin/home"
                style={{
                  display: 'inline-block',
                  marginTop: 10,
                  background: '#003d7c',
                  color: '#fff',
                  padding: '12px 18px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                Apri gestione Home
              </a>
            </div>

            <div
              style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                borderLeft: '4px solid #a6894d',
              }}
            >
              <h2 style={{ marginTop: 0, color: '#003d7c' }}>Gestione Moduli</h2>
              <p style={{ color: '#333', lineHeight: 1.7 }}>
                Crea, modifica, elimina e pubblica i moduli. Seleziona anche quali moduli mostrare nella Home.
              </p>
              <a
                href="/admin/modules"
                style={{
                  display: 'inline-block',
                  marginTop: 10,
                  background: '#a6894d',
                  color: '#fff',
                  padding: '12px 18px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                Apri gestione Moduli
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}