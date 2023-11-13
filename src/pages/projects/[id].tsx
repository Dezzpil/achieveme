import React from "react";
import {GetServerSideProps} from "next";
import {PrismaClient, Project} from "@prisma/client";
import Layout from "@/components/layout";

interface Props {
  project: Project
}

const ProjectPage: React.FC<Props> = ({ project }) => {
  return <Layout>
    <h2>{project.title}</h2>
  </Layout>;
}

export default ProjectPage;

export const getServerSideProps = (async (context) => {
  const { id } = context.params as { id: string };
  const prisma = new PrismaClient();
  try {
    const project = await prisma.project.findUniqueOrThrow({
      where: { id: parseInt(id) }
    });
    return {
      props: { project }
    }
  } catch (e) {
    return {
      notFound: true, // This will redirect to the 404 page
    };
  }
}) satisfies GetServerSideProps;
