import { useEffect, useRef, useState } from "react";
import { Feather, PenTool } from "lucide-react";

export function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const authors = [
    {
      name: "Elena Marsh",
      role: "Poet & Storyteller",
      bio: "Elena writes about the quiet moments — the space between waking and sleeping, the weight of a name, the way light falls through a window and changes everything. Her work has appeared in literary journals she forgets the names of, and on napkins she keeps in a drawer. She believes the best stories are the ones that follow you home.",
      icon: Feather,
      iconColor: "text-amber-400",
      roleColor: "text-amber-400/70",
      gradient: "from-amber-950 to-stone-900",
    },
    {
      name: "Theo Ashburn",
      role: "Essayist & Novelist",
      bio: "Theo writes about memory, borders, and the things people carry without knowing they are carrying them. He has been a lighthouse keeper (briefly), a librarian (longer), and a person who starts notebooks and rarely finishes them (always). He is interested in the sentence that makes you put the book down and stare at the wall.",
      icon: PenTool,
      iconColor: "text-teal-400",
      roleColor: "text-teal-400/70",
      gradient: "from-teal-950 to-stone-900",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-stone-950 px-6 py-24 sm:px-12 lg:px-20"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-amber-900/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-teal-900/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
            The Writers
          </span>
          <h2 className="mt-4 font-serif text-3xl text-stone-100 sm:text-4xl">
            Two voices, one page
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-stone-700" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {authors.map((author, i) => {
            const Icon = author.icon;
            return (
              <div
                key={author.name}
                className={`group relative overflow-hidden rounded-2xl border border-stone-800 bg-gradient-to-br ${author.gradient} p-8 transition-all duration-700 hover:border-stone-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-stone-700 bg-stone-900/50 transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Icon className={`h-7 w-7 ${author.iconColor}`} />
                  </div>

                  <h3 className="font-serif text-2xl text-stone-100">{author.name}</h3>
                  <p className={`mt-1 text-sm font-light tracking-wide ${author.roleColor}`}>
                    {author.role}
                  </p>

                  <p className="mt-5 text-sm font-light leading-relaxed text-stone-400">
                    {author.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <p className="mx-auto max-w-2xl font-serif text-xl italic leading-relaxed text-stone-400 sm:text-2xl">
            "We write because we cannot stop. We share because someone once shared with us, and it
            saved us, and we have not yet found a better way to say thank you."
          </p>
        </div>
      </div>
    </section>
  );
}
