import { Trash2 } from 'lucide-react'
import chart from '../../assets/Chart.svg'
import './style.sass'
import dayjs from 'dayjs'

interface CardProps {
  theme: string
  date: string
  note: number
}

export function Card(data: CardProps) {
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
      <div className="trash">
        <Trash2 />
      </div>
    </div>
  )
}
