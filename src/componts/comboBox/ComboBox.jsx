import React, { useEffect } from "react";
import clsx from "clsx";
import Select from "react-select";
import { emphasize, makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";

import { FixedSizeList as List } from "react-window";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "auto",
    minWidth: 290
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  }
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const height = 35;
const MenuList = function MenuList(props) {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  if (!children.length) {
    return <div className="myClassListName">{children}</div>;
  }

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  MenuList
};

export default function ComboBox(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);
  //   const [multi, setMulti] = React.useState(null);
  let { handleChange, index, carType, input } = props;

  let suggestions = props.options.map((suggestion, index) => ({
    value: suggestion.id || index,
    label: suggestion.label
  }));

  function handleChangeSingle(value) {
    console.log(value);
    setSingle(value);
  }

  useEffect(() => {
    if (carType != input) {
      setSingle(null);
      input.isValid = false;
      input.value = "";
      input.checkBoxLabel = "";
    }
  }, [carType.value]);

  //   function handleChangeMulti(value) {
  //     setMulti(value);
  //   }

  //   console.log(single);

  useEffect(() => {
    console.log(input);
  });
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: "Country",
            InputLabelProps: {
              htmlFor: "react-select-single",
              shrink: true
            }
          }}
          placeholder="Search a country (start with a)"
          options={suggestions}
          components={components}
          value={single}
          onChange={handleChange(handleChangeSingle)}
        />
        {/* <div className={classes.divider} />
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-multiple"
          TextFieldProps={{
            label: 'Countries',
            InputLabelProps: {
              htmlFor: 'react-select-multiple',
              shrink: true,
            },
          }}
          placeholder="Select multiple countries"
          options={suggestions}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          isMulti
        /> */}
      </NoSsr>
    </div>
  );
}
