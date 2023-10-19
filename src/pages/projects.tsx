import Layout from "@/components/layout";
import {GetServerSideProps} from "next";
import React from "react";
import {PrismaClient} from "@prisma/client";
import type { Project } from "@prisma/client";

interface Props {
  projects: Project[];
}

const Projects: React.FC<Props> = ({ projects }) => {

  return (
    <Layout>
      <h2>Проекты</h2>
      {projects.map(p => (
        <div key={p.id}>
          <small>{p.key}</small>
          <p>{p.title}</p>
        </div>
      ))}
    </Layout>
  )
}

export default Projects;

export const getServerSideProps = (async (context) => {
  const prisma = new PrismaClient();

  const projects = await prisma.project.findMany();

  return {
    props: {
      projects
    }
  }
}) satisfies GetServerSideProps;