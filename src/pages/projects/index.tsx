import Layout from "@/components/layout";
import {GetServerSideProps} from "next";
import React from "react";
import {PrismaClient} from "@prisma/client";
import type { Project } from "@prisma/client";

import Link from 'next/link';

interface Props {
  projects: Project[];
}

const Projects: React.FC<Props> = ({ projects }) => {

  return (
    <Layout>
      <h2>Проекты</h2>
      {projects.map(p => (
        <div key={p.id} className="mb-2">
            <Link href={`/projects/${p.id}`}>{p.title}</Link>
            <div className="text-muted">
              <small>{p.key}</small>
            </div>
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