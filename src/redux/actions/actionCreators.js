import { ACTION_TYPES } from "./actionTypes";

export function addNewFigure(value) {
    return {type: ACTION_TYPES.ADD_FIGURE, payload: value};
};

export function removeFigure(id) {
    return {type: ACTION_TYPES.REMOVE_FIGURE, payload: id};
};

export function activeFigure(figure) {
    return {type: ACTION_TYPES.ACTIVE_FIGURE, payload: figure};
};

export function isEditing(boolean) {
    return {type: ACTION_TYPES.IS_EDITING, payload: boolean}
}