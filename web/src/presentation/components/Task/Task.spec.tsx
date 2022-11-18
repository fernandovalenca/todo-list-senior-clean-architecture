import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { Task } from ".";

const todoMock = {
  id: "2f3e9eccc22ee583cf7bad86c751d865",
  description:
    "MD5 hashes are also used to ensure the data integrity of files.",
  done: false,
};

const handleCheckedTask = vi.fn();
const handleDeleteTask = vi.fn();

describe("Task Component", () => {
  it("should render correctly", () => {
    render(
      <Task
        data={todoMock}
        onCheckedTask={handleCheckedTask}
        onDeleteTask={handleDeleteTask}
      />
    );

    const listItem = screen.getByRole("listitem");
    const task = screen.getByRole("button", {
      name: /md5 hashes are also used to ensure the data integrity of files\./i,
    });
    const buttonDelete = screen.getByTitle("Deletar tarefa");

    expect(listItem).toBeInTheDocument();
    expect(task).toBeInTheDocument();
    expect(buttonDelete).toBeInTheDocument();
  });

  it("should change the button style", async () => {
    const { rerender } = render(
      <Task
        data={todoMock}
        onCheckedTask={handleCheckedTask}
        onDeleteTask={handleDeleteTask}
      />
    );

    const buttonTaskUnChecked = screen.getByTitle("Marcar");
    fireEvent.click(buttonTaskUnChecked);

    rerender(
      <Task
        data={{
          id: "2f3e9eccc22ee583cf7bad86c751d865",
          description:
            "MD5 hashes are also used to ensure the data integrity of files.",
          done: true,
        }}
        onCheckedTask={handleCheckedTask}
        onDeleteTask={handleDeleteTask}
      />
    );

    const taskChecked = screen.getByTitle("Desmarcar");

    expect(handleCheckedTask).toHaveBeenCalled();
    expect(taskChecked).toBeInTheDocument();
  });
});
