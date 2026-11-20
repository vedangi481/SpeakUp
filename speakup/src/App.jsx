import { useState } from 'react'
import { useLocal } from './hooks'
import { SAMPLE_VOCAB, currentDay } from './data'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Challenge from './components/Challenge'
import DayPage from './components/DayPage'
import Vocabulary from './components/Vocabulary'
import Journal from './components/Journal'
import Interview from './components/Interview'
import Progress from './components/Progress'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [day, setDay] = useState(1)
  const [done, setDone] = useLocal('su_done', {})        // { dayNumber: 'YYYY-MM-DD' }
  const [acts, setActs] = useLocal('su_acts', {})        // { dayNumber: [bool x5] }
  const [reviews, setReviews] = useLocal('su_reviews', {}) // { dayNumber: {well, struggled, improve, conf} }
  const [vocab, setVocab] = useLocal('su_vocab', SAMPLE_VOCAB)
  const [journal, setJournal] = useLocal('su_journal', [])
  const [iv, setIv] = useLocal('su_iv', {})
  const openDay = n => { setDay(n); setPage('day') }
  const shared = { done, reviews, vocab, openDay, setPage }
  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} />
      <main>
        {page === 'dashboard' && <Dashboard {...shared} current={currentDay(done)} />}
        {page === 'challenge' && <Challenge done={done} openDay={openDay} />}
        {page === 'day' && <DayPage n={day} done={done} setDone={setDone} acts={acts} setActs={setActs}
          reviews={reviews} setReviews={setReviews} back={() => setPage('challenge')} />}
        {page === 'vocab' && <Vocabulary vocab={vocab} setVocab={setVocab} />}
        {page === 'journal' && <Journal journal={journal} setJournal={setJournal} current={currentDay(done)} />}
        {page === 'interview' && <Interview iv={iv} setIv={setIv} />}
        {page === 'progress' && <Progress {...shared} />}
      </main>
    </div>
  )
}
