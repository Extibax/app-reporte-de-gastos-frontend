/* eslint-disable import/no-anonymous-default-export */
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
  FECHA_HASTA_OBJ,
  FECHA_DESDE_OBJ,
} from "../actions/types";

const initialState = {
  show_modal_form: false,
  modal_form_edit_mode: false,
  form_current_step: 1,
  main_table_data: "",
  current_item_selected: "",
  show_modal_current_item: false,
  new_record_table: [],
  new_record_table_edit_mode: [],
  fecha_desde_obj: "",
  fecha_hasta_obj: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL_FORM:
      return {
        ...state,
        show_modal_form: action.payload,
      };
    case MODAL_FORM_EDIT_MODE:
      return {
        ...state,
        modal_form_edit_mode: action.payload,
      };
    case FORM_PART_1_COMPLETED:
      return {
        ...state,
        form_part_1_completed: action.payload,
      };
    case FORM_PART_2_COMPLETED:
      return {
        ...state,
        form_part_2_completed: action.payload,
      };
    case FORM_PART_3_COMPLETED:
      return {
        ...state,
        form_part_3_completed: action.payload,
      };
    case FORM_CURRENT_STEP:
      return {
        ...state,
        form_current_step: action.payload,
      };
    case MAIN_TABLE_DATA:
      return {
        ...state,
        main_table_data: action.payload,
      };
    case CURRENT_ITEM_SELECTED:
      return {
        ...state,
        current_item_selected: action.payload,
      };
    case SHOW_MODAL_CURRENT_ITEM:
      return {
        ...state,
        show_modal_current_item: action.payload,
      };
    case NEW_RECORD_TABLE:
      return {
        ...state,
        new_record_table: action.payload,
      };
    case NEW_RECORD_TABLE_EDIT_MODE:
      return {
        ...state,
        new_record_table_edit_mode: action.payload,
      };
    case FECHA_DESDE_OBJ:
      return {
        ...state,
        fecha_desde_obj: action.payload,
      };
    case FECHA_HASTA_OBJ:
      return {
        ...state,
        fecha_hasta_obj: action.payload,
      };

    default:
      return state;
  }
}
