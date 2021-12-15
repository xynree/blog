import { useContext } from "react"

import { MyContext } from "../pages"
import { getStrapiMedia } from "../lib/media"

const ThumbnailPreviews = () => {
  const [thumbnails] = useContext(MyContext).addThumbs

  const getRandomPos = () => {
    var randomX = Math.floor(Math.random() * 200)
    var randomY = Math.floor(Math.random() * 100)
    return [randomX, randomY]
  }

  return (
    <div className="w-full h-full">
      {thumbnails
        ? thumbnails.map(({ id, thumbnail, index }) => (
            <img
              key={id}
              className={`fixed filter relative blur-sm drop-shadow-xl`}
              style={{ top: getRandomPos()[1], left: getRandomPos()[0] }}
              src={getStrapiMedia(thumbnail)}
              width={380}
              objectFit="cover"
            />
          ))
        : ""}
    </div>
  )
}

export default ThumbnailPreviews
