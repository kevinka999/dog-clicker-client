import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Input } from "../../components";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { httpService } from "../../services";

export const Home = () => {
  const { setUserData } = useContext(GlobalContext);

  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: yup.object({
      dogIdentifier: yup
        .string()
        .max(20, "Dog identifier too long")
        .required("Provide the dog identifier"),
      nickname: yup
        .string()
        .max(20, "Nickname too long")
        .required("Provide your nickname"),
    }),
    initialValues: {
      dogIdentifier: "Aurora",
      nickname: "Kevin",
    },
    onSubmit: (values) => {
      const path = import.meta.env.VITE_SERVER_URL + "/login";

      httpService()
        .post<{ _id: string }>(path, { dogIndetifier: values.dogIdentifier })
        .then((response) => {
          setUserData({
            dogId: response._id,
            nickname: values.nickname,
          });

          navigate("/play");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center gap-2">
          <img src="./dog.png" height={42} width={42} />
          <h1 className="text-3xl font-bold text-center text-white">
            Dog clicker
          </h1>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <Input
            type="text"
            name="dogIdentifier"
            onChange={formik.handleChange}
            value={formik.values.dogIdentifier}
            placeholder="Dog identifier"
            helperText={
              formik.errors?.dogIdentifier && formik.errors.dogIdentifier
            }
          />
          <Input
            type="text"
            name="nickname"
            onChange={formik.handleChange}
            value={formik.values.nickname}
            placeholder="Nickname"
            helperText={formik.errors?.nickname && formik.errors.nickname}
          />
          <Button type="button" onClick={() => formik.handleSubmit()}>
            Play
          </Button>
        </div>
      </div>
    </div>
  );
};
