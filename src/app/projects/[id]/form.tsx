"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormCreateProjectFieldsSchema,
  FormCreateProjectFieldsType,
} from "@/app/projects/types";
import { useState } from "react";
import type { Project } from ".prisma/client";
import { modifyProjectAction } from "@/app/projects/[id]/actions";

type Props = {
  project: Project;
};
export default function ProjectForm({ project }: Props) {
  const [error, setError] = useState<null | string>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const form = useForm<FormCreateProjectFieldsType>({
    defaultValues: Object.assign(project, {
      schema: JSON.stringify(project.schema),
      css: JSON.stringify(project.css),
    }),
    resolver: zodResolver(FormCreateProjectFieldsSchema),
  });

  const onSubmit = form.handleSubmit(async (d) => {
    setSubmitting(true);
    setError(null);
    try {
      await modifyProjectAction(project.id, d);
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
          Сохранить
        </button>
      </div>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
    </form>
  );
}
