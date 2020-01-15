import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import TodoComponent from './components/todo';
import TodoForm from './components/todoForm';
import { Todo, TODO } from '../gql/todoQueries';
import './styles/styles.scss';

enum SortDescriptor {
    None = 0,
    CompletedAtTop = 1,
    CompletedAtBottom = -1,
}

interface TodoFilter {
    sortDirection: SortDescriptor;
    showCompleted: boolean;
    showUncompleted: boolean;
}

export default function () {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState({
        sortDirection: SortDescriptor.CompletedAtBottom,
        showCompleted: true,
        showUncompleted: true,
    });

    const { error, refetch } = useQuery(TODO.LIST, {
        onCompleted: data1 => {
            setTodos(() => data1.todos);
        },
    });

    if (error) {
        return <div>
            <p>Failed to fetch todos</p>
            <p>{error.message}</p>
        </div>;
    }
    return (
        <section>
            <div className="container" style={{ paddingTop: '1.5rem' }}>
                <div className="content">
                    <div className="columns is-centered has-text-centered">
                        <h1 className="column is-4">Your Todos</h1>
                    </div>
                    <div className="columns is-centered">
                        <TodoForm className="column is-6 is-12-touch" onChange={refetch}/>
                    </div>
                    <div className="columns">
                        <div className="column field is-horizontal is-offset-3" style={{ paddingTop: '0' }}>
                            <div className="field-label is-small" style={{ flexGrow: 0, flexShrink: 1, marginRight: '1rem' }}>
                                <label className="label" style={{ whiteSpace: 'nowrap' }}>Display completed at</label>
                            </div>
                            <div className="field-body">
                                <div className="field is-narrow">
                                    <div className="control">
                                        <div className="select is-fullwidth is-rounded is-small">
                                            <select value={filter.sortDirection.toString(10)}
                                                    onChange={(event) => {
                                                        const inputValue = parseInt(event.currentTarget.value, 10);
                                                        setFilter((prevState: TodoFilter) => {
                                                            return {
                                                                ...prevState,
                                                                sortDirection: inputValue,
                                                            };
                                                        });
                                                    }}>
                                                <option value={0}>none</option>
                                                <option value={1}>top</option>
                                                <option value={-1}>bottom</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        todos.concat().sort((a: Todo) => {
                            if (filter.sortDirection === -1) {
                                return a.completed ? 1 : -1;
                            } else if (filter.sortDirection === 1) {
                                return a.completed ? -1 : 1;
                            } else {
                                return 0;
                            }
                        }).map((todo: Todo) => {
                            return (
                                <div key={todo.id} className="columns is-centered">
                                    <TodoComponent className="column is-6 is-12-touch" key={todo.id} todo={todo}
                                                   onChange={refetch}/>
                                </div>
                            );
                        })
                    }
                </div>
                <p className="columns is-centered has-text-centered has-text-grey-light is-size-7">
                    Double-click to edit a todo
                </p>
                <p className="columns is-centered has-text-centered has-text-grey-light is-size-7">
                    Created by
                    <a href="https://github.com/rIIh/todos"><span className="icon is-small" style={{ marginLeft: '5px' }}>
                      <i className="fab fa-github"/>
                    </span>ratiih</a>
                </p>
            </div>
        </section>
    );
}
