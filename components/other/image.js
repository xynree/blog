import { getStrapiMedia } from "../../lib/media"
import NextImage from "next/image"

// next/image wraps and optimizes images. resizes, optimizes and serves impage in webp to avoid shipping large images

const Image = ({ image, tailwind, addedStyles, objectFit, width, height }) => {
  const { url, alternativeText } = image

  const loader = () => {
    return getStrapiMedia(image)
  }

  return (
    <div className={tailwind} style={addedStyles}>
      <NextImage
        loader={loader}
        layout="responsive"
        width={width ? width : 800}
        height={height ? height : 400}
        objectFit={objectFit}
        src={url}
        alt={alternativeText || ""}
      />
    </div>
  )
}

export default Image
