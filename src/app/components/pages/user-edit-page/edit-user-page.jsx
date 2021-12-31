import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import { validator } from "../../../../utils/validator";
import TextField from "../../common/form/text-field";
import SelectField from "../../common/form/select-field";
import RadioField from "../../common/form/radio-field";
import MultiSelectField from "../../common/form/multi-select-field";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    gender: "male",
    qualities: []
  });
  const [professions, setProfessions] = useState({});
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});

  const getProfessionById = (id) => {
    for (const profession in professions) {
      const data = professions[profession];
      if (data._id === id) return data;
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const element of elements) {
      for (const quality in qualities) {
        if (element.value === qualities[quality]._id) {
          qualitiesArray.push(qualities[quality]);
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`));
  };

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, ...data }) => {
      setData((prevState) => ({
        ...prevState,
        ...data,
        profession: profession._id
      }));
    });
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    name: {
      isRequired: { message: "Имя обязательно для заполнения" }
    },
    email: {
      isRequired: { message: "Электроннная почта обязательна для заполнения" },
      isEmail: { message: "Некорректно введен адрес электронной почты" }
    },
    profession: {
      isRequired: { message: "Поле обязательно для заполнения" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (object) => {
    setData((prevState) => ({
      ...prevState,
      [object.name]: object.value
    }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const isValid = !Object.keys(errors).length;

  return (
    <div onClick={() => history.goBack()} className="container mt-5">
      <button className="btn btn-primary pe-3"><i className="bi bi-caret-left"></i>Назад</button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Профессия"
                defaultOption="Выбрать профессию..."
                name="profession"
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                name="gender"
                options={[
                  { name: "Мужчина", value: "male" },
                  { name: "Женщина", value: "female" },
                  { name: "Другое", value: "other" }
                ]}
                label="Пол"
                value={data.gender}
                onChange={handleChange}
              />
              <MultiSelectField
                name="qualities"
                onChange={handleChange}
                options={qualities}
                label="Качества"
                defaultValue={data.qualities}
              />
              <button
                className="btn btn-primary w-100 mb-1"
                disabled={!isValid}
              >
                Обновить
              </button>
            </form>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
