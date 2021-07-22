/* Modules */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import { DatePicker } from "antd";
import moment from "moment";

/* Actions */
import {
  setFormPart1Completed,
  setFormCurrentStep,
  setNewRecordTableEditMode,
} from "../../../redux/actions/mainActions";

/* Consts */
const { RangePicker } = DatePicker;

function BasicField(props) {
  const {
    name,
    type,
    placeholder,
    input,
    meta: { touched, error, valid, active },
  } = props;
  const className =
    touched && error
      ? "error_field_styles"
      : valid && !active
      ? "success_field_styles"
      : null;

  return (
    <Fragment>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`basic_field ${className}`}
        {...input}
      />
      <div className="error_field_text_container">{touched ? error : ""}</div>
    </Fragment>
  );
}

class FormPart1 extends Component {
  state = {};

  componentDidMount() {
    if (this.props.modal_form_edit_mode) {
      const { current_item_selected } = this.props;

      this.props.dispatch(
        change("form", "concepto", current_item_selected.concepto)
      );
      const fecha_array = [
        moment(current_item_selected.fecha_desde_raw),
        moment(current_item_selected.fecha_hasta_raw),
      ];
      console.log("fecha_array:", fecha_array);
      this.props.dispatch(change("form", "fecha", fecha_array));
      console.log("fecha dispatched:", this.props.fecha);
      this.props.dispatch(
        change("form", "nombre", current_item_selected.nombre)
      );
      this.props.dispatch(
        change("form", "posicion", current_item_selected.posicion)
      );
      this.props.dispatch(
        change("form", "departamento", current_item_selected.departamento)
      );
      this.props.dispatch(
        change("form", "supervisor", current_item_selected.supervisor)
      );
      this.props.dispatch(
        change("form", "concepto", current_item_selected.concepto)
      );
      this.props.dispatch(
        change("form", "aprobado_por", current_item_selected.aprobado_por)
      );
      this.props.dispatch(change("form", "firma", current_item_selected.firma));
      this.props.setNewRecordTableEditMode(current_item_selected.gastos);
    }
  }

  onClickNextStepFormPart1 = () => {
    this.props.setFormCurrentStep(2);
  };

  DateField = (field_props) => {
    const {
      name,
      meta: { touched, error, valid, active },
    } = field_props;
    const className =
      touched && error
        ? "error_field_styles"
        : valid && !active
        ? "success_field_styles"
        : null;

    return (
      <Fragment>
        <RangePicker
          name={name}
          format="DD-MM-YYYY"
          placeholder={["Desde", "Hasta"]}
          className={`date_field ${className}`}
          onChange={this.onChangeDatePicker}
          value={this.props.fecha}
        />
        <div className="error_field_text_container">{touched ? error : ""}</div>
      </Fragment>
    );
  };

  onChangeDatePicker = (value) => {
    const moment_object = value;

    this.props.dispatch(change("form", "fecha", moment_object));
  };

  render() {
    return (
      <div className="form_container">
        <div className="field_container">
          <Field
            name="concepto"
            type="text"
            placeholder="Concepto"
            component={BasicField}
          />
        </div>
        <div className="field_container">
          <Field name="fecha" placeholder="Fecha" component={this.DateField} />
        </div>
        <div className="field_container">
          <Field
            name="nombre"
            type="text"
            placeholder="Nombre"
            component={BasicField}
          />
        </div>
        <div className="field_container">
          <Field
            name="posicion"
            type="text"
            placeholder="Posicion"
            component={BasicField}
          />
        </div>
        <div className="field_container">
          <Field
            name="departamento"
            type="text"
            placeholder="Departamento"
            component={BasicField}
          />
        </div>
        <div className="field_container">
          <Field
            name="supervisor"
            type="text"
            placeholder="Supervisor"
            component={BasicField}
          />
        </div>
        <button
          className="form_button"
          disabled={!this.props.form_part_1_completed}
          onClick={this.onClickNextStepFormPart1}
        >
          Siguiente Paso
        </button>
      </div>
    );
  }
}

function validate(values, props) {
  const errors = {};
  const { concepto, fecha, nombre, posicion, departamento, supervisor } =
    values;

  const required_fields = [
    "concepto",
    "fecha",
    "nombre",
    "posicion",
    "departamento",
    "supervisor",
  ];

  required_fields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Campo requerido";
    }
  });

  if (Object.entries(errors).length === 0 && errors.constructor === Object) {
    props.setFormPart1Completed(true);
  } else {
    props.setFormPart1Completed(false);
  }

  return errors;
}

const FormSelector = formValueSelector("form");

FormPart1 = reduxForm({
  form: "form",
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
})(FormPart1);

function mapStateToProps(state) {
  const { form_part_1_completed, modal_form_edit_mode, current_item_selected } =
    state.main_reducers;

  return {
    form_part_1_completed,
    modal_form_edit_mode,
    current_item_selected,
    fecha: FormSelector(state, "fecha"),
  };
}

FormPart1 = connect(mapStateToProps, {
  setFormPart1Completed,
  setFormCurrentStep,
  setNewRecordTableEditMode,
})(FormPart1);

export default FormPart1;
