"use client";

import { createBoard } from "@/actions/create-board/index";
import { FormInput } from "@/components/form/form-input";
import FormSubmit from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";

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
    console.log({ title });
    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput
          id="title"
          errors={fieldErrors}
          placeholder="Board title"
          label="Board title"
          required
        />
      </div>
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};

export default Form;
