import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable';
import Base from '../Base.jsx';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../../actions/todo'
import AddTodo from '../../components/todo/AddTodo'
import TodoList from '../../components/todo/TodoList'
import Footer from '../../components/todo/Footer';
import Tabs, { TabTitle, TabPanel } from '../../components/common/Tab';

class Page extends Base {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        console.log(this.context.$appConfig.user);

        this.emit('test');
    }

    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos, visibilityFilter } = this.props
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    } />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index =>
                        dispatch(completeTodo(index))
                    } />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
                        dispatch(setVisibilityFilter(nextFilter))
                    } />
                <Tabs defaultSelectedTab="1">
                    <TabTitle label="1">
                        tab1
                    </TabTitle>
                    <TabTitle label="2">
                        tab2
                    </TabTitle>
                    <TabPanel for="1">
                        TabContent1
                    </TabPanel>
                    <TabPanel for="2">
                        TabContent2
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

Page.propTypes = {
    visibleTodos: PropTypes.instanceOf(List).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};
Page.contextTypes = {
    $appConfig: PropTypes.object,
    $eventBus: PropTypes.object
};

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.get('completed'))
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.get('completed'))
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleTodos: selectTodos(state.get('todos'), state.get('visibilityFilter')),
        visibilityFilter: state.get('visibilityFilter')
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Page);
