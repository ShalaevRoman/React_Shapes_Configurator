import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import store from "../src/redux/store";

import './App.css';
import Main from '../src/container/Main';

function App() {
    const mainTheme = createTheme({
        palette: {
            primary: {
                main: '#f5f5f5',
            },
            secondary: {
                main: '#f8f9fc',
            },
        },
    });
  return (
      <Provider store={store}>
          <ThemeProvider theme={mainTheme}>
              <Main />
          </ThemeProvider>
      </Provider>
  );
}

export default App;



