import React,{useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import UserContext from '../../contextBigForm';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "90%",
    },
    button: {
            margin: 35,
    },
    input: {
        display: 'none',
    },
}));

export default function Prices(props) {
    const classes = useStyles();
    
    let formObject = useContext(UserContext)[0];
    let changeFormObject = useContext(UserContext)[1];

    const [showPrices,ChangeShowPrices] = useState(false);
    let pricesForm;

    pricesForm = [
        {
            label: "Գին 1կմ ի համար",
            name: 'withoudivriver',
             
        },
        {
            label: "Գին 1կմ ի համար վարորդով",
            name: 'withDriver',
             
        }
    ];


    let routes= [
        {
            label: "City tour in Yerevan",
            name: '',
             
        },
        {
            label: "Khor Virap-Noravank-Selim-Sevan",
            name: '',
             
        },
        {
            label: "Echmiadzin",
            name: '',
             
        },
        {
            label: "Airport",
            name: '',
             
        },
        {
            label: "Khor Virap-Noravank-Tatev",
            name: '',
             
        },
        {
            label: "Stepanakert",
            name: '',
             
        },
        {
            label: "Sevan",
            name: '',
             
        },
        {
            label: "Tsaghkadzor",
            name: '',
             
        },
        {
            label: "Khor Virap",
            name: '',
             
        },
        {
            label: "Bagratashen",
            name: '',
             
        },
        {
            label: "Ejmiatsin-Sardarapat",
            name: '',
             
        },
        {
            label: "Garni-Geghart",
            name: '',
             
        },
        {
            label: "Ashtarak-Oshakan",
            name: '',
             
        },
        {
            label: "Ashtarak-Byurakan",
            name: '',
             
        },
        {
            label: "Ashtarak-Amberd",
            name: '',
             
        },
        {
            label: "Aghveran",
            name: '',
             
        },
        {
            label: "Hankavan",
            name: '',
             
        },
        {
            label: "Sevan-Tsaghkadzor",
            name: '',
             
        },
        {
            label: "Sevan-Ayrivank-Noratus",
            name: '',
             
        },
        {
            label: "Sevan-Haghartzin",
            name: '',
             
        },
        {
            label: "Sevan-Haghartzin-Goshavank",
            name: '',
             
        },
        {
            label: "Tsapatagh",
            name: '',
             
        },
        {
            label: "Khor Virap-Noravank",
            name: '',
             
        },
        {
            label: "Khor Virap-Noravank-Jermuk",
            name: '',
             
        },
        {
            label: "Sisian",
            name: '',
             
        },
        {
            label: "Goris-Khndzoresk",
            name: '',
             
        },
        {
            label: "Kapan",
            name: '',
             
        },
        {
            label: "Megri",
            name: '',
             
        },
        {
            label: "Vanadzor",
            name: '',
             
        },
        {
            label: "Sanahin-Haghpat",
            name: '',
             
        },
        {
            label: "Bavra",
            name: '',
             
        },
        {
            label: "Tbilisi",
            name: '',
             
        },
        {
            label: "Gyumri",
            name: '',
             
        },
        {
            label: "Yenokavan",
            name: '',
             
        },
        {
            label: "Ani",
            name: '',
             
        },
        {
            label: "Oshakan-Amberd",
            name: '',
             
        },
        {
            label: "Ashtaraki Dzor",
            name: '',
             
        },
        {
            label: "Ashtarak-Saghmosavank-Ohanavank",
            name: '',
             
        },
        {
            label: "Tsaghkadzor-Sevan",
            name: '',
             
        },
        {
            label: "Tsaghkadzor-Sevan-Haghartsin",
            name: '',
             
        },
        {
            label: "Sevan-Noraduz-Haghartsin",
            name: '',
             
        },
        {
            label: "Gavar",
            name: '',
             
        },
        {
            label: "Khor Virap-Noravank-Gladzor",
            name: '',
             
        },
        {
            label: "Stepanakert (2day/1night)",
            name: '',
             
        },
        {
            label: "Kharabagh (3day/2nights)",
            name: '',
             
        },
        {
            label: "Kharabagh+Jermuk(4day/3nights)",
            name: '',
             
        },
        {
            label: "Sanahin-Haghpat-Odzun",
            name: '',
             
        },
        {
            label: "Aruch-Talin-Mastara",
            name: '',
             
        },
        {
            label: "Gyumri-Marmashen",
            name: '',
             
        },
        {
            label: "Khndzoresk",
            name: '',
             
        },
        {
            label: "Tatev",
            name: '',
             
        },
        {
            label: "Tatev-Khndzoresk",
            name: '',
             
        },
        {
            label: "Haghartsin-Dilijan-Goshavank",
            name: '',
             
        },
        {
            label: "Sevan-Dilijan-Haghpat-Sanahin-Armenian-Georgian border",
            name: '',
             
        },
        {
            label: "Parking in Airport",
            name: '',
             
        }
        
    ]
  

    
    const  addingCarPrices = input=> event=>{


        input.value = event.target.value;
        
    }

    return (
        <div className="Prices" style={{ textAlign: "left", width: "100%" }}>
            
            {formObject.cars.map((car, index) => {
                console.log(car)
                if(car.value >= 1 ){
                    return <div>car available</div>
                }else{
                   return  null
                }
                  
            })}
            {/* <CustomizedSnackbars type='error' massage='it should be minimum one price exist'></CustomizedSnackbars> */}
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
                                
                                onChange={addingCarPrices(pricesForm)}
                                placeholder={pricesForm.label}
                                margin="normal" />
                        </Grid>
                    )
                })}
                <Grid item xs={12} >
                 
                <Button variant="outlined" color="primary" className={classes.button} onClick={()=>ChangeShowPrices(!showPrices)}>
                    Գին ըստ ֆիքսված երթուղու
                </Button>
                </Grid>
                
                    
                    {showPrices?(routes.map((route, index) => {
                        return (
                            <Grid item xs={6} key={index} >
                                <TextField
                                    
                                    id="standard-name"
                                    label="Name"
                                    className={classes.textField}
                                    label={route.label}
                                    placeholder={route.label}
                                    margin="normal"
                                    value = {route.value}
                                    onChange={addingCarPrices(route)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">AMD</InputAdornment>,
                                    }}
                                    />
                            </Grid>
                        )
                    })):null}
                
            </div>
        </div>


    )
}