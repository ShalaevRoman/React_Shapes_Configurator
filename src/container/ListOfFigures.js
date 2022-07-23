import { connect } from "react-redux";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import '../styles/listOffigures.scss';
import {addNewFigure, removeFigure, activeFigure, isEditing} from "../redux/actions/actionCreators";

const ListOfFigures = ({allFigure, removeFigure, activeFigure, changeIsEditing, isEditing}) => {
    return (
        <ul>
            <h1 className="form__title">List</h1>
            {allFigure.map((figure, index) => (
                <li
                    onClick={() => activeFigure(figure) && changeIsEditing(true)}
                    key={`${figure.id}${index}`}>
                    <span>{figure.name}</span>
                    <IconButton
                        onClick={(event) => {
                            removeFigure(figure.id);
                            changeIsEditing(false);
                            activeFigure(false);
                            event.stopPropagation();
                        }}
                        aria-label="delete"
                        size="small">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </li>
            ))}
        </ul>
    );
};

const mapStateToProps = (state) => ({
    allFigure: state.figures,
});

const mapDispatchToProps = (dispatch) => ({
    addNewFigure: (newFigure) => dispatch(addNewFigure(newFigure)),
    removeFigure: (id) => dispatch(removeFigure(id)),
    activeFigure: (figure) => dispatch(activeFigure(figure)),
    changeIsEditing: (boolean) => dispatch(isEditing(boolean))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListOfFigures);