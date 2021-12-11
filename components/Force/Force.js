import dynamic from "next/dynamic"
import { useMemo } from "react"

const Force = ({ switchDirectory }) => {
  const NoSSRForceGraph = dynamic(() => import("./noSSR"), {
    ssr: false,
  })
  return <NoSSRForceGraph switchDirectory={switchDirectory} />
}

const MemoForce = ({ switchDirectory }) => {
  return useMemo(() => {
    return <Force switchDirectory={switchDirectory} />
  }, [])
}

export default MemoForce
