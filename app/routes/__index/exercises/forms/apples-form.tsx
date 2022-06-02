// https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
import React from 'react'
import Button from '~/utils/button'

type ActionType =
  | { type: 'change'; payload: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> }
  | { type: 'reset' }

function formReducer(
  state: Record<string, any>,
  action: ActionType
): Record<string, any> {
  switch (action.type) {
    case 'change': {
      const event = action.payload
      let value

      if (event.target instanceof HTMLInputElement) {
        value =
          event.target.type === 'checkbox' ? event.target.checked : event.target.value
      } else {
        value = event.target.value
      }

      return { ...state, [event.target.name]: value }
    }
    case 'reset': {
      return {}
    }
  }
}

export default function ApplesForm() {
  const [formData, dispatch] = React.useReducer(formReducer, {})
  const [isSubmitting, setIsSubmitting] = React.useState(true)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      dispatch({ type: 'reset' })
    }, 3000)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    dispatch({ type: 'change', payload: e })
  }

  return (
    <div>
      <h1>How About Them Apples</h1>

      {isSubmitting && (
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>: {String(value)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset aria-disabled={isSubmitting}>
          <label>
            <p>Name</p>
            <input name='name' value={formData.name ?? ''} onChange={handleChange} />
          </label>
        </fieldset>

        <fieldset aria-disabled={isSubmitting}>
          <label>
            <p>Apples</p>
            <select name='apple' value={formData.apple ?? ''} onChange={handleChange}>
              <option value=''>--Please choose an option--</option>
              <option value='fuji'>Fuji</option>
              <option value='jonathan'>Jonathan</option>
              <option value='honey-crisp'>Honey Crisp</option>
            </select>
          </label>

          <label>
            <p>Count</p>
            <input
              type='number'
              step='1'
              name='count'
              value={formData.count ?? ''}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>
              <input
                type='checkbox'
                name='giftWrap'
                checked={formData.giftWrap ?? ''}
                onChange={handleChange}
              />{' '}
              Gift Wrap
            </p>
          </label>
        </fieldset>

        <Button type='submit' disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  )
}
