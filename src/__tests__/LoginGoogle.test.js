/**
 * @Test Function
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import LoginGoogle from "../views/LogInScreen/LoginGoogle";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Renderizar componente", () => {
    act(() => {
        render(<LoginGoogle />, container);
    });
    expect(container.textContent).toBe("Iniciar Sesión con Google");

    /*act(() => {
        render(<Hello name="Jenny" />, container);
    });
    expect(container.textContent).toBe("Hello, Jenny!");

    act(() => {
        render(<Hello name="Margaret" />, container);
    });
    expect(container.textContent).toBe("Hello, Margaret!");*/
});
