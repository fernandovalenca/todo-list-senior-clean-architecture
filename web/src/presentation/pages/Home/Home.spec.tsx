import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { Home } from ".";
import { act } from "react-dom/test-utils";

const sleep = (milliseconds = 600) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });

describe("Home Page", () => {
  it("should render field to add task", () => {
    act(() => {
      render(<Home />);
    });

    const form = screen.getByRole("form");
    const buttonCreate = screen.getByRole("button", {
      name: /criar/i,
    });
    const taskInput = screen.getByRole("textbox");

    expect(form).toBeInTheDocument();
    expect(taskInput).toBeInTheDocument();
    expect(buttonCreate).toBeInTheDocument();
    expect(buttonCreate).toHaveAttribute("disabled");
  });

  it("should render empty to-do list", () => {
    act(() => {
      render(<Home />);
    });

    expect(
      screen.getByText(
        "Você ainda não tem tarefas cadastradas Crie tarefas e organize seus itens a fazer"
      )
    ).toBeInTheDocument();
  });

  it("should be possible to register new task", async () => {
    act(() => {
      render(<Home />);
    });

    const fn = vi.fn();

    const form = screen.getByRole("form");
    const input = screen.getByRole("textbox");
    const buttonCreate = screen.getByRole("button", {
      name: /criar/i,
    });

    fireEvent.change(input, {
      target: {
        value: "Any task",
      },
    });

    expect(input).toHaveValue("Any task");

    form.onsubmit = fn;

    fireEvent.click(buttonCreate);

    expect(form.onsubmit).toHaveBeenCalled();

    fireEvent.change(input, {
      target: {
        value: "",
      },
    });

    expect(input).toHaveValue("");
    expect(buttonCreate).toHaveAttribute("disabled");
  });
});
