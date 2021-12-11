import { useSpring, animated } from "react-spring"
import { useState, useContext } from "react"
import About from "./About"
import { MyContext } from "../pages"

const Info = ({ homepage }) => {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useContext(MyContext).about
  const isMobile = useContext(MyContext).isMobile

  const springWidth = useSpring({
    width: "50%",
    left: clicked ? "97%" : "50%",
    color: clicked ? "rgb(85, 75, 220)" : "gray",
    config: {
      mass: 6,
      tension: 50,
      friction: 20,
      clamp: true,
      easing: "ease-in-out",
    },
  })

  const springRight = useSpring({
    color: hovered ? "#deae91" : "#111827",
    config: { duration: 200 },
  })

  if (!isMobile){
    return (
      <>
        <animated.div
          className="fixed right-0 basebg  border-dotted border-gray-800 h-full m-0 flex "
          style={springWidth}
          onClick={() => setClicked(!clicked)}
        >
          <animated.div
            className="relative basebg p-6 h-full w-7 border-r border-gray-600 border-dotted flex flex-none"
            style={springRight}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => {
              setHovered(false)
            }}
          >
            <div className="absolute top-1/2 right-4 w-full bg-transparent sftext h-10 origin-top-right transform rotate-90 uppercase text-xs p-1 text-center">
              about⇣
            </div>
          </animated.div>
          <About description={homepage.hero.description} />
        </animated.div>
      </>
    )
  } 
  else return ''
}

export default Info
