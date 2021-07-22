/* Modules */
import React, { Component } from "react";
import { connect } from "react-redux";

/* Components */
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import ModalCurrentItem from "../../components/ModalCurrentItem/ModalCurrentItem";

/* Styles */
import { MainStyles } from "./Main.styles";

/* Actions */
import {
  showModalForm,
  setFormCurrentStep,
  showModalCurrentItem,
} from "../../redux/actions/mainActions";

class Main extends Component {
  state = {};

  componentDidMount() {
    this.props.showModalForm(false);
    this.props.showModalCurrentItem(false);
    this.props.setFormCurrentStep(1);
  }

  render() {
    return (
      <MainStyles>
        <Header />
        <div className="content_container">
          <Table />
        </div>
        <Modal />
        <ModalCurrentItem />
      </MainStyles>
    );
  }
}

function mapStateToProps(state) {
  const { show_modal_form } = state.main_reducers;

  return { show_modal_form };
}

Main = connect(mapStateToProps, {
  showModalForm,
  setFormCurrentStep,
  showModalCurrentItem,
})(Main);

export default Main;
