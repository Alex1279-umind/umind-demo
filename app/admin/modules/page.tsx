'use client';

import { useEffect, useState } from 'react';
import {
  deleteStoredModule,
  getAllModules,
  isDefaultModule,
  type StoredModule,
} from '../../lib/module-storage';

export default function AdminModulesPage() {
  const [allModules, setAllModules] = useState<StoredModule[]>([]);

  const loadModules = () => {
    setAllModules(getAllModules());
  };

  useEffect(() => {
    loadModules();
  }, []);

  const handleDelete = (slug: string) => {
    const confirmed = window.confirm('Vuoi davvero eliminare questo modulo?');
    if (!confirmed) return;

    deleteStoredModule(slug);
    loadModules();
  };

  return (
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
            U-MIND · ADMIN / MODULI
          </p>

          <h1
            style={{
              margin: '10px 0 8px 0',
              fontSize: 34,
              color: '#003d7c',
            }}
          >
            Gestione moduli
          </h1>

          <p style={{ margin: 0, color: '#444', fontSize: 18 }}>
            Crea, modifica, elimina e controlla lo stato dei moduli della piattaforma.
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
          <div style={{ marginBottom: 20 }}>
            <a
              href="/admin/modules/new"
              style={{
                display: 'inline-block',
                background: '#003d7c',
                color: '#fff',
                padding: '12px 18px',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              + Nuovo modulo
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 2fr 1fr 2fr',
              gap: 16,
              fontWeight: 700,
              color: '#003d7c',
              marginBottom: 16,
            }}
          >
            <div>Titolo</div>
            <div>Livello</div>
            <div>Slug</div>
            <div>Stato</div>
            <div>Azioni</div>
          </div>

          {allModules.map((module) => {
            const defaultModule = isDefaultModule(module.slug);
            const status = module.published === false ? 'Bozza' : 'Pubblicato';

            return (
              <div
                key={module.slug}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 2fr 1fr 2fr',
                  gap: 16,
                  padding: '14px 0',
                  borderTop: '1px solid #e5e7eb',
                  alignItems: 'center',
                }}
              >
                <div>{module.title}</div>
                <div>{module.level}</div>
                <div>{module.slug}</div>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '6px 10px',
                      borderRadius: 999,
                      background: status === 'Pubblicato' ? '#dcfce7' : '#f3f4f6',
                      color: status === 'Pubblicato' ? '#166534' : '#374151',
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a
                    href={module.href}
                    style={{
                      color: '#003d7c',
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                  >
                    Apri
                  </a>

                  {!defaultModule && (
                    <>
                      <a
                        href={`/admin/modules/new?slug=${module.slug}`}
                        style={{
                          color: '#7c2d12',
                          textDecoration: 'none',
                          fontWeight: 700,
                        }}
                      >
                        Modifica
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDelete(module.slug)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#b91c1c',
                          fontWeight: 700,
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        Elimina
                      </button>
                    </>
                  )}

                  {defaultModule && (
                    <span style={{ color: '#6b7280', fontSize: 13 }}>
                      Modulo base
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}