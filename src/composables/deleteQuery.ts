import router from "@/router"

export const useDeleteQuery = (queryName: string) => {
  const query = { ...router.currentRoute.value.query }
  delete query[queryName]
  router.push({ ...router.currentRoute, query: { ...query } })
}