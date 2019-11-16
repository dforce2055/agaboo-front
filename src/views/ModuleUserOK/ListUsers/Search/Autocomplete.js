// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import "isomorphic-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import UserController from '../../../../controllers/User';

const theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: '.2em',
            },
        },
        MuiAutocomplete: {
            loading: {
                color: 'rgba(0, 0, 0, .4)',
                
                visibility: 'hidden',
                position: 'relative',
                '&:before': {
                    visibility: 'visible',
                    position: 'absolute',
                    content: '"Buscando..."',
                },
            }
        },
    }
})




function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

export default function AsynchronousSearch(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const { usuarios } = props;
    const { setUsuarios } = props;

    const buscar = e =>  {
        console.log("Buscando...");
        let buscado = e.target.value;       

        if(buscado.length > 0) {
            UserController.searchUsersActive(buscado)
                .then(users => {
                    console.log(users);
                    setOptions(users);
                    setUsuarios(users);
                })
                .catch(error => {
                    console.log("Error al traer los usuarios => ", error);
                })
        }
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }      

        (async () => {
            await sleep(1e3);

            if (active) {
                setOptions(usuarios);
            }
        })();

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <MuiThemeProvider theme={theme}>
            <Autocomplete
                style={{ width: '100%' }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                options={options}
                getOptionLabel={option => option.nombre+' '+option.apellido+' '+option.email }
                loading={loading}
                renderInput={params => (
                    <TextField
                        onChange={buscar}
                        {...params}
                        label="Buscar usuarios"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                    />
                )}
            />
        </MuiThemeProvider>
    );
}
