import { useState } from 'react'
import { INTERVIEW } from '../data'
export default function Interview({ iv, setIv }) {
  const [cat, setCat] = useState(Object.keys(INTERVIEW)[0]), [i, setI] = useState(0)
  const qs = INTERVIEW[cat], q = qs[i]
  const a = iv[q] || { answer: '', clarity: 3, confidence: 3, notes: '' }
  const set = (k, v) => setIv({ ...iv, [q]: { ...a, [k]: v } })
  const next = () => setI((i + 1) % qs.length)
  return (
    <div>
      <h1>Interview Practice</h1>
      <div className="row">{Object.keys(INTERVIEW).map(c => <button key={c} className={c === cat ? 'chip on' : 'chip'} onClick={() => { setCat(c); setI(0) }}>{c}</button>)}</div>
      <div className="card">
        <p className="muted">Question {i + 1} of {qs.length}</p>
        <h2 style={{ marginTop: 0 }}>{q}</h2>
        <textarea placeholder="Type your answer here. Aim for a clear opening, one example and a short closing." value={a.answer} onChange={e => set('answer', e.target.value)} />
        <h3>Self-evaluation</h3>
        <label>Clarity: {a.clarity}/5<input type="range" min="1" max="5" value={a.clarity} onChange={e => set('clarity', +e.target.value)} /></label>
        <label>Confidence: {a.confidence}/5<input type="range" min="1" max="5" value={a.confidence} onChange={e => set('confidence', +e.target.value)} /></label>
        <label>What would make this answer better?<textarea value={a.notes} onChange={e => set('notes', e.target.value)} /></label>
        <button className="btn" onClick={next}>Next question</button>
        <p className="muted small">Answers save automatically.</p>
      </div>
    </div>
  )
}
