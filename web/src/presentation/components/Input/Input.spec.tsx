import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from ".";

describe("Input Component", () => {
  it("should render correctly", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should render valueless", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
