import { useCallback, useEffect, useState } from 'react'
import { api } from './lib/api'
import { Card } from './components/card'
import './main.sass'
import { NewNote } from './components/new-note'

type DataType = {
  bimestre: string
  createdAt: string
  disciplina: string
  id: string
  nota: number
  updatedAt: string | null
}

export function App() {
  const [data, setData] = useState<DataType[]>([])

  const fetch = useCallback(async () => {
    const result = await api.get('/list')

    const data = result.data.result

    setData(data)
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  const groupedData: { [key: string]: DataType[] } = {}

  data.forEach((item) => {
    if (!groupedData[item.bimestre]) {
      groupedData[item.bimestre] = []
    }
    groupedData[item.bimestre].push(item)
  })

  return (
    <div className="main">
      {Object.keys(groupedData).map((bimestre) => (
        <div className="bimestre" key={bimestre}>
          <div className="bimestre-header">
            <h3 className="bimestre-header-title">{bimestre} BIMESTRE</h3>
            <NewNote bimestre={bimestre.toLowerCase()} key={bimestre} />
          </div>
          <div className="bimestre-notas">
            {groupedData[bimestre].map((disciplina) => {
              return (
                <Card
                  date={disciplina.createdAt}
                  note={disciplina.nota}
                  theme={disciplina.disciplina}
                  key={disciplina.id}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
