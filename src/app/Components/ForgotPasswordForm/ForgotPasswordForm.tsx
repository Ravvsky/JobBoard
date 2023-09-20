import { ErrorMessage, Field, Form, Formik } from "formik";
import Input from "../atoms/Input/Input";
import { useState } from "react";
import * as Yup from "yup";
import { userForgotPassword } from "@/app/_actions";

const PasswordRecoveryForm = ({ onBackClick }: { onBackClick: () => void }) => {
  const initialValues = { email: "" };

  const [isFormSend, setIsFormSend] = useState(false);
  const passwordRecoveyValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const submitHandler = async (values: { email: string }) => {
    userForgotPassword(values.email).then(() => {
      setIsFormSend(true);
    });
  };
  return (
    <>
      {!isFormSend && (
        <>
          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={passwordRecoveyValidationSchema}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-[2rem] rounded-[3rem] bg-main-gray p-[4rem]">
                <button
                  type="button"
                  className="text-left text-[1.2rem] text-main-blue transition-all hover:text-white"
                  onClick={onBackClick}
                >
                  Back to login
                </button>
                <div>
                  <div className="text-[2rem] font-semibold">
                    Forgot your password?
                  </div>
                  <div className="mt-[2rem] text-left text-[1.6rem] font-normal">
                    To change your password enter your email address used for
                    registration
                  </div>
                </div>
                <div className="mt-[5rem] flex flex-col gap-[2rem]">
                  <div>
                    <Field
                      name={"email"}
                      type={"email"}
                      placeholder={"Email"}
                      errors={errors.email}
                      touched={touched.email}
                      disabled={false}
                      as={Input}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="mt-[3rem] text-left text-[1.2rem] text-[#ff0000]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-main-blue py-[0.7rem] text-[2rem] font-semibold text-main-gray transition-all hover:bg-white"
                  >
                    Reset password
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}

      {isFormSend && (
        <div className="flex flex-col gap-[2rem] rounded-[2rem] bg-main-gray p-[2rem]">
          <div className="text-[1.6rem]">
            We&apos;ve send you a message with link to reset your password
          </div>
          <button
            type="button"
            onClick={onBackClick}
            className="w-full rounded-full bg-main-blue py-[0.7rem] text-[2rem] font-semibold text-main-gray transition-all hover:bg-white"
          >
            Back to log in
          </button>
        </div>
      )}
    </>
  );
};

export default PasswordRecoveryForm;
