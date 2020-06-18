import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  let { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const switchHandler = () => {
    dispatch({
      type: "CHANGE",
      val: !value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  //TODO Add Switch Input element
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        className={`input_field_default ${props.inputClass}`}
        autoFocus={props.autoFocus === "true" ? "autoFocus" : null}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        disabled={
          props.disabled === "true" && props.inputClass === "disabled"
            ? "disabled"
            : null
        }
      />
    ) : (
      props.element === "textarea" && (
        <textarea
          id={props.id}
          className={`input_field_default text-area ${props.textAreaClass}`}
          autoFocus={props.autofocus === "true" ? "autoFocus" : null}
          rows={props.rows || 3}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          disabled={
            props.disabled === "true" && props.textAreaClass === "disabled"
              ? "disabled"
              : null
          }
        />
      )
    );

  if (props.element === "switch") {
    return (
      <div className="switch_setting_container">
        <div>
          <label className={`settings_label ${props.labelClass}`}>
            {props.label}
          </label>
          <p
            className={`default_description_text align-left _10px_margin_bottom ${props.descriptionClass}`}
          >
            {props.description}
          </p>
        </div>
        <input
          id={props.id}
          type="checkbox"
          className="react-switch-checkbox"
          checked={inputState.value}
          onChange={switchHandler}
          value={inputState.value}
        />
        <label
          style={{ background: inputState.value && props.onColor }}
          className="react-switch-label"
          htmlFor={props.id}
        >
          <span className={`react-switch-button`} />
        </label>
        {!inputState.isValid && inputState.isTouched && (
          <p>{props.errorText}</p>
        )}
      </div>
    );
  } else if (props.element === "respond") {
    return (
      <>
        <input
          id={props.id}
          type={props.type}
          className={`input_field_default ${props.inputClass}`}
          autoFocus={props.autoFocus === "true" ? "autoFocus" : null}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          disabled={
            props.disabled === "true" && props.inputClass === "disabled"
              ? "disabled"
              : null
          }
        />
        {/* TODO Resolve error text for review responses */}
        {/* {!inputState.isValid && inputState.isTouched && (
          <p>{props.errorText}</p>
        )} */}
      </>
    );
  } else {
    return (
      <div className={`settings_toggles ${props.togglesClass}`}>
        <label
          htmlFor={props.id}
          className={`settings_label ${props.labelClass}`}
        >
          {props.label}
        </label>
        <p
          className={`default_description_text align-left _10px_margin_bottom ${props.descriptionClass}`}
        >
          {props.description}
        </p>
        {element}
        {!inputState.isValid && inputState.isTouched && (
          <p className="error_text">{props.errorText}</p>
        )}
        {/* TODO update error text styling */}
      </div>
    );
  }
};

export default Input;
