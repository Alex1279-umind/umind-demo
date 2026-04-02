'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getVisibleModules } from '../lib/module-storage';
import type { StoredModule } from '../lib/module-storage';

type LevelKey =
  | 'Livello I · Modelli didattici'
  | 'Livello II · Metodologia didattica'
  | 'Livello III · Setting didattico'
  | 'Livello IV · Progettazione';

const levelCards: {
  key: LevelKey;
  shortTitle: string;
  description: string;
  color: string;
}[] = [
  {
    key: 'Livello I · Modelli didattici',
    shortTitle: 'Livello I',
    description:
      'Esplora i modelli didattici che orientano il quadro teorico e metodologico dell’azione formativa.',
    color: '#7c2d3a',
  },
  {
    key: 'Livello II · Metodologia didattica',
    shortTitle: 'Livello II',
    description:
      'Accedi alle metodologie didattiche utili a progettare attività, partecipazione e apprendimento attivo.',
    color: '#2f6f4f',
  },
  {
    key: 'Livello III · Setting didattico',
    shortTitle: 'Livello III',
    description:
      'Approfondisci i setting didattici e i contesti in cui strumenti, ambienti e mediazione assumono valore pedagogico.',
    color: '#003d7c',
  },
  {
    key: 'Livello IV · Progettazione',
    shortTitle: 'Livello IV',
    description:
      'Raccogli i moduli dedicati alla progettazione formativa e alla costruzione strutturata dei percorsi.',
    color: '#a6894d',
  },
];

export default function DashboardPage() {
  const [modules, setModules] = useState<StoredModule[]>([]);

  useEffect(() => {
    setModules(getVisibleModules());
  }, []);

  const groupedModules = useMemo(() => {
    return levelCards.map((level) => {
      const items = modules.filter((module) => module.level === level.key);
      return {
        ...level,
        modules: items,
      };
    });
  }, [modules]);

  const featuredModule = useMemo(() => {
    return modules.find((module) => module.featured) ?? modules[0] ?? null;
  }, [modules]);

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
        <div style={{ maxWidth: 1150, margin: '0 auto' }}>
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
              UMiND · DASHBOARD DOCENTE
            </p>

            <h1
              style={{
                margin: '10px 0 8px 0',
                fontSize: 34,
                color: '#003d7c',
              }}
            >
              Dashboard formativa
            </h1>

            <p style={{ margin: 0, color: '#444', fontSize: 18, lineHeight: 1.6 }}>
              Questa dashboard accompagna la fruizione dei contenuti UMiND, organizzati in quattro livelli:
              modelli didattici, metodologie, setting e progettazione.
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
                  Accessi rapidi per livello
                </h2>

                <p style={{ color: '#666', marginTop: 0, lineHeight: 1.6 }}>
                  Scegli il livello da cui iniziare o proseguire il tuo percorso formativo.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginTop: 16,
                  }}
                >
                  {groupedModules.map((level) => {
                    const firstModule = level.modules[0] ?? null;

                    return (
                      <div
                        key={level.key}
                        style={{
                          background: '#f8f8f8',
                          borderRadius: 16,
                          padding: 18,
                          borderLeft: `4px solid ${level.color}`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 10,
                        }}
                      >
                        <div>
                          <p
                            style={{
                              margin: 0,
                              color: level.color,
                              fontWeight: 700,
                              fontSize: 12,
                              letterSpacing: 1,
                            }}
                          >
                            {level.shortTitle}
                          </p>

                          <h3 style={{ margin: '6px 0 8px 0', color: '#003d7c' }}>
                            {level.key}
                          </h3>

                          <p style={{ margin: 0, color: '#333', lineHeight: 1.6 }}>
                            {level.description}
                          </p>
                        </div>

                        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
                          Moduli disponibili: <strong>{level.modules.length}</strong>
                        </p>

                        {firstModule ? (
                          <a
                            href={firstModule.href}
                            style={{
                              display: 'inline-block',
                              marginTop: 4,
                              background: level.color,
                              color: '#fff',
                              padding: '10px 16px',
                              borderRadius: 12,
                              textDecoration: 'none',
                              fontWeight: 700,
                              width: 'fit-content',
                            }}
                          >
                            Esplora livello
                          </a>
                        ) : (
                          <span
                            style={{
                              display: 'inline-block',
                              marginTop: 4,
                              background: '#d1d5db',
                              color: '#374151',
                              padding: '10px 16px',
                              borderRadius: 12,
                              fontWeight: 700,
                              width: 'fit-content',
                            }}
                          >
                            Nessun modulo
                          </span>
                        )}
                      </div>
                    );
                  })}
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

                  <div
                    style={{
                      background: '#f8f8f8',
                      borderRadius: 16,
                      padding: 20,
                      borderLeft: `4px solid ${featuredModule.color}`,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: '#666',
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      {featuredModule.level}
                    </p>

                    <h3 style={{ color: '#003d7c', marginBottom: 8 }}>
                      {featuredModule.title}
                    </h3>

                    <p style={{ color: '#333', lineHeight: 1.7 }}>
                      {featuredModule.description}
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
                  Moduli disponibili per livello
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16 }}>
                  {groupedModules.map((level) => (
                    <div key={level.key}>
                      <h3 style={{ color: '#003d7c', marginBottom: 10 }}>
                        {level.key}
                      </h3>

                      {level.modules.length === 0 ? (
                        <p style={{ margin: 0, color: '#666' }}>
                          Nessun modulo disponibile in questo livello.
                        </p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {level.modules.map((module) => (
                            <div
                              key={module.slug}
                              style={{
                                background: '#f8f8f8',
                                borderRadius: 12,
                                padding: 16,
                                borderLeft: `4px solid ${module.color}`,
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 16,
                                alignItems: 'center',
                                flexWrap: 'wrap',
                              }}
                            >
                              <div style={{ flex: 1, minWidth: 240 }}>
                                <strong style={{ color: '#003d7c' }}>{module.title}</strong>
                                <p style={{ margin: '6px 0 0 0', color: '#666', lineHeight: 1.6 }}>
                                  {module.description}
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
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                position: 'sticky',
                top: 24,
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
                  Orientamento UMiND
                </h3>

                <p style={{ color: '#333', lineHeight: 1.7 }}>
                  La dashboard organizza i contenuti secondo una progressione a quattro livelli,
                  utile a distinguere fondamenti, metodologie, setting e progettazione.
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
                </div>
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
                  Suggerimento
                </h3>

                <p style={{ color: '#333', lineHeight: 1.7 }}>
                  Inizia dal livello più vicino al tuo bisogno formativo attuale e usa il tutor
                  presente nella Home o nei moduli per orientare riflessione e applicazione.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}