/* Midnight Partnership Marketing Kit — main app */

const { useState, useEffect, useMemo, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "persona": "curators",
  "accent": "#2973FF",
  "density": "comfortable"
} /*EDITMODE-END*/;

const ACCENT_PALETTES = {
  '#2973FF': { name: 'Morpho blue', bright: '#8FB6FF' },
  '#3D5BFF': { name: 'Midnight indigo', bright: '#A8B6FF' },
  '#3FA8FF': { name: 'Cool cyan', bright: '#9FD4FF' },
  '#7A5BFF': { name: 'Deep violet', bright: '#C2B0FF' }
};

/* ------------------------------------------------------------------ */
/* App                                                                  */
/* ------------------------------------------------------------------ */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const persona = window.MIDNIGHT.PERSONAS.find((p) => p.id === tweaks.persona) || window.MIDNIGHT.PERSONAS[0];
  const palette = ACCENT_PALETTES[tweaks.accent] || ACCENT_PALETTES['#2973FF'];

  // Apply accent + density to <html>
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    document.documentElement.style.setProperty('--accent-bright', palette.bright);
    document.documentElement.setAttribute('data-density', tweaks.density);
  }, [tweaks.density, tweaks.accent, palette.bright]);

  return (
    <>
      <TopBar persona={persona} onPersonaChange={(id) => setTweak('persona', id)} />
      <main>
        <Hero persona={persona} onPersonaChange={(id) => setTweak('persona', id)} />
        <SectionWhatLaunching />
        <SectionIntro />
        <SectionCoreMessaging persona={persona} onPersonaChange={(id) => setTweak('persona', id)} />
        <Footer />
      </main>
      <TweaksPanelHost tweaks={tweaks} setTweak={setTweak} />
    </>);

}

/* ------------------------------------------------------------------ */
/* TopBar — sticky nav with persona switcher                            */
/* ------------------------------------------------------------------ */
function TopBar({ persona, onPersonaChange }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-brand">
          <img src={window.__resources && window.__resources.logoSymbol || "assets/Morpho-logo-symbol-darkmode.svg"} alt="Morpho" className="brand-mark" />
          <span className="brand-divider">/</span>
          <span className="brand-label">Midnight · Partnership kit</span>
        </div>
        <nav className="topbar-nav">
          <a href="#launching">Announcement Plan</a>
          <a href="#intro">Midnight</a>
          <a href="#messaging">Benefits</a>
        </nav>
        <PersonaPill persona={persona} onPersonaChange={onPersonaChange} />
      </div>
    </header>);

}

function PersonaPill({ persona, onPersonaChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  return (
    <div className="persona-pill-wrap" ref={ref}>
      <button className="persona-pill" onClick={() => setOpen(!open)}>
        <span className="persona-pill-label">{persona.label}</span>
        <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg>
      </button>
      {open &&
      <div className="persona-menu">
          {window.MIDNIGHT.PERSONAS.map((p) =>
        <button
          key={p.id}
          className={'persona-menu-item ' + (p.id === persona.id ? 'is-active' : '')}
          onClick={() => {onPersonaChange(p.id);setOpen(false);}}>
          
              <span className="persona-menu-label">{p.label}</span>
              <span className="persona-menu-sub">{p.sub}</span>
            </button>
        )}
        </div>
      }
    </div>);

}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
function Hero({ persona, onPersonaChange }) {
  return (
    <section className="hero">
      <HeroBackdrop />
      <div className="hero-content">
        <div className="hero-meta">
          <span className="t-overline">Partnership marketing kit</span>
          <span className="hero-meta-dot">·</span>
          <span className="t-overline">CONFIDENTIAL </span>
        </div>
        <h1 className="hero-title">
          Morpho<br />
          <span className="hero-title-em">Midnight</span>
        </h1>
        <p className="hero-sub">Fixed-rate, fixed-term onchain credit.
The infrastructure that brings the $200T credit markets onchain.
        </p>
        <div className="hero-launch">
          <div className="hero-launch-item">
            <span className="t-overline">Launch</span>
            <span className="hero-launch-value">est. Early July 2026</span>
          </div>
          <div className="hero-launch-divider" />
          <div className="hero-launch-item">
            <span className="t-overline">Teasing window</span>
            <span className="hero-launch-value">7 days prior to announcement</span>
          </div>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/* Section 1 — Basics                                                   */
/* ------------------------------------------------------------------ */
function SectionBasics() {
  const { BASICS_AMBITION, EVOLUTION, DAY_ONE } = window.MIDNIGHT;
  return (
    <section id="basics" className="section">
      <SectionHeader number="01" title="The basics of Morpho Midnight" />

      <div className="basics-ambition">
        <div className="ambition-row">
          <div className="ambition-pair">
            <div className="ambition-num small">{BASICS_AMBITION.small}</div>
            <div className="ambition-label">{BASICS_AMBITION.smallLabel}</div>
          </div>
          <svg className="ambition-arrow" viewBox="0 0 80 24" width="80" height="24"><path d="M0 12 L70 12 M62 5 L75 12 L62 19" stroke="var(--accent-bright)" strokeWidth="1.5" fill="none" /></svg>
          <div className="ambition-pair">
            <div className="ambition-num large">{BASICS_AMBITION.large}</div>
            <div className="ambition-label">{BASICS_AMBITION.largeLabel}</div>
          </div>
        </div>
        <p className="ambition-bridge">{BASICS_AMBITION.bridge}</p>
      </div>

      <div className="dayone-block">
        <span className="t-overline">Day one is intentionally narrow</span>
        <div className="dayone-grid">
          <div className="dayone-col is-yes">
            <div className="dayone-label">What ships</div>
            <ul>
              {DAY_ONE.is.map((x) =>
              <li key={x}><Tick /> {x}</li>
              )}
            </ul>
          </div>
          <div className="dayone-col is-no">
            <div className="dayone-label">What doesn't (yet)</div>
            <ul>
              {DAY_ONE.isnt.map((x) =>
              <li key={x}><Dash /> {x}</li>
              )}
            </ul>
          </div>
        </div>
        <p className="dayone-note">Security before surface area, every time. Roughly $2B of vault liquidity is ready to route through Midnight the moment the adapter is live. We are gating that on security, not marketing.</p>
      </div>
    </section>);

}

const Tick = () =>
<svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7.5 L6 10.5 L11.5 4" stroke="var(--accent-bright)" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>;

const Dash = () =>
<svg width="14" height="14" viewBox="0 0 14 14"><line x1="3" y1="7" x2="11" y2="7" stroke="var(--fg-quaternary)" strokeWidth="1.5" /></svg>;


/* ------------------------------------------------------------------ */
/* Section 2 — What we're launching + timeline                          */
/* ------------------------------------------------------------------ */
function SectionWhatLaunching() {
  const { TIMELINE } = window.MIDNIGHT;
  const rowsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const anchor = vh * 0.5; // viewport line that determines the active row
      let best = 0;
      let bestDist = Infinity;
      rowsRef.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        // Active = closest row whose center has crossed (or is near) the anchor line.
        // Bias toward rows already scrolled past: only update if center <= anchor + small slack.
        if (center <= anchor + 60) {
          const dist = Math.abs(center - anchor);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        }
      });
      setActiveIdx(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="launching" className="section">
      <SectionHeader number="01" title="How you can support" sub="During launch week we ask for 2 RTs of the teasers and 1 QT of the announcement." />
      <div className="timeline">
        <div className="timeline-cols-head">
          <div className="tcol-when"></div>
          <div className="tcol-what"><span className="t-overline">What @morpho posts</span></div>
          <div className="tcol-support"><span className="t-overline tcol-support-label">HOW TO SUPPORT</span></div>
        </div>
        <div className="timeline-spine" />
        {TIMELINE.map((t, i) =>
        <div
          key={t.day}
          ref={(el) => rowsRef.current[i] = el}
          className={'timeline-row tone-' + t.tone + (i === activeIdx ? ' is-active' : '')}>

            <div className="timeline-dot-col">
              <div className="timeline-dot" />
            </div>
            <div className="timeline-day-col">
              <div className="timeline-day">{t.day}</div>
            </div>
            <div className="timeline-body-col">
              <h3 className="timeline-title">{t.title}</h3>
              <p className="timeline-body">{t.body}</p>
            </div>
            <div className="timeline-support-col">
              <p className="timeline-support">{t.support}</p>
              {t.cta &&
            <a href={t.ctaHref || '#'} className="btn btn-primary timeline-cta">
                {t.cta}
                <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" style={{ marginLeft: 8 }}>
                  <path d="M7 2 L7 11 M3 7.5 L7 11.5 L11 7.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            }
            </div>
          </div>
        )}
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/* Section 3 — How you could support (teasing plan)                     */
/* ------------------------------------------------------------------ */
function SectionHowSupport() {
  const { SUPPORT } = window.MIDNIGHT;
  return (
    <section id="support" className="section">
      <SectionHeader number="02" title="How you could support" sub="Help us amplify two teasers and the announcement." />

      <div className="tease-clock-row">
        {SUPPORT.map((s) =>
        <div key={s.tag} className={'tease-clock-card' + (s.kind === 'announce' ? ' tease-announce' : '')}>
            {s.kind === 'clock' && <TickingClock size={130} />}
            {s.kind === 'emoji' && <div className="tease-emoji">🕛</div>}
            {s.kind === 'announce' &&
          <div className="tease-announce-mark">
                <img src={window.__resources && window.__resources.logoSymbol || "assets/Morpho-logo-symbol-darkmode.svg"} alt="" />
              </div>
          }
            <div className="tease-clock-meta">
              <span className="t-overline">{s.tag}</span>
              <span className="tease-clock-title">{s.title}</span>
              <span className="tease-clock-sub">{s.body}</span>
              {s.cta &&
            <a href="#" className="btn btn-primary tease-customizer-cta">
                  {s.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ marginLeft: 8 }}>
                    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
            }
            </div>
          </div>
        )}
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/* Section 4 — Core messaging (persona-tailored)                        */
/* ------------------------------------------------------------------ */
function SectionCoreMessaging({ persona, onPersonaChange }) {
  return (
    <section id="messaging" className="section section-persona">
      <SectionHeader number="03" title="Benefits for..." sub={persona.sub} data-comment-anchor="b464e7c91c-h2-409-9" />

      <PersonaPicker current={persona} onChange={onPersonaChange} />

      <div className="persona-hero">
        <blockquote className="persona-quote">
          {persona.hero}
        </blockquote>
      </div>

      <div className="proofs">
        <div className="proofs-grid" data-comment-anchor="bb634e3ce2-div-335-9">
          {persona.proofs.map((p, i) =>
          <div key={i} className="proof-card">
              <div className="proof-index">0{i + 1}</div>
              <p className="proof-value">{p}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function PersonaPicker({ current, onChange }) {
  return (
    <div className="persona-picker">
      <span className="t-overline">WHAT DOES YOUR ORGANIZATION FALL UNDER?</span>
      <div className="persona-picker-row">
        {window.MIDNIGHT.PERSONAS.map((p) =>
        <button
          key={p.id}
          className={'persona-chip ' + (p.id === current.id ? 'is-active' : '')}
          onClick={() => onChange(p.id)}>
          
            <span className="persona-chip-label">{p.label}</span>
          </button>
        )}
      </div>
    </div>);

}

/* ------------------------------------------------------------------ */
/* Section 5 — What we need from you (persona-tailored)                 */
/* ------------------------------------------------------------------ */
function SectionPartnerAsks({ persona }) {
  return (
    <section id="asks" className="section">
      <SectionHeader number="05" title="Would love to see from you" data-comment-anchor="20c3ce759d-h2-409-9" />
      <ul className="asks-list">
        {persona.asks.map((ask, i) =>
        <li key={i} className="ask-row">
            <span className="ask-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="ask-body">{ask}</span>
          </li>
        )}
      </ul>
      <div className="asks-cta">
        <div className="cta-text">
          <h3>Ready to coordinate?</h3>
          <p>Reply to the kit email with your social lead's contact and we'll schedule the working session.</p>
        </div>
        <div className="cta-actions">
          <a href="#" className="btn btn-primary">Confirm participation →</a>
          <a href="#" className="btn btn-ghost">Create your branded asset</a>
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
function SectionHeader({ number, title, sub }) {
  return (
    <div className="section-header">
      <div className="section-number">{number}</div>
      <div className="section-titles">
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
    </div>);

}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={window.__resources && window.__resources.logoHorizontal || "assets/Morpho-logo-horizontal-darkmode.svg"} alt="Morpho" className="footer-logo" />
          <p className="footer-tag">The open credit network for the world.
</p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <span className="t-overline">Marketing team</span>
            <span>marketing@morpho.org</span>
          </div>
          <div className="footer-col">
            <span className="t-overline">Partnerships marketing</span>
            <span>@bobajeanjacques</span>
            <span>jj@morpho.org</span>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <span>Confidential — for partner internal use only</span>
      </div>
    </footer>);

}
/* ------------------------------------------------------------------ */
/* Tweaks panel                                                         */
/* ------------------------------------------------------------------ */
function TweaksPanelHost({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Persona" />
      <TweakSelect
        label="Type"
        value={tweaks.persona}
        onChange={(v) => setTweak('persona', v)}
        options={window.MIDNIGHT.PERSONAS.map((p) => ({ value: p.id, label: p.label }))} />
      
      <TweakSection label="Accent" />
      <TweakColor
        label="Color"
        value={tweaks.accent}
        onChange={(v) => setTweak('accent', v)}
        options={Object.keys(ACCENT_PALETTES)} />
      
      <TweakSection label="Density" />
      <TweakRadio
        label="Spacing"
        value={tweaks.density}
        onChange={(v) => setTweak('density', v)}
        options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} />
      
    </TweaksPanel>);

}

/* Mount */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);