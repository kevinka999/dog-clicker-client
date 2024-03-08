import { useFormik } from "formik";
import * as yup from "yup";
import { Button, DogSVG, Input } from "../../components";

export const Home = () => {
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
      dogIdentifier: "",
      nickname: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center gap-2">
          <DogSVG height={42} width={42} />
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
