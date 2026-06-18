import Link from "next/link";

const cards = [
    {
        title: "New System Quote",
        description:
            "Enter your address and get real pricing on 3 system options — with financing available. Schedule your install online.",
        cta: "Get instant pricing",
        href: "/",
    },
    {
        title: "A/C Rejuvenation",
        description:
            "Restore your current system and get 3–5 more reliable years. Up to 100% of the cost comes back as credit toward a new system.",
        cta: "Schedule a rejuvenation",
        href: "/about",
        secondaryCta: "Watch: What is a Rejuvenation?",
    },
    {
        title: "Repair or Tune-Up",
        description:
            "Schedule a diagnostic, repair, or seasonal maintenance.",
        cta: "Schedule a visit",
        href: "/contact",
    },
];

export function HeroSection() {
    return (
        <section id="new-system-quote" className="relative overflow-hidden bg-(--primary) text-white">
            <div className="absolute inset-0 bg-[url('/images/hero_bg.png')] bg-cover bg-center bg-no-repeat opacity-25" />
            <div className="absolute inset-0 bg-linear-to-r from-(--primary) via-(--primary)/30 to-(--primary)/8" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-(--primary)/40" />

            <div className="relative container-wrapper pb-0 pt-12 sm:pt-14 lg:pt-16">
                <div className="max-w-4xl">
                    <p className="mb-5 text-[0.7rem] font-semibold uppercase  text-(--secondary) sm:text-xs">
                        — Joliet, IL&apos;s Family Owned HVAC Contractor - Joliet, IL.
                    </p>

                    <h1 className="max-w-3xl font-condensed text-4xl font-extrabold leading-[0.95] tracking-[-0.01em] text-white sm:text-5xl lg:text-6xl">
                        <span className="block">
                            Fast. Fair. <span className="text-(--secondary)">Fixed.</span>
                        </span>
                        <span className="block sm:whitespace-nowrap">
                            What HVAC service do you need today?
                        </span>
                    </h1>

                    <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-slate-400 sm:text-lg">
                        Get an instant HVAC replacement quote for a new system in 10 seconds,
                        restore your current A/C with a Rejuvenation, or schedule a repair or
                        maintenance.
                    </p>

                    <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                        <Link
                            href="/hvac-estimate"
                            className="inline-flex w-fit items-center justify-center rounded-md bg-(--secondary) px-5 py-4 text-sm font-bold uppercase  text-white transition-colors duration-300 hover:bg-(--secondary-light)"
                        >
                            Get My Instant Quote
                        </Link>

                        <Link
                            href="/about-us"
                            className="inline-flex w-fit items-center justify-center rounded-md border border-white/60 bg-transparent px-5 py-4 text-sm font-bold uppercase text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
                        >
                            Not Sure? Start Here →
                        </Link>
                    </div>
                </div>

                <div className="mt-12 overflow-hidden rounded-t-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur-sm">
                    <div className="grid gap-px lg:grid-cols-3 cursor-pointer">
                        {cards.map((card, index) => (
                            <article
                                key={card.title}
                                className={`relative min-h-62.5 p-8 lg:p-9 ${
                                    index === 1
                                        ? "bg-(--secondary)/15 hover:bg-(--secondary)/25 transition-colors duration-300"
                                        : "bg-white/5 hover:bg-white/10 transition-colors duration-300"
                                }`}
                            >
                                <h2 className="font-condensed text-2xl font-bold tracking-[-0.02em] text-white sm:text-[1.65rem]">
                                    {card.title}
                                </h2>

                                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 sm:text-[0.95rem]">
                                    {card.description}
                                </p>

                                <Link
                                    href={card.href}
                                    className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1.2em] text-(--secondary) transition-colors duration-300 hover:text-(--secondary-light)"
                                >
                                    {card.cta} <span aria-hidden="true">→</span>
                                </Link>

                                {card.secondaryCta ? (
                                    <Link
                                        href="/about"
                                        className="mt-7 flex items-center gap-3 text-sm font-medium text-slate-200 transition-colors duration-300 hover:text-white"
                                    >
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[10px] text-white">
                                            ▶
                                        </span>
                                        <span>{card.secondaryCta}</span>
                                    </Link>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}