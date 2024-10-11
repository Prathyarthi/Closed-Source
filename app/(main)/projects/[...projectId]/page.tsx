function ProjectPage({ params }: { params: { projectId: string } }) {
  return (
    <div>
      <h1>{params.projectId}</h1>
    </div>
  );
}

export default ProjectPage;
