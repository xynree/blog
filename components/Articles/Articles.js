import React from "react"
import Card from "./Card/Card"
import { useContext, useMemo } from "react"
import { MyContext } from "../../pages"
import { useSpring, animated } from "react-spring"

const Articles = ({}) => {
  const currentDirectory = useContext(MyContext).currentDirectory
  const [thumbnails, setThumbnails] = useContext(MyContext).addThumbs
  const animatedProps = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

  const addThumbnails = (article) => {
    if (thumbnails.find((thumbnail) => thumbnail.id === article.id)) {
      return
    }
    let copy = thumbnails.concat(article)
    if (copy.length > 3) {
      copy.shift()
    }
    setThumbnails(copy)
  }

return (
    <table className="w-full table-fixed border-collapse divide-y divide-gray-400 divide-dotted">
      <thead className="text-xxs uppercase text-left text-black tracking-wider">
        <tr>
          <th className="pl-8 w-1/8 sflight">{currentDirectory.dirTitles[0]}</th>
          <th className="min-w-1/4 sflight ">{currentDirectory.dirTitles[1]}</th>
          <th className="sflight">{currentDirectory.dirTitles[2]}</th>
          <th className="w-1/8 pr-3 sflight">{currentDirectory.dirTitles[3]}</th>
        </tr>
      </thead>
      <animated.tbody style={animatedProps}>
        {currentDirectory.directory.map((article) => {
          return (
            <Card
              article={article}
              key={article.id}
              addThumbnails={addThumbnails}
            />
          )
        })}
      </animated.tbody>
    </table>
  )
}

const MemoArticles = ({ currentDirectory}) => {
  return useMemo(() => {
    return <Articles />
  }, [currentDirectory])
}

export default MemoArticles
