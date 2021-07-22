/* Modules */
import React, { Component, Fragment } from "react";
import { PageHeader, Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

/* Actions */
import {
  showModalForm,
  setFormCurrentStep,
  setModalFormEditMode,
} from "../../redux/actions/mainActions";

/* Styles */
import { HeaderStyles } from "./Header.styles";

class Header extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.onClickAddRecord = this.onClickAddRecord.bind(this);
  }

  onClickAddRecord() {
    this.props.showModalForm(true);
    this.props.setFormCurrentStep(1);
    this.props.setModalFormEditMode(false);
  }

  renderButton = () => {
    if (this.props.history.location.pathname === "/") {
      return (
        <Button
          key="1"
          type="primary"
          onClick={this.onClickAddRecord}
          className="header_button black"
        >
          Agregar Registro
        </Button>
      );
    } else return <Fragment />;
  };

  render() {
    return (
      <HeaderStyles>
        <div className="header_wrapper">
          <PageHeader
            ghost={false}
            onBack={false}
            title="REPORTE DE GASTOS"
            extra={[<this.renderButton />]}
          ></PageHeader>
        </div>
      </HeaderStyles>
    );
  }
}

function mapStateToProps(state) {
  const { show_modal_form } = state.main_reducers;

  return {
    show_modal_form,
  };
}

Header = connect(mapStateToProps, {
  showModalForm,
  setFormCurrentStep,
  setModalFormEditMode,
})(Header);

export default withRouter(Header);
