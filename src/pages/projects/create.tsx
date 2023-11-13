import React, {useState} from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {ProjectCreateSchema} from "@/pages/api/projects";
import Layout from "@/components/layout";

interface Props {

}

const ProjectCreate: React.FC<Props> = ({}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(ProjectCreateSchema) });

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null)

  return (
    <Layout>
      <h2>Новый проект</h2>

      <form onSubmit={handleSubmit(async (data) => {
        console.log(data);
        setError(null);
        setResult(null);
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        if (res.status !== 200) {
          setError(await res.text());
        } else {
          const result = await res.text();
          setResult(result)
        }
      })}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input {...register('title', { required: true })} className="form-control"/>
          {errors.title && <p>{errors.title.message as string}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="css" className="form-label">CSS</label>
          <textarea {...register('css')} cols={30} rows={10} className="form-control"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="schema" className="form-label">Схема данных</label>
          <textarea {...register('schema')} cols={30} rows={10} className="form-control"></textarea>
        </div>
        <button type="submit" className="btn btn-primary mb-3 float-end">Отправить</button>
        <div className="clearfix"></div>
        { error && <div className="alert alert-danger">{error}</div> }
        { result && <div className="alert alert-success">{result}</div> }
      </form>
    </Layout>
  )
}

export default ProjectCreate;