import router from "@/router"

export const usePushQuery = (queryName: string) => {

  router.push({ ...router.currentRoute, query: { [queryName]: 'true' } })
}