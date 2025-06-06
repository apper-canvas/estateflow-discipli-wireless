import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'

export const routes = {
  home: {
    id: 'home',
    label: 'Pipeline',
    icon: 'LayoutDashboard',
    component: Home,
    path: '/'
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    icon: 'AlertCircle',
    component: NotFound,
    path: '*'
  }
}

export const routeArray = Object.values(routes)