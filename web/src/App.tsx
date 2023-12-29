import { useCallback, useEffect, useState } from 'react'
import { api } from './lib/api'

interface DataType {
  [key: string]: {
    id: string
    nota: number
    disciplina: string
    bimestre: string
    createdAt: Date
    updatedAt: Date | null
  }
}
export function App() {
  const [data, setData] = useState<DataType[]>([])

  const fetch = useCallback(async () => {
    const result = await api.get('/list')

    const data: DataType[] = result.data.result

    setData(data)
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <div className="main">
      <div>
        {Object.keys(data).map((bimestre) => (
          <div key={bimestre}>
            <h2>{bimestre}</h2>
            {data[bimestre]}
          </div>
        ))}
      </div>
    </div>
  )
}
