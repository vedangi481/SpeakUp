import { Check } from 'lucide-react'
import { DAYS, WEEKS } from '../data'
export default function Challenge({ done, openDay }) {
  return (
    <div>
      <h1>30-Day Challenge</h1>
      {WEEKS.map(w => (
        <section key={w.name}>
          <h2>{w.name}</h2>
          <div className="grid g3">
            {DAYS.filter(d => d.n >= w.start && d.n <= w.end).map(d => (
              <button key={d.n} className={done[d.n] ? 'card day done' : 'card day'} onClick={() => openDay(d.n)}>
                <span className="muted">Day {d.n}</span>
                <strong>{d.title}</strong>
                {done[d.n] && <span className="tick"><Check size={14} /> Completed</span>}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
