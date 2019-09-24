/**
 * @Test Class
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { act, isElement, isElementOfType } from 'react-dom/test-utils';
import { Counter } from '../views/TCounter';
import { exportAllDeclaration } from '@babel/types';

/* esto esta OK
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Counter />, div);
    ReactDOM.unmountComponentAtNode(div);
});
*/

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('Es un elemento React del tipo Counter', () => {
    expect(isElement(<Counter />)).toBe(true);
    expect(
        isElementOfType(
            <Counter />,
            Counter
        )
    ).toBe(true);
});

it('Pude renderizar y actualizar el contador', () => {
    //Pruebo la primer renderización
    act(() => {
        ReactDOM.render(<Counter />, container);
    });
    const button = container.querySelector('button');
    const label = container.querySelector('p');
    expect(label.textContent).toBe('Apretaste 0 veces');
    expect(document.title).toBe('Apretaste 0 veces');


    //Pruebo la segunda renderización
    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(label.textContent).toBe('Apretaste 1 veces');
    expect(document.title).toBe('Apretaste 1 veces');
});