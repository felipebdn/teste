import { Trash2 } from 'lucide-react'
import chart from '../../assets/Chart.svg'
import './style.sass'
import dayjs from 'dayjs'
import { api } from '../../lib/api'

interface CardProps {
  id: string
  theme: string
  date: string
  note: number
  revalidate: () => void
}

export function Card(data: CardProps) {
  async function handleDeleteNote() {
    await api.delete(`/remove/${data.id}`)
    data.revalidate()
  }

  return (
    <div className="target">
      <div className={`card ${data.theme.toLowerCase()}`}>
        <header>
          <h3>{data.theme}</h3>
          <span>{dayjs(data.date).format('DD/MM/YYYY')}</span>
        </header>
        <main>
          <img src={chart} alt="" />
          <p>Nota: {data.note}</p>
        </main>
      </div>
      <button onClick={handleDeleteNote} className="trash">
        <Trash2 />
      </button>
    </div>
  )
}
