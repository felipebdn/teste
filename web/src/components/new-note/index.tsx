import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { api } from '../../lib/api'
import './style.sass'

const formSchema = z.object({
  theme: z.enum(['biologia', 'artes', 'geografia', 'sociologia']),
  nota: z.coerce.number().min(0).max(10),
  bimestre: z.enum(['primeiro', 'segundo', 'terceiro', 'quarto']),
})

type FormSchemaTypes = z.infer<typeof formSchema>

interface NewNoteProps {
  bimestre: string
}

export function NewNote(props: NewNoteProps) {
  const [themesAvailable, setThemesAvailable] = useState<string[]>([])
  const { register, handleSubmit } = useForm<FormSchemaTypes>({
    resolver: zodResolver(formSchema),
  })

  async function fetchAvailableThemes() {
    const bimestre = props.bimestre.toUpperCase()
    const { data } = await api.get(`/list/${bimestre}`)
    setThemesAvailable(data.result)
  }

  async function submitForm(data: FormSchemaTypes) {
    console.log(data)
  }

  const themes = ['biologia', 'sociologia', 'geografia', 'artes']

  return (
    <Dialog.Root onOpenChange={fetchAvailableThemes}>
      <Dialog.Trigger className="trigger">
        <Plus size={16} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content>
          <header>
            <Dialog.Title></Dialog.Title>
            <Dialog.Close></Dialog.Close>
          </header>
          <form onSubmit={handleSubmit(submitForm)}>
            <RadioGroup.Root className="">
              {themes.map((theme, i) => (
                <RadioGroup.Item key={i} value={theme}>
                  {theme}
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
