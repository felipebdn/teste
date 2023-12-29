import { Trash2 } from 'lucide-react'
import chart from '../../assets/Chart.svg'
import './style.sass'

interface CardProps {
  theme: string
  date: string
  note: number
}

export function Card(data: CardProps) {
  return (
    <div className="target">
      <div className="card">
        <header>
          <h3>{data.theme}</h3>
          <span>{data.date}</span>
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
