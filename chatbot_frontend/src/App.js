import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { getChatHistory, sendChatMessage } from "./services/api";

/**
 * Root application component providing the chat experience with
 * Ocean Professional theme and responsive layout.
 */
function App() {
  const [chats, setChats] = React.useState([]); // [{id,title,preview,messages:[]}]
  const [activeId, setActiveId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Load history on mount
    (async () => {
      try {
        setError(null);
        const data = await getChatHistory();
        // Expecting data as [{id, title, preview, messages:[{id,role,content}]}]
        if (Array.isArray(data) && data.length > 0) {
          setChats(data);
          setActiveId(data[0].id);
        } else {
          // initialize empty session
          const initial = {
            id: "local-1",
            title: "New chat",
            preview: "Start a conversation…",
            messages: [],
          };
          setChats([initial]);
          setActiveId(initial.id);
        }
      } catch (e) {
        // Gracefully fallback to an empty local session
        const initial = {
          id: "local-1",
          title: "New chat",
          preview: "Start a conversation…",
          messages: [],
        };
        setChats([initial]);
        setActiveId(initial.id);
      }
    })();
  }, []);

  const activeChat = React.useMemo(
    () => chats.find((c) => c.id === activeId) || null,
    [chats, activeId]
  );

  // PUBLIC_INTERFACE
  function createNewChat() {
    /** Creates a new local chat and selects it. */
    const id = `local-${Date.now()}`;
    const next = {
      id,
      title: "New chat",
      preview: "Start a conversation…",
      messages: [],
    };
    setChats((prev) => [next, ...prev]);
    setActiveId(id);
  }

  // PUBLIC_INTERFACE
  async function handleSend(message) {
    /**
     * Sends a user message and appends the assistant response using REST API.
     * Updates the active chat state and handles loading/error UX.
     */
    if (!activeChat) return;

    setLoading(true);
    setError(null);

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      content: message,
    };

    // Optimistically update UI with user message
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              messages: [...c.messages, userMsg],
              title: c.messages.length === 0 ? message.slice(0, 30) : c.title,
              preview: message.slice(0, 50),
            }
          : c
      )
    );

    try {
      const res = await sendChatMessage(message);
      const botContent =
        (res && (res.reply || res.response || res.message)) ||
        "I’m here to help!";
      const botMsg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: botContent,
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChat.id
            ? {
                ...c,
                messages: [...c.messages, userMsg, botMsg].filter(
                  (m, idx, arr) =>
                    // Remove duplicated userMsg if any re-render race
                    idx === arr.findIndex((x) => x.id === m.id)
                ),
                preview: botContent.slice(0, 50),
              }
            : c
        )
      );
    } catch (e) {
      setError(e?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout
      sidebar={
        <Sidebar
          items={chats.map((c) => ({
            id: c.id,
            title: c.title,
            preview: c.preview,
          }))}
          onSelect={setActiveId}
          selectedId={activeId}
          onNewChat={createNewChat}
        />
      }
    >
      <ChatWindow
        messages={activeChat?.messages || []}
        onSend={handleSend}
        loading={loading}
        error={error}
      />
    </Layout>
  );
}

export default App;
