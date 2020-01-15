import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { KEY_RETURN } from 'keycode-js';
import { TODO } from '../../gql/todoQueries';

interface TodoFormProps {
    onChange: () => void;
}

const TodoForm = ({ onChange, className }: TodoFormProps & React.ComponentProps<'div'>) => {
    const [create] = useMutation(TODO.CREATE, {
      onError: (err) => alert(err),
    });
    const [state, setState] = useState({
        title: '',
    });

    const submit = () => {
        create({
            variables: {
                title: state.title,
            },
        }).then(onChange);
        setState({ title: '' });
    };

    return (
        <div className={className + ' field has-addons has-addons-right'}>
            <p className="control is-expanded is-marginless">
                <input className="input"
                       type="text"
                       placeholder="What we have to do"
                       onKeyDown={event => {
                           if (event.keyCode === KEY_RETURN) {
                               submit();
                           }
                       }}
                       value={state.title} onChange={event => {
                    setState({
                        title: event.currentTarget.value,
                    });
                }}/>
            </p>
            <p className="control">
                <button className="button is-primary"
                        disabled={state.title === ''}
                        onClick={submit}>
                    Create
                </button>
            </p>
        </div>
    );
};

export default TodoForm;
