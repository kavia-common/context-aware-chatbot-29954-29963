import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app header elements", () => {
  render(<App />);
  const welcome = screen.getByText(/How can I help today\?/i);
  expect(welcome).toBeInTheDocument();
});
