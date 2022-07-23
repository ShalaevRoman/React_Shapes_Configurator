import { ACTION_TYPES } from '../actions/actionTypes';

const refreshState = (prevState, freshData) => ({...prevState, ...freshData})

export const reducer = (prevState, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.ADD_FIGURE: {
            return refreshState(prevState, {
                figures: [...prevState.figures, payload]
            });
        }

        case ACTION_TYPES.NEW_VALUES: {
            console.log(payload)
            return refreshState(prevState, {
                figures: [...prevState.figures.map(item => {
                    if(item.id === payload.id) {
                        console.log('reducer')
                        return {...payload}
                    }
                    return item
                })
                ]
            })
        }

        case ACTION_TYPES.REMOVE_FIGURE: {
            return refreshState(prevState, {
                figures: [...prevState.figures.filter(item => item.id !== payload)]
            });
        }

        case ACTION_TYPES.ACTIVE_FIGURE: {
            return refreshState(prevState, {activeFigure: payload})
        }

        case ACTION_TYPES.IS_EDITING: {
            return refreshState(prevState, {isEditing: payload})
        }

        default: {
            return prevState;
        }
    }
}