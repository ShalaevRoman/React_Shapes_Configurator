import * as yup from 'yup';
import {useEffect} from "react";
import { connect } from "react-redux";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../styles/shapes.scss';
import { useFormik } from "formik";

import { addNewFigure, isEditing, changeValuesFigure } from "../redux/actions/actionCreators"
import { convertToObject, uniqueID, normalizeInitialDataFigure } from '../utils/convertToObject';

const positiveAndNegative = /^(?:\-?\d+[, ]*)+$/;
const positiveRegEx = /^[0-9]+(,[0-9]+)*$/;

const validationShapesSchema = yup.object().shape({
    name: yup.string().required().min(5, 'Too Short!'),
    position: yup
        .string()
        .required()
        .matches(positiveAndNegative, 'Wrong format'),
    rotation: yup
        .string()
        .required()
        .matches(positiveAndNegative, 'Wrong format'),
    scale: yup
        .string()
        .required()
        .matches(positiveRegEx, 'Wrong format'),
    color: yup.string().required().min(8),
    wireframe: yup.boolean(),
    visible: yup.boolean(),
});

const Shapes = ({addFigure, activeFigure, isEditing, changeFigure, activeFigureId, setIsEditing}) => {

const dataFigure = isEditing
    ?  normalizeInitialDataFigure(activeFigure)
    : {
    name: '',
    type: '',
    position: '1234',
    rotation: '123',
    scale: '123',
    color: 'e32e13e23e',
    wireframe: '',
    visible: '',
};

    const { values, handleChange, handleSubmit, errors, isValid, resetForm, touched, handleBlur } = useFormik({
        initialValues: dataFigure,
        validationSchema: validationShapesSchema,
        onSubmit(values) {
                isEditing
                    ? changeFigure({...values,
                        id: activeFigureId,
                        position: convertToObject(values.position),
                        rotation: convertToObject(values.rotation),
                        scale: convertToObject(values.scale)
                    })
                    : addFigure({
                        ...values,
                        id: uniqueID(),
                        position: convertToObject(values.position),
                        rotation: convertToObject(values.rotation),
                        scale: convertToObject(values.scale)
                    });

                setIsEditing(false);
                resetForm();
        },

    });

    useEffect(() => {
                resetForm({
                    values: dataFigure
                })

    }, [activeFigure]);

    return  (
        <form onSubmit={handleSubmit}>
            <h1 className="form__title">Shapes</h1>
                <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                        className: 'textField__label',
                    }}
                    id="name"
                    label="Name"
                    name="name"
                    value={values.name}
                    variant="standard"
                    fullWidth
                    sx={{
                        color: 'primary',
                        borderBottom: '1px solid white',
                        mb: 2
                    }}
                />
                {errors.name && touched.name && <p>{errors.name}</p>}
                <FormControl
                    variant="standard"
                    fullWidth
                >
                    <InputLabel
                        className='textField__label'
                        id="type"
                        color='primary'
                    >
                        Type
                    </InputLabel>
                    <Select
                        sx={{
                            color: 'primary',
                            borderBottom: '1px solid white',
                            mb: 2
                        }}
                        labelId="type"
                        id="type"
                        value={values.type}
                        onChange={handleChange}
                        label="type"
                        name="type"
                    >
                        <MenuItem value={'BOX'}>BOX</MenuItem>
                        <MenuItem value={'POLYGON'}>POLYGON</MenuItem>
                        <MenuItem value={'SPHERE'}>SPHERE</MenuItem>
                        <MenuItem value={'PLANE'}>PLANE</MenuItem>
                        <MenuItem value={'CYLINDER'}>CYLINDER</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.position}
                    InputLabelProps={{
                        className: 'textField__label',
                    }}
                    id="position"
                    label="Position"
                    name="position"
                    variant="standard"
                    fullWidth
                    sx={{
                        color: 'primary',
                        borderBottom: '1px solid white',
                        mb: 2
                    }}
                />
                {errors.position && touched.position && <p>{errors.position}</p>}
                <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rotation}
                    InputLabelProps={{
                        className: 'textField__label',
                    }}
                    id="rotation"
                    label="Rotation"
                    name="rotation"
                    variant="standard"
                    fullWidth
                    sx={{
                        color: 'primary',
                        borderBottom: '1px solid white',
                        mb: 2
                    }}
                />
                {errors.rotation && touched.rotation && <p>{errors.rotation}</p>}
                <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.scale}
                    InputLabelProps={{
                        className: 'textField__label',
                    }}
                    id="scale"
                    label="Scale"
                    name="scale"
                    variant="standard"
                    fullWidth
                    sx={{
                        color: 'primary',
                        borderBottom: '1px solid white',
                        mb: 2
                    }}
                />
                {errors.scale && touched.scale && <p>{errors.scale}</p>}
                <TextField
                    InputLabelProps={{
                        className: 'textField__label',
                    }}
                    id="color"
                    label="Color"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    variant="standard"
                    fullWidth
                    sx={{
                        color: 'primary',
                        borderBottom: '1px solid white',
                        mb: 2
                    }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    value={values.wireframe}
                    onChange={handleChange}
                    label="Wireframe"
                    id="wireframe"
                    name="wireframe"
                    sx={{
                        width: '100%',
                        mt: 3
                    }}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    value={values.visible}
                    onChange={handleChange}
                    label="Visible"
                    id="visible"
                    name="visible"
                    sx={{
                        width: '100%',
                        mt: 3
                    }}
                />
                <Button
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{
                        mt: 3
                    }}
                >
                    SAVE
                </Button>
        </form>
    )
};


const mapStateToProps = (state) => ({
    allFigure: state,
    isEditing: state.isEditing,
    activeFigure: state.activeFigure,
    activeFigureId: state.activeFigure.id
});

const mapDispatchToProps = (dispatch) => ({
    addFigure: (newFigure) => dispatch(addNewFigure(newFigure)),
    changeIsEditing: (boolean) => dispatch(isEditing(boolean)),
    changeFigure: (values) => dispatch(changeValuesFigure(values)),
    setIsEditing: (boolean) => dispatch(isEditing(boolean))
});

export default connect(mapStateToProps, mapDispatchToProps)(Shapes);
