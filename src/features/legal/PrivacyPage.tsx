export function PrivacyPage() {
  return (
    <main className="bg-ink px-6 py-16 text-paper sm:py-20">
      <article className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-4 border-b border-neon/15 pb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-neon">Muse Night · Legal</p>
          <h1 className="font-display text-4xl font-medium sm:text-5xl">Privacy Policy</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-paper-dim sm:text-base">
            This policy explains what information Muse Night may collect when you use the site and
            how that information is used.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Information we collect</h2>
          <p className="text-sm leading-7 text-paper-dim">
            When you sign in using Google authentication, we receive account information such as
            your email address and basic account identifiers. If you send us work or use a member
            feature, we collect the information you provide, which may include your name or pen
            name, contact details, manuscript, profile information, and any accompanying notes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">How we use information</h2>
          <p className="text-sm leading-7 text-paper-dim">
            We use account information to provide and secure member features, communicate with you
            about your account or submissions, and respond to requests. Submitted work may be
            reviewed and, if selected and with the permissions described in our Terms of Service,
            edited, published, or included in Muse Night editions. We do not sell your personal
            information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Sharing and retention</h2>
          <p className="text-sm leading-7 text-paper-dim">
            We do not sell personal information. Information may be processed by service providers
            that help us operate authentication, hosting, storage, and communications. We retain
            information for as long as needed to provide the service, manage submissions, meet
            applicable obligations, or resolve disputes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Your choices</h2>
          <p className="text-sm leading-7 text-paper-dim">
            You may contact Muse Night to ask about or request changes to personal information
            associated with your account. Some information may need to be retained where required
            for legitimate operational or legal purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl text-paper">Contact</h2>
          <p className="text-sm leading-7 text-paper-dim">
            For privacy questions or requests, please use the contact information provided on the
            Muse Night website.
          </p>
        </section>
      </article>
    </main>
  );
}
