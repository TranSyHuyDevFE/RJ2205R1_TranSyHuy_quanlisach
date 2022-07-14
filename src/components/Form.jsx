import React from "react";
import "./styles.css";
import * as Yup from "yup";
import { useState } from "react";
import { Formik } from "formik";
import EditForm from "./EditForm";
import { REQUIRED, NUMBER_VALID } from "./myConstant.js";
export default function Form() {
  const [store, setStore] = useState([]);
  return (
    <div className="container">
      <Formik
        initialValues={{ title: "", number: "" }}
        validationSchema={Yup.object({
          title: Yup.string().required(REQUIRED),
          number: Yup.number().typeError(NUMBER_VALID).required(REQUIRED),
        })}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: "" });
          setStore([...store, values]);
        }}
      >
        {(formik) => (
          <>
            <form action="/action_page.php" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors.title && (
                  <label className="error">{formik.errors.title}</label>
                )}
              </div>
              <div className="form-group">
                <label>Số lượng:</label>
                <input
                  type="text"
                  name="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors.number && (
                  <label className="error">{formik.errors.number}</label>
                )}
              </div>
              <button
                type="submit"
                style={{ margin: "10px" }}
                className="btn btn-warning"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </Formik>
      <EditForm store={store} setStore={setStore} />
    </div>
  );
}
