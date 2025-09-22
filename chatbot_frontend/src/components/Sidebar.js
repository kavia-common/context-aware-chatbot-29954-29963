import React from "react";
import { Theme } from "../theme";

/**
 * Sidebar navigation with chat history.
 * Props:
 * - items: array of { id, title, preview, time }
 * - onSelect: function(id)
 * - selectedId: string
 * - onNewChat: function()
 */
export default function Sidebar({
  items = [],
  onSelect,
  selectedId,
  onNewChat,
}) {
  return (
    <aside style={styles.aside} aria-label="Chat sidebar">
      <div style={styles.brand}>
        <div style={styles.logo}>💬</div>
        <div>
          <div style={styles.brandTitle}>Ocean Chat</div>
          <div style={styles.brandSubtitle}>Context-aware assistant</div>
        </div>
      </div>

      <button onClick={onNewChat} style={styles.newChatBtn} className="btn-new-chat">
        + New Chat
      </button>

      <div style={styles.sectionHeader}>Recent</div>
      <nav style={styles.list} aria-label="Recent chats">
        {items.length === 0 ? (
          <div style={styles.empty}>No chats yet</div>
        ) : (
          items.map((item) => {
            const active = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                style={{
                  ...styles.item,
                  ...(active ? styles.itemActive : {}),
                }}
                className="sidebar-item"
                aria-current={active ? "page" : undefined}
              >
                <div style={styles.itemTitle}>{item.title}</div>
                <div style={styles.itemPreview}>{item.preview}</div>
              </button>
            );
          })
        )}
      </nav>

      <div style={styles.footer}>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          style={styles.link}
        >
          Help & Docs
        </a>
      </div>
    </aside>
  );
}

const styles = {
  aside: {
    width: 320,
    minWidth: 280,
    background: Theme.colors.surface,
    borderRight: `1px solid ${Theme.colors.border}`,
    padding: Theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    gap: Theme.spacing(4),
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: Theme.spacing(3),
    padding: Theme.spacing(3),
    background: `linear-gradient(135deg, ${Theme.colors.gradientFrom}, ${Theme.colors.gradientTo})`,
    borderRadius: Theme.radius.lg,
    boxShadow: Theme.colors.shadowSoft,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.round,
    background: Theme.colors.primary,
    color: "white",
    display: "grid",
    placeItems: "center",
    fontSize: 20,
    boxShadow: Theme.colors.shadowSoft,
  },
  brandTitle: {
    color: Theme.colors.text,
    fontWeight: 700,
    lineHeight: 1.15,
  },
  brandSubtitle: {
    color: Theme.colors.subtleText,
    fontSize: 13,
  },
  newChatBtn: {
    border: "none",
    outline: "none",
    background: Theme.colors.primary,
    color: "white",
    padding: `${Theme.spacing(3)} ${Theme.spacing(4)}`,
    borderRadius: Theme.radius.md,
    cursor: "pointer",
    boxShadow: Theme.colors.shadow,
    transition: Theme.transition,
    fontWeight: 600,
  },
  sectionHeader: {
    color: Theme.colors.subtleText,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: Theme.spacing(2),
    overflowY: "auto",
  },
  empty: {
    color: Theme.colors.subtleText,
    fontSize: 14,
    padding: Theme.spacing(2),
  },
  item: {
    textAlign: "left",
    background: "transparent",
    border: `1px solid ${Theme.colors.border}`,
    borderRadius: Theme.radius.md,
    padding: Theme.spacing(3),
    cursor: "pointer",
    transition: Theme.transition,
    outline: "none",
  },
  itemActive: {
    borderColor: Theme.colors.primary,
    boxShadow: `0 0 0 3px rgba(37,99,235,0.15)`,
    background: "linear-gradient(180deg, #ffffff, #f9fbff)",
  },
  itemTitle: {
    color: Theme.colors.text,
    fontWeight: 600,
    marginBottom: 4,
  },
  itemPreview: {
    color: Theme.colors.subtleText,
    fontSize: 13,
    lineHeight: 1.4,
  },
  footer: {
    marginTop: "auto",
    paddingTop: Theme.spacing(3),
    borderTop: `1px dashed ${Theme.colors.border}`,
  },
  link: {
    color: Theme.colors.primary,
    textDecoration: "none",
    fontWeight: 600,
  },
};
