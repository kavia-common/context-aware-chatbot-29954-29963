import React, { useEffect, useRef } from "react";
import { Theme } from "../theme";

/**
 * ChatWindow renders the messages and input area.
 * Props:
 * - messages: [{id, role: 'user'|'assistant', content: string, time?: string}]
 * - onSend: function(message: string)
 * - loading: boolean
 * - error: string|null
 */
export default function ChatWindow({ messages, onSend, loading, error }) {
  const [text, setText] = React.useState("");
  const endRef = useRef(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section style={styles.wrapper} aria-label="Main chat window">
      <header style={styles.header}>
        <div>
          <div style={styles.headerTitle}>Assistant</div>
          <div style={styles.headerSubtitle}>Ocean Professional • RAG + MCP</div>
        </div>
      </header>

      <div style={styles.messages} role="log" aria-live="polite">
        {messages.length === 0 ? (
          <div style={styles.welcome}>
            <div style={styles.welcomeBadge}>Welcome</div>
            <h2 style={styles.welcomeTitle}>How can I help today?</h2>
            <p style={styles.welcomeHint}>
              Ask about your data, projects, or general knowledge. I blend context with
              retrieval to craft helpful, concise answers.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} content={m.content} />
          ))
        )}
        <div ref={endRef} />
      </div>

      {error ? (
        <div style={styles.error} role="alert">
          ⚠️ {error}
        </div>
      ) : null}

      <div style={styles.composer}>
        <textarea
          placeholder="Type your message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.textarea}
          rows={1}
          aria-label="Message input"
        />
        <button
          onClick={handleSend}
          style={{
            ...styles.sendBtn,
            ...(loading ? styles.sendBtnDisabled : {}),
          }}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </div>
    </section>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        ...styles.row,
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          ...styles.bubble,
          ...(isUser ? styles.userBubble : styles.assistantBubble),
        }}
      >
        {!isUser && <div style={styles.assistantBadge}>AI</div>}
        <div style={styles.content}>{content}</div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: Theme.spacing(6),
    gap: Theme.spacing(4),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: Theme.colors.surface,
    border: `1px solid ${Theme.colors.border}`,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing(4),
    boxShadow: Theme.colors.shadowSoft,
  },
  headerTitle: {
    color: Theme.colors.text,
    fontWeight: 700,
    fontSize: 18,
  },
  headerSubtitle: {
    color: Theme.colors.subtleText,
    fontSize: 13,
    marginTop: 2,
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: Theme.spacing(3),
    padding: Theme.spacing(2),
  },
  row: {
    display: "flex",
    width: "100%",
  },
  bubble: {
    maxWidth: "70ch",
    padding: Theme.spacing(4),
    borderRadius: Theme.radius.lg,
    border: `1px solid ${Theme.colors.border}`,
    boxShadow: Theme.colors.shadowSoft,
  },
  userBubble: {
    background: `linear-gradient(135deg, ${Theme.colors.gradientFrom}, ${Theme.colors.gradientTo})`,
  },
  assistantBubble: {
    background: Theme.colors.surface,
  },
  assistantBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "white",
    background: Theme.colors.primary,
    borderRadius: Theme.radius.round,
    fontSize: 11,
    padding: "2px 8px",
    marginBottom: Theme.spacing(2),
    boxShadow: Theme.colors.shadowSoft,
  },
  content: {
    color: Theme.colors.text,
    whiteSpace: "pre-wrap",
    lineHeight: 1.55,
  },
  composer: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: Theme.spacing(3),
    background: Theme.colors.surface,
    border: `1px solid ${Theme.colors.border}`,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing(3),
    boxShadow: Theme.colors.shadow,
  },
  textarea: {
    width: "100%",
    resize: "none",
    border: "none",
    outline: "none",
    padding: `${Theme.spacing(3)} ${Theme.spacing(4)}`,
    borderRadius: Theme.radius.md,
    fontSize: 15,
    color: Theme.colors.text,
    background: "transparent",
  },
  sendBtn: {
    border: "none",
    outline: "none",
    background: Theme.colors.secondary,
    color: "#111827",
    padding: `${Theme.spacing(3)} ${Theme.spacing(5)}`,
    borderRadius: Theme.radius.md,
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: Theme.colors.shadow,
    transition: Theme.transition,
    alignSelf: "center",
  },
  sendBtnDisabled: {
    filter: "grayscale(0.4)",
    opacity: 0.8,
    cursor: "not-allowed",
  },
  error: {
    background: "#FEF2F2",
    color: "#991B1B",
    border: "1px solid #FCA5A5",
    padding: Theme.spacing(3),
    borderRadius: Theme.radius.md,
  },
  welcome: {
    margin: "auto",
    textAlign: "center",
    maxWidth: 640,
    padding: Theme.spacing(6),
    background: Theme.colors.surface,
    border: `1px dashed ${Theme.colors.border}`,
    borderRadius: Theme.radius.lg,
  },
  welcomeBadge: {
    display: "inline-block",
    background: Theme.colors.primary,
    color: "white",
    padding: "4px 10px",
    borderRadius: Theme.radius.round,
    fontWeight: 700,
    fontSize: 12,
    marginBottom: Theme.spacing(3),
    boxShadow: Theme.colors.shadowSoft,
  },
  welcomeTitle: {
    margin: 0,
    color: Theme.colors.text,
  },
  welcomeHint: {
    color: Theme.colors.subtleText,
    marginTop: Theme.spacing(2),
  },
};
