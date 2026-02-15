import * as z from "zod";
import { useCallback, useState } from "react";

const useForm = <T>(schema: z.ZodTypeAny, initialState: T) => {
  const [data, setData] = useState<Partial<T>>(initialState);
  const [errors, setErrors] = useState<Record<
    keyof T,
    string | string[]
  > | null>(null);

  const displayErrors = useCallback(() => {
    const result = schema.safeParse(data);

    if (result.success) {
      setErrors(null);
      return;
    }

    const errs = result.error.issues.reduce(
      (prev, curr) => {
        let err = prev[curr.path[0] as keyof T];

        console.log(err);
        if (err && Array.isArray(err)) {
          err.push(curr.message);
        } else if (err && typeof err === "string") {
          const buff = err;

          err = [buff, curr.message];
        } else {
          err = curr.message;
        }

        prev[curr.path[0] as keyof T] = err;
        return prev;
      },
      {} as Record<keyof T, string | string[]>,
    );

    setErrors(errs);
    return errs;
  }, [data, schema]);

  return {
    data,
    setData,
    errors,
    displayErrors,
  };
};

export default useForm;
