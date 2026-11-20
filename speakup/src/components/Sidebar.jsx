import { LayoutDashboard, CalendarCheck, BookText, PenLine, Briefcase, BarChart3, Mic } from 'lucide-react'
const ITEMS = [
  ['dashboard', 'Dashboard', LayoutDashboard], ['challenge', '30-Day Challenge', CalendarCheck],
  ['vocab', 'Vocabulary Notebook', BookText], ['journal', 'Speaking Journal', PenLine],
  ['interview', 'Interview Practice', Briefcase], ['progress', 'Progress Report', BarChart3],
]
export default function Sidebar({ page, setPage }) {
  return (
    <nav className="sidebar">
      <div className="brand"><Mic size={20} /> SpeakUp</div>
      {ITEMS.map(([id, label, Icon]) => (
        <button key={id} className={page === id || (page === 'day' && id === 'challenge') ? 'nav active' : 'nav'} onClick={() => setPage(id)}>
          <Icon size={18} /> <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
