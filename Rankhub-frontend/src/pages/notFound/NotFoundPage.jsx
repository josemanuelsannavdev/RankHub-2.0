import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6">
      <section className="max-w-lg text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-bold">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-on-surface">
          Page Not Found
        </h1>
        <p className="mt-4 text-on-surface-variant">
          La ruta que intentaste abrir no existe o fue movida.
        </p>
        <Link
          to="/login"
          className="inline-flex mt-8 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold uppercase tracking-wider"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
