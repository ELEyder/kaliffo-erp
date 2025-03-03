import React, { useState } from "react";
import { DatePicker, Form, Input, Select } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

import {
  onlyNumberKey,
  onlyNumberInput,
  preventPaste,
} from "../../../../Shared/Tools"; // Funciones de utilidad para validación

const DefaultForm = ({ onFinish, rows, form }) => {
  return (
    <Form
      style={{ maxWidth: 500, margin: "0 auto" }}
      size="large"
      form={form}
      layout="vertical"
      labelAlign="center"
      onFinish={onFinish}
    >
      {rows.map((row) => {
        if (row.type === "text") {
          return (
            <Form.Item
              key={row.name}
              label={row.label}
              name={row.name}
              rules={[{ required: true, message: `${row.label} requerido/s` }]}
            >
              <Input />
            </Form.Item>
          );
        } else if (row.type === "date") {
          return (
            <Form.Item
              key={row.name}
              label={row.label}
              name={row.name}
              rules={[{ required: true, message: `${row.label} requerido/s` }]}
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          );
        } else if (row.type === "select") {
          return (
            <Form.Item
              key={row.name}
              label={row.label}
              name={row.name}
              rules={[{ required: true, message: `${row.label} requerido/s` }]}
            >
              <Select
              value={row.value}
              onChange={row.onChange}
                options={row.options.map((option) => ({
                  value: option.value,
                  label: option.label,
                  key: option.value,
                }))}
              />
            </Form.Item>
          );
        } else if (row.type === "hidden") {
          return (
            <Form.Item name={row.name} noStyle key={row.name}>
              <Input type="hidden" />
            </Form.Item>
          );
        } else if (row.type === "number") {
          return (
            <Form.Item
              key={row.name}
              label={row.label}
              name={row.name}
              rules={[
                { required: true, message: `${row.label} requerido/s` },
                {
                  validator: (_, value) => {
                    if (value && value.length < row.max) {
                      return Promise.reject(
                        new Error(`Debe tener al menos ${row.max} caracteres.`)
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                showCount
                maxLength={row.max}
                onPaste={preventPaste}
                onKeyDown={onlyNumberKey} // Permitir solo números
                onInput={onlyNumberInput} // Permitir solo números en la entrada
              />
            </Form.Item>
          );
        }
      })}
    </Form>
  );
};

export default DefaultForm;
