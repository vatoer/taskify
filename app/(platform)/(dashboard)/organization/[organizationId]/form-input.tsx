"use client";

import { State } from "@/actions/create-board";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  state: State;
}

export const FormInput = ({ state }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Input
        id="title"
        name="title"
        required
        placeholder="enter a boar dtitle"
      />
      {state?.errors?.title ? (
        <div>
          {state.errors.title.map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};
