import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Plus, X } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { api } from '../../lib/api'
import { Capitalize } from '../../lib/capitalize-regex'
import './style.sass'

const formSchema = z.object({
  theme: z.enum(['biologia', 'artes', 'geografia', 'sociologia'], {
    required_error: 'Escolha uma matéria',
  }),
  nota: z.coerce
    .number({
      required_error: 'Digite sua nota de 0 a 10',
      invalid_type_error: 'Válido apenas números',
    })
    .min(0, {
      message: 'Mínimo 0',
    })
    .max(10, {
      message: 'Máximo 10',
    }),
  bimestre: z.enum(['primeiro', 'segundo', 'terceiro', 'quarto']),
})

type FormSchemaTypes = z.infer<typeof formSchema>

interface NewNoteProps {
  bimestre: 'primeiro' | 'segundo' | 'terceiro' | 'quarto'
  revalidate: () => void
}

export function NewNote(props: NewNoteProps) {
  const [themesAvailable, setThemesAvailable] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormSchemaTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bimestre: props.bimestre,
      nota: 0,
    },
  })

  function closeModal() {
    setOpen(false)
    props.revalidate()
  }

  async function fetchAvailableThemes(open: boolean) {
    if (open) {
      const bimestre = props.bimestre
      const { data } = await api.get(`/list/${bimestre}`)
      setThemesAvailable(data.result)
    }
  }

  async function submitForm(data: FormSchemaTypes) {
    try {
      await api.post('/create', {
        disciplina: data.theme,
        bimestre: data.bimestre,
        nota: data.nota,
      })
      closeModal()
    } catch (error) {}
  }

  const themes = ['biologia', 'sociologia', 'geografia', 'artes']

  return (
    <Dialog.Root
      open={!!open}
      onOpenChange={(value) => {
        fetchAvailableThemes(value)
        setOpen(value)
      }}
    >
      <Dialog.Trigger className="trigger">
        <Plus size={16} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="content">
          <header className="header">
            <Dialog.Title className="header-title">
              {`${Capitalize(props.bimestre)} bimestre`}
            </Dialog.Title>
            <Dialog.Close className="header-close">
              <X size={32} />
            </Dialog.Close>
          </header>
          <form onSubmit={handleSubmit(submitForm)} className="form">
            <h4 className="subtitle">
              Disciplinas
              {errors.theme?.message && (
                <span className="error-form">{errors.theme?.message}</span>
              )}
            </h4>

            <Controller
              control={control}
              name="theme"
              render={({ field }) => {
                return (
                  <RadioGroup.Root
                    className="radio"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    {open &&
                      themes.map((theme, i) => {
                        const included = themesAvailable
                          .map((item) => item)
                          .includes(theme)

                        if (included) {
                          return null
                        }

                        return (
                          <RadioGroup.Item
                            key={i}
                            value={theme}
                            className={`radio-item ${theme}`}
                            disabled={included}
                          >
                            {theme}
                          </RadioGroup.Item>
                        )
                      })}
                  </RadioGroup.Root>
                )
              }}
            />

            <h4 className="subtitle">
              Nota
              {errors.nota?.message && (
                <span className="error-form">{errors.nota?.message}</span>
              )}
            </h4>
            <div className="footer">
              <label className="nota" htmlFor="nota">
                <input
                  className="nota-input"
                  type="text"
                  id="nota"
                  {...register('nota')}
                />
              </label>
              <button className="submit" type="submit">
                Confirmar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
