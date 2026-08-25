"use client";

import { FormEvent, useMemo, useState } from "react";

type Activity = { id: number; person: string; detail: string; amount: number; direction: "sent" | "received"; time: string };

const initialModelPlans = [
  { name: "GPT-5.6 Terra", detail: "184 conversations", credits: 18420, limit: 20000, gifted: 350, color: "#6657d9" },
  { name: "GPT-5 mini", detail: "312 conversations", credits: 11080, limit: 12000, gifted: 280, color: "#f29d6e" },
  { name: "Codex", detail: "46 coding sessions", credits: 6920, limit: 10000, gifted: 250, color: "#1e9b7b" },
  { name: "Image generation", detail: "12 generations", credits: 2000, limit: 8000, gifted: 100, color: "#efc84a" },
];

const people = [
  { name: "Maya Chen", initials: "MC", note: "Needs 300 for a deadline", tone: "violet" },
  { name: "Theo Park", initials: "TP", note: "Shared with you last week", tone: "orange" },
  { name: "Sam Rivera", initials: "SR", note: "Usually online now", tone: "mint" },
];

const initialActivity: Activity[] = [
  { id: 1, person: "Theo Park", detail: "Gifted you credits", amount: 240, direction: "received", time: "Yesterday" },
  { id: 2, person: "Aisha Khan", detail: "You covered a request", amount: 400, direction: "sent", time: "Mon" },
  { id: 3, person: "Community pool", detail: "Unused credits contributed", amount: 180, direction: "sent", time: "Last Fri" },
];

function formatCredits(value: number) { return new Intl.NumberFormat("en-US").format(value); }

export default function Home() {
  const [balance, setBalance] = useState(11580);
  const [safeToGift, setSafeToGift] = useState(420);
  const [amount, setAmount] = useState(250);
  const [recipient, setRecipient] = useState("Maya Chen");
  const [note, setNote] = useState("Hope this gets your project over the line!");
  const [giftOpen, setGiftOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [activity, setActivity] = useState(initialActivity);
  const [communityGiven, setCommunityGiven] = useState(980);
  const [modelPlans, setModelPlans] = useState(initialModelPlans);
  const [sourceModel, setSourceModel] = useState("GPT-5.6 Terra");
  const monthlyUsed = useMemo(() => 50000 - balance, [balance]);
  const percentUsed = Math.round((monthlyUsed / 50000) * 100);
  const giftCap = 2500;
  const giftCapLeft = giftCap - communityGiven;
  const selectedModel = modelPlans.find((model) => model.name === sourceModel) ?? modelPlans[0];
  const selectedModelCap = Math.floor(selectedModel.limit * .05);
  const selectedModelGiftable = Math.max(0, selectedModelCap - selectedModel.gifted);
  const maxGiftNow = Math.max(0, Math.min(safeToGift, giftCapLeft, selectedModelGiftable));

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }

  function sendGift(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanAmount = Math.max(1, Math.min(amount, maxGiftNow, balance));
    if (!recipient.trim() || cleanAmount <= 0) return;
    setBalance((current) => current - cleanAmount);
    setSafeToGift((current) => Math.max(0, current - cleanAmount));
    setCommunityGiven((current) => current + cleanAmount);
    setModelPlans((current) => current.map((model) => model.name === sourceModel ? { ...model, gifted: model.gifted + cleanAmount } : model));
    setActivity((current) => [{ id: Date.now(), person: recipient, detail: note.trim() || "You sent a credit gift", amount: cleanAmount, direction: "sent", time: "Just now" }, ...current]);
    setGiftOpen(false);
    showToast(`${formatCredits(cleanAmount)} credits sent to ${recipient}`);
  }

  function coverRequest() {
    if (safeToGift < 300) { showToast("Keep a few credits in reserve before covering this request."); return; }
    setRecipient("Maya Chen");
    setAmount(300);
    setSourceModel("GPT-5.6 Terra");
    setNote("Covered your GPT-5.6 Pro request. Go finish strong!");
    setGiftOpen(true);
  }

  return (
    <main className="site-shell" id="top">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Pool home"><span className="brand-mark">P</span><span>pool.</span></a>
        <nav className="main-nav" aria-label="Primary navigation">
          <a className="active" href="#overview">Overview</a><a href="#usage">Usage</a><a href="#community">Community</a>
        </nav>
        <div className="header-actions"><button className="icon-button" aria-label="Notifications">2</button><button className="avatar-button" aria-label="Open profile">AK</button></div>
      </header>

      <section id="overview" className="hero-section">
        <div><p className="eyebrow">WEDNESDAY, 26 AUGUST</p><h1>Good afternoon, Arjun.</h1><p className="hero-copy">You have more than enough for today. Put the spare to work.</p></div>
        <button className="primary-button" onClick={() => setGiftOpen(true)}><span aria-hidden="true">↗</span> Gift credits</button>
      </section>

      <section className="summary-grid" aria-label="Credit summary">
        <article className="balance-card dark-card">
          <div className="card-heading"><div><p className="card-label on-dark">MONTHLY BALANCE</p><p className="big-number">{formatCredits(balance)}</p><p className="muted-on-dark">credits remaining of 50,000</p></div><span className="status-pill">Healthy</span></div>
          <div className="progress-track dark-track" aria-label={`${percentUsed}% of monthly credits used`}><span style={{ width: `${percentUsed}%` }} /></div>
          <div className="progress-labels"><span>{percentUsed}% used</span><span>Resets in 6 days</span></div>
        </article>

        <article className="balance-card mint-card">
          <div className="card-heading"><div><p className="card-label">SAFE TO GIFT TODAY</p><p className="big-number dark-number">{formatCredits(safeToGift)}</p><p className="subtle">after keeping your 200-credit reserve</p></div><div className="gift-orbit" aria-hidden="true">↗</div></div>
          <button className="text-button" onClick={() => setGiftOpen(true)}>Share the spare <span>→</span></button>
        </article>

        <article className="balance-card paper-card">
          <p className="card-label">THIS MONTH</p><div className="impact-row"><div><p className="impact-number">{formatCredits(communityGiven)}</p><p className="subtle">credits shared</p></div><div><p className="impact-number">7</p><p className="subtle">people helped</p></div></div>
          <div className="tiny-people" aria-label="People helped">{people.map((person) => <span key={person.name} className={person.tone}>{person.initials}</span>)}<span className="more-people">+4</span></div>
        </article>
      </section>

      <section className="policy-strip" aria-label="Five percent gifting policy">
        <div className="policy-badge">5%</div>
        <div className="policy-copy"><p className="card-label">FAIR-SHARE LIMIT</p><h2>Every model allowance has its own 5% gift cap.</h2><p>For your 50,000-credit plan, that means up to 2,500 gifted credits per month.</p></div>
        <div className="policy-meter"><div><span>{formatCredits(communityGiven)} gifted</span><strong>{formatCredits(giftCapLeft)} left</strong></div><div className="progress-track"><span style={{ width: `${Math.min(100, communityGiven / giftCap * 100)}%` }} /></div></div>
      </section>

      <div className="content-grid">
        <section id="usage" className="panel usage-panel">
          <div className="panel-title-row"><div><p className="card-label">USAGE BY MODEL</p><h2>Where your credits went</h2></div><button className="quiet-button" onClick={() => showToast("Usage export prepared for August.")}>Export</button></div>
          <div className="usage-layout">
            <div className="donut" style={{ "--usage": `${percentUsed * 3.6}deg` } as React.CSSProperties}><div><strong>{percentUsed}%</strong><span>used</span></div></div>
            <div className="model-list">{modelPlans.map((model) => { const cap = Math.floor(model.limit * .05); return <div className="model-row" key={model.name}><span className="model-dot" style={{ background: model.color }} /><div className="model-copy"><strong>{model.name}</strong><span>{model.detail} · {formatCredits(Math.max(0, cap - model.gifted))} giftable</span></div><strong className="model-credits">{formatCredits(model.credits)}</strong></div>; })}</div>
          </div>
          <div className="week-chart" aria-label="Daily credits used this week">{[42, 68, 55, 88, 72, 36, 24].map((height, index) => <div className="day" key={index}><div className="bar-track"><span style={{ height: `${height}%` }} /></div><small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small></div>)}</div>
        </section>

        <aside id="community" className="panel request-panel">
          <div className="request-kicker"><span className="live-dot" /> LIVE REQUEST</div>
          <div className="request-person"><span className="large-avatar violet">MC</span><div><h2>Maya needs a boost</h2><p>Design deadline in 2 hours</p></div></div>
          <blockquote>“I’m 300 credits short of finishing a client prototype with GPT-5.6 Pro.”</blockquote>
          <div className="request-meter"><div><span>700 raised</span><strong>1,000 goal</strong></div><div className="progress-track"><span style={{ width: "70%" }} /></div></div>
          <button className="primary-button wide" onClick={coverRequest}>Cover the final 300</button><p className="trust-note">4 people have contributed · verified connection</p>
        </aside>
      </div>

      <section className="lower-grid">
        <div className="panel people-panel"><div className="panel-title-row"><div><p className="card-label">QUICK GIFT</p><h2>People you know</h2></div></div><div className="people-list">{people.map((person) => <button key={person.name} onClick={() => { setRecipient(person.name); setGiftOpen(true); }}><span className={`large-avatar ${person.tone}`}>{person.initials}</span><span><strong>{person.name}</strong><small>{person.note}</small></span><b>Gift →</b></button>)}</div></div>
        <div className="panel activity-panel"><div className="panel-title-row"><div><p className="card-label">RECENT ACTIVITY</p><h2>Credits in motion</h2></div></div><div className="activity-list">{activity.slice(0, 4).map((item) => <div className="activity-row" key={item.id}><span className={`activity-icon ${item.direction}`}>{item.direction === "received" ? "↓" : "↑"}</span><div><strong>{item.person}</strong><span>{item.detail} · {item.time}</span></div><b className={item.direction}>{item.direction === "received" ? "+" : "−"}{formatCredits(item.amount)}</b></div>)}</div></div>
      </section>

      <footer><div><strong>pool.</strong><p>Share access. Keep creating.</p></div><p className="legal-copy">Prototype uses app-managed demo credits. Existing OpenAI balances are not transferred or resold.</p></footer>

      {giftOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setGiftOpen(false)}><section className="gift-modal" role="dialog" aria-modal="true" aria-labelledby="gift-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close gift dialog" onClick={() => setGiftOpen(false)}>×</button><p className="card-label">SEND A LITTLE MOMENTUM</p><h2 id="gift-title">Gift your spare credits</h2><p className="modal-intro">Your daily reserve and 5% monthly policy allow up to {formatCredits(maxGiftNow)} credits from this model.</p><form onSubmit={sendGift}>
        <label>Recipient<input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="Name or email" required /></label>
        <label>Credit source<select value={sourceModel} onChange={(event) => setSourceModel(event.target.value)}>{modelPlans.map((model) => <option key={model.name} value={model.name}>{model.name} · {formatCredits(Math.max(0, Math.floor(model.limit * .05) - model.gifted))} giftable</option>)}</select></label>
        <fieldset><legend>Amount</legend><div className="amount-options">{[100, 250, maxGiftNow].filter((value, index, all) => value > 0 && value <= maxGiftNow && all.indexOf(value) === index).map((value) => <button type="button" className={amount === value ? "selected" : ""} onClick={() => setAmount(value)} key={value}>{value}</button>)}</div><input className="amount-input" type="number" min="1" max={maxGiftNow} value={Math.min(amount, maxGiftNow)} onChange={(event) => setAmount(Number(event.target.value))} aria-label="Custom credit amount" /></fieldset>
        <label>Note <span>optional</span><textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} /></label>
        <div className="gift-summary"><span>5% model cap</span><strong>{formatCredits(selectedModel.gifted)} of {formatCredits(selectedModelCap)} already gifted</strong></div><button className="primary-button wide" type="submit" disabled={maxGiftNow === 0}>Send {formatCredits(Math.min(amount, maxGiftNow))} credits</button>
      </form></section></div>}
      {toast && <div className="toast" role="status">✓ {toast}</div>}
    </main>
  );
}
