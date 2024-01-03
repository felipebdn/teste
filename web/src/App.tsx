import { useCallback, useEffect, useState } from 'react'
import { api } from './lib/api'
import { Card } from './components/card'
import './main.sass'
import { NewNote } from './components/new-note'
import { Capitalize } from './lib/capitalize-regex'

type KeyType = 'primeiro' | 'segundo' | 'terceiro' | 'quarto'

type DataType = {
  bimestre: KeyType
  createdAt: string
  disciplina: string
  id: string
  nota: number
  updatedAt: string | null
}

export function App() {
  const [data, setData] = useState<DataType[]>([])
  const [revalidate, setRevalidate] = useState(new Date())

  const fetch = useCallback(async () => {
    const result = await api.get('/list')

    const data = result.data.result

    setData(data)
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch, revalidate])

  const groupedData: { [key in KeyType]: DataType[] } = {
    primeiro: [],
    segundo: [],
    terceiro: [],
    quarto: [],
  }

  function handleRevalidate() {
    setRevalidate(new Date())
  }

  data.forEach((item) => {
    groupedData[item.bimestre].push(item)
  })

  return (
    <div className="main">
      {Object.keys(groupedData).map((bimestre) => (
        <div className="bimestre" key={bimestre}>
          <div className="bimestre-header">
            <h3 className="bimestre-header-title">{bimestre} BIMESTRE</h3>
            {groupedData[bimestre as KeyType].length < 4 && (
              <NewNote
                revalidate={handleRevalidate}
                bimestre={bimestre.toLowerCase() as KeyType}
                key={bimestre}
              />
            )}
          </div>
          <div className="bimestre-notas">
            {groupedData[bimestre as KeyType].map((disciplina) => {
              return (
                <Card
                  revalidate={handleRevalidate}
                  date={disciplina.createdAt}
                  note={disciplina.nota}
                  theme={Capitalize(disciplina.disciplina)}
                  id={disciplina.id}
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
