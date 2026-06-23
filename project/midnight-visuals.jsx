/* Midnight signature visuals — gauge meter, glowing orb, ticking clock */

/* ------------------------------------------------------------------ */
/* MidnightOrb — the glowing moon-orb behind the hero                  */
/* ------------------------------------------------------------------ */
const MidnightOrb = ({ size = 880, intensity = 1 }) => {
  return (
    <svg viewBox="0 0 880 880" width={size} height={size} style={{ display: 'block', pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent, #5792FF)" stopOpacity={0.55 * intensity} />
          <stop offset="35%" stopColor="var(--accent, #2973FF)" stopOpacity={0.30 * intensity} />
          <stop offset="62%" stopColor="var(--accent, #2973FF)" stopOpacity={0.10 * intensity} />
          <stop offset="100%" stopColor="var(--accent, #2973FF)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orb-core" cx="50%" cy="48%" r="40%">
          <stop offset="0%" stopColor="var(--accent-bright, #8FB6FF)" stopOpacity={0.40 * intensity} />
          <stop offset="55%" stopColor="var(--accent, #2973FF)" stopOpacity={0.18 * intensity} />
          <stop offset="100%" stopColor="var(--accent, #2973FF)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="440" cy="440" r="430" fill="url(#orb-glow)" />
      <circle cx="440" cy="440" r="280" fill="url(#orb-core)" />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* GaugeMeter — Optimizer / Blue / Midnight arc as a gauge             */
/* `active`: 0 = Optimizer, 1 = Blue, 2 = Midnight (fractional ok)     */
/* ------------------------------------------------------------------ */
const GaugeMeter = ({ height = 360, active = 2 }) => {
  // Generate tick marks across the gauge
  const ticks = [];
  const tickCount = 41;
  for (let i = 0; i < tickCount; i++) {
    const isMajor = i % 10 === 0;
    const isMid = i % 5 === 0;
    const x = 80 + (i / (tickCount - 1)) * 1040;
    const h = isMajor ? 30 : isMid ? 18 : 10;
    ticks.push({ x, h, isMajor, isMid, i });
  }

  // Label positions — Optimizer (i=4), Blue (i=20), Midnight (i=36)
  const labels = [
    { idx: 4, name: 'Optimizer', year: '2022' },
    { idx: 20, name: 'Blue', year: '2024' },
    { idx: 36, name: 'Midnight', year: '2026' },
  ];

  // Interpolate active needle position
  const lerp = (a, b, t) => a + (b - a) * t;
  const t = Math.max(0, Math.min(2, active));
  const floor = Math.floor(t);
  const frac = t - floor;
  const fromIdx = labels[floor]?.idx ?? labels[0].idx;
  const toIdx = labels[Math.min(2, floor + 1)]?.idx ?? fromIdx;
  const needleIdx = lerp(fromIdx, toIdx, frac);
  const needleX = 80 + (needleIdx / (tickCount - 1)) * 1040;

  return (
    <svg viewBox="0 0 1200 360" width="100%" style={{ display: 'block', maxWidth: '100%' }}>
      <defs>
        <radialGradient id="midnight-pulse" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="var(--accent, #2973FF)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--accent, #2973FF)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Active glow that follows the needle */}
      <ellipse cx={needleX} cy="280" rx="180" ry="140" fill="url(#midnight-pulse)" style={{ transition: 'cx 600ms cubic-bezier(0.2, 0.8, 0.2, 1)' }} />

      {/* Ticks */}
      {ticks.map((tick) => {
        // Distance from needle in tick units
        const distance = Math.abs(tick.i - needleIdx);
        const isClose = distance < 1.5;
        return (
          <line
            key={tick.i}
            x1={tick.x}
            x2={tick.x}
            y1={240 - tick.h / 2}
            y2={240 + tick.h / 2}
            stroke={isClose ? 'var(--accent-bright, #8FB6FF)' : 'rgba(255,255,255,0.42)'}
            strokeWidth={isClose ? 1.5 : tick.isMajor ? 1.5 : 1}
            opacity={isClose ? 1 : tick.isMajor ? 0.9 : tick.isMid ? 0.6 : 0.4}
            style={{ transition: 'stroke 400ms ease, opacity 400ms ease' }}
          />
        );
      })}

      {/* Labels */}
      {labels.map((l, li) => {
        const x = 80 + (l.idx / (tickCount - 1)) * 1040;
        // Distance in stops from active position
        const distance = Math.abs(li - t);
        const isActive = distance < 0.5;
        return (
          <g key={l.name} style={{ transition: 'opacity 400ms ease' }}>
            <text
              x={x}
              y={160}
              textAnchor="middle"
              fontFamily="FK Grotesk, system-ui, sans-serif"
              fontWeight="300"
              fontSize={isActive ? 56 : 40}
              fill={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.22)'}
              letterSpacing="-0.025em"
              style={{ transition: 'font-size 500ms cubic-bezier(0.2, 0.8, 0.2, 1), fill 400ms ease' }}
            >
              {l.name}
            </text>
            <text
              x={x}
              y={320}
              textAnchor="middle"
              fontFamily="FK Grotesk, system-ui, sans-serif"
              fontWeight="400"
              fontSize="13"
              fill={isActive ? 'var(--fg-tertiary)' : 'rgba(255,255,255,0.18)'}
              letterSpacing="0.04em"
              style={{ transition: 'fill 400ms ease' }}
            >
              {l.year}
            </text>
          </g>
        );
      })}

      {/* Active needle */}
      <line
        x1={needleX}
        x2={needleX}
        y1="195"
        y2="285"
        stroke="var(--accent-bright, #8FB6FF)"
        strokeWidth="2"
        opacity="0.85"
        style={{ transition: 'x1 600ms cubic-bezier(0.2, 0.8, 0.2, 1), x2 600ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
      />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* TickingClock — the D-7 / D-1 motif                                  */
/* ------------------------------------------------------------------ */
const TickingClock = ({ size = 200, time = 'midnight' }) => {
  // time: 'midnight' = 12:00, hands straight up
  // Add 60 tick marks
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const isMajor = i % 5 === 0;
    const r1 = isMajor ? 88 : 94;
    const r2 = 100;
    ticks.push({
      x1: 110 + Math.cos(angle) * r1,
      y1: 110 + Math.sin(angle) * r1,
      x2: 110 + Math.cos(angle) * r2,
      y2: 110 + Math.sin(angle) * r2,
      isMajor,
    });
  }

  return (
    <svg viewBox="0 0 220 220" width={size} height={size}>
      <defs>
        <radialGradient id="clock-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent, #2973FF)" stopOpacity="0.45" />
          <stop offset="60%" stopColor="var(--accent, #2973FF)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--accent, #2973FF)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="105" fill="url(#clock-glow)" />
      <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={t.isMajor ? 1.5 : 1}
          opacity={t.isMajor ? 0.9 : 0.4}
        />
      ))}
      {/* Hands at 12:00 */}
      <line x1="110" y1="110" x2="110" y2="50" stroke="var(--fg-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="110" y1="110" x2="110" y2="65" stroke="var(--fg-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="110" cy="110" r="3" fill="var(--accent-bright, #8FB6FF)" />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* HeroBackdrop — clock-face fan with hand ticking 11:59:50 → 12:00:00 */
/* ------------------------------------------------------------------ */
const HeroBackdrop = () => {
  // Geometry: huge dial whose top arc just barely peeks into the
  // very bottom of the hero. Apex sits at y=940 (~87% of H, ~140px
  // from the bottom edge), and the curve passes through the bottom
  // corners of the viewport.
  const W = 1920;
  const H = 1080;
  const cx = W / 2;
  // Dial geometry: visible arc spans ±30° so the hand can start at the
  // bottom-left corner and tick its way up to 12:00. Arc passes through
  // the bottom corners (0,H) and (W,H).
  const R  = 1920;
  const cy = 2743;
  const visibleAngle = Math.PI / 6; // 30°
  // Ticks at exact second positions (6° apart). Only render those
  // that fall inside the visible angular range.
  const ticks = [];
  for (let s = 0; s < 60; s++) {
    // Convert second index to angle: 0 = 12 (top), going clockwise.
    // We want to also include "negative" seconds (50..59) on the left.
    const angle = ((s % 60) - 60) * Math.PI / 30; // -2π..0
    // Normalize into (-π, π]
    let theta = angle;
    while (theta <= -Math.PI) theta += 2 * Math.PI;
    if (Math.abs(theta) > visibleAngle + 0.02) continue;
    // SVG coords: angle 0 = up, sin*R is x-offset, -cos*R is y-offset.
    const sinT = Math.sin(theta);
    const cosT = -Math.cos(theta);
    const isMajor = s % 5 === 0;
    const inner = R - (isMajor ? 44 : 24);
    const outer = R + (isMajor ? 4 : 0);
    ticks.push({
      x1: cx + sinT * inner,
      y1: cy + cosT * inner,
      x2: cx + sinT * outer,
      y2: cy + cosT * outer,
      isMajor,
      i: s,
    });
  }

  // Fine decorative ticks (every 1°) for gauge density.
  const fineTicks = [];
  const fineCount = 61;
  for (let i = 0; i < fineCount; i++) {
    const t = i / (fineCount - 1);
    const theta = (t - 0.5) * visibleAngle * 2;
    const sinT = Math.sin(theta);
    const cosT = -Math.cos(theta);
    fineTicks.push({
      x1: cx + sinT * (R - 14),
      y1: cy + cosT * (R - 14),
      x2: cx + sinT * R,
      y2: cy + cosT * R,
      i,
    });
  }

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <svg className="hero-gauge" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="hero-glow" cx="50%" cy="100%" r="48%">
            <stop offset="0%"  stopColor="#5792FF" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#2973FF" stopOpacity="0.16" />
            <stop offset="85%" stopColor="#0B0D10" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0B0D10" />
            <stop offset="100%" stopColor="#101620" />
          </linearGradient>
          <linearGradient id="hand-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%"  stopColor="#5792FF" stopOpacity="0" />
            <stop offset="55%" stopColor="#7AA8FF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#E2EBFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#hero-bg)" />
        <rect x="0" y="0" width={W} height={H} fill="url(#hero-glow)" />

        {/* Second-position ticks (one per 6°) */}
        {ticks.map((t) => (
          <line
            key={t.i}
            x1={t.x1} y1={t.y1}
            x2={t.x2} y2={t.y2}
            stroke="rgba(255,255,255,0.95)"
            strokeWidth={t.isMajor ? 1.8 : 1.2}
            strokeLinecap="round"
            opacity={t.isMajor ? 0.95 : 0.65}
          />
        ))}

        {/* "12" tick — brightest, matches the major-tick footprint */}
        <line
          x1={cx} y1={cy - R + 44}
          x2={cx} y2={cy - R - 4}
          stroke="#A8C5FF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Second hand — pivots from the dial center far below.
            Tip reaches just past the outer rim so it visually lands on
            each tick at every snap. */}
        <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="clock-hand">
          <line
            x1={cx} y1={cy}
            x2={cx} y2={cy - R - 4}
            stroke="url(#hand-grad)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy - R - 4} r="6" fill="#E2EBFF" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
};

Object.assign(window, { MidnightOrb, GaugeMeter, TickingClock, HeroBackdrop });
