/* Modules */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Table as TableAntd, Space } from "antd";
import { reduxForm, formValueSelector, change } from "redux-form";
import axios from "axios";
import moment from "moment";

/* Icons */
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

/* Actions */
import {
  setMainTableData,
  setCurrentItemSelected,
  showModalCurrentItem,
  setModalFormEditMode,
  showModalForm,
  setFormCurrentStep,
  setNewRecordTableEditMode,
} from "../../redux/actions/mainActions";

/* Icons */
import { BookTwoTone } from "@ant-design/icons";

class Table extends Component {
  state = { columns: [], main_table_data_state: this.props.main_table_data };

  componentDidUpdate(prevProps) {
    if (prevProps.main_table_data !== this.props.main_table_data) {
      this.setState({ main_table_data_state: this.props.main_table_data });
    }
  }

  async componentDidMount() {
    this.setState({
      columns: [
        {
          title: "Concepto",
          dataIndex: "concepto",
          key: "concepto",
          sorter: (a, b) => {
            return a.concepto.length - b.concepto.length;
          },
        },
        {
          title: "Fecha Desde",
          dataIndex: "fecha_desde",
          key: "fecha_desde",
        },
        {
          title: "Fecha Hasta",
          dataIndex: "fecha_hasta",
          key: "fecha_hasta",
        },
        {
          title: "Nombre",
          dataIndex: "nombre",
          key: "nombre",
          sorter: (a, b) => {
            return a.nombre.length - b.nombre.length;
          },
        },
        {
          title: "Posición",
          key: "posicion",
          dataIndex: "posicion",
          sorter: (a, b) => {
            return a.posicion.length - b.posicion.length;
          },
        },
        {
          title: "Departamento",
          key: "departamento",
          dataIndex: "departamento",
          sorter: (a, b) => {
            return a.departamento.length - b.departamento.length;
          },
        },
        {
          title: "Supervisor",
          key: "supervisor",
          dataIndex: "supervisor",
          sorter: (a, b) => {
            return a.supervisor.length - b.supervisor.length;
          },
        },
        {
          title: "Gastos",
          key: "gastos",
          dataIndex: "gastos",
          render: (items, item) => (
            <Space>
              <BookTwoTone onClick={() => this.onClickBook(items, item)} />
            </Space>
          ),
        },
        {
          title: "Monto a Cancelar",
          key: "monto_a_cancelar",
          dataIndex: "monto_a_cancelar",
          render: (items, item) => {
            let total = 0;

            item.gastos.forEach((gasto) => {
              if (gasto.total) {
                let gasto_total = gasto.total;

                let gasto_parsed = parseFloat(gasto_total.replace(/,/g, ""));

                total += gasto_parsed;
              }
            });

            return total;
          },
          sorter: (a, b) => {
            let a_total = 0;
            let b_total = 0;

            a.gastos.forEach((gasto) => {
              if (gasto.total) {
                let gasto_total = gasto.total;

                let gasto_parsed = parseFloat(gasto_total.replace(/,/g, ""));

                a_total += gasto_parsed;
              }
            });

            b.gastos.forEach((gasto) => {
              if (gasto.total) {
                let gasto_total = gasto.total;

                let gasto_parsed = parseFloat(gasto_total.replace(/,/g, ""));

                b_total += gasto_parsed;
              }
            });

            return a_total - b_total;
          },
        },
        {
          title: "Aprobado Por",
          key: "aprobado_por",
          dataIndex: "aprobado_por",
          sorter: (a, b) => {
            return a.aprobado_por.length - b.aprobado_por.length;
          },
        },
        {
          title: "Firma",
          key: "firma",
          dataIndex: "firma",
        },
        {
          title: "Acciones",
          key: "acciones",
          render: (items, item) => (
            <Space size="large">
              <EditTwoTone onClick={() => this.onClickEditItem(items, item)} />
              <DeleteTwoTone
                onClick={() => this.onClickDeleteItem(items, item)}
              />
            </Space>
          ),
        },
      ],
    });

    const main_table_data_respose_raw = await axios.get(
      "http://localhost:3001/api/reporte/get-reportes"
    );

    if (main_table_data_respose_raw) {
      const main_table_data_respose = main_table_data_respose_raw.data;

      console.log("data_main_table:", main_table_data_respose);

      this.props.setMainTableData(main_table_data_respose);
      this.setState({
        main_table_data_state: main_table_data_respose,
      });
    }
  }

  onClickBook = (items, item) => {
    console.log("onClickBook items:", items);
    console.log("onClickBook item:", item);
    this.props.setCurrentItemSelected(item);
    this.props.showModalCurrentItem(true);
  };

  onClickEditItem = (items, item) => {
    this.props.setCurrentItemSelected(item);

    this.props.dispatch(change("form", "concepto", item.concepto));
    const fecha_array = [
      moment(item.fecha_desde_raw),
      moment(item.fecha_hasta_raw),
    ];
    console.log("fecha_array:", fecha_array);
    this.props.dispatch(change("form", "fecha", fecha_array));
    console.log("fecha dispatched:", this.props.fecha);
    this.props.dispatch(change("form", "nombre", item.nombre));
    this.props.dispatch(change("form", "posicion", item.posicion));
    this.props.dispatch(change("form", "departamento", item.departamento));
    this.props.dispatch(change("form", "supervisor", item.supervisor));
    this.props.dispatch(change("form", "concepto", item.concepto));
    this.props.dispatch(change("form", "aprobado_por", item.aprobado_por));
    this.props.dispatch(change("form", "firma", item.firma));
    this.props.setNewRecordTableEditMode(item.gastos);

    this.props.setFormCurrentStep(1);

    this.props.setModalFormEditMode(true);
    this.props.showModalForm(true);
  };

  onClickDeleteItem = async (items, item) => {
    console.log("onClickDeleteItem item:", item);

    const delete_record_res = await axios.delete(
      "http://localhost:3001/api/reporte/delete-reporte",
      { data: { id: item._id } }
    );

    if (delete_record_res) {
      console.log("delete_record_res:", delete_record_res);

      const main_table_data_respose_raw = await axios.get(
        "http://localhost:3001/api/reporte/get-reportes"
      );

      if (main_table_data_respose_raw) {
        const main_table_data_respose = main_table_data_respose_raw.data;

        console.log("data_main_table:", main_table_data_respose);

        this.props.setMainTableData(main_table_data_respose);
      }
    }
  };

  render() {
    return (
      <TableAntd
        columns={this.state.columns}
        dataSource={this.state.main_table_data_state}
        pagination={{ pageSize: 6 }}
      />
    );
  }
}

const FormSelector = formValueSelector("form");

Table = reduxForm({
  form: "form",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
})(Table);

function mapStateToProps(state) {
  const { main_table_data, current_item_selected } = state.main_reducers;

  return {
    main_table_data,
    current_item_selected,
    fecha: FormSelector(state, "fecha"),
  };
}

Table = connect(mapStateToProps, {
  setMainTableData,
  setCurrentItemSelected,
  showModalCurrentItem,
  setModalFormEditMode,
  showModalForm,
  setFormCurrentStep,
  setNewRecordTableEditMode,
})(Table);

export default Table;
