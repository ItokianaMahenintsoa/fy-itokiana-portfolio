import { getTranslations } from "next-intl/server";

const swatches = [
  { name: "bg", hex: "#0e0e10", className: "bg-bg" },
  { name: "surface", hex: "#161619", className: "bg-surface" },
  { name: "line", hex: "#1c1c20", className: "bg-line" },
  { name: "line-2", hex: "#26262a", className: "bg-line-2" },
  { name: "text", hex: "#ededee", className: "bg-text" },
  { name: "muted", hex: "#a1a1a6", className: "bg-muted" },
  { name: "subtle", hex: "#8a8a90", className: "bg-subtle" },
  { name: "faint", hex: "#7c7c82", className: "bg-faint" },
  { name: "accent", hex: "#6ee7a8", className: "bg-accent" },
] as const;

const stack = ["Next.js", "React", "TypeScript", "Node.js", "Prisma"] as const;

export default async function Page() {
  const t = await getTranslations("Preview");

  return (
    <div className="shell space-y-20 py-24">
      <section className="space-y-6">
        <p className="text-label tracking-widest text-faint uppercase">
          {t("label")}
        </p>
        <h1 className="text-hero">
          Fy, développeur full-stack
          <br />
          <span className="text-faint">à Antananarivo.</span>
        </h1>
      </section>

      <section className="grid grid-cols-2 gap-4 border-t pt-12 sm:grid-cols-3 lg:grid-cols-5">
        {swatches.map((s) => (
          <div key={s.name} className="space-y-2">
            <div
              className={`h-20 rounded-img border border-line-2 ${s.className}`}
            />
            <p className="text-label text-muted">
              {s.name} <span className="text-faint">{s.hex}</span>
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-10 border-t pt-12">
        <p className="text-section">Projets sélectionnés</p>
        <p className="text-about">
          Je conçois des produits web clairs,{" "}
          <span className="text-faint">
            du premier écran jusqu&apos;à la mise en ligne.
          </span>
        </p>
        <div>
          <p className="text-project">Tsiahy</p>
          <p className="text-subtle">
            Plateforme phygitale : invitations, imprimerie, studio photo.
          </p>
        </div>
        <p className="text-contact">Un projet en tête ?</p>
      </section>

      <section className="flex flex-wrap items-center gap-6 border-t pt-12">
        <span className="inline-flex items-center gap-2.5 rounded-pill border border-line-2 px-4 py-2 text-label text-muted">
          <span className="pulse-dot size-2 rounded-pill bg-accent" />
          Disponible pour missions
        </span>
        <a
          href="#"
          className="inline-flex h-13 items-center rounded-pill bg-text px-7 font-medium text-bg transition-transform duration-300 ease-smooth hover:-translate-y-0.5"
        >
          Discutons de votre projet
        </a>
        <span className="relative block h-12 w-px overflow-hidden bg-line-2">
          <span className="absolute inset-0 animate-scroll-line bg-text" />
        </span>
      </section>

      <section className="overflow-hidden border-t pt-12">
        <div className="flex w-max animate-marquee">
          {[...stack, ...stack].map((tech, i) => (
            <span key={`${tech}-${i}`} className="flex items-center text-faint">
              <span className="px-6">{tech}</span>
              <span aria-hidden="true">·</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
