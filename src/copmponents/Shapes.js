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
import * as yup from 'yup';
import { useFormik } from "formik";

import { addNewFigure, isEditing } from "../redux/actions/actionCreators"
import { isObject, convertToObject, uniqueID, normalizeInitialDataFigure } from '../utils/convertToObject';
import {useEffect} from "react";

let validationShapesSchema = yup.object().shape({
    name: yup.string().min(5, 'Too Short!').required('Fill this field!'),
    type: '',
    position: yup.string().required('Fill this field!'),
    rotation: yup.string().required('Fill this field!'),
    scale: yup.string().required('Fill this field!'),
    color: '',
    wireframe: false,
    visible: false,
});

const Shapes = ({addNewFigure, isEditing, activeFigure}) => {

const dataFigure = activeFigure
    ?  normalizeInitialDataFigure(activeFigure)
    : {
    name: '',
    type: '',
    position: '',
    rotation: '',
    scale: '',
    color: '',
    wireframe: '',
    visible: '',
};

    const { values, handleChange, handleSubmit, errors, isValid, resetForm, touched, handleBlur } = useFormik({
        initialValues: dataFigure,
        validationSchema: validationShapesSchema,
        onSubmit(values, helpers) {
            values.id = uniqueID(Date.now());
            addNewFigure(values);
            helpers.resetForm();
        },
        validate(values) {
            const errors = {};
            const negativeRegEx = /^-?[0-9]+(,-?[0-9]+)*$/;
            const positiveRegEx = /^[0-9]+(,[0-9]+)*$/;

            isObject(convertToObject(values.position, negativeRegEx))
                ? values.position = convertToObject(values.position, negativeRegEx)
                : errors.position = convertToObject(values.position, negativeRegEx);

            isObject(convertToObject(values.rotation, negativeRegEx))
                ? values.rotation = convertToObject(values.rotation, negativeRegEx)
                : errors.rotation = convertToObject(values.rotation, negativeRegEx);

            isObject(convertToObject(values.scale, positiveRegEx))
                ? values.scale = convertToObject(values.scale, positiveRegEx)
                : errors.scale = convertToObject(values.scale, positiveRegEx) + 'Only positive numbers!!!';

            return errors;
        }
    });

    useEffect(() => {
            if(activeFigure) {
                resetForm({
                    values: dataFigure
                })
            }

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
                    onBlur={console.log(values.position)}
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
    activeFigure: state.activeFigure
});

const mapDispatchToProps = (dispatch) => ({
    addNewFigure: (newFigure) => dispatch(addNewFigure(newFigure)),
    changeIsEditing: (boolean) => dispatch(isEditing(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shapes);
