import { useSpring, animated } from "react-spring"
import React, { useContext, useState } from "react"
import { MyContext } from "../pages"

const SiteHeader = ({ title }) => {
  const { switchDirectory } = useContext(MyContext)

  const [{ color }, set] = useSpring(() => ({
    color: "#111827",
    config: {
      duration: 200,
    },
  }))
  
  return (
    <animated.div
      style={{ color }}
      className="text-center w-full h-full  left-0 right-0 m-auto lg:text-4xl md:text-3xl sm:text-2xl  font-sans leading-8 pt-7 font-light tracking-wide text-bold"
      onMouseEnter={() => set({ color: "#deae91" })}
      onMouseLeave={() => set({ color: "#111827" })}
      onClick={(e) => switchDirectory("home", e)}
    >
      {title}
    </animated.div>
  )
}

export default SiteHeader
