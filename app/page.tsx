'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getHomeContent, type HomeContent } from './lib/home-storage';
import { getHomeModules, type StoredModule } from './lib/module-storage';

function extractYouTubeVideoId(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return '';

  try {
    const parsed = new URL(trimmed);

    if (parsed.hostname.includes('youtube.com')) {
      return parsed.searchParams.get('v') || '';
    }

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '');
    }

    return '';
  } catch {
    return '';
  }
}

function extractYouTubeEmbedUrl(url: string) {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}`;
}

function extractYouTubeThumbnail(url?: string) {
  const videoId = extractYouTubeVideoId(url || '');
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

const prompts = [
  "Come può l'AI supportare l'apprendimento?",
  "Qual è il ruolo dello studente in questo processo?",
  "Come progettare una lezione laboratoriale?",
  "Quale metodologia usare per un apprendimento attivo?"
];

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [homeModules, setHomeModules] = useState<StoredModule[]>([]);

  useEffect(() => {
    setHomeContent(getHomeContent());
    setHomeModules(getHomeModules());
  }, []);

  const videoUrl = useMemo(
    () => extractYouTubeEmbedUrl(homeContent?.heroVideoUrl || ''),
    [homeContent]
  );

  const sendMessage = async (customMessage?: string) => {
    const finalMessage = customMessage ?? message;

    if (!finalMessage.trim()) return;

    setLoading(true);
    setReply('');

    try {
      const res = await fetch('http://localhost:3001/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: finalMessage }),
      });

      const data = await res.json();
      setReply(data.reply);
      setMessage(finalMessage);
    } catch {
      setReply('Errore di connessione con il tutor U-MIND.');
    } finally {
      setLoading(false);
    }
  };

  if (!homeContent) return null;

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
              FACULTY DEVELOPMENT & EXPERIMENTAL PEDAGOGY
            </p>

            <h1
              style={{
                margin: '10px 0 8px 0',
                fontSize: 36,
                color: '#003d7c',
              }}
            >
              {homeContent.heroTitle}
            </h1>

            <p
              style={{
                margin: '0 0 8px 0',
                color: '#666',
                fontSize: 14,
              }}
            >
              {homeContent.heroSubtitle}
            </p>

            <p
              style={{
                margin: 0,
                color: '#444',
                fontSize: 18,
                lineHeight: 1.6,
              }}
            >
              {homeContent.heroDescription}
            </p>

            <p style={{ color: '#666', marginTop: 12 }}>
              Contenuti a cura di Flavia Santoianni e Alessandro Ciasullo
            </p>
          </div>

          {videoUrl && (
            <div
              style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: 20,
                marginBottom: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <iframe
                width="100%"
                height="420"
                src={videoUrl}
                title="Video Home"
                style={{ border: 'none', borderRadius: 12 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

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
                background: '#ffffff',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <h2 style={{ color: '#003d7c', marginBottom: 8 }}>
                Moduli in evidenza
              </h2>

              <p style={{ color: '#666', marginTop: 0 }}>
                Percorsi selezionati per iniziare l’esperienza UMiND.
              </p>

              {homeModules.length === 0 ? (
                <p style={{ color: '#666' }}>
                  Nessun modulo è stato ancora selezionato per la Home.
                </p>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginTop: 24,
                  }}
                >
                  {homeModules.map((module) => {
                    const thumbnail = extractYouTubeThumbnail(module.youtubeUrl);

                    return (
                      <div
                        key={module.slug}
                        style={{
                          background: '#f8f8f8',
                          borderLeft: `4px solid ${module.color}`,
                          borderRadius: 12,
                          padding: 16,
                          overflow: 'hidden',
                        }}
                      >
                        {thumbnail && (
                          <div style={{ marginBottom: 14 }}>
                            <img
                              src={thumbnail}
                              alt={`Anteprima video di ${module.title}`}
                              style={{
                                width: '100%',
                                height: 180,
                                objectFit: 'cover',
                                borderRadius: 10,
                                display: 'block',
                              }}
                            />
                          </div>
                        )}

                        <strong style={{ color: '#003d7c' }}>{module.title}</strong>

                        <p
                          style={{
                            marginTop: 8,
                            marginBottom: 12,
                            color: '#666',
                            lineHeight: 1.6,
                          }}
                        >
                          {module.description}
                        </p>

                        <a
                          href={module.href}
                          style={{
                            display: 'inline-block',
                            background: module.color,
                            color: '#fff',
                            padding: '10px 14px',
                            borderRadius: 10,
                            textDecoration: 'none',
                            fontWeight: 700,
                          }}
                        >
                          Apri modulo
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <aside
              style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                position: 'sticky',
                top: 24,
              }}
            >
              <div
                style={{
                  background: '#003d7c',
                  color: '#fff',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: 8 }}>U-MIND Tutor</h3>
                <p style={{ margin: 0, fontSize: 14 }}>
                  Supporto orientativo per didattica, apprendimento e progettazione.
                </p>
              </div>

              <div>
                <p style={{ fontWeight: 700, marginBottom: 10 }}>Scrivi al tutor</p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Scrivi una domanda..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                onClick={() => sendMessage()}
                style={{
                  background: '#003d7c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Invia
              </button>

              <div>
                <p style={{ fontWeight: 700, marginBottom: 10 }}>Prompt suggeriti</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      style={{
                        textAlign: 'left',
                        padding: 10,
                        borderRadius: 10,
                        border: '1px solid #d9d9d9',
                        background: '#f8f8f8',
                        cursor: 'pointer',
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  minHeight: 120,
                  background: '#f8f9fa',
                  borderRadius: 12,
                  padding: 14,
                  border: '1px solid #e5e5e5',
                  color: '#333',
                  lineHeight: 1.6,
                }}
              >
                {loading ? 'U-MIND sta elaborando...' : reply || 'Qui comparirà la risposta del tutor.'}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}