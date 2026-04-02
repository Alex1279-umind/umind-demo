'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllModules } from '../lib/module-storage';
import type { StoredModule } from '../lib/module-storage';

export default function ModulesPage() {
  const [modules, setModules] = useState<StoredModule[]>([]);

  useEffect(() => {
    const all = getAllModules().filter((m) => m.published !== false);
    setModules(all);
  }, []);

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
          
          {/* HEADER */}
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
              UMiND · CATALOGO MODULI
            </p>

            <h1
              style={{
                margin: '10px 0 8px 0',
                fontSize: 34,
                color: '#003d7c',
              }}
            >
              Esplora i moduli
            </h1>

            <p style={{ margin: 0, color: '#444', fontSize: 18, lineHeight: 1.6 }}>
              Seleziona un modulo per avviare un percorso di micro-learning, riflessione pedagogica e progettazione didattica.
            </p>
          </div>

          {/* GRID MODULI */}
          {modules.length === 0 ? (
            <div
              style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <p style={{ margin: 0, color: '#666' }}>
                Non ci sono ancora moduli disponibili.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
              }}
            >
              {modules.map((module) => (
                <div
                  key={module.slug}
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
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
                    {module.level}
                  </p>

                  <h2
                    style={{
                      margin: 0,
                      color: '#003d7c',
                      fontSize: 24,
                    }}
                  >
                    {module.title}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: '#333',
                      lineHeight: 1.7,
                      flexGrow: 1,
                    }}
                  >
                    {module.description}
                  </p>

                  {/* BADGE */}
                  {module.featured && (
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        background: '#a6894d',
                        color: '#fff',
                        fontSize: 12,
                        padding: '4px 10px',
                        borderRadius: 999,
                        fontWeight: 700,
                      }}
                    >
                      In evidenza
                    </span>
                  )}

                  <a
                    href={module.href}
                    style={{
                      marginTop: 8,
                      background: module.color,
                      color: '#fff',
                      padding: '12px 18px',
                      borderRadius: 12,
                      textDecoration: 'none',
                      fontWeight: 700,
                      width: 'fit-content',
                    }}
                  >
                    Apri modulo
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}