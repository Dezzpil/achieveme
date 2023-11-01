import React from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {ProjectCreateSchema} from "@/pages/api/projects";

interface Props {

}

const ProjectCreate: React.FC<Props> = ({}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(ProjectCreateSchema) });

  return (
    <>
      <h1>Новый проект</h1>

      <form onSubmit={handleSubmit(async (data) => {
        console.log(data);
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const result = await res.json();
        console.log(result)
      })}>
        <div>
          <label htmlFor="title">Title</label>
          <input {...register('title', { required: true })} />
          {errors.title && <p>{errors.title.message as string}</p>}
        </div>
        <div>
          <label htmlFor="css">CSS</label>
          <textarea {...register('css')} cols={30} rows={10}></textarea>
        </div>
        <button type="submit">Отправить</button>
      </form>
    </>

  )
}

export default ProjectCreate;