import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    button: {
        margin: "15px auto"
    },
    input: {
        display: 'none',
    },
}));

export default function Prices(props) {
    const classes = useStyles();

    const [showPrices,ChangeShowPrices] = useState(false)
    let pricesForm;

    pricesForm = [
        {
            label: "Գին 1կմ ի համար",
            name: 'withoudivriver',
            value: ''
        },
        {
            label: "Գին 1կմ ի համար վարորդով",
            name: 'withDriver',
            value: ''
        }
    ];

    let routes= [
        {
            label: "City tour in Yerevan",
            name: '',
            value: ''
        },
        {
            label: "Khor Virap-Noravank-Selim-Sevan",
            name: '',
            value: ''
        },
        {
            label: "Echmiadzin",
            name: '',
            value: ''
        },
        {
            label: "Airport",
            name: '',
            value: ''
        },
        {
            label: "Khor Virap-Noravank-Tatev",
            name: '',
            value: ''
        },
        {
            label: "Stepanakert",
            name: '',
            value: ''
        },
        {
            label: "Sevan",
            name: '',
            value: ''
        },
        {
            label: "Tsaghkadzor",
            name: '',
            value: ''
        },
        {
            label: "Khor Virap",
            name: '',
            value: ''
        },
        {
            label: "Bagratashen",
            name: '',
            value: ''
        },
        {
            label: "Ejmiatsin-Sardarapat",
            name: '',
            value: ''
        },
        {
            label: "Garni-Geghart",
            name: '',
            value: ''
        },
        {
            label: "Ashtarak-Oshakan",
            name: '',
            value: ''
        },
        {
            label: "Ashtarak-Byurakan",
            name: '',
            value: ''
        },
        {
            label: "Ashtarak-Amberd",
            name: '',
            value: ''
        },
        {
            label: "Aghveran",
            name: '',
            value: ''
        },
        {
            label: "Hankavan",
            name: '',
            value: ''
        },
        {
            label: "Sevan-Tsaghkadzor",
            name: '',
            value: ''
        },
        {
            label: "Sevan-Ayrivank-Noratus",
            name: '',
            value: ''
        },
        {
            label: "Sevan-Haghartzin",
            name: '',
            value: ''
        },
        {
            label: "Sevan-Haghartzin-Goshavank",
            name: '',
            value: ''
        },
        {
            label: "Tsapatagh",
            name: '',
            value: ''
        },
        {
            label: "Khor Virap-Noravank",
            name: '',
            value: ''
        },
        {
            label: "Khor Virap-Noravank-Jermuk",
            name: '',
            value: ''
        },
        {
            label: "Sisian",
            name: '',
            value: ''
        },
        {
            label: "Goris-Khndzoresk",
            name: '',
            value: ''
        },
        {
            label: "Kapan",
            name: '',
            value: ''
        },
        {
            label: "Megri",
            name: '',
            value: ''
        },
        {
            label: "Vanadzor",
            name: '',
            value: ''
        },
        {
            label: "Sanahin-Haghpat",
            name: '',
            value: ''
        },
        {
            label: "Bavra",
            name: '',
            value: ''
        },
        {
            label: "Tbilisi",
            name: '',
            value: ''
        },
        {
            label: "Gyumri",
            name: '',
            value: ''
        },
        {
            label: "Yenokavan",
            name: '',
            value: ''
        },
        {
            label: "Ani",
            name: '',
            value: ''
        },
        {
            label: "Oshakan-Amberd",
            name: '',
            value: ''
        },
        {
            label: "Ashtaraki Dzor",
            name: '',
            value: ''
        },
        {
            label: "Ashtarak-Saghmosavank-Ohanavank",
            name: '',
            value: ''
        },
        {
            label: "Tsaghkadzor-Sevan",
            name: '',
            value: ''
        },
        {
            label: "Tsaghkadzor-Sevan-Haghartsin",
            name: '',
            value: ''
        },
        {
            label: "Sevan-Noraduz-Haghartsin",
            name: '',
            value: ''
        },
        {
            label: "Gavar",
            name: '',
            value: ''
        },
        {
            label: "Khor Virap-Noravank-Gladzor",
            name: '',
            value: ''
        },
        {
            label: "Stepanakert (2day/1night)",
            name: '',
            value: ''
        },
        {
            label: "Kharabagh (3day/2nights)",
            name: '',
            value: ''
        },
        {
            label: "Kharabagh+Jermuk(4day/3nights)",
            name: '',
            value: ''
        },
        {
            label: "Sanahin-Haghpat-Odzun",
            name: '',
            value: ''
        },
        {
            label: "Aruch-Talin-Mastara",
            name: '',
            value: ''
        },
        {
            label: "Gyumri-Marmashen",
            name: '',
            value: ''
        },
        {
            label: "Khndzoresk",
            name: '',
            value: ''
        },
        {
            label: "Tatev",
            name: '',
            value: ''
        },
        {
            label: "Tatev-Khndzoresk",
            name: '',
            value: ''
        },
        {
            label: "Haghartsin-Dilijan-Goshavank",
            name: '',
            value: ''
        },
        {
            label: "Sevan-Dilijan-Haghpat-Sanahin-Armenian-Georgian border",
            name: '',
            value: ''
        },
        {
            label: "Parking in Airport",
            name: '',
            value: ''
        }
        
    ]
  

    return (
        <div className="Prices" style={{ textAlign: "left", width: "100%" }}>
            <div className={classes.container}>
                {pricesForm.map((pricesForm, index) => {
                    return (
                        <Grid item xs={6} key={index} >
                            <TextField
                                key={index}
                                id="standard-name"
                                label="Name"
                                value={pricesForm.value}
                                className={classes.textField}
                                label={pricesForm.label}
                                placeholder={pricesForm.label}
                                margin="normal" />
                        </Grid>
                    )
                })}
                <Grid item xs={12} >
                <Button variant="contained" color="primary" className={classes.button} onClick={()=>ChangeShowPrices(!showPrices)}>
                    Գին ըստ ֆիքսված երթուղու
                </Button>
                </Grid>
                
                    
                    {showPrices?(routes.map((route, index) => {
                        return (
                            <Grid item xs={6} key={index} >
                                <TextField
                                    key={index}
                                    id="standard-name"
                                    label="Name"
                                    className={classes.textField}
                                    label={route.label}
                                    // placeholder={route.label}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="end">AMD</InputAdornment>,
                                      }}
                                    />
                            </Grid>
                        )
                    })):null}
                
            </div>
        </div>


    )
}