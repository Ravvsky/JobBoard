"use client";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Input from "../atoms/Input/Input";
import GoogleLogo from "../../assets/icons/google/btn_google_light_normal_ios.svg";
import GithubLogo from "../../assets/icons/github-mark-white.svg";
import * as Yup from "yup";
import { isEmailTaken, loginUser, userRegister } from "@/app/_actions";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Checkbox from "../atoms/Checkbox/Checbox";
import Link from "next/link";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import { debounce } from "lodash";
declare module "yup" {
  interface StringSchema {
    strapiEmail(message: string): StringSchema;
  }
}
const SignUpForm = ({ onSignUpLinkClickHandler }) => {
  const router = useRouter();
  const debouncedIsEmailTaken = debounce(isEmailTaken, 500); // 500 milliseconds debounce delay

  const initialValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
    agreement: false,
  };
  const [userData, setUserData] = useState();
  const [isLoginFailed, setIsLoginFailed] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState();

  const submitHandler = (values) => {
    userRegister(values).then((res) => {
      if (res.error) {
        setIsLoginFailed(true);
      } else {
        if (res) {
          loginUser({
            email: values.email,
            password: values.password,
            rememberMe: true,
          });
        }
        router.push("/");
      }
    });
  };

  useEffect(() => {
    if (isLoginFailed) {
      setTimeout(() => {
        setIsLoginFailed(false);
      }, 4000);
    }
  }, [isLoginFailed]);

  Yup.addMethod(Yup.string, "strapiEmail", function validateEmail(message) {
    const emailRegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return this.matches(emailRegExp, {
      message,
      name: "email",
      excludeEmptyString: true,
    });
  });

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .strapiEmail("Invalid email")
      .required("Required")
      .test(
        "emailTaken",
        "Account with that email already exists",
        async (value) => {
          const isTaken = await debouncedIsEmailTaken(value);
          return !isTaken;
        }
      ),
    password: Yup.string().required("Required"),
    passwordConfirmation: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], 'Must match "password" field value'),
    agreement: Yup.bool().oneOf(
      [true],
      "You need to accept the terms and conditions and privacy policies"
    ),
  });

  return (
    <div className="flex">
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={SigninSchema}
      >
        {({ errors, touched, isSubmitting, status }) => (
          <Form className="flex w-full flex-col gap-[2rem] rounded-[3rem] bg-main-gray p-[4rem]">
            <div className="flex justify-between">
              <h1 className="mb-[3rem]  text-[3.6rem] font-semibold">
                Create an Account
              </h1>
            </div>
            {isSubmitting && (
              <div
                className="border-current inline-block h-[15rem] w-[15rem] animate-spin rounded-full border-4 border-solid border-r-transparent align-[-1.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            )}
            {!isSubmitting && (
              <>
                <div className="flex justify-between gap-[3rem]">
                  <button
                    type="button"
                    className="flex w-full items-center bg-white text-[1.4rem] font-medium text-[#757575] transition-all hover:bg-[#eee]"
                  >
                    <GoogleLogo />
                    Sign up with Google
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center bg-[#333] pl-[1rem] text-[1.4rem] font-medium text-white transition-all hover:bg-[#444]"
                  >
                    <GithubLogo className="mr-[1rem] h-[2.2rem] w-[2.2rem] " />
                    Sign up with GitHub
                  </button>
                </div>
                <div className="relative my-[2rem] w-full border-[1px] border-main-blue">
                  <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 bg-main-gray px-[1.2rem]">
                    or
                  </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <Input
                    name={"email"}
                    type={"email"}
                    placeholder={"Email"}
                    errors={errors.email}
                    touched={touched.email}
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="text-left text-[1.2rem] text-[#ff0000]"
                  />
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <Input
                    name={"password"}
                    type={"password"}
                    placeholder={"Password"}
                    errors={errors.password}
                    touched={touched.password}
                  />{" "}
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="text-left text-[1.2rem] text-[#ff0000]"
                  />
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <Input
                    name={"passwordConfirmation"}
                    type={"password"}
                    placeholder={"Repeat password"}
                    errors={errors.password}
                    touched={touched.password}
                  />{" "}
                  <ErrorMessage
                    component="div"
                    name="passwordConfirmation"
                    className="text-left text-[1.2rem] text-[#ff0000]"
                  />
                </div>
                <div className="flex items-center gap-[0.5rem] hover:cursor-pointer">
                  <Field
                    name="agreement"
                    id="agreement"
                    component={Checkbox}
                    width={1.4}
                    height={1.4}
                  />

                  <label
                    htmlFor="agreement"
                    className="cursor-pointer text-[1.2rem]"
                  >
                    I agree with all <Link href="#">Terms and conditions</Link>{" "}
                    and <Link href="#">Privacy Policies</Link>
                  </label>
                </div>{" "}
                <ErrorMessage
                  component="div"
                  name="agreement"
                  className="text-left text-[1.2rem] text-[#ff0000]"
                />
                <button
                  type="submit"
                  className="my-[1rem] rounded-full bg-main-blue py-[0.7rem] text-[2rem] font-semibold text-main-gray transition-all hover:bg-white"
                >
                  Create an account
                </button>
                <div>
                  Already have an account?{" "}
                  <button
                    className="text-main-blue hover:text-light-blue"
                    type="button"
                    onClick={() => {
                      setIsLoginModalOpen(true);
                    }}
                  >
                    Sign in here
                  </button>
                  <Modal
                    childrenClassName="w-1/4"
                    className="items-center justify-center"
                    isOpen={isLoginModalOpen}
                    closeModal={() => {
                      setIsLoginModalOpen(false);
                    }}
                  >
                    <LoginForm onSignUpLinkClick={onSignUpLinkClickHandler} />
                  </Modal>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>

      <div className="w-full">right</div>

      {isLoginFailed && (
        <div className="absolute left-1/2 -translate-x-1/2 rounded-[2rem] bg-main-blue p-[2rem] text-dark-blue transition-all">
          {" "}
          {isLoginFailed && "Something went wrong, try again later"}
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
