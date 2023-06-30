"use client";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../atoms/Input/Input";
import { userResetPassword } from "@/app/_actions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const initialValues = { password: "", passwordConfirmation: "", code: "" };

  const passwordRecoveyValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      'Must match "password" field value',
    ),
  });

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const code = useSearchParams().get("code");

  const submitHandler = async (values: {
    code: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    if (code) {
      values.code = code;
      userResetPassword(values).then(() => {
        setIsPasswordChanged(true);
      });
    }
  };

  if (isPasswordChanged) {
    return <div>Your password has been changed</div>;
  }
  return (
    <div className="absolute left-1/2 top-1/2 m-0 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
      <div className="text-[2rem] font-semibold">Enter your new password</div>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={passwordRecoveyValidationSchema}
      >
        {({ errors, touched }) => (
          <Form className="mt-[2rem] flex h-full flex-col justify-between gap-[2rem]">
            <div className="flex flex-col gap-[2rem]">
              <Input
                name={"password"}
                type={"password"}
                placeholder={"New password"}
                errors={errors.password}
                touched={touched.password}
              />
              <ErrorMessage
                component="div"
                name="password"
                className="mt-[3rem] text-left text-[1.2rem] text-[#ff0000]"
              />
              <Input
                name={"passwordConfirmation"}
                type={"password"}
                placeholder={"Confirm password"}
                errors={errors.password}
                touched={touched.password}
              />
              <ErrorMessage
                component="div"
                name="passwordConfirmation"
                className="mt-[3rem] text-left text-[1.2rem] text-[#ff0000]"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-main-blue py-[0.7rem] text-[2rem] font-semibold text-main-gray transition-all hover:bg-white"
            >
              Set new password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
