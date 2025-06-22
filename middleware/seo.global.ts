export default defineNuxtRouteMiddleware((to) => {
  // Adicionar trailing slash para URLs consistentes
  if (to.path !== '/' && to.path.endsWith('/')) {
    return navigateTo(to.path.slice(0, -1), { redirectCode: 301 })
  }
})