import { PrismaClient } from "@prisma/client";
import React from "react";
import Link from "next/link";
import JSON5 from "json5";
import { getServerSession } from "next-auth";

export default async function PageHome() {
  const session = await getServerSession();
  console.log(session);

  const prisma = new PrismaClient();
  const userId = 1;
  const projects = await prisma.project.findMany({ where: { userId } });

  return (
    <>
      <div className="mb-3">
        <Link href={"/projects/create"} className="btn btn-primary">
          Создать
        </Link>
      </div>
      {projects.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Key</th>
              <th>Schema</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <Link href={`/projects/${p.id}`}>{p.title}</Link>
                </td>
                <td>{p.key}</td>
                <td>{JSON5.stringify(p.schema)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">Проекты еще не созданы</p>
      )}
    </>
  );
}
