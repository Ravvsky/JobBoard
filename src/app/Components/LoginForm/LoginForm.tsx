"use client";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Input from "../atoms/Input/Input";
import Checkbox from "../atoms/Checkbox/Checbox";
import GoogleLogo from "../../assets/icons/google/btn_google_light_normal_ios.svg";
import GithubLogo from "../../assets/icons/github-mark-white.svg";
import Link from "next/link";
import * as Yup from "yup";
import { loginUser } from "@/app/_actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

const LoginForm = ({ onSignUpLinkClick }) => {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const [userData, setUserData] = useState();
  const [isLoginFailed, setIsLoginFailed] = useState(null);
  const submitHandler = async (values) => {
    loginUser(values).then((res) => {
      console.log(res);
      if (res.error) {
        setIsLoginFailed(true);
        return;
      }
      onSignUpLinkClick();
      router.push("/developer");
    });
  };

  useEffect(() => {
    if (isLoginFailed) {
      setTimeout(() => {
        setIsLoginFailed(false);
      }, 3000);
    }
  }, [isLoginFailed]);
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const [isForgotPasswordFormVisible, setIsForgotPasswordFormVisible] =
    useState(false);

  if (isForgotPasswordFormVisible) {
    return (
      <ForgotPasswordForm
        onBackClick={() => {
          setIsForgotPasswordFormVisible(false);
        }}
      />
    );
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={SigninSchema}
        validateOnChange={false}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-[2rem] rounded-[3rem] bg-main-gray p-[4rem]">
            <div className="flex justify-between">
              <h1 className="mb-[3rem]  text-[3.6rem] font-semibold">
                Welcome back!
              </h1>
              <div
                className="cursor-pointer text-[2rem] font-bold transition-all hover:text-main-blue"
                onClick={onSignUpLinkClick}
              >
                x
              </div>
            </div>

            <div className="flex justify-between gap-[3rem]">
              <button
                type="button"
                className="flex w-full items-center bg-white text-[1.4rem] font-medium text-[#757575] transition-all hover:bg-[#eee]"
              >
                <GoogleLogo />
                Sign in with Google
              </button>
              <button
                type="button"
                className="flex w-full items-center bg-[#333] pl-[1rem] text-[1.4rem] font-medium text-white transition-all hover:bg-[#444]"
              >
                <GithubLogo className="mr-[1rem] h-[2.2rem] w-[2.2rem] " />
                Sign in with GitHub
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
            <div className="flex justify-between">
              <div className="flex items-center gap-[0.5rem] hover:cursor-pointer">
                <Field
                  name="rememberMe"
                  id="rememberMe"
                  component={Checkbox}
                  width={1.4}
                  height={1.4}
                />

                <label
                  htmlFor="rememberMe"
                  className="cursor-pointer text-[1.2rem] text-main-blue hover:text-light-blue"
                >
                  Remember me
                </label>
              </div>
              <button
                onClick={() => {
                  setIsForgotPasswordFormVisible(true);
                }}
                type="button"
                className="text-[1.2rem] text-main-blue hover:text-light-blue"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="my-[1rem] rounded-full bg-main-blue py-[0.7rem] text-[2rem] font-semibold text-main-gray transition-all hover:bg-white"
            >
              Sign in
            </button>
            <div>
              Don't have an account?
              <Link href="sign-up" onClick={onSignUpLinkClick}>
                {" "}
                Sign up here
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      {isLoginFailed && (
        <div className="absolute left-1/2 -translate-x-1/2 rounded-[2rem] bg-main-blue p-[2rem] text-dark-blue transition-all">
          {" "}
          Sorry, wrong email address or password
        </div>
      )}
    </>
  );
};

export default LoginForm;
