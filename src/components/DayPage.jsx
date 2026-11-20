import { useState, useRef } from 'react'
import { ArrowLeft, Mic, Square } from 'lucide-react'
import { DAYS, today } from '../data'

// Recorder uses the browser MediaRecorder API; shows a fallback if unavailable.
function Recorder() {
  const [url, setUrl] = useState(null), [rec, setRec] = useState(false), [err, setErr] = useState('')
  const mr = useRef(null)
  const supported = typeof MediaRecorder !== 'undefined' && navigator.mediaDevices?.getUserMedia
  if (!supported) return <p className="warn">Recording isn't supported in this browser. Use your phone's voice recorder instead and listen back.</p>
  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }), chunks = []
      mr.current = new MediaRecorder(stream)
      mr.current.ondataavailable = e => chunks.push(e.data)
      mr.current.onstop = () => { setUrl(URL.createObjectURL(new Blob(chunks))); stream.getTracks().forEach(t => t.stop()) }
      mr.current.start(); setRec(true); setErr('')
    } catch { setErr('Microphone permission was denied. Allow it in your browser settings, or record with another app.') }
  }
  const stop = () => { mr.current.stop(); setRec(false) }
  return (
    <div>
      <button className="btn" onClick={rec ? stop : start}>{rec ? <><Square size={14} /> Stop recording</> : <><Mic size={14} /> Record answer</>}</button>
      {err && <p className="warn">{err}</p>}
      {url && <audio controls src={url} style={{ display: 'block', marginTop: 10 }} />}
      <p className="muted small">Recordings stay in this tab only and are not saved after refresh.</p>
    </div>
  )
}

export default function DayPage({ n, done, setDone, acts, setActs, reviews, setReviews, back }) {
  const d = DAYS[n - 1], checks = acts[n] || [false, false, false, false, false]
  const r = reviews[n] || { well: '', struggled: '', improve: '', conf: 5 }
  const toggle = i => setActs({ ...acts, [n]: checks.map((c, j) => (j === i ? !c : c)) })
  const setR = (k, v) => setReviews({ ...reviews, [n]: { ...r, [k]: v } })
  const Box = ({ i, title, time, children }) => (
    <div className="card act">
      <label className="check"><input type="checkbox" checked={checks[i]} onChange={() => toggle(i)} /> <h3>{i + 1}. {title} <span className="muted">– {time}</span></h3></label>
      {children}
    </div>
  )
  return (
    <div>
      <button className="link" onClick={back}><ArrowLeft size={16} /> All days</button>
      <h1>Day {n}: {d.title}</h1>
      <Box i={0} title="Reading Aloud" time="5 minutes"><p>{d.reading}</p></Box>
      <Box i={1} title="Shadow Speaking" time="5 minutes"><p>{d.shadow}</p></Box>
      <Box i={2} title="Speaking Challenge" time="10 minutes">
        <p>Topic: <strong>{d.title}</strong></p>
        <ul>{d.questions.map(q => <li key={q}>{q}</li>)}</ul>
        <Recorder />
      </Box>
      <Box i={3} title="Self-Review" time="5 minutes">
        <label>What I did well<textarea value={r.well} onChange={e => setR('well', e.target.value)} /></label>
        <label>Where I struggled<textarea value={r.struggled} onChange={e => setR('struggled', e.target.value)} /></label>
        <label>What I need to improve<textarea value={r.improve} onChange={e => setR('improve', e.target.value)} /></label>
        <label>Confidence today: {r.conf}/10<input type="range" min="1" max="10" value={r.conf} onChange={e => setR('conf', +e.target.value)} /></label>
      </Box>
      <Box i={4} title="Vocabulary Practice" time="5 minutes">
        {d.vocab.map(([w, m, ex]) => <p key={w}><strong>{w}</strong>: {m}<br /><em className="muted">"{ex}"</em></p>)}
      </Box>
      {done[n]
        ? <button className="btn ghost" onClick={() => { const c = { ...done }; delete c[n]; setDone(c) }}>Completed on {done[n]} – click to undo</button>
        : <button className="btn" onClick={() => setDone({ ...done, [n]: today() })}>Mark Day as Completed</button>}
    </div>
  )
}
