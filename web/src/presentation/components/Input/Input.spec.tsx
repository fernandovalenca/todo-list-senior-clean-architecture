import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "@/presentation/components";

describe("Input Component", () => {
  it("should render correctly", async () => {
    const { findByRole, getByRole } = render(<Input />);

    await findByRole("textbox");

    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("should render valueless", async () => {
    const { findByRole, getByRole } = render(<Input />);

    await findByRole("textbox");

    expect(getByRole("textbox")).toHaveValue("");
  });
});

