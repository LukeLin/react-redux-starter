import React, { Component, PropTypes } from 'react';
import Base from '../../pages/Base';

export default class AddTodo extends Base {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <input type='text' ref='input' />
                <button onClick={ this.onClick.bind(this) }>Add</button>
            </div>
        )
    }

    onClick(e) {
        const node = this.refs.input;
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = '';
    }
}

AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired
};
