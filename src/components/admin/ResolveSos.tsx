import { useState } from "react";
import { Button } from "../ui/button";
import { useUpdateSosStateMutation } from "@/redux/features/sosApis";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";

const ResolveSos = ({
  id,
  onResolved,
}: {
  id: string;
  onResolved: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [resolveSos] = useUpdateSosStateMutation();

  const handleResolve = async () => {
    const option = {
      id: id,
    };

    function optionalTask() {
      onResolved();
    }

    await postApiHandler({
      mutateFn: resolveSos,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTask,
    });
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button variant="secondary" onClick={onResolved}>
        Close
      </Button>
      <Button variant="default" onClick={handleResolve}>
        {isLoading ? "Resolving..." : "Resolve"}
      </Button>
    </div>
  );
};

export default ResolveSos;
