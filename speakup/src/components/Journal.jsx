import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { DAYS, today } from '../data'
export default function Journal({ journal, setJournal, current }) {
  const blank = { topic: DAYS[current - 1].title, spoke: '', difficulty: '', words: '', learned: '', conf: 5 }
  const [f, setF] = useState(blank)
  const set = (k, v) => setF({ ...f, [k]: v })
  const save = () => {
    if (!f.spoke.trim()) return alert('Write what you spoke about first.')
    setJournal([{ ...f, id: Date.now(), date: today() }, ...journal]); setF(blank)
  }
  const del = e => { if (window.confirm('Delete this journal entry?')) setJournal(journal.filter(x => x.id !== e.id)) }
  return (
    <div>
      <h1>Speaking Journal</h1>
      <div className="card">
        <label>Today's speaking topic<input value={f.topic} onChange={e => set('topic', e.target.value)} /></label>
        <label>What I spoke about<textarea value={f.spoke} onChange={e => set('spoke', e.target.value)} /></label>
        <label>Difficulties I faced<textarea value={f.difficulty} onChange={e => set('difficulty', e.target.value)} /></label>
        <label>Words I struggled to find<input value={f.words} onChange={e => set('words', e.target.value)} /></label>
        <label>What I learned<textarea value={f.learned} onChange={e => set('learned', e.target.value)} /></label>
        <label>Confidence rating: {f.conf}/10<input type="range" min="1" max="10" value={f.conf} onChange={e => set('conf', +e.target.value)} /></label>
        <button className="btn" onClick={save}>Save entry</button>
      </div>
      <h2>Previous entries</h2>
      {journal.length === 0 && <p className="empty">No entries yet. After today's practice, write your first one above.</p>}
      {journal.map(e => (
        <div key={e.id} className="card word">
          <div><strong>{e.topic}</strong> <span className="tag">{e.date} · confidence {e.conf}/10</span>
            <p>{e.spoke}</p>
            {e.difficulty && <p className="muted">Difficulty: {e.difficulty}</p>}
            {e.words && <p className="muted">Struggled to find: {e.words}</p>}
            {e.learned && <p className="muted">Learned: {e.learned}</p>}</div>
          <div className="actions"><button title="Delete" onClick={() => del(e)}><Trash2 size={16} /></button></div>
        </div>
      ))}
    </div>
  )
}
