import React, { useContext, useState } from "react"
import { MyContext } from "../../../pages"
import { useSpring, animated } from "react-spring"
import Link from "next/link"

export const StyledLink = () => {
  {
    ;<a>{{ children }}</a>
  }
}

const Card = ({ article, addThumbnails }) => {
  const { currentPage, switchDirectory } = useContext(MyContext)
  const [page, setPage] = useContext(MyContext).switchPage
  const [clicked, setClicked] = useContext(MyContext).about
  const isMobile = useContext(MyContext).isMobile


  const [{ color, borderColor }, set] = useSpring(() => ({
    color: "#111827",
    borderColor: "#111827",
    config: {
      duration: 120,
    },
  }))

  const dirTitles = {
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

  const calcAtt = (index) => {
    let extraAtt = []

    if (article.title === dirTitles[currentPage.title][index]) {
      extraAtt.push("font-normal")
    }
    if (index === 0) {
      extraAtt.push("pl-8")
    }
    if (index === dirTitles[currentPage.title].length - 1) {
      extraAtt.push("pr-3")
    }
    return extraAtt.join(" ")
  }

  const cardClick = (e) => {
    if (currentPage.title === "about") {
      setClicked((clicked) => !clicked)
    } else setClicked(true)
    if (currentPage.title === "home") {
      switchDirectory(article.title, e)
    } else setPage(article)
  }

  return (
    <animated.tr
      className="border-t border-b border-dotted border-gray-400"
      style={{ borderColor }}
      onMouseEnter={() => set({ color: "#deae91", borderColor: "#de684e" })}
      onMouseLeave={() => set({ color: "#111827", borderColor: "#111827" })}
    >
      {dirTitles[currentPage.title].map((segment, index) => {
        let extraAtt = calcAtt(index)
        return (
          <Link key={`${article.title}_${index}`} href={article.link ? article.link : "/"} passHref={true}>
            <animated.td
              className={`${extraAtt} text-2xl sftext font-light capitalize`}
              style={{ color }}
              onMouseEnter={() => addThumbnails(article)}
              onClick={(e) => cardClick(e)}
            >
              {segment}
            </animated.td>
          </Link>
        )
      })}
    </animated.tr>
  )
}

export default Card
