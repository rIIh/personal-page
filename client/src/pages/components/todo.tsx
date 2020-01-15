import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { TODO, Todo } from '../../gql/todoQueries';
import { KEY_RETURN } from 'keycode-js';

interface TodoProps {
    todo: Todo;
    onChange: () => void;
}

const TodoComponent = ({ todo, onChange, className }: TodoProps & React.ComponentProps<'div'>) => {
    const [title, setTitle] = useState(todo.title);
    const [remove] = useMutation(TODO.REMOVE);
    const [switchState] = useMutation(TODO.SWITCH_STATE);
    const [rename] = useMutation(TODO.RENAME);
    const [editing, setEditing] = useState(false);

    return (
        <div className={className + ' field has-addons has-addons-right'}>
            <p className="control is-marginless">
                <input className="button"
                       type="checkbox"
                       checked={todo.completed}
                       style={{ width: '32px', content: todo.completed ? '√' : '' }}
                       onChange={() => switchState({
                           variables: {
                               id: todo.id,
                           },
                       }).then(onChange)}/>
            </p>
            <p className="control is-expanded is-marginless">
                <input className="input"
                       type="text"
                       style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                       placeholder="Title"
                       value={title}
                       readOnly={!editing}
                       onDoubleClick={(event) => {
                           setEditing(true);
                           event.currentTarget.focus();
                       }}
                       onChange={event => {
                           setTitle(event.currentTarget.value);
                       }}
                       onKeyDown={event => {
                           if (event.keyCode === KEY_RETURN) {
                               event.currentTarget.blur();
                           }
                       }}
                       onBlur={() => {
                           setEditing(false);
                           if (title === todo.title) {
                               return;
                           }
                           rename({
                               variables: {
                                   id: todo.id,
                                   title,
                               },
                           }).then(onChange);
                       }}
                />
            </p>
            <p className="control">
                <button className="button is-danger" onClick={() => remove({
                    variables: {
                        id: todo.id,
                    },
                }).then(onChange)}>
                    Remove
                </button>
            </p>
        </div>
    );
};

export default TodoComponent;
