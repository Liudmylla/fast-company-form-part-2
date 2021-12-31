import React, { useEffect, useState } from "react";
import api from "../../../api";
import SelectField from "../../common/form/select-field";
import TextAreaField from "../../common/form/text-area-field";
import { validator } from "../../../../utils/validator";
import PropTypes from "prop-types";
const initialData = { userId: "", content: "" };

const CommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (object) => {
    setData((prevState) => ({
      ...prevState,
      [object.name]: object.value
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберите пользователя"
      }
    },
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const isValid = !Object.keys(errors).length;

  useEffect(() => {
    api.users.fetchAll().then(setUsers);
  }, []);

  const clearForm = () => {
    setData(initialData);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  const arrayOfUsers = users && users.map(({ _id, name }) => ({ _id, name }));

  return (
    <div>
      <h2>Новый комментарий</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          onChange={handleChange}
          options={arrayOfUsers}
          name="userId"
          value={data.userId}
          defaultOption="Выберите пользователя"
          error={errors.userId}
        />
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          name="content"
          label="Сообщение"
          error={errors.content}
          rows="3"
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" disabled={!isValid}>
            Опубликовать
          </button>
        </div>
      </form>
    </div>
  );
};
CommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default CommentForm;
