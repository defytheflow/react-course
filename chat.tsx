function ChatSingleComponent() {
  const [messages, setMessages] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (inputRef.current) {
      const newMessage = inputRef.current.value
      setMessages(prevMessages => [...prevMessages, newMessage])
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type='text' />
        <button type='submit'>Send message</button>
      </form>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
    </div>
  )
}

function ChatMultipleComponents() {
  const [messages, setMessages] = React.useState<string[]>([])

  function sendMessage(newMessage: string) {
    setMessages(prevMessages => [...prevMessages, newMessage])
  }

  return (
    <>
      <MessageForm sendMessage={sendMessage} />
      <MessageList messages={messages} />
    </>
  )
}

function MessageForm({ sendMessage }: { sendMessage: (newMessage: string) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (inputRef.current) {
      sendMessage(inputRef.current.value)
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type='text' />
      <button type='submit'>Send message</button>
    </form>
  )
}

function MessageList({ messages }: { messages: string[] }) {
  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i}>{message}</li>
      ))}
    </ul>
  )
}
