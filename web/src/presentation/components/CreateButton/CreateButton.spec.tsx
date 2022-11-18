import { screen, render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { CreateButton } from ".";

describe("CreateButton Component", () => {
  it("should render correctly", () => {
    render(<CreateButton />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should possible click", () => {
    const testingFunction = vi.fn();

    render(<CreateButton onClick={testingFunction} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(testingFunction).toHaveBeenCalled();
  });
});
