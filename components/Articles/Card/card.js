import React, { useContext, useState } from "react"
import { MyContext } from "../../../pages"
import { useSpring, animated } from "react-spring"
import Link from "next/link"

export const StyledLink = () => {
  {
    <a>{{ children }}</a>
  }
}

const Card = ({ article, addThumbnails }) => {
  const { currentDirectory, switchDirectory } = useContext(MyContext)
  const [,setCurrentPage] = useContext(MyContext).switchPage
  const [,setAboutPageStatus] = useContext(MyContext).aboutPageStatus

  const [{ color, borderColor }, set] = useSpring(() => ({
    color: "#111827",
    borderColor: "#111827",
    config: {
      duration: 120,
    },
  }))

  const directory = {
    home: [
      article.title ? article.title : "",
      "",
      article.description ? article.description : "",
      "",
    ],
    projects: [
      article.date ? article.date.slice(0, 4) : "",
      article.title ? article.title : "",
      article.description ? article.description : "",
      "",
    ],
    blog: [
      article.date ? article.date.slice(0, 4) : "",
      article.title ? article.title : "",
      article.date ? article.date.slice(5, article.date.length) : "",
      article.category ? article.category.name : "",
    ],
    links: [
      article.title ? article.title : "",
      "",
      article.description ? article.description : "",
      "",
    ],
    notes: [
      article.date ? article.date.slice(0, 4) : "",
      article.title ? article.title : "",
      article.date ? article.date.slice(5, article.date.length) : "",
      article.category ? article.category.name : "",
    ],
  }

  const calcCustomAttributes = (index) => {
    let extraAtt = []

    if (article.title === directory[currentDirectory.title][index]) {
      extraAtt.push("font-normal")
    }
    if (index === 0) {
      extraAtt.push("pl-8")
    }
    if (index === directory[currentDirectory.title].length - 1) {
      extraAtt.push("pr-3")
    }
    return extraAtt.join(" ")
  }

  const checkDirectoryOrPageSelect = (e) => {
    if (currentDirectory.title === "home") {
      switchDirectory(article.title, e)
    } else {
      setAboutPageStatus(false)
      setCurrentPage(article)
  }}


  return (
    <animated.tr
      className="border-t border-b border-dotted border-gray-400"
      style={{ borderColor }}
      onMouseEnter={() => set({ color: "#deae91", borderColor: "#de684e" })}
      onMouseLeave={() => set({ color: "#111827", borderColor: "#111827" })}
    >
      {directory[currentDirectory.title].map((titleSegment, index) => {
        return (
          <Link key={`${article.title}_${index}`} href={article.link ? article.link : "/"} passHref={true}>
            <animated.td
              className={`${calcCustomAttributes(index)} text-2xl sftext font-light capitalize`}
              style={{ color }}
              onMouseEnter={() => addThumbnails(article)}
              onClick={(e) => checkDirectoryOrPageSelect(e)}
            >
              {titleSegment}
            </animated.td>
          </Link>
        )
      })}
    </animated.tr>
  )
}

export default Card
