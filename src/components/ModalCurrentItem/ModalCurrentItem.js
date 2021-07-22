/* Modules */
import React, { Component, Fragment } from "react";
import { Modal as ModalAntd, Table } from "antd";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, change, reset } from "redux-form";

/* Styles */
import "./ModalCurrentItem.css";
import "../Forms/Forms.css";
import { ModalCurrentItemStyles } from "./ModalCurrentItem.styles";

/* Actions */
import {
  showModalCurrentItem,
  setFormPart1Completed,
  setFormCurrentStep,
} from "../../redux/actions/mainActions";

class ModalCurrentItem extends Component {
  state = {
    columns: [],
  };

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
      ],
    });
  }

  handleOk = () => {
    this.props.showModalCurrentItem(false);
  };

  handleCancel = () => {
    this.props.showModalCurrentItem(false);
  };

  render() {
    return (
      <ModalAntd
        visible={this.props.show_modal_current_item}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={false}
      >
        <ModalCurrentItemStyles>
          <Table
            columns={this.state.columns}
            dataSource={this.props.current_item_selected.gastos}
          />
        </ModalCurrentItemStyles>
      </ModalAntd>
    );
  }
}

function mapStateToProps(state) {
  const {
    show_modal_current_item,
    form_part_1_completed,
    form_current_step,
    current_item_selected,
  } = state.main_reducers;

  return {
    show_modal_current_item,
    form_part_1_completed,
    form_current_step,
    current_item_selected,
  };
}

ModalCurrentItem = connect(mapStateToProps, {
  showModalCurrentItem,
  setFormPart1Completed,
  setFormCurrentStep,
})(ModalCurrentItem);

export default ModalCurrentItem;
