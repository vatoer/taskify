"use client";

import { createBoard } from "@/actions/create-board/index";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useFormState } from "react-dom";
import { FormButton } from "./form-button";
import { FormInput } from "./form-input";

const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  );
};

export default Form;
