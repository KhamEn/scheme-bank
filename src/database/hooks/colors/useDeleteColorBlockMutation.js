import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteColorBlock(variables) {}

function useDeleteColorBlockMutation() {
  const queryClient = useQueryClient();
  return useMutation();
}

export default useDeleteColorBlockMutation;
