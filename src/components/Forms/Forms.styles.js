/* Modules */
import styled from "styled-components";

export const FormsStyles = styled.div`
  .form_container {
  }

  .basic_field {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .date_field {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .form_button {
    text-transform: uppercase;
    outline: 0;
    background: #363636;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    margin-top: 20px;
  }

  .form_button.add_button {
    margin-bottom: 20px;
  }

  .form_button:hover,
  .form_button:active,
  .form_button:focus {
    background: #4f4f4f;
  }

  .form_button:disabled {
    background-color: gray;
    cursor: default;
  }

  .success_field_styles {
    border: 1px solid #98e58e;
  }

  .error_field_styles {
    border: 1px solid #f44336;
  }

  .error_field_text_container {
    font-size: 12px;
    line-height: 1.33;
    letter-spacing: -0.15px;
    color: #f44336;
    margin-top: 4px;
  }

  .fields_group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .fields_group .field_container {
    width: 48% !important;
  }

  .field_container {
    width: 100% !important;
    height: 100% !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 70px;
    margin-top: 5px;
  }

  .form_label {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33;
    color: #5e6c84;
    text-align: left;
    padding-bottom: 3px;
    height: 16px;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
  }
`;
