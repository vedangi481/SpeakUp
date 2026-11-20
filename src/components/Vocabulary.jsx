import { useState } from 'react'
import { Pencil, Trash2, Check } from 'lucide-react'
const EMPTY = { word: '', meaning: '', example: '', level: 'beginner' }
export default function Vocabulary({ vocab, setVocab }) {
  const [form, setForm] = useState(EMPTY), [editId, setEditId] = useState(null)
  const [q, setQ] = useState(''), [lvl, setLvl] = useState('all')
  const save = e => {
    e.preventDefault()
    if (!form.word.trim()) return
    if (editId) setVocab(vocab.map(v => (v.id === editId ? { ...v, ...form } : v)))
    else setVocab([{ ...form, id: Date.now(), learned: false }, ...vocab])
    setForm(EMPTY); setEditId(null)
  }
  const del = v => { if (window.confirm(`Delete "${v.word}"?`)) setVocab(vocab.filter(x => x.id !== v.id)) }
  const list = vocab.filter(v => (lvl === 'all' || v.level === lvl) && (v.word + v.meaning).toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <h1>Vocabulary Notebook</h1>
      <div className="card">
        <h3>{editId ? 'Edit word' : 'Add a new word'}</h3>
        <input placeholder="Word or expression" value={form.word} onChange={e => setForm({ ...form, word: e.target.value })} />
        <input placeholder="Meaning" value={form.meaning} onChange={e => setForm({ ...form, meaning: e.target.value })} />
        <input placeholder="Example sentence" value={form.example} onChange={e => setForm({ ...form, example: e.target.value })} />
        <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
          <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
        </select>
        <button className="btn" onClick={save}>{editId ? 'Save changes' : 'Add word'}</button>
        {editId && <button className="btn ghost" onClick={() => { setEditId(null); setForm(EMPTY) }}>Cancel</button>}
      </div>
      <div className="row">
        <input placeholder="Search words…" value={q} onChange={e => setQ(e.target.value)} />
        <select value={lvl} onChange={e => setLvl(e.target.value)}>
          <option value="all">All levels</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
        </select>
      </div>
      {list.length === 0 && <p className="empty">{vocab.length ? 'No words match your search.' : 'Your notebook is empty. Add your first word above.'}</p>}
      {list.map(v => (
        <div key={v.id} className={v.learned ? 'card word learned' : 'card word'}>
          <div><strong>{v.word}</strong> <span className="tag">{v.level}</span><p>{v.meaning}</p><em className="muted">"{v.example}"</em></div>
          <div className="actions">
            <button title="Mark as learned" onClick={() => setVocab(vocab.map(x => (x.id === v.id ? { ...x, learned: !x.learned } : x)))}><Check size={16} /></button>
            <button title="Edit" onClick={() => { setEditId(v.id); setForm({ word: v.word, meaning: v.meaning, example: v.example, level: v.level }); window.scrollTo(0, 0) }}><Pencil size={16} /></button>
            <button title="Delete" onClick={() => del(v)}><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  )
}
