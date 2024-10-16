'use client';

import { getProjectById } from "@/lib/actions/projects.action";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


function ProjectPage({ params }: { params: { projectId: string } }) {

  const [currentProject, setCurrentProject] = useState<any | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchProject = async () => {
    try {
      const project = await getProjectById(params.projectId[0])
      setCurrentProject(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      setCurrentProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject()
  }, [params.projectId]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <h1 className="text-4xl">Loading...</h1>
      </div>
    )
  }

  if (!currentProject) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <h1 className="text-4xl">Project Not Found</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[80vh] items-center">
      <h1 className="text-4xl ">Project: {currentProject?.name}</h1>
      <h2 className="text-2xl">Description: {currentProject?.description}</h2>

      <h3 className="text-2xl">Follow the instructions to work on it.</h3>

      <div className="flex justify-between mt-5 h-20 w-[500px] rounded-lg bg-gray-600 items-center p-5">
        <div className=" text-black font-bold">
          {`Step 1: git clone ${currentProject?.repoUrl}`}
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => navigator.clipboard.writeText(currentProject?.repoUrl)}><Copy /></TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex justify-between mt-5 h-20 w-[500px] rounded-lg bg-gray-600 items-center p-5">
        <div className=" text-black font-bold">
          {`Step 2: cd ${currentProject?.name}`}
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => navigator.clipboard.writeText(currentProject?.name)}><Copy /></TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex justify-between mt-5 h-20 w-[500px] rounded-lg bg-gray-600 items-center p-5">
        <div className=" text-black font-bold">
          {`Step 3: npm install`}
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => navigator.clipboard.writeText("npm install")}><Copy /></TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex justify-between mt-5 h-20 w-[500px] rounded-lg bg-gray-600 items-center p-5">
        <div className=" text-black font-bold">
          {`Step 4: npm run dev`}
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => navigator.clipboard.writeText("npm run dev")}><Copy /></TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>

  );
}

export default ProjectPage;
