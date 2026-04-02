export default function AdminMaterialsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f4f7f9',
        padding: '40px 24px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
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
          U-MIND · ADMIN / MATERIALI
        </p>

        <h1 style={{ color: '#003d7c', marginTop: 12 }}>
          Gestione materiali
        </h1>

        <p style={{ color: '#333', lineHeight: 1.7 }}>
          Questa area sarà usata per caricare e organizzare PDF, audio, video, trascrizioni
          e materiali associati ai moduli.
        </p>

        <a
          href="/admin"
          style={{
            display: 'inline-block',
            marginTop: 16,
            background: '#003d7c',
            color: '#fff',
            padding: '12px 18px',
            borderRadius: 12,
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          Torna all’admin
        </a>
      </div>
    </main>
  );
}