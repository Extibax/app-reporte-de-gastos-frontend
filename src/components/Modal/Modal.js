/* Modules */
import React, { Component } from "react";
import { Modal as ModalAntd } from "antd";
import { connect } from "react-redux";

/* Styles */
import "./Modal.css";
import "../Forms/Forms.css";
import { ModalStyles } from "./Modal.styles";
import { FormsStyles } from "../Forms/Forms.styles";

/* Actions */
import {
  showModalForm,
  setFormPart1Completed,
  setFormCurrentStep,
} from "../../redux/actions/mainActions";

/* Components */
import FormPart1 from "../Forms/FormPart1/FormPart1";
import FormPart2 from "../Forms/FormPart2/FormPart2";
import FormPart3 from "../Forms/FormPart3/FormPart3";

class Modal extends Component {
  handleOk = () => {
    this.props.showModalForm(false);
  };

  handleCancel = () => {
    this.props.showModalForm(false);
  };

  render() {
    return (
      <ModalAntd
        visible={this.props.show_modal_form}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={false}
      >
        <ModalStyles>
          <FormsStyles>
            {this.props.form_current_step === 1 && <FormPart1 />}
            {this.props.form_current_step === 2 && <FormPart2 />}
            {this.props.form_current_step === 3 && <FormPart3 />}
          </FormsStyles>
        </ModalStyles>
      </ModalAntd>
    );
  }
}

function mapStateToProps(state) {
  const { show_modal_form, form_part_1_completed, form_current_step } =
    state.main_reducers;

  return {
    show_modal_form,
    form_part_1_completed,
    form_current_step,
  };
}

Modal = connect(mapStateToProps, {
  showModalForm,
  setFormPart1Completed,
  setFormCurrentStep,
})(Modal);

export default Modal;
