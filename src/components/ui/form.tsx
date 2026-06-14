"use client";

import * as React from "react";
import {
  Controller,
  type ControllerRenderProps,
  type Control,
  type FieldError,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";

type FormProps<TFormValues extends FieldValues> = UseFormReturn<TFormValues> & {
  children?: React.ReactNode;
};

export function Form<TFormValues extends FieldValues>(props: FormProps<TFormValues>) {
  return <>{props.children}</>;
}

const FormFieldContext = React.createContext<{ error?: FieldError } | undefined>(undefined);

interface FormFieldProps<
  TFormValues extends FieldValues,
  TName extends FieldPath<TFormValues>
> {
  control: Control<TFormValues>;
  name: TName;
  render: (props: {
    field: ControllerRenderProps<TFormValues, TName>;
    fieldState: { error?: FieldError };
  }) => React.ReactNode;
}

export function FormField<
  TFormValues extends FieldValues,
  TName extends FieldPath<TFormValues>
>({ control, name, render }: FormFieldProps<TFormValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldContext.Provider value={{ error: fieldState.error }}>
          {render({ field, fieldState: { error: fieldState.error } })}
        </FormFieldContext.Provider>
      )}
    />
  );
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function FormControl({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function FormMessage({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const context = React.useContext(FormFieldContext);
  if (!context?.error) {
    return null;
  }

  return (
    <p className={cn("text-sm text-destructive", className)} {...props}>
      {children ?? context.error.message}
    </p>
  );
}
