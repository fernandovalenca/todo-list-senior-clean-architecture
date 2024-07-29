class RegisterForm {
  elements = {
    todoInput: () => cy.get('[data-testid="todo-input"]'),
    todoButtonSubmit: () => cy.get('[data-testid="todo-submit-button"]'),
    todoListItem: (todoTitle: string) =>
      cy.get(`ul > li[data-testid="${todoTitle}"]`),
  };

  inputTodo(value: string) {
    if (!value) return;
    this.elements.todoInput().type(value);
  }

  clickButtonSubmit() {
    this.elements.todoButtonSubmit().click();
  }

  toggleTodo(todoTitle: string) {
    this.elements.todoListItem(todoTitle).click();
  }

  deleteTodo(todoTitle: string) {
    this.elements
      .todoListItem(todoTitle)
      .find('[data-testid="todo-delete-button"')
      .click();
  }
}

const registerForm = new RegisterForm();

describe("To-do List Senior", () => {
  const input = {
    todo: {
      description: "Estudar Node",
    },
  };

  after(() => {
    cy.clearAllLocalStorage();
  });

  it("Deve visitar a página de Registrar To-Do", () => {
    cy.visit("/");
  });

  it(`Deve registrar um to-do ${input.todo.description}`, () => {
    registerForm.inputTodo(input.todo.description);
    registerForm.clickButtonSubmit();
  });

  it(`Deve marcar o to-do ${input.todo.description} como concluído`, () => {
    registerForm.toggleTodo(input.todo.description);
  });

  it(`Deve excluir o to-do ${input.todo.description}`, () => {
    registerForm.deleteTodo(input.todo.description);
  });
});
