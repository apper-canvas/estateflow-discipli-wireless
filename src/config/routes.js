import Home from '@/pages/Home'
import Properties from '@/pages/Properties'
import Clients from '@/pages/Clients'
import NotFound from '@/pages/NotFound'

export const routes = {
  home: {
    id: 'home',
    label: 'Pipeline',
    icon: 'LayoutDashboard',
    component: Home,
    path: '/'
  },
  properties: {
    id: 'properties',
    label: 'Properties',
    icon: 'Building2',
    component: Properties,
    path: '/properties'
  },
  clients: {
    id: 'clients',
    label: 'Clients',
    icon: 'Users',
    component: Clients,
    path: '/clients'
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
export const navigationRoutes = [routes.home, routes.properties, routes.clients]