/* Modules */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, reset } from "redux-form";
import axios from "axios";
import moment from "moment";

/* Styles */
import { FormPart3Styles } from "./FormPart3.styles";

/* Actions */
import {
  setFormPart3Completed,
  setFormCurrentStep,
  showModalForm,
  setMainTableData,
  setNewRecordTable,
} from "../../../redux/actions/mainActions";

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

class FormPart3 extends Component {
  state = {};

  onClickNextStepFormPart3 = async () => {
    const {
      concepto,
      fecha,
      nombre,
      posicion,
      departamento,
      supervisor,
      new_record_table,
      aprobado_por,
      firma,
    } = this.props;

    const new_record_obj = {
      concepto,
      fecha_desde: moment(fecha[0]).format("DD-MM-YYYY"),
      fecha_desde_raw: fecha[0],
      fecha_hasta: moment(fecha[1]).format("DD-MM-YYYY"),
      fecha_hasta_raw: fecha[1],
      nombre,
      posicion,
      departamento,
      supervisor,
      gastos: new_record_table,
      aprobado_por,
      firma,
    };

    console.log("new_record_obj:", new_record_obj);

    if (!this.props.modal_form_edit_mode) {
      const insert_record_res_raw = await axios.post(
        "http://localhost:3001/api/reporte/insert-reporte",
        new_record_obj
      );

      if (insert_record_res_raw) {
        const insert_record_res = insert_record_res_raw.data;

        console.log("insert_record_res:", insert_record_res);

        const get_records_res_raw = await axios.get(
          "http://localhost:3001/api/reporte/get-reportes"
        );

        if (get_records_res_raw) {
          const get_records_res = get_records_res_raw.data;

          console.log("get_records:", get_records_res);

          this.props.setMainTableData(get_records_res);
        }
      }
    } else {
      new_record_obj.id = this.props.current_item_selected._id;
      new_record_obj.gastos = this.props.new_record_table_edit_mode;

      const insert_record_res_raw = await axios.put(
        "http://localhost:3001/api/reporte/update-reporte",
        new_record_obj
      );

      if (insert_record_res_raw) {
        const insert_record_res = insert_record_res_raw.data;

        console.log("insert_record_res:", insert_record_res);

        const get_records_res_raw = await axios.get(
          "http://localhost:3001/api/reporte/get-reportes"
        );

        if (get_records_res_raw) {
          const get_records_res = get_records_res_raw.data;

          console.log("get_records:", get_records_res);

          this.props.setMainTableData(get_records_res);
        }
      }
    }

    this.props.dispatch(reset("form"));
    this.props.setNewRecordTable([]);
    this.props.setFormCurrentStep(3);
    this.props.setFormCurrentStep(1);
    this.props.showModalForm(false);
  };

  onBack = () => {
    if (this.props.form_current_step > 1) {
      this.props.setFormCurrentStep(this.props.form_current_step - 1);
    }
  };

  render() {
    return (
      <FormPart3Styles>
        <div className="form_container">
          <div className="field_container">
            <Field
              name="aprobado_por"
              type="text"
              placeholder="Aprobado Por"
              component={BasicField}
            />
          </div>
          <div className="field_container">
            <Field
              name="firma"
              type="text"
              placeholder="Firma"
              component={BasicField}
            />
          </div>
          <button
            className="form_button"
            disabled={!this.props.form_part_3_completed}
            onClick={this.onClickNextStepFormPart3}
          >
            {!this.props.modal_form_edit_mode ? "Finalizar" : "Guardar Cambios"}
          </button>
          <button className="form_button outline" onClick={this.onBack}>
            Atrás
          </button>
        </div>
      </FormPart3Styles>
    );
  }
}

function validate(values, props) {
  const errors = {};

  const required_fields = ["aprobado_por", "firma"];

  required_fields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Campo requerido";
    }
  });

  if (Object.entries(errors).length === 0 && errors.constructor === Object) {
    props.setFormPart3Completed(true);
  } else {
    props.setFormPart3Completed(false);
  }

  return errors;
}

const FormSelector = formValueSelector("form");

FormPart3 = reduxForm({
  form: "form",
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
})(FormPart3);

function mapStateToProps(state) {
  const {
    form_part_3_completed,
    form_current_step,
    new_record_table,
    modal_form_edit_mode,
    current_item_selected,
    new_record_table_edit_mode,
  } = state.main_reducers;

  return {
    form_part_3_completed,
    form_current_step,
    new_record_table,
    modal_form_edit_mode,
    current_item_selected,
    new_record_table_edit_mode,
    concepto: FormSelector(state, "concepto"),
    fecha: FormSelector(state, "fecha"),
    nombre: FormSelector(state, "nombre"),
    posicion: FormSelector(state, "posicion"),
    departamento: FormSelector(state, "departamento"),
    supervisor: FormSelector(state, "supervisor"),
    aprobado_por: FormSelector(state, "aprobado_por"),
    firma: FormSelector(state, "firma"),
  };
}

FormPart3 = connect(mapStateToProps, {
  setFormPart3Completed,
  setFormCurrentStep,
  showModalForm,
  setMainTableData,
  setNewRecordTable,
})(FormPart3);

export default FormPart3;
