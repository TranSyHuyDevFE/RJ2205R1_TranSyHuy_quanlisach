import React from "react";
import "./styles.css";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";

const EditForm = (props) => {
  const REQUIRED = "Yêu cầu nhập đủ thông tin!";
  const NUMBER_VALID = "Phần số lượng bắt buộc nhập số!";
  const [bookediting, setBookEditing] = useState(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      number: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(REQUIRED),
      number: Yup.number().typeError(NUMBER_VALID).required(REQUIRED),
    }),
    onSubmit: (values) => {
      let { store, setStore } = props;
      let updateStore = store.map((item) => {
        if (item.title === bookediting) {
          item.title = values.title;
          item.number = values.number;
        }
        return item;
      });
      setStore(updateStore);
    },
  });
  const deleteProduct = (title) => {
    let { store, setStore } = props;
    let updateStore = store.filter((item) => item.title !== title);
    setStore(updateStore);
  };
  const handleDelete = (title) => {
    deleteProduct(title);
  };

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Số lượng</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.store.map((item, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                {bookediting === item.title ? (
                  <th>
                    {item.title} <b>=</b>
                    <input
                      type="text"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.title && (
                      <p className="error">{formik.errors.title}</p>
                    )}
                  </th>
                ) : (
                  <th>{item.title}</th>
                )}
                {bookediting === item.title ? (
                  <th>
                    {item.number} <b>=</b>
                    <input
                      type="text"
                      name="number"
                      value={formik.values.number}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.number && (
                      <p className="error">{formik.errors.number}</p>
                    )}
                  </th>
                ) : (
                  <th>{item.number}</th>
                )}

                <th className="btn-btn">
                  {bookediting === item.title ? (
                    <>
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={formik.handleSubmit}
                      >
                        Lưu
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => setBookEditing("")}
                      >
                        Hủy
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => setBookEditing(item.title)}
                    >
                      Sửa
                    </button>
                  )}

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.title)}
                  >
                    Xóa
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default EditForm;
