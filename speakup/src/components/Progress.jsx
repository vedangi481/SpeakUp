import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { DAYS, WEEKS, getStreak, avgConf } from '../data'
export default function Progress({ done, reviews, vocab }) {
  const data = DAYS.filter(d => reviews[d.n]?.conf).map(d => ({ day: d.n, confidence: reviews[d.n].conf }))
  const Stat = ({ label, value }) => <div className="card center"><div className="big">{value}</div><p className="muted">{label}</p></div>
  const Day = ({ n }) => { const r = reviews[n]; return (
    <div className="card"><h3>Day {n}</h3>
      {r ? <><p>Confidence: <strong>{r.conf}/10</strong></p><p className="muted">Did well: {r.well || '–'}</p><p className="muted">Struggled: {r.struggled || '–'}</p><p className="muted">To improve: {r.improve || '–'}</p></>
         : <p className="empty">No self-review saved for Day {n} yet.</p>}</div>) }
  return (
    <div>
      <h1>Progress Report</h1>
      <div className="grid g4">
        <Stat label="days completed" value={Object.keys(done).length} />
        <Stat label="current streak" value={getStreak(done)} />
        <Stat label="average confidence" value={avgConf(reviews)} />
        <Stat label="words learned" value={vocab.filter(v => v.learned).length} />
      </div>
      <h2>Weekly progress</h2>
      <div className="card">{WEEKS.map(w => { const total = w.end - w.start + 1, c = DAYS.filter(d => d.n >= w.start && d.n <= w.end && done[d.n]).length
        return <div key={w.name} className="wk"><span>{w.name}</span><div className="bar"><i style={{ width: `${(c / total) * 100}%` }} /></div><span>{c}/{total}</span></div> })}</div>
      <h2>Confidence over time</h2>
      <div className="card">
        {data.length < 2 ? <p className="empty">Save self-reviews on at least two days to see your chart.</p> :
          <ResponsiveContainer width="100%" height={260}><LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#e5def5" /><XAxis dataKey="day" /><YAxis domain={[1, 10]} /><Tooltip /><Line type="monotone" dataKey="confidence" stroke="#7c5cc4" strokeWidth={3} /></LineChart></ResponsiveContainer>}
      </div>
      <h2>Day 1 vs Day 30</h2>
      <div className="grid g2"><Day n={1} /><Day n={30} /></div>
    </div>
  )
}
