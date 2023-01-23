import { Error404 } from '../components/Error404'
import { Home } from '../components/Home'
import { ProgressBar } from '../components/ProgressBar'
import { ShowHideMesage } from '../components/ShowHideMessage'
import { StopwatchTimer } from '../components/StopwatchTimer/StopwatchTimer'
import { TaskManager } from '../components/TaskManager'

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
      path: "/stopwatchTimer",
      element: <StopwatchTimer />,
    },
    {
      path: "/taskManager",
      element: <TaskManager />,
    },
    {
      path: "/*",
      element: <Error404 />,
    }
  ]