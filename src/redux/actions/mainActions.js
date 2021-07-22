import {
  SHOW_MODAL_FORM,
  FORM_PART_1_COMPLETED,
  FORM_PART_2_COMPLETED,
  FORM_PART_3_COMPLETED,
  FORM_CURRENT_STEP,
  MAIN_TABLE_DATA,
  CURRENT_ITEM_SELECTED,
  SHOW_MODAL_CURRENT_ITEM,
  MODAL_FORM_EDIT_MODE,
  NEW_RECORD_TABLE,
  NEW_RECORD_TABLE_EDIT_MODE,
  FECHA_DESDE_OBJ,
  FECHA_HASTA_OBJ,
} from "./types";

export const showModalForm = (show_modal_form) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL_FORM,
    payload: show_modal_form,
  });
};

export const setModalFormEditMode = (modal_form_edit_mode) => (dispatch) => {
  dispatch({
    type: MODAL_FORM_EDIT_MODE,
    payload: modal_form_edit_mode,
  });
};

export const setFormPart1Completed = (form_part_1_completed) => (dispatch) => {
  dispatch({
    type: FORM_PART_1_COMPLETED,
    payload: form_part_1_completed,
  });
};
export const setFormPart2Completed = (form_part_2_completed) => (dispatch) => {
  dispatch({
    type: FORM_PART_2_COMPLETED,
    payload: form_part_2_completed,
  });
};
export const setFormPart3Completed = (form_part_3_completed) => (dispatch) => {
  dispatch({
    type: FORM_PART_3_COMPLETED,
    payload: form_part_3_completed,
  });
};

export const setFormCurrentStep = (form_current_step) => (dispatch) => {
  dispatch({
    type: FORM_CURRENT_STEP,
    payload: form_current_step,
  });
};

export const setMainTableData = (main_table_data) => (dispatch) => {
  dispatch({
    type: MAIN_TABLE_DATA,
    payload: main_table_data,
  });
};

export const setCurrentItemSelected = (current_item_selected) => (dispatch) => {
  dispatch({
    type: CURRENT_ITEM_SELECTED,
    payload: current_item_selected,
  });
};

export const showModalCurrentItem = (show_modal_current_item) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL_CURRENT_ITEM,
    payload: show_modal_current_item,
  });
};

export const setNewRecordTable = (new_record_table) => (dispatch) => {
  dispatch({
    type: NEW_RECORD_TABLE,
    payload: new_record_table,
  });
};

export const setNewRecordTableEditMode =
  (new_record_table_edit_mode) => (dispatch) => {
    dispatch({
      type: NEW_RECORD_TABLE_EDIT_MODE,
      payload: new_record_table_edit_mode,
    });
  };

export const setFechaDesdeObj = (fecha_desde_obj) => (dispatch) => {
  dispatch({
    type: FECHA_DESDE_OBJ,
    payload: fecha_desde_obj,
  });
};

export const setFechaHastaObj = (fecha_hasta_obj) => (dispatch) => {
  dispatch({
    type: FECHA_HASTA_OBJ,
    payload: fecha_hasta_obj,
  });
};
