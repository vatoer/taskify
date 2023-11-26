"use client";

import { State, create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { FormButton } from "./form-button";
import { FormInput } from "./form-input";

const Form = () => {
  const initialState: State = { errors: {}, message: null };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput state={state} />
      </div>
      <FormButton />
    </form>
  );
};

export default Form;
