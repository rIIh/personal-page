import { gql } from 'apollo-boost';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export namespace TODO {
    export const CREATE = gql`
        mutation create($title: String!) {
            create(todo: {
                title: $title
            }) {
                id
            }
        }
    `;

    export const REMOVE = gql`
        mutation remove($id: ID!){
            remove(id: $id)
        }
    `;

    export const LIST = gql`
        query all {
            todos {
                id
                completed
                title
            }
        }
    `;

    export const RENAME = gql`
        mutation rename($id: ID!, $title: String!) {
            rename(id: $id, title: $title)
        }
    `;

    export const SWITCH_STATE = gql`
        mutation switchState($id: ID!) {
            switchState(id: $id)
        }
    `;
}
