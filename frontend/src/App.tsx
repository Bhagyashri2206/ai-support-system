import { useState } from "react"

type Message = {
  sender: "user" | "bot"
  text: string
  agent?: string
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      sender: "user",
      text: input
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:3000/api/chat/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      })

      const data = await res.json()

      const botMessage: Message = {
        sender: "bot",
        text: data.response,
        agent: data.agent
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong. Please try again."
        }
      ])
    }

    setLoading(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI Support System</h1>

        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {msg.agent && (
                <div style={styles.agent}>
                  Agent: <strong>{msg.agent}</strong>
                </div>
              )}

              <div
                style={{
                  ...styles.message,
                  alignSelf:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.sender === "user" ? "#e74c3c" : "#000"
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ color: "#aaa", fontSize: "12px" }}>
              Typing...
            </div>
          )}
        </div>

        <div style={styles.inputArea}>
          <input
            style={styles.input}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button style={styles.button} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const styles: any = {
  page: {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1518770660439-4636190af475)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
},


  card: {
    width: "420px",
    background: "#2b2b2b",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
  },

  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "12px"
  },

  chatBox: {
    display: "flex",
    flexDirection: "column",
    height: "320px",
    overflowY: "auto",
    border: "1px solid #444",
    padding: "10px",
    marginBottom: "10px",
    background: "#1f1f1f"
  },

  message: {
    padding: "8px 12px",
    borderRadius: "6px",
    color: "#fff",
    maxWidth: "85%"
  },

  agent: {
    fontSize: "11px",
    color: "#aaa",
    marginBottom: "3px"
  },

  inputArea: {
    display: "flex",
    gap: "8px"
  },

  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #555",
    background: "#111",
    color: "#fff"
  },

  button: {
    padding: "8px 14px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    background: "#000",
    color: "#fff"
  }
}
