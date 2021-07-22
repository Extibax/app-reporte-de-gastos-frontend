/* Modules */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import { Table as TableAntd, Space, DatePicker } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

/* Styles */
import { FormPart2Styles } from "./FormPart2.styles";

/* Actions */
import {
  setFormPart2Completed,
  setFormCurrentStep,
  setNewRecordTable,
  showModalForm,
  setNewRecordTableEditMode,
} from "../../../redux/actions/mainActions";

/* Icons */
import { DeleteTwoTone } from "@ant-design/icons";

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

class FormPart2 extends Component {
  state = {
    form_table_completed: false,
    columns: [],
    new_record_table_state: this.props.modal_form_edit_mode
      ? this.props.new_record_table_edit_mode
      : this.props.new_record_table,
  };

  componentDidUpdate(prevProps) {
    if (!this.props.modal_form_edit_mode) {
      if (prevProps.new_record_table !== this.props.new_record_table) {
        this.setState({ new_record_table_state: this.props.new_record_table });
      }
    } else {
      if (
        prevProps.new_record_table_edit_mode !==
        this.props.new_record_table_edit_mode
      ) {
        this.setState({
          new_record_table_state: this.props.new_record_table_edit_mode,
        });
      }
    }
  }

  componentDidMount() {
    this.setState({
      columns: [
        {
          title: "Fecha",
          dataIndex: "fecha",
          key: "fecha",
        },
        {
          title: "Cuenta",
          dataIndex: "cuenta",
          key: "cuenta",
        },
        {
          title: "Descripción",
          dataIndex: "descripcion",
          key: "descripcion",
        },
        {
          title: "Total",
          key: "total",
          dataIndex: "total",
        },
        {
          title: "Acciones",
          key: "action",
          render: (items, item) => (
            <Space size="middle">
              <DeleteTwoTone
                onClick={() => this.onClickDeleteItem(items, item)}
              />
            </Space>
          ),
        },
      ],
    });
  }

  DateField = (field_props) => {
    const {
      name,
      placeholder,
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
        <DatePicker
          name={name}
          format="DD-MM-YYYY"
          placeholder={placeholder}
          className={`date_field ${className}`}
          onChange={this.onChangeDatePicker}
          value={this.props.fecha_table}
        />
        <div className="error_field_text_container">{touched ? error : ""}</div>
      </Fragment>
    );
  };

  onChangeDatePicker = (value) => {
    const moment_object = value;

    this.props.dispatch(change("form", "fecha_table", moment_object));
  };

  onClickNextStepFormPart2 = () => {
    this.props.setFormCurrentStep(3);
  };

  onClickAddToTable = () => {
    let new_record_table = [];

    new_record_table = [].concat(this.state.new_record_table_state);

    new_record_table.push({
      id: uuidv4(),
      fecha: moment(this.props.fecha_table).format("DD-MM-YYYY"),
      fecha_raw: this.props.fecha_table,
      cuenta: this.props.cuenta_table,
      descripcion: this.props.descripcion_table,
      total: this.props.total_table,
    });

    if (!this.props.modal_form_edit_mode) {
      this.props.setNewRecordTable(new_record_table);
    } else {
      this.props.setNewRecordTableEditMode(new_record_table);
    }

    this.props.dispatch(change("form", "fecha_table", ""));
    this.props.dispatch(change("form", "cuenta_table", ""));
    this.props.dispatch(change("form", "descripcion_table", ""));
    this.props.dispatch(change("form", "total_table", ""));
  };

  onClickDeleteItem = (items, item) => {
    let new_record_table = [];

    new_record_table = [].concat(this.state.new_record_table_state);

    const index = new_record_table.findIndex(function (find_index_item) {
      return find_index_item.id === item.id;
    });

    if (index !== -1) new_record_table.splice(index, 1);

    if (!this.props.modal_form_edit_mode) {
      this.props.setNewRecordTable(new_record_table);
    } else {
      this.props.setNewRecordTableEditMode(new_record_table);
    }
  };

  onBack = () => {
    if (this.props.form_current_step > 1) {
      this.props.setFormCurrentStep(this.props.form_current_step - 1);
    }
  };

  render() {
    return (
      <FormPart2Styles>
        <div className="form_container">
          <div className="fields_group">
            <div className="field_container">
              <Field
                name="fecha_table"
                placeholder="Fecha"
                component={this.DateField}
              />
            </div>
            <div className="field_container">
              <Field
                name="cuenta_table"
                type="text"
                placeholder="Cuenta"
                component={BasicField}
              />
            </div>
          </div>
          <div className="fields_group">
            <div className="field_container">
              <Field
                name="descripcion_table"
                type="text"
                placeholder="Descripción"
                component={BasicField}
              />
            </div>
            <div className="field_container">
              <Field
                name="total_table"
                type="text"
                placeholder="Total"
                component={BasicField}
              />
            </div>
          </div>
          <button
            className="form_button add_button"
            disabled={
              !this.props.fecha_table ||
              !this.props.cuenta_table ||
              !this.props.descripcion_table ||
              !this.props.total_table
            }
            onClick={this.onClickAddToTable}
          >
            Agregar
          </button>
          <TableAntd
            columns={this.state.columns}
            dataSource={this.state.new_record_table_state}
            pagination={{ pageSize: 3 }}
          />
          <button
            className="form_button"
            disabled={!this.props.form_part_1_completed}
            onClick={this.onClickNextStepFormPart2}
          >
            Siguiente Paso
          </button>
          <button className="form_button outline" onClick={this.onBack}>
            Atrás
          </button>
        </div>
      </FormPart2Styles>
    );
  }
}

function validate(values, props) {
  const errors = {};

  const required_fields = [];

  required_fields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Campo requerido";
    }
  });

  if (Object.entries(errors).length === 0 && errors.constructor === Object) {
    props.setFormPart2Completed(true);
  } else {
    props.setFormPart2Completed(false);
  }

  return errors;
}

const FormSelector = formValueSelector("form");

FormPart2 = reduxForm({
  form: "form",
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
})(FormPart2);

function mapStateToProps(state) {
  const {
    form_part_1_completed,
    form_part_2_completed,
    form_current_step,
    new_record_table,
    new_record_table_edit_mode,
    modal_form_edit_mode,
  } = state.main_reducers;

  return {
    form_part_1_completed,
    form_part_2_completed,
    form_current_step,
    new_record_table,
    new_record_table_edit_mode,
    modal_form_edit_mode,
    fecha_table: FormSelector(state, "fecha_table"),
    cuenta_table: FormSelector(state, "cuenta_table"),
    descripcion_table: FormSelector(state, "descripcion_table"),
    total_table: FormSelector(state, "total_table"),
  };
}

FormPart2 = connect(mapStateToProps, {
  setFormPart2Completed,
  setFormCurrentStep,
  setNewRecordTable,
  showModalForm,
  setNewRecordTableEditMode,
})(FormPart2);

export default FormPart2;
