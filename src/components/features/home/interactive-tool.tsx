"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Option {
  badge: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  value: string;
}

interface Question {
  id: number;
  label: string;
  question: string;
  hint: string;
  options: Option[];
}

interface Recommendation {
  type: string;
  color: string;
  bg: string;
  accent: string;
  icon: string;
  title: string;
  summary: string;
  bullets: string[];
  cta: string;
}

type AnimState = "idle" | "exit" | "enter";

// ─── Data ─────────────────────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: 1,
    label: "Question 1 of 6",
    question: "How old is your A/C system?",
    hint: "Check the data plate on your outdoor unit — it shows the manufacture date.",
    options: [
      {
        badge: "5 yrs",
        badgeClass: "bg-[#E4ECD9] text-[#45611E]",
        title: "Under 6 years",
        subtitle: "Relatively new system",
        value: "young",
      },
      {
        badge: "6-10",
        badgeClass: "bg-[#D8E6F6] text-[#1D4D80]",
        title: "6-10 years",
        subtitle: "Mid-life range",
        value: "mid",
      },
      {
        badge: "11-15",
        badgeClass: "bg-[#EFE3D1] text-[#7B5523]",
        title: "11-15 years",
        subtitle: "Getting up there",
        value: "aging",
      },
      {
        badge: "15+",
        badgeClass: "bg-[#F1DEE0] text-[#7E2B35]",
        title: "15+ years",
        subtitle: "Older system",
        value: "old",
      },
    ],
  },
  {
    id: 2,
    label: "Question 2 of 6",
    question: "How much have you spent on repairs in the last 2 years?",
    hint: "Include all service calls, parts, and labor costs.",
    options: [
      {
        badge: "$0",
        badgeClass: "bg-[#E4ECD9] text-[#45611E]",
        title: "Nothing",
        subtitle: "No repairs needed",
        value: "none",
      },
      {
        badge: "<$500",
        badgeClass: "bg-[#D8E6F6] text-[#1D4D80]",
        title: "Under $500",
        subtitle: "Minor expenses",
        value: "low",
      },
      {
        badge: "$500+",
        badgeClass: "bg-[#EFE3D1] text-[#7B5523]",
        title: "$500 – $1,500",
        subtitle: "Moderate repairs",
        value: "moderate",
      },
      {
        badge: "$1.5k+",
        badgeClass: "bg-[#F1DEE0] text-[#7E2B35]",
        title: "Over $1,500",
        subtitle: "Significant spend",
        value: "high",
      },
    ],
  },
  {
    id: 3,
    label: "Question 3 of 6",
    question: "How well is it cooling your home?",
    hint: "Think about the hottest days last summer.",
    options: [
      {
        badge: "✓",
        badgeClass: "bg-[#E4ECD9] text-[#45611E]",
        title: "Cools great",
        subtitle: "No hot spots or issues",
        value: "great",
      },
      {
        badge: "~",
        badgeClass: "bg-[#D8E6F6] text-[#1D4D80]",
        title: "Mostly okay",
        subtitle: "Some warm rooms",
        value: "okay",
      },
      {
        badge: "↓",
        badgeClass: "bg-[#EFE3D1] text-[#7B5523]",
        title: "Struggling",
        subtitle: "Often can't keep up",
        value: "struggling",
      },
      {
        badge: "✗",
        badgeClass: "bg-[#F1DEE0] text-[#7E2B35]",
        title: "Not cooling",
        subtitle: "Major performance issues",
        value: "failing",
      },
    ],
  },
  {
    id: 4,
    label: "Question 4 of 6",
    question: "Have your energy bills gone up significantly?",
    hint: "Compare your summer electric bills from 2–3 years ago.",
    options: [
      {
        badge: "No",
        badgeClass: "bg-[#E4ECD9] text-[#45611E]",
        title: "About the same",
        subtitle: "No noticeable increase",
        value: "stable",
      },
      {
        badge: "A bit",
        badgeClass: "bg-[#D8E6F6] text-[#1D4D80]",
        title: "Slightly higher",
        subtitle: "10–20% increase",
        value: "slight",
      },
      {
        badge: "Yes",
        badgeClass: "bg-[#EFE3D1] text-[#7B5523]",
        title: "Noticeably higher",
        subtitle: "20–40% increase",
        value: "higher",
      },
      {
        badge: "A lot",
        badgeClass: "bg-[#F1DEE0] text-[#7E2B35]",
        title: "Much higher",
        subtitle: "Over 40% increase",
        value: "much_higher",
      },
    ],
  },
  {
    id: 5,
    label: "Question 5 of 6",
    question: "Has your system needed frequent repairs?",
    hint: "Think about the number of service calls in the past 3 years.",
    options: [
      {
        badge: "0",
        badgeClass: "bg-[#E4ECD9] text-[#45611E]",
        title: "Zero repairs",
        subtitle: "Hasn't needed service",
        value: "zero",
      },
      {
        badge: "1x",
        badgeClass: "bg-[#D8E6F6] text-[#1D4D80]",
        title: "Once",
        subtitle: "One service call",
        value: "once",
      },
      {
        badge: "2-3x",
        badgeClass: "bg-[#EFE3D1] text-[#7B5523]",
        title: "2–3 times",
        subtitle: "A few service calls",
        value: "few",
      },
      {
        badge: "4x+",
        badgeClass: "bg-[#F1DEE0] text-[#7E2B35]",
        title: "4 or more",
        subtitle: "Constant problems",
        value: "many",
      },
    ],
  },
  {
    id: 6,
    label: "Question 6 of 6",
    question: "What's your budget for this decision?",
    hint: "Being honest here helps us give you the most practical recommendation.",
    options: [
      {
        badge: "Low",
        badgeClass: "bg-[#E4ECD9] text-[#45611E]",
        title: "Repair only",
        subtitle: "Keep costs minimal now",
        value: "repair_budget",
      },
      {
        badge: "Mid",
        badgeClass: "bg-[#D8E6F6] text-[#1D4D80]",
        title: "Up to $3,000",
        subtitle: "Open to rejuvenation",
        value: "mid_budget",
      },
      {
        badge: "High",
        badgeClass: "bg-[#EFE3D1] text-[#7B5523]",
        title: "Up to $6,000",
        subtitle: "New system possible",
        value: "high_budget",
      },
      {
        badge: "Any",
        badgeClass: "bg-[#F1DEE0] text-[#7E2B35]",
        title: "Whatever it takes",
        subtitle: "Best long-term value",
        value: "any_budget",
      },
    ],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────

type WeightMap = Record<string, Record<string, number>>;

const weights: WeightMap = {
  age: { young: 0, mid: 1, aging: 2, old: 3 },
  repairs: { none: 0, low: 1, moderate: 2, high: 3 },
  cooling: { great: 0, okay: 1, struggling: 2, failing: 3 },
  energy: { stable: 0, slight: 1, higher: 2, much_higher: 3 },
  frequency: { zero: 0, once: 1, few: 2, many: 3 },
  budget: { repair_budget: 0, mid_budget: 1, high_budget: 2, any_budget: 3 },
};

function getRecommendation(answers: (string | null)[]): Recommendation {
  const keys = Object.keys(weights);
  const score = answers.reduce<number>((total, ans, i) => {
    if (!ans) return total;
    return total + (weights[keys[i]]?.[ans] ?? 0);
  }, 0);

  if (score <= 4) {
    return {
      type: "REPAIR",
      color: "#45611E",
      bg: "#E4ECD9",
      accent: "#6A9A2D",
      icon: "🔧",
      title: "Repair Your System",
      summary:
        "Your A/C is in solid shape. A targeted repair will keep it running efficiently for years to come.",
      bullets: [
        "System age and performance suggest good remaining life",
        "Repair costs will stay well below replacement value",
        "Efficiency improvements from a tune-up will offset costs",
        "No urgent red flags in your answers",
      ],
      cta: "Schedule a Repair Visit",
    };
  }

  if (score <= 10) {
    return {
      type: "REJUVENATE",
      color: "#1D4D80",
      bg: "#D8E6F6",
      accent: "#2A6DB5",
      icon: "⚡",
      title: "Rejuvenate Your System",
      summary:
        "Your system has signs of wear but isn't ready to retire. A rejuvenation package can add 3–5 more years of reliable comfort.",
      bullets: [
        "Mid-life system with addressable performance issues",
        "Rejuvenation costs far less than full replacement",
        "Efficiency upgrades can noticeably lower energy bills",
        "Delay full replacement while maximizing current investment",
      ],
      cta: "Explore Rejuvenation Options",
    };
  }

  return {
    type: "REPLACE",
    color: "#7E2B35",
    bg: "#F1DEE0",
    accent: "#C0392B",
    icon: "🏠",
    title: "Replace Your System",
    summary:
      "Your A/C has reached the end of its cost-effective life. A new system will pay for itself in lower bills and fewer headaches.",
    bullets: [
      "Age and repair history signal declining reliability",
      "Energy inefficiency is costing you every month",
      "Modern systems are 30–50% more efficient",
      "New system warranties eliminate surprise repair bills",
    ],
    cta: "Get a Free Replacement Quote",
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ACInteractiveTool() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(6).fill(null),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [done, setDone] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const q = questions[currentQ];

  // Restore saved answer when navigating back
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(answers[currentQ]);
    setShowWarning(false);
  }, [currentQ]); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger result fade-in after mount
  useEffect(() => {
    if (done) {
      const id = setTimeout(() => setResultVisible(true), 50);
      return () => clearTimeout(id);
    }
  }, [done]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleSelect(value: string) {
    setSelected(value);
    setShowWarning(false);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = value;
      return next;
    });
  }

  function triggerShake() {
    const el = cardRef.current;
    if (!el) return;
    el.classList.remove("ac-shake");
    void el.offsetWidth; // reflow to restart animation
    el.classList.add("ac-shake");
    el.addEventListener("animationend", () => el.classList.remove("ac-shake"), {
      once: true,
    });
  }

  function transition(forward: boolean, after: () => void) {
    setDirection(forward ? 1 : -1);
    setAnimState("exit");
    setTimeout(() => {
      after();
      setAnimState("enter");
      setTimeout(() => setAnimState("idle"), 350);
    }, 280);
  }

  function handleNext() {
    if (!selected) {
      setShowWarning(true);
      triggerShake();
      return;
    }
    if (currentQ === 5) {
      transition(true, () => {
        setDone(true);
        setResultVisible(false);
      });
      return;
    }
    transition(true, () => setCurrentQ((p) => p + 1));
  }

  function handleBack() {
    if (currentQ === 0) return;
    transition(false, () => setCurrentQ((p) => p - 1));
  }

  function handleReset() {
    setResultVisible(false);
    setTimeout(() => {
      setDone(false);
      setCurrentQ(0);
      setAnswers(Array(6).fill(null));
      setSelected(null);
      setAnimState("idle");
    }, 50);
  }

  // ── Slide style (dynamic — inline is appropriate here) ────────────────────

  const slideStyle: React.CSSProperties = {
    transition: "opacity 0.26s ease, transform 0.26s ease",
    opacity: animState === "idle" ? 1 : 0,
    transform:
      animState === "exit"
        ? `translateX(${direction > 0 ? "-36px" : "36px"})`
        : animState === "enter"
          ? `translateX(${direction > 0 ? "36px" : "-36px"})`
          : "translateX(0)",
  };

  const rec = done ? getRecommendation(answers) : null;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Keyframe-only styles — cannot be expressed in Tailwind without config */}
      <style>{`
                @keyframes ac-shake {
                    0%,100% { transform: translateX(0); }
                    15%     { transform: translateX(-6px); }
                    35%     { transform: translateX(6px); }
                    55%     { transform: translateX(-4px); }
                    75%     { transform: translateX(4px); }
                }

                .ac-shake {
                    animation: ac-shake 0.18s linear;
                }

                @keyframes ac-warn-in {
                    from {
                    opacity: 0;
                    transform: translateY(-5px);
                    }

                    to {
                    opacity: 1;
                    transform: translateY(0);
                    }
                }

                .ac-warn-in {
                    animation: ac-warn-in 0.12s linear;
                }
                `}</style>

      <section className="min-h-screen bg-[#F4F5F7] px-5 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          {/* ── Header ── */}
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-[#E04E2A]">
            Interactive Tool
          </p>

          <h2 className="mt-2.5 font-condensed text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight text-[#0A2B4D]">
            Should I repair, rejuvenate, or replace my A/C?
          </h2>

          <p className="mt-3  text-base leading-7 text-slate-500">
            Answer 6 quick questions and get a personalized recommendation in
            about 60 seconds. Prefer to speak with someone?{" "}
            <span className="font-bold text-[#E04E2A]">call us</span> and a
            qualified professional will guide you every step of the way.
          </p>

          {/* ── Card ── */}
          <div
            ref={cardRef}
            className="mt-8 rounded-2xl border border-[#D8DCE2] bg-[#F8F8F9] p-6  sm:p-10"
          >
            {!done ? (
              <div style={slideStyle}>
                {/* Progress */}
                <div className="mb-8 flex gap-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                        i <= currentQ ? "bg-[#E04E2A]" : "bg-[#CDD2D9]"
                      }`}
                    />
                  ))}
                </div>

                {/* Question meta */}
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-slate-400">
                  {q.label}
                </p>
                <h3 className="mt-1.5 font-condensed text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold leading-tight text-[#0A2B4D]">
                  {q.question}
                </h3>
                <p className="mt-2.5 text-[1rem] leading-7 text-slate-500">
                  {q.hint}
                </p>

                {/* Options */}
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {q.options.map((opt) => {
                    const isSelected = selected === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelect(opt.value)}
                        className={[
                          "flex w-full items-center gap-3.5 rounded-[14px] border bg-[#F8F8F9] px-4 py-3 text-left cursor-pointer",
                          "outline-none transition-all duration-180",
                          isSelected
                            ? "border-[#E04E2A] bg-white  -translate-y-px"
                            : "border-[#D3D7DE] hover:border-[#b0b8c4] hover:bg-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)] hover:-translate-y-px",
                        ].join(" ")}
                      >
                        {/* Badge */}
                        <span
                          className={`inline-flex h-10.5 min-w-10.5 shrink-0 items-center justify-center rounded-[10px] px-2 text-xs font-extrabold ${opt.badgeClass}`}
                        >
                          {opt.badge}
                        </span>

                        {/* Text */}
                        <span className="min-w-0">
                          <span
                            className={`block font-condensed text-lg font-extrabold leading-none transition-colors duration-180 ${
                              isSelected ? "text-[#E04E2A]" : "text-[#0A2B4D]"
                            }`}
                          >
                            {opt.title}
                          </span>
                          <span className="mt-0.5 block text-[0.9rem] leading-snug text-slate-500">
                            {opt.subtitle}
                          </span>
                        </span>

                        {/* Checkmark */}
                        <span
                          className={`ml-auto shrink-0 text-[#E04E2A] transition-opacity duration-150 ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Warning */}
                {showWarning && (
                  <div className="ac-warn-in mt-4 flex items-center gap-2 rounded-[10px] border border-[#FBBFB3] bg-[#FFF3F0] px-3.5 py-2.5 text-[0.84rem] font-semibold text-[#C0392B]">
                    <span aria-hidden="true">⚠</span>
                    <span>Please select an option to continue.</span>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-7 flex items-center justify-between">
                  {currentQ > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="rounded-xl border border-[#D3D7DE] bg-transparent px-5 py-2.5 text-[0.88rem] font-semibold text-slate-400 transition-all duration-180 hover:border-[#aab0ba] hover:bg-white hover:text-slate-600"
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-xl bg-[#E04E2A] px-7 py-3 text-[0.92rem] font-bold uppercase tracking-[0.08em] text-white shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-px hover:bg-[#c94020] hover:shadow-[0_6px_18px_rgba(224,78,42,0.4)] active:translate-y-0"
                  >
                    {currentQ === 5 ? "Get My Result" : "Next →"}
                  </button>
                </div>
              </div>
            ) : (
              /* ── Result ── */
              rec && (
                <div
                  className={`transition-[opacity,transform] duration-500 ease-out ${
                    resultVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  {/* Icon + heading */}
                  <div className="mb-8 text-center">
                    <div
                      className="mx-auto mb-4 flex h-17 w-17 items-center justify-center rounded-full text-3xl"
                      style={{ background: rec.bg }}
                    >
                      {rec.icon}
                    </div>

                    <p
                      className="mb-1.5 text-[0.68rem] font-bold uppercase tracking-[0.26em]"
                      style={{ color: rec.accent }}
                    >
                      Our Recommendation
                    </p>

                    <h3 className="font-condensed text-[clamp(2rem,5vw,2.9rem)] font-extrabold text-[#0A2B4D]">
                      {rec.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-lg text-[1.02rem] leading-7 text-slate-500">
                      {rec.summary}
                    </p>
                  </div>

                  {/* Bullets */}
                  <div className="mb-7 rounded-[14px] border border-[#E5E9EF] bg-white px-6 py-5">
                    <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Why we recommend this
                    </p>
                    <ul className="divide-y divide-[#F0F0F0]">
                      {rec.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 py-2.5">
                          <span
                            className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[0.65rem] font-extrabold"
                            style={{ background: rec.bg, color: rec.color }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-[0.93rem] leading-relaxed text-[#374151]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      className="rounded-xl px-8 py-3.5 text-[0.92rem] font-bold uppercase tracking-[0.06em] text-white shadow-[0_5px_18px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_26px_rgba(0,0,0,0.18)]"
                      style={{ background: rec.accent }}
                    >
                      {rec.cta}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-xl border border-[#D3D7DE] bg-transparent px-6 py-3.5 text-[0.88rem] font-semibold text-slate-500 transition-all duration-[180ms] hover:border-[#aab0ba] hover:bg-white hover:text-slate-700"
                    >
                      ↩ Start Over
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <Button
            className="rounded-xl border border-[#D3D7DE] bg-[#E04E2A] px-10 py-6 text-[0.88rem] font-semibold text-white transition-all duration-180ms hover:border-[#aab0ba] hover:bg-white hover:text-slate-700 cursor-pointer"
            variant={"destructive"}
          >
            Call now
          </Button>
        </div>
      </section>
    </>
  );
}
