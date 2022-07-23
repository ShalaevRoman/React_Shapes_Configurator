import { connect } from "react-redux";
import '../styles/figureRepresentation.scss';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {activeFigure, isEditing} from "../redux/actions/actionCreators";

const FigureRepresentation = ({activeFigure, changeIsEditing, changeActiveFigure, isEditing}) => {
    return (
        <div>{isEditing
            ? <div className={'figureRepresentation_wrapper'}>
                <pre>{JSON.stringify(activeFigure, null, 2)}</pre>
                <Button
                    onClick={(e) => changeIsEditing(false) && changeActiveFigure(false)}
                    variant="outlined"
                    sx={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%'
                    }}
                >
                    <AddIcon fontSize="large"/>
                </Button>
            </div>
            : <h2>Figure not selected</h2>}
        </div>

    )
}

const mapStateToProps = (state) => ({
    activeFigure: state.activeFigure,
    isEditing: state.isEditing
});

const mapDispatchToProps = (dispatch) => ({
    changeActiveFigure: (figure) => dispatch(activeFigure(figure)),
    changeIsEditing: (boolean) => dispatch(isEditing(boolean))
});

export default connect(mapStateToProps, mapDispatchToProps)(FigureRepresentation);
