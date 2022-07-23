import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import '../styles/reset.scss'

import Shapes from "../components/Shapes";
import ListOfFigures from "./ListOfFigures";
import FigureRepresentation from "./FigureRepresentation";

const Main = ({figures}) => {
    return  (
            <Grid container>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            background: '#7B809D',
                            height: '100vh',
                            padding: 1,
                        }}
                    >
                        <Shapes/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            background: '#494C5D',
                            height: '100vh',
                            padding: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <FigureRepresentation />
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            background: '#7B809D',
                            height: '100vh',
                            padding: 1,
                        }}
                    >
                        <ListOfFigures />
                    </Box>
                </Grid>
            </Grid>
    )
};

const mapStateToProps = (state) => ({
    figures: state.figures
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);