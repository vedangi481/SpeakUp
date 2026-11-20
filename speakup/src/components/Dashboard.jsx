import { Flame } from 'lucide-react'
import { DAYS, getStreak } from '../data'

export default function Dashboard({ done, current, openDay }) {
  const completed = Object.keys(done).length, pct = Math.round((completed / 30) * 100)
  const d = DAYS[current - 1], streak = getStreak(done)
  const R = 52, C = 2 * Math.PI * R
  return (
    <div>
      <h1>Your 30-Day Speaking Journey</h1>
      <p className="sub">Small conversations. Daily practice. Better confidence. Progress here is built one honest attempt at a time, so aim for consistency, not perfection.</p>
      <div className="grid g3">
        <div className="card center">
          <svg width="130" height="130" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r={R} className="ring-bg" />
            <circle cx="65" cy="65" r={R} className="ring" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 65 65)" />
            <text x="65" y="72" textAnchor="middle" className="ring-text">{pct}%</text>
          </svg>
          <p className="muted">{completed} done · {30 - completed} remaining · 30 total</p>
        </div>
        <div className="card center">
          <Flame size={32} color="#7c5cc4" />
          <div className="big">{streak}</div>
          <p className="muted">day streak</p>
          <p className="muted">You are on Day {current} of 30</p>
        </div>
        <div className="card">
          <h3>Calendar</h3>
          <div className="cal">
            {DAYS.map(x => <button key={x.n} title={`Day ${x.n}`} className={done[x.n] ? 'cell on' : x.n === current ? 'cell now' : 'cell'} onClick={() => openDay(x.n)}>{x.n}</button>)}
          </div>
          <p className="muted small">Filled days are completed. Outlined is today.</p>
        </div>
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Today's practice – Day {d.n}: {d.title}</h3>
        <ol className="acts">
          <li>Reading Aloud (5 min)</li><li>Shadow Speaking (5 min)</li><li>Speaking Challenge (10 min)</li>
          <li>Self-Review (5 min)</li><li>Vocabulary Practice (5 min)</li>
        </ol>
        <button className="btn" onClick={() => openDay(d.n)}>{completed === 30 ? 'Review Day 30' : "Start Today's Practice"}</button>
      </div>
    </div>
  )
}
