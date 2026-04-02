'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllModules } from '../lib/module-storage';
import type { StoredModule } from '../lib/module-storage';

const quickLinks = [
  {
    title: 'Catalogo moduli',
    description: 'Esplora i moduli U-MIND disponibili.',
    href: '/modules',
    color: '#003d7c',
  },
  {
    title: 'Admin moduli',
    description: 'Accedi all’area di gestione dei moduli.',
    href: '/admin/modules',
    color: '#4b5563',
  },
];

export default function DashboardPage() {
  const [allModules, setAllModules] = useState<StoredModule[]>([]);
  const [featuredModule, setFeaturedModule] = useState<StoredModule | null>(null);

  useEffect(() => {
    const modules = getAllModules().filter((module) => module.published !== false);
    setAllModules(modules);

    const featured =
      modules.find((module) => module.featured) ?? modules[0] ?? null;

    setFeaturedModule(featured);
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
              UMiND · DASHBOARD
            </p>

            <h1
              style={{
                margin: '10px 0 8px 0',
                fontSize: 34,
                color: '#003d7c',
              }}
            >
              Dashboard docente
            </h1>

            <p style={{ margin: 0, color: '#444', fontSize: 18, lineHeight: 1.6 }}>
              Questo spazio raccoglie accessi rapidi, moduli consigliati e orientamenti iniziali per l’esperienza UMiND.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: 24,
              alignItems: 'start',
            }}
          >
            <section
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
              >
                <h2 style={{ color: '#003d7c', marginTop: 0 }}>
                  Accessi rapidi
                </h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginTop: 16,
                  }}
                >
                  {quickLinks.map((link) => (
                    <div
                      key={link.title}
                      style={{
                        background: '#f8f8f8',
                        borderRadius: 16,
                        padding: 18,
                        borderLeft: `4px solid ${link.color}`,
                      }}
                    >
                      <h3 style={{ marginTop: 0, marginBottom: 8, color: '#003d7c' }}>
                        {link.title}
                      </h3>

                      <p style={{ color: '#333', lineHeight: 1.6 }}>
                        {link.description}
                      </p>

                      <a
                        href={link.href}
                        style={{
                          display: 'inline-block',
                          marginTop: 8,
                          background: link.color,
                          color: '#fff',
                          padding: '10px 16px',
                          borderRadius: 12,
                          textDecoration: 'none',
                          fontWeight: 700,
                        }}
                      >
                        Apri
                      </a>
                    </div>
                  ))}

                  {featuredModule && (
                    <div
                      style={{
                        background: '#f8f8f8',
                        borderRadius: 16,
                        padding: 18,
                        borderLeft: `4px solid ${featuredModule.color}`,
                      }}
                    >
                      <h3 style={{ marginTop: 0, marginBottom: 8, color: '#003d7c' }}>
                        {featuredModule.title}
                      </h3>

                      <p style={{ color: '#333', lineHeight: 1.6 }}>
                        {featuredModule.description}
                      </p>

                      <a
                        href={featuredModule.href}
                        style={{
                          display: 'inline-block',
                          marginTop: 8,
                          background: featuredModule.color,
                          color: '#fff',
                          padding: '10px 16px',
                          borderRadius: 12,
                          textDecoration: 'none',
                          fontWeight: 700,
                        }}
                      >
                        Apri modulo
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {featuredModule && (
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  }}
                >
                  <h2 style={{ color: '#003d7c', marginTop: 0 }}>
                    Modulo consigliato
                  </h2>

                  <p style={{ color: '#333', lineHeight: 1.7 }}>
                    <strong>{featuredModule.title}</strong> è attualmente il modulo consigliato per iniziare o proseguire il percorso UMiND.
                  </p>

                  <a
                    href={featuredModule.href}
                    style={{
                      display: 'inline-block',
                      marginTop: 12,
                      background: '#003d7c',
                      color: '#fff',
                      padding: '12px 18px',
                      borderRadius: 12,
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Vai al modulo
                  </a>
                </div>
              )}

              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
              >
                <h2 style={{ color: '#003d7c', marginTop: 0 }}>
                  Moduli disponibili
                </h2>

                {allModules.length === 0 ? (
                  <p style={{ color: '#666' }}>Non ci sono ancora moduli pubblicati.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {allModules.map((module) => (
                      <div
                        key={module.slug}
                        style={{
                          padding: 16,
                          background: '#f8f8f8',
                          borderRadius: 12,
                          borderLeft: `4px solid ${module.color}`,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 12,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                          }}
                        >
                          <div>
                            <strong style={{ color: '#003d7c' }}>{module.title}</strong>
                            <p style={{ margin: '6px 0 0 0', color: '#666' }}>
                              {module.level}
                            </p>
                          </div>

                          <a
                            href={module.href}
                            style={{
                              background: module.color,
                              color: '#fff',
                              padding: '10px 14px',
                              borderRadius: 10,
                              textDecoration: 'none',
                              fontWeight: 700,
                            }}
                          >
                            Apri
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <aside
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
              >
                <h3 style={{ color: '#003d7c', marginTop: 0 }}>
                  Suggerimento UMiND
                </h3>

                <p style={{ color: '#333', lineHeight: 1.7 }}>
                  Parti dal catalogo, seleziona un modulo coerente con il tuo bisogno didattico e usa il tutor per chiarire come integrare modelli, metodologie e setting.
                </p>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
              >
                <h3 style={{ color: '#003d7c', marginTop: 0 }}>
                  Navigazione
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a
                    href="/"
                    style={{
                      color: '#003d7c',
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Home
                  </a>

                  <a
                    href="/modules"
                    style={{
                      color: '#003d7c',
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Catalogo moduli
                  </a>

                  <a
                    href="/admin/modules"
                    style={{
                      color: '#003d7c',
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Admin moduli
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}