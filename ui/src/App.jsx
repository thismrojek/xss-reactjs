import { useEffect, useState } from "react";

const loadMessages = async (setMessages) => {
  try {
    const res = await fetch("http://localhost:8000/messages", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    const json = await res.json();
    setMessages(json.messages);
  } catch (ex) {
    console.error(ex);
    alert(ex.message);
  }
}
const saveMessage = async (newMessage) => {
  const res = await fetch("http://localhost:8000/message", {
    method: "POST",
    body: JSON.stringify({ message: newMessage }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }
}

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    loadMessages(setMessages);
  }, []);

  return (
    <main style={{
        fontFamily: 'Arial'
    }}>
      <header>
        <h1>Cześć!</h1>
        <h2>Masz 2 nieopłacone faktury</h2>
        <p style={{
            padding: '16px 8px',
            border: '1px solid black',
            borderRadius: '8px',
            width: 'max-content'
        }}>SALDO: -420,21 PLN</p>
        <p>
          Opłać je przelewem na numer konta:{" "}
          <strong>PL83109024029587372996371156</strong>
        </p>
      </header>
      <hr />
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();

          await saveMessage(newMessage);
          await loadMessages(setMessages);
        }}
      >
        <textarea
          style={{
            width: 500,
            height: 150,
          }}
          value={newMessage}
          onChange={(ev) => {
            setNewMessage(ev.nativeEvent.target.value);
          }}
        />

        <br />
        <button type="submit">send message</button>
      </form>

      <hr />

      {messages.map((m) => (
        <div key={m.id}>
          <div
            style={{
              padding: ".5rem",
              borderRadius: ".5rem",
              margin: ".5rem",
              border: "1px solid #F4F2F0",
            }}
            dangerouslySetInnerHTML={{ __html: m.messageHtml }}
          />
        </div>
      ))}
    </main>
  );
}

export default App;
