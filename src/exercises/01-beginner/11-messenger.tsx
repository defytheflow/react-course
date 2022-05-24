// https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer
import React from 'react'

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
]

type ContactType = typeof contacts[number]
type ContactId = ContactType['id']

type ActionType =
  | { type: 'select'; payload: ContactId }
  | { type: 'edit'; payload: string }
  | { type: 'send' }

const initialState = {
  selectedId: contacts[0].id,
  messages: Object.fromEntries(contacts.map(c => [c.id, `Hello, ${c.name}`])),
}

function messengerReducer(
  state: typeof initialState,
  action: ActionType
): typeof initialState {
  switch (action.type) {
    case 'select': {
      return { ...state, selectedId: action.payload }
    }
    case 'edit': {
      return {
        ...state,
        messages: { ...state.messages, [state.selectedId]: action.payload },
      }
    }
    case 'send': {
      return { ...state, messages: { ...state.messages, [state.selectedId]: '' } }
    }
  }
}

export default function Messenger() {
  const [state, dispatch] = React.useReducer(messengerReducer, initialState)

  const message = state.messages[state.selectedId]
  const contact = contacts.find(c => c.id === state.selectedId)

  if (contact === undefined) {
    throw new Error(`Contact with id "${state.selectedId}" was not found.`)
  }

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat message={message} contact={contact} dispatch={dispatch} />
    </div>
  )
}

function ContactList({
  contacts,
  selectedId,
  dispatch,
}: {
  contacts: ContactType[]
  selectedId: ContactId
  dispatch: React.Dispatch<ActionType>
}) {
  return (
    <section>
      <ul style={{ listStyle: 'none', margin: 0 }}>
        {contacts.map(contact => (
          <li key={contact.id}>
            <button
              style={{ padding: 10, width: 100 }}
              onClick={() => dispatch({ type: 'select', payload: contact.id })}
            >
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Chat({
  message,
  contact,
  dispatch,
}: {
  message: string
  contact: ContactType
  dispatch: React.Dispatch<ActionType>
}) {
  function handleSend() {
    window.alert(`Sending "${message}" to ${contact.email}`)
    dispatch({ type: 'send' })
  }

  return (
    <section>
      <textarea
        style={{ height: 150 }}
        value={message}
        placeholder={`Chat to ${contact.name}`}
        onChange={e => dispatch({ type: 'edit', payload: e.target.value })}
      ></textarea>
      <br />
      <button style={{ marginTop: 5 }} onClick={handleSend}>
        Send to {contact.email}
      </button>
    </section>
  )
}
