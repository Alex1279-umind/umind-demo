'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  defaultHomeContent,
  getHomeContent,
  saveHomeContent,
  type HomeContent,
} from '../../lib/home-storage';

function extractYouTubeEmbedUrl(url: string) {
  const trimmed = url.trim();
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

export default function AdminHomePage() {
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);

  useEffect(() => {
    setContent(getHomeContent());
  }, []);

  const previewVideo = useMemo(
    () => extractYouTubeEmbedUrl(content.heroVideoUrl),
    [content.heroVideoUrl]
  );

  const handleSave = () => {
    saveHomeContent(content);
    alert('Home salvata con successo.');
  };

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
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
              UMiND · ADMIN / HOME
            </p>

            <h1
              style={{
                margin: '10px 0 8px 0',
                fontSize: 34,
                color: '#003d7c',
              }}
            >
              Gestione Home
            </h1>

            <p style={{ margin: 0, color: '#444', fontSize: 18 }}>
              Modifica il benvenuto alla piattaforma e il video introduttivo.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
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
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>
                  Titolo principale
                </label>
                <input
                  value={content.heroTitle}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, heroTitle: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>
                  Sottotitolo
                </label>
                <input
                  value={content.heroSubtitle}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, heroSubtitle: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>
                  Testo di benvenuto
                </label>
                <textarea
                  value={content.heroDescription}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, heroDescription: e.target.value }))
                  }
                  rows={5}
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

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>
                  Video introduttivo YouTube
                </label>
                <input
                  value={content.heroVideoUrl}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, heroVideoUrl: e.target.value }))
                  }
                  placeholder="Incolla qui il link YouTube"
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                style={{
                  background: '#003d7c',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 18px',
                  borderRadius: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: 8,
                }}
              >
                Salva Home
              </button>

              <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                <a
                  href="/admin"
                  style={{
                    background: '#4b5563',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                >
                  ← Torna ad Admin
                </a>

                <a
                  href="/"
                  style={{
                    background: '#a6894d',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                >
                  Vai alla Home
                </a>
              </div>
            </section>

            <aside
              style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: 24,
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
                ANTEPRIMA HOME
              </p>

              <div
                style={{
                  marginTop: 16,
                  background: '#f8f8f8',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <h2 style={{ color: '#003d7c', marginTop: 0 }}>
                  {content.heroTitle}
                </h2>

                <p style={{ color: '#666', fontSize: 14 }}>
                  {content.heroSubtitle}
                </p>

                <p style={{ color: '#333', lineHeight: 1.7 }}>
                  {content.heroDescription}
                </p>

                <p style={{ color: '#666', marginTop: 12 }}>
                  Contenuti a cura di Flavia Santoianni e Alessandro Ciasullo
                </p>

                {previewVideo && (
                  <iframe
                    width="100%"
                    height="220"
                    src={previewVideo}
                    title="Anteprima Home Video"
                    style={{ border: 'none', borderRadius: 12, marginTop: 12 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}