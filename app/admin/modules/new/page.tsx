'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import {
  getStoredModuleBySlug,
  saveStoredModule,
} from '../../../lib/module-storage';

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getSectionGuide(sectionTitle: string) {
  const normalized = sectionTitle.trim().toLowerCase();

  if (normalized === 'stimolo') {
    return {
      help: 'Lo stimolo attiva il processo di apprendimento. Non spiegare: poni una domanda, un problema o una situazione che metta in crisi e spinga a riflettere.',
      example: 'Esempio: “Se l’AI risponde a tutto, qual è il ruolo del docente?”',
    };
  }

  if (normalized === 'concetto') {
    return {
      help: 'Il concetto chiarisce il nucleo teorico della sezione. Qui puoi definire, inquadrare e dare struttura al tema.',
      example:
        'Esempio: “L’AI-supported learning è un setting in cui l’intelligenza artificiale supporta comprensione, confronto e riflessione critica.”',
    };
  }

  if (normalized === 'applicazione') {
    return {
      help: 'L’applicazione mostra come il concetto prende forma nella pratica. Qui descrivi un uso possibile, un’attività o una situazione reale.',
      example:
        'Esempio: “Gli studenti rispondono prima senza AI e poi confrontano il proprio elaborato con quello generato dal sistema.”',
    };
  }

  if (normalized === 'schema') {
    return {
      help: 'Lo schema sintetizza il processo in passaggi chiari. Serve a rendere visibile la struttura operativa del modulo.',
      example:
        'Esempio: “1. Attivazione del compito · 2. Interazione con AI · 3. Confronto · 4. Riflessione finale”',
    };
  }

  if (normalized === 'riflessione') {
    return {
      help: 'La riflessione accompagna la rielaborazione personale e professionale. Qui proponi una domanda che chieda di interpretare o rivedere la pratica.',
      example:
        'Esempio: “In quale momento della tua didattica l’AI potrebbe supportare senza sostituire i processi dello studente?”',
    };
  }

  return null;
}

function getPromptGuide(promptText: string) {
  const normalized = promptText.trim().toLowerCase();

  if (!normalized) {
    return {
      help: 'Scrivi un prompt che orienti l’utente a riflettere, progettare o prendere decisioni didattiche.',
      example:
        'Esempio: “In quale fase della tua lezione l’AI può supportare senza sostituire lo studente?”',
    };
  }

  if (normalized.includes('come')) {
    return {
      help: 'Questo prompt è orientato all’applicazione.',
      example:
        'Esempio: “Come potresti usare questo approccio in una tua attività universitaria?”',
    };
  }

  if (normalized.includes('quale') || normalized.includes('quando')) {
    return {
      help: 'Questo prompt è orientato alla decisione.',
      example:
        'Esempio: “Quale fase del processo affideresti all’AI e quale allo studente?”',
    };
  }

  if (
    normalized.includes('perché') ||
    normalized.includes('limite') ||
    normalized.includes('risch')
  ) {
    return {
      help: 'Questo prompt è critico-riflessivo.',
      example:
        'Esempio: “Perché un uso passivo dell’AI può indebolire il processo di apprendimento?”',
    };
  }

  return {
    help: 'Controlla che il prompt non chieda solo una definizione, ma orienti l’utente a interpretare, decidere o applicare.',
    example:
      'Esempio: “In che modo questo concetto modifica la tua progettazione didattica?”',
  };
}

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

    return trimmed;
  } catch {
    return '';
  }
}

const colorOptions = [
  { name: 'Blu istituzionale', value: '#003d7c' },
  { name: 'Oro', value: '#a6894d' },
  { name: 'Verde', value: '#2f6f4f' },
  { name: 'Grigio', value: '#4b5563' },
  { name: 'Bordeaux', value: '#7c2d3a' },
];

const sectionTypes = [
  'Stimolo',
  'Concetto',
  'Applicazione',
  'Schema',
  'Riflessione',
];

export default function NewModulePage() {
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const isEditing = !!editingSlug;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEditedManually, setSlugEditedManually] = useState(false);
  const [level, setLevel] = useState('Livello II · Metodologia didattica');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#003d7c');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [showOnHome, setShowOnHome] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const [sections, setSections] = useState([{ title: 'Stimolo', content: '' }]);
  const [prompts, setPrompts] = useState([{ text: '' }]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const slugFromUrl = params.get('slug');
    setEditingSlug(slugFromUrl);
  }, []);

  useEffect(() => {
    if (!slugEditedManually) {
      setSlug(slugify(title));
    }
  }, [title, slugEditedManually]);

  useEffect(() => {
    if (!editingSlug) return;

    const found = getStoredModuleBySlug(editingSlug);
    if (!found) return;

    setTitle(found.title ?? '');
    setSlug(found.slug ?? '');
    setSlugEditedManually(true);
    setLevel(found.level ?? 'Livello II · Metodologia didattica');
    setDescription(found.description ?? '');
    setColor(found.color ?? '#003d7c');
    setFeatured(!!found.featured);
    setPublished(found.published !== false);
    setShowOnHome(!!found.showOnHome);
    setYoutubeUrl(found.youtubeUrl ?? '');
    setSections(
      found.sections?.length
        ? found.sections.map((s) => ({
            ...s,
            title: s.title || 'Stimolo',
          }))
        : [{ title: 'Stimolo', content: '' }]
    );
    setPrompts(found.prompts?.length ? found.prompts : [{ text: '' }]);
  }, [editingSlug]);

  const addSection = () => {
    setSections([...sections, { title: 'Stimolo', content: '' }]);
  };

  const updateSection = (
    index: number,
    field: 'title' | 'content',
    value: string
  ) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    );
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const addPrompt = () => {
    setPrompts((prev) => [...prev, { text: '' }]);
  };

  const updatePrompt = (index: number, value: string) => {
    setPrompts((prev) =>
      prev.map((prompt, i) => (i === index ? { ...prompt, text: value } : prompt))
    );
  };

  const removePrompt = (index: number) => {
    setPrompts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const finalSlug = slug.trim() || slugify(title);

    const moduleData = {
      title,
      slug: finalSlug,
      level,
      description,
      href: `/modules/${finalSlug}`,
      color,
      featured,
      published,
      showOnHome,
      youtubeUrl: youtubeUrl.trim(),
      prompts: prompts.filter((p) => p.text.trim() !== ''),
      sections: sections.filter(
        (s) => s.title.trim() !== '' || s.content.trim() !== ''
      ),
    };

    saveStoredModule(moduleData);
    alert(isEditing ? 'Modulo aggiornato con successo.' : 'Modulo salvato con successo.');
  };

  const previewEmbedUrl = useMemo(
    () => extractYouTubeEmbedUrl(youtubeUrl),
    [youtubeUrl]
  );

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
              UMiND · ADMIN / MODULI
            </p>

            <h1
              style={{
                margin: '10px 0 8px 0',
                fontSize: 34,
                color: '#003d7c',
              }}
            >
              {isEditing ? 'Modifica modulo' : 'Crea un nuovo modulo'}
            </h1>

            <p style={{ margin: 0, color: '#444', fontSize: 18 }}>
              Area riservata agli amministratori autorizzati per la curatela dei contenuti UMiND.
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
                  Titolo modulo
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Es. Apprendimento supportato dall’AI"
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
                  URL del modulo
                </label>
                <input
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugEditedManually(true);
                  }}
                  placeholder="es. apprendimento-supportato-ai"
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                />
                <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                  L’URL viene generato automaticamente dal titolo. Puoi comunque modificarlo manualmente se necessario.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSlug(slugify(title));
                    setSlugEditedManually(false);
                  }}
                  style={{
                    marginTop: 8,
                    background: '#e5e7eb',
                    color: '#111827',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Rigenera URL dal titolo
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>
                  Livello
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                >
                  <option>Livello I · Modelli didattici</option>
                  <option>Livello II · Metodologia didattica</option>
                  <option>Livello III · Setting didattico</option>
                  <option>Livello IV · Progettazione</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>
                  Descrizione
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrivi il modulo..."
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
                <label style={{ display: 'block', fontWeight: 700, marginBottom: 10 }}>
                  Colore del modulo
                </label>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {colorOptions.map((option) => {
                    const isSelected = color === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setColor(option.value)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 12px',
                          borderRadius: 12,
                          border: isSelected ? '2px solid #111827' : '1px solid #d1d5db',
                          background: '#fff',
                          cursor: 'pointer',
                          fontWeight: 700,
                        }}
                      >
                        <span
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 999,
                            background: option.value,
                            display: 'inline-block',
                          }}
                        />
                        {option.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontWeight: 700,
                }}
              >
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Modulo in evidenza
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontWeight: 700,
                }}
              >
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Modulo pubblicato
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontWeight: 700,
                }}
              >
                <input
                  type="checkbox"
                  checked={showOnHome}
                  onChange={(e) => setShowOnHome(e.target.checked)}
                />
                Mostra in Home
              </label>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>
                  Video YouTube del microlearning
                </label>
                <input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="Incolla qui il link YouTube"
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                  }}
                />
                <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                  Inserisci un normale link YouTube. Il sistema lo mostrerà nel modulo come video incorporato.
                </p>
              </div>

              <div style={{ marginTop: 20 }}>
                <h3 style={{ color: '#003d7c' }}>Sezioni del modulo</h3>

                {sections.map((section, index) => {
                  const guide = getSectionGuide(section.title);

                  return (
                    <div
                      key={index}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: 12,
                        padding: 16,
                        marginTop: 12,
                        background: '#fafafa',
                      }}
                    >
                      <select
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        style={{
                          width: '100%',
                          padding: 10,
                          borderRadius: 8,
                          border: '1px solid #ccc',
                          marginBottom: 10,
                          boxSizing: 'border-box',
                          fontWeight: 700,
                        }}
                      >
                        {sectionTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>

                      {guide && (
                        <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
                          {guide.help}
                        </p>
                      )}

                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        placeholder="Contenuto della sezione..."
                        rows={4}
                        style={{
                          width: '100%',
                          padding: 10,
                          borderRadius: 8,
                          border: '1px solid #ccc',
                          boxSizing: 'border-box',
                          resize: 'vertical',
                        }}
                      />

                      {guide && (
                        <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                          {guide.example}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        style={{
                          marginTop: 10,
                          background: '#ef4444',
                          color: '#fff',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: 8,
                          cursor: 'pointer',
                        }}
                      >
                        Rimuovi sezione
                      </button>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={addSection}
                  style={{
                    marginTop: 12,
                    background: '#a6894d',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  + Aggiungi sezione
                </button>
              </div>

              <div style={{ marginTop: 20 }}>
                <h3 style={{ color: '#003d7c' }}>Prompt suggeriti</h3>

                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                  I prompt guidano l’interazione con il tutor UMiND. Servono ad attivare riflessione,
                  progettazione e uso consapevole dell’AI.
                </p>

                {prompts.map((prompt, index) => {
                  const promptGuide = getPromptGuide(prompt.text);

                  return (
                    <div
                      key={index}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: 12,
                        padding: 16,
                        marginTop: 12,
                        background: '#fafafa',
                      }}
                    >
                      <input
                        value={prompt.text}
                        onChange={(e) => updatePrompt(index, e.target.value)}
                        placeholder="Scrivi un prompt suggerito..."
                        style={{
                          width: '100%',
                          padding: 10,
                          borderRadius: 8,
                          border: '1px solid #ccc',
                          boxSizing: 'border-box',
                        }}
                      />

                      <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                        {promptGuide.help}
                      </p>

                      <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
                        {promptGuide.example}
                      </p>

                      <button
                        type="button"
                        onClick={() => removePrompt(index)}
                        style={{
                          marginTop: 10,
                          background: '#ef4444',
                          color: '#fff',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: 8,
                          cursor: 'pointer',
                        }}
                      >
                        Rimuovi prompt
                      </button>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={addPrompt}
                  style={{
                    marginTop: 12,
                    background: '#4b5563',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  + Aggiungi prompt
                </button>
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
                {isEditing ? 'Aggiorna modulo' : 'Salva modulo'}
              </button>

              <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                <a
                  href="/admin/modules"
                  style={{
                    background: '#4b5563',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                >
                  ← Torna ai moduli
                </a>

                <a
                  href="/modules"
                  style={{
                    background: '#003d7c',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                >
                  Vai al catalogo
                </a>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  style={{
                    background: '#a6894d',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  + Nuovo modulo
                </button>
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
                ANTEPRIMA
              </p>

              <div
                style={{
                  marginTop: 16,
                  background: '#f8f8f8',
                  borderRadius: 16,
                  padding: 20,
                  borderLeft: `6px solid ${color || '#003d7c'}`,
                }}
              >
                <p style={{ margin: 0, color: '#666', fontSize: 13, fontWeight: 700 }}>
                  {level || 'Livello del modulo'}
                </p>

                <h2 style={{ color: '#003d7c', marginBottom: 8 }}>
                  {title || 'Titolo del modulo'}
                </h2>

                <p style={{ color: '#333', lineHeight: 1.7 }}>
                  {description || 'Qui comparirà la descrizione del modulo.'}
                </p>

                <p style={{ color: published ? '#166534' : '#6b7280', fontWeight: 700 }}>
                  {published ? 'Pubblicato' : 'Bozza'}
                </p>

                <p style={{ color: showOnHome ? '#a6894d' : '#6b7280', fontWeight: 700 }}>
                  {showOnHome ? 'Mostrato in Home' : 'Non mostrato in Home'}
                </p>

                {previewEmbedUrl && (
                  <div style={{ marginTop: 20 }}>
                    <strong style={{ display: 'block', marginBottom: 8 }}>
                      Anteprima video
                    </strong>

                    <iframe
                      width="100%"
                      height="220"
                      src={previewEmbedUrl}
                      title="Anteprima video YouTube"
                      style={{ border: 'none', borderRadius: 12 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                <div style={{ marginTop: 20 }}>
                  {sections.map((section, index) => (
                    <div key={index} style={{ marginBottom: 12 }}>
                      <strong>{section.title || 'Titolo sezione'}</strong>
                      <p style={{ margin: '4px 0', color: '#333', lineHeight: 1.6 }}>
                        {section.content || 'Contenuto della sezione'}
                      </p>
                    </div>
                  ))}
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