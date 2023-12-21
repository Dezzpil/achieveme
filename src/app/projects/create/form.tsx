"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormCreateProjectFieldsSchema,
  FormCreateProjectFieldsType,
} from "@/app/projects/types";
import { createProjectAction } from "@/app/projects/create/action";
import { useState } from "react";

export default function ProjectCreateForm() {
  const [error, setError] = useState<null | string>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const form = useForm<FormCreateProjectFieldsType>({
    defaultValues: { schema: "{}", css: "{}" },
    resolver: zodResolver(FormCreateProjectFieldsSchema),
  });

  const onSubmit = form.handleSubmit(async (d) => {
    setSubmitting(true);
    try {
      await createProjectAction(d);
    } catch (e: any) {
      setError((e as Error).toString());
    }
    setSubmitting(false);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Название</label>
        <input
          {...form.register("title", { required: true })}
          className="form-control"
        />
        {form.formState.errors.title && (
          <div className="form-text text-danger">
            {form.formState.errors.title.message}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Схема данных</label>
        <textarea
          {...form.register("schema", { required: true })}
          className="form-control"
        ></textarea>
        {form.formState.errors.schema && (
          <div className="form-text text-danger">
            {form.formState.errors.schema.message}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">CSS</label>
        <textarea {...form.register("css")} className="form-control"></textarea>
        {form.formState.errors.css && (
          <div className="form-text text-danger">
            {form.formState.errors.css.message}
          </div>
        )}
      </div>
      <div className="mb-3">
        <button disabled={submitting} className="btn btn-success" type="submit">
          Создать
        </button>
      </div>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
    </form>
  );
}
