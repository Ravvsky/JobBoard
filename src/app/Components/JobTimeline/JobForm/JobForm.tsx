"use client";
import React, { useRef, useState } from "react";
import { FastFieldProps, Field, Form, Formik, FormikProps } from "formik";
import Input from "../../atoms/Input/Input";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
import convertHtmlStringToMarkdown from "../utils/convertHtmlStringToMarkdown";
import Checkbox from "../../atoms/Checkbox/Checbox";

type FormValues = {
  companyName: string;
  fromDate: string;
  finishDate: string | null;
  description: string;
  id: number | null;
};
const JobForm = React.forwardRef<
  FormikProps<FormValues>, // Update the type parameter to FormikProps<FormValues>
  {
    item: FormValues; // Use FormValues type for item
    onSubmit: (newItem: FormValues) => void; // Use FormValues type for onSubmit callback
    companyName: (
      itemId: number | null | undefined,
      companyName: string,
    ) => void;
  }
>(({ item, onSubmit, companyName }, ref) => {
  const [isFinishDate, setIsFinishDate] = useState(true);
  const onProcessedValueChangeRef = useRef<(value: string) => void>();
  return (
    <Formik
      innerRef={ref}
      onSubmit={(values) => {
        const newItem = {
          ...item,
          companyName: values.companyName,
          description:
            convertHtmlStringToMarkdown(values.description) || item.description,
          fromDate: values.fromDate,
          finishDate: values.finishDate ? values.finishDate : null,
        };
        onSubmit(newItem);
      }}
      initialValues={{
        companyName: item.companyName,
        fromDate: item.fromDate,
        finishDate: item.finishDate === null ? "" : item.finishDate,
        description: "",
        id: item.id,
      }}
    >
      {() => (
        <Form className="flex flex-col gap-[2rem]">
          <Input
            name={"companyName"}
            type={"text"}
            placeholder={"Company name"}
            errors={undefined}
            touched={true}
            onBlur={(e) => {
              companyName(item.id, e.target.value);
            }}
            disabled={false}
          />
          <div className="flex justify-between gap-[2rem]">
            <Input
              name={"fromDate"}
              type={"date"}
              placeholder={"Joining Date"}
              errors={undefined}
              touched={undefined}
              disabled={false}
            />
            <div className="w-full">
              <Input
                name={"finishDate"}
                type={!isFinishDate ? "date" : "text"}
                placeholder={isFinishDate ? "Present" : "Finish Date"}
                errors={undefined}
                touched={true}
                disabled={isFinishDate}
                isAlwaysFocused={!isFinishDate}
              />
              <div className="flex items-center gap-[1rem]">
                <Checkbox
                  id={"finishDateCheckbox"}
                  name={"finishDateCheckbox"}
                  height={2}
                  width={2}
                  value={""}
                  checked={isFinishDate}
                  onChange={(e: {
                    target: {
                      checked: boolean | ((prevState: boolean) => boolean);
                    };
                  }) => {
                    setIsFinishDate(e.target.checked);
                  }}
                />
                <label
                  htmlFor={"finishDateCheckbox"}
                  className="flex py-[1rem] hover:cursor-pointer"
                >
                  I still work there
                </label>
              </div>
            </div>
          </div>

          <Field name="description">
            {(fieldProps: FastFieldProps) => {
              if (!onProcessedValueChangeRef.current) {
                onProcessedValueChangeRef.current = (value) => {
                  fieldProps.form.setFieldValue("description", value);
                };
              }

              return (
                <RichTextEditor
                  initialValue={item.description}
                  {...fieldProps}
                  onProcessedValueChange={(value) => {
                    fieldProps.form.setFieldValue("description", value);
                  }}
                />
              );
            }}
          </Field>
        </Form>
      )}
    </Formik>
  );
});
JobForm.displayName = "JobForm";

export default JobForm;
