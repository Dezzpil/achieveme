import { PrismaClient } from "@prisma/client";
import ProjectForm from "@/app/projects/[id]/form";

type Props = {
  params: {
    id: string;
  };
  searchParams: {};
};
export default async function ProjectPage({ params, searchParams }: Props) {
  const id = parseInt(params.id);
  const prisma = new PrismaClient();
  const project = await prisma.project.findUniqueOrThrow({ where: { id } });

  return (
    <>
      <h2>Проект ID {project.id}</h2>
      <ul className="meta list-group mb-3">
        <li className="d-inline-flex gap-2 list-group-item">
          <span>Создан:</span>
          <span>{project.createdAt.toString()}</span>
        </li>
        <li className="d-inline-flex gap-2 list-group-item">
          <span>Ключ API:</span>
          <span>{project.key}</span>
        </li>
      </ul>
      <ProjectForm project={project} />
    </>
  );
}
