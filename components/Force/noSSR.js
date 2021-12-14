import { ForceGraph2D } from "react-force-graph"
import { useRef, useEffect, useState, useContext } from "react"
import directory from "../../components/other/directory"
import { MyContext } from "../../pages"

const getColor = (val) =>
  "#" + ((val * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0")
function nodePaint({ val, x, y, name }, color, ctx) {
  ctx.fillStyle = getColor(val + 36)
  ;[
    () => {
      if (!name) {
        ctx.beginPath()
        ctx.moveTo(x, y - 5)
        ctx.lineTo(x - 5, y + 5)
        ctx.lineTo(x + 5, y + 5)
        ctx.fill()
      }
      ctx.font = "4px sfdisplay"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(name, x, y)
    },
  ][0]()
}

const noSSR = ({ switchDirectory }) => {
  const [didLoad, setDidLoad] = useState(false)
  const fgRef = useRef()
  const [, setCurrentPage] = useContext(MyContext).switchPage

  useEffect(() => {
    if (!didLoad) {
      fgRef.current.zoom(8)
      setDidLoad(true)
    }
  }, [])

  return (
    <ForceGraph2D
      ref={fgRef}
      nodeRelSize={6}
      width={550}
      height={420}
      graphData={directory}
      nodeLabel=""
      linkLineDash={[2, 2]}
      minZoom={2.5}
      maxZoom={6}
      linkColor={"rgb(80, 80, 152)"}
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={0.004}
      linkDirectionalParticleWidth={1.7}
      onNodeClick={(node, e) => {
        if (node.name !== 'about'){
          setCurrentPage('')
        }
        switchDirectory(node.name, e)
      }}
      onNodeDragEnd={(node) => {
        node.fx = node.x
        node.fy = node.y
        node.fz = node.z
      }}
      nodeCanvasObject={(node, ctx) => nodePaint(node, getColor(node.val), ctx)}
    />
  )
}

export default noSSR
