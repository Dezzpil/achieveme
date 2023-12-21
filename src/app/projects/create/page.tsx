import ProjectCreateForm from "@/app/projects/create/form";

type Props = {
  params: {};
  searchParams: {};
};

export default async function ProjectCreatePage({
  params,
  searchParams,
}: Props) {
  return (
    <>
      <h2>Создание нового проекта</h2>
      <ProjectCreateForm />
    </>
  );
}
