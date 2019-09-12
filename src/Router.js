import React, { lazy, Suspense } from "react"
import { Route } from "wouter"
import { uniqueId } from "lodash"

import Loading from "components/Loading"

const routes = [
  {
    path: "/",
    component: lazy(() => import("views/CarSearch")),
  },
  {
    path: "/listing/:listingId",
    component: lazy(() => import("views/Listing")),
  },
  {
    path: "/city",
    component: lazy(() => import("views/City")),
  },
]

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      {routes.map(t => (
        <Route key={uniqueId("route")} {...t} />
      ))}
    </Suspense>
  )
}

export default Router
