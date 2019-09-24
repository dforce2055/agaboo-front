/**
 * View de prueba para realizar test en Reac
 * Una vez entendido el concepto se eliminara
 */
import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        document.title = `Apretaste ${this.state.count} veces`;
    }
    componentDidUpdate() {
        document.title = `Apretaste ${this.state.count} veces`;
    }
    handleClick() {
        this.setState(state => ({
            count: state.count + 1,
        }));
    }
    render() {
        return (
            <div>
                <p>Apretaste {this.state.count} veces</p>
                <button onClick={this.handleClick}>
                    Apretar
        </button>
            </div>
        );
    }
}
export { Counter }
