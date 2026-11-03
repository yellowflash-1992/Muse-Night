export function TermsPage() {
  return (
    <main className="bg-ink px-6 py-16 text-paper sm:py-20">
      <article className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-4 border-b border-neon/15 pb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-neon">Muse Night · Legal</p>
          <h1 className="font-display text-4xl font-medium sm:text-5xl">Terms of Service</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-paper-dim sm:text-base">
            These terms describe the basic conditions for using Muse Night and submitting work to
            the press.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Using Muse Night</h2>
          <p className="text-sm leading-7 text-paper-dim">
            Use the site lawfully and respectfully. You are responsible for the material you submit
            and for keeping your account credentials secure. We may restrict access to features
            where necessary to protect the site or its community.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Your work and permission to publish</h2>
          <p className="text-sm leading-7 text-paper-dim">
            You retain ownership of the work you submit. By submitting it, you grant Muse Night a
            non-exclusive license to review, edit in consultation as appropriate, reproduce, and
            publish the work in the formats and channels relevant to the submission, if it is
            accepted. This permission allows us to present and promote published work; it does not
            transfer ownership to Muse Night.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Content standards</h2>
          <p className="text-sm leading-7 text-paper-dim">
            Do not submit hate speech, plagiarized work, or material that unlawfully infringes
            another person&apos;s rights. You confirm that you have the right to submit your work
            and grant the permissions described above. Muse Night may decline or remove material
            that does not meet these standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Review and publication</h2>
          <p className="text-sm leading-7 text-paper-dim">
            Sending work does not guarantee acceptance or publication. We may make editorial
            decisions about selection, presentation, and timing. Any additional agreement for a
            specific publication or edition will take precedence for that work where applicable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Changes and contact</h2>
          <p className="text-sm leading-7 text-paper-dim">
            We may update these terms as the site develops. Continued use after an update means you
            accept the revised terms. Questions about these terms may be sent using the contact
            information provided on the Muse Night website.
          </p>
        </section>
      </article>
    </main>
  );
}
