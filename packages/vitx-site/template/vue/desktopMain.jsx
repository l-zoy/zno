import { createRouter, createWebHashHistory } from 'vue-router'
import BuiltSite from 'vitx-site-common/element'
import documents from '@vitx-documents-desktop'
import 'vitx-site-common/styles'
import { createApp } from 'vue'

function installRouters() {
  /** @type {{path:string, name:string}[]} */
  const docs = documents
  const routes = []

  const document = Object.keys(docs)

  routes.push({
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'home'
    }
  })

  document.forEach((name) => {
    routes.push({
      name: `${name}`,
      path: `/${name}`,
      component: docs[name],
      meta: {
        name
      }
    })
  })

  return routes
}

const routers = createRouter({
  history: createWebHashHistory(),
  routes: installRouters(),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash }
    }
    return { top: 0 }
  }
})

function App() {
  return (
    <BuiltSite>
      <router-view />
    </BuiltSite>
  )
}

createApp(App).use(routers).mount('#vitx-app')
