import { createTheme } from '@mui/material/styles';
// import { orange } from '@mui/material/colors';


const Theme1 = createTheme({
    palette:{
        secondary: {
            main: "rgba(230, 0, 255, 0.45)"
        },
        mode: 'light'
    }
})

const Theme2 = createTheme({
    palette:{
        secondary: {
            main: "#f50057"
        },
        mode: 'dark'
    }
})
export default Theme1;
export {Theme2};
