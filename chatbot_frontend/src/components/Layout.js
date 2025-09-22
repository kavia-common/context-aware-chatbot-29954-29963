import React from "react";
import { Theme } from "../theme";

/**
 * Layout provides the responsive shell with sidebar and content area.
 * Props:
 * - sidebar: ReactNode
 * - children: ReactNode
 */
export default function Layout({ sidebar, children }) {
  return (
    <div style={styles.app}>
      <div style={styles.background} />
      <div style={styles.container}>
        <div style={styles.sidebar}>{sidebar}</div>
        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: Theme.colors.background,
    position: "relative",
  },
  background: {
    position: "absolute",
    inset: 0,
    background: `radial-gradient(1200px 600px at -10% -10%, ${Theme.colors.gradientFrom}, transparent 60%), radial-gradient(1200px 600px at 110% -10%, ${Theme.colors.gradientFrom}, transparent 60%)`,
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: Theme.spacing(4),
    padding: Theme.spacing(5),
    maxWidth: 1440,
    margin: "0 auto",
  },
  sidebar: {
    background: Theme.colors.surface,
    borderRadius: Theme.radius.xl,
    border: `1px solid ${Theme.colors.border}`,
    boxShadow: Theme.colors.shadow,
    overflow: "hidden",
    minHeight: "80vh",
  },
  main: {
    background: Theme.colors.surface,
    borderRadius: Theme.radius.xl,
    border: `1px solid ${Theme.colors.border}`,
    boxShadow: Theme.colors.shadow,
    minHeight: "80vh",
    overflow: "hidden",
  },
};
