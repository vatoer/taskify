import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<Tinput, TOutput> = {
  fieldErrors?: FieldErrors<Tinput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validatedResult = schema.safeParse(data);

    if (!validatedResult.success) {
      return {
        fieldErrors: validatedResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validatedResult.data);
  };
};
