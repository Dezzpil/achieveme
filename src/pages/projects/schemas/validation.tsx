import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PropsSchema} from "@/pages/api/project/schema/validate";

const ProjectSchemaValidationPage: React.FC = () => {

  const [result, setResult] = useState<boolean | null>(null)

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(PropsSchema)
  })

  return (
    <>
      <h1>Валидация схемы данных</h1>

      <form onSubmit={handleSubmit(async (data) => {
        setResult(null);
        console.log(data);
        const res = await fetch('/api/project/schema/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        const result = await res.json();
        setResult(!!result.valid);
      }, () => {
        setResult(null);
      })} onReset={() => setResult(null)}>
        <textarea {...register('definition', { required: true })}></textarea>
        <p>{ errors.definition && errors.definition.message as string }</p>

        <textarea {...register('data', { required: true })}></textarea>
        <p>{ errors.data && errors.data.message as string }</p>

        <input type="submit"/>
        <input type="reset" />
      </form>

      { result !== null && (
        <pre>{ result ? 'Data is valid!' : 'Data is invalid' }</pre>
      )}

    </>
  )
}

export default ProjectSchemaValidationPage;