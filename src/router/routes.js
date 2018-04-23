/**
 * Automatically load each routers in views folder
 */
const routeFiles = require.context('src/views', true, /\.js$/)

const routes = [
  {
    path: '*',
    redirect: '/',
  }
]

routeFiles.keys().map(key => {
  routes.unshift(routeFiles(key).default)
})

export default routes