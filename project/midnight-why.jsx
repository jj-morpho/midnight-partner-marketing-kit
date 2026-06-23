/* Introduction to Morpho Midnight — Why Midnight + What is Midnight */
/* eslint-disable */

function SectionIntro() {
  const { WHY_MIDNIGHT, WHAT_IS_MIDNIGHT } = window.MIDNIGHT;
  return (
    <section id="intro" className="section section-intro">
      <SectionHeader number="02" title="Introduction to Morpho Midnight" />

      {/* Why Midnight — what Blue proved / revealed */}
      <div className="intro-why">
        <div className="intro-why-head">
          <h3 className="intro-sub-title">Why Midnight</h3>
          <p className="intro-sub-lede">Midnight builds directly on what Morpho Blue taught us.</p>
        </div>
        <div className="intro-why-grid">
          <div className="intro-card intro-card-proved">
            <div className="intro-card-label">
              <CheckBadge />
              What Blue proved
            </div>
            <ul className="intro-list">
              {WHY_MIDNIGHT.proved.map((x) =>
              <li key={x}>{x}</li>
              )}
            </ul>
          </div>
          <div className="intro-card intro-card-revealed">
            <div className="intro-card-label">
              <ArrowBadge />
              What Blue revealed
            </div>
            <ul className="intro-list">
              {WHY_MIDNIGHT.revealed.map((x) =>
              <li key={x}>{x}</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* What is Midnight — definition + diagram */}
      <div className="intro-what">
        <div className="intro-what-head">
          <h3 className="intro-sub-title">What is Morpho Midnight</h3>
          <p className="intro-definition">{WHAT_IS_MIDNIGHT.definition}</p>
          <p className="intro-complement">{WHAT_IS_MIDNIGHT.complement}</p>
          <div className="intro-links">
            <span className="t-overline">LEARN MORE</span>
            <div className="intro-links-row">
              {WHAT_IS_MIDNIGHT.links.map((l) =>
              l.soon ?
              <span key={l.label} className="intro-link-pill is-soon" aria-disabled="true">
                  <span>{l.label}</span>
                  <span className="intro-link-soon">Coming soon</span>
                </span> :
              <a key={l.label} className="intro-link-pill" href={l.href} target="_blank" rel="noopener">
                  <span>{l.label}</span>
                  <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true"><path d="M3 8 L8 3 M4 3 L8 3 L8 7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <figure className="intro-diagram">
          <img src={(window.__resources && window.__resources.diagram) || "assets/midnight-complements-blue.png"} alt="How Morpho Vault V2 routes lenders and borrowers across Blue (variable) and Midnight (fixed) markets." />
          <figcaption>Lenders and borrowers route through Morpho Vault V2 across Blue (variable) and Midnight (fixed-rate) markets.</figcaption>
        </figure>
      </div>
    </section>);

}

const CheckBadge = () =>
<span className="intro-badge intro-badge-check">
    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.2 L5 8.6 L9.5 3.5" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>;


const ArrowBadge = () =>
<span className="intro-badge intro-badge-arrow">
    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M6 2.5 L6 9.5 M3 6.5 L6 9.5 L9 6.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>;


Object.assign(window, { SectionIntro });