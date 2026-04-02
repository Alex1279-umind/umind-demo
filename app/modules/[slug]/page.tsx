'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAllModules } from '../../lib/module-storage';
import type { StoredModule } from '../../lib/module-storage';

function extractYouTubeEmbedUrl(url?: string) {
  const trimmed = (url || '').trim();
  if (!trimmed) return '';

  try {
    const parsed = new URL(trimmed);

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    return '';
  } catch {
    return '';
  }
}

export default function ModulePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [module, setModule] = useState<StoredModule | null>(null);
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const modules = getAllModules();
    const found = modules.find((m) => m.slug === slug) ?? null;
    setModule(found);
  }, [slug]);

  const sendMessage = async (customMessage?: string) => {
    const finalMessage = customMessage ?? message;

    if (!finalMessage?.trim()) return;

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

  if (!module) {
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
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <p style={{ margin: 0, color: '#666' }}>Modulo non trovato.</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const videoUrl = extractYouTubeEmbedUrl(module.youtubeUrl);

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
              {module.level}
            </p>

            <h1
              style={{
                margin: '10px 0 8px 0',
                fontSize: 34,
                color: '#003d7c',
              }}
            >
              {module.title}
            </h1>

            <p style={{ margin: 0, color: '#444', fontSize: 18, lineHeight: 1.6 }}>
              {module.description}
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
                title="Video modulo"
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
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {module.sections?.map((section, index) => (
                <div
                  key={index}
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  }}
                >
                  <h2 style={{ color: '#003d7c', marginTop: 0 }}>
                    {section.title}
                  </h2>

                  <p style={{ color: '#333', lineHeight: 1.7, marginBottom: 0 }}>
                    {section.content}
                  </p>
                </div>
              ))}
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
                  Supporto orientativo sul modulo, sui contenuti e sulle possibili applicazioni didattiche.
                </p>
              </div>

              <div>
                <p style={{ fontWeight: 700, marginBottom: 10 }}>Scrivi al tutor</p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Scrivi una domanda sul modulo..."
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

                {module.prompts && module.prompts.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {module.prompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(prompt.text)}
                        style={{
                          textAlign: 'left',
                          padding: 10,
                          borderRadius: 10,
                          border: '1px solid #d9d9d9',
                          background: '#f8f8f8',
                          cursor: 'pointer',
                        }}
                      >
                        {prompt.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#666', marginTop: 0 }}>
                    Nessun prompt disponibile.
                  </p>
                )}
              </div>

              <div
                style={{
                  minHeight: 140,
                  background: '#f8f9fa',
                  borderRadius: 12,
                  padding: 14,
                  border: '1px solid #e5e5e5',
                  color: '#333',
                  lineHeight: 1.6,
                }}
              >
                {loading ? 'U-MIND sta elaborando...' : reply || 'Qui comparirà la risposta del tutor sul modulo.'}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}