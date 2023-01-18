import { Error404 } from '../components/Error404'
import { Home } from '../components/Home'
import { ProgressBar } from '../components/ProgressBar'
import { ShowHideMesage } from '../components/ShowHideMessage'

export const routesPublic =  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/showHideMessage",
      element: <ShowHideMesage />,
    },
    {
      path: "/progressBar",
      element: <ProgressBar />,
    },
    {
      path: "/*",
      element: <Error404 />,
    }
  ]