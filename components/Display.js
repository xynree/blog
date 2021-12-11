import NextImage from "./other/image"
import React, {useContext} from "react"
import { MyContext } from "../pages"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

const Display = () => {
  const currentPage = useContext(MyContext).currentPage
  const [article] = useContext(MyContext).switchPage

  switch (currentPage.title) {
    case "blog":
      return (
        <div className="flex flex-col align-center w-full">
          {article.image
            ? article.image.map((pic) => (
                <NextImage key={pic.id} image={pic} objectFit={"cover"} />
              ))
            : ""}
          <div className="mr-16">
            <div className="text-5xl m-4 sftext text-black">
              {article.title}
            </div>
            {article.date ? (
              <p className="m-4 text-sm italic">
                Created On:{" "}
                <span className=" sfthin text-sm  m-auto"> {article.date}</span>{" "}
              </p>
            ) : (
              ""
            )}
            {article.content ? (
              <p className="m-4 text-black sflight text-lg font-light">
                <ReactMarkdown children={article.content} />
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      )
    case "notes":
      return (
        <div className="flex flex-col align-center w-full">
          {article.image
            ? article.image.map((pic) => (
                <NextImage key={pic.id} image={pic} objectFit={"cover"} />
              ))
            : ""}
          <div className="mr-16">
            <div className="text-5xl m-4 sftext text-black">
              {article.title}
            </div>
            {article.date ? (
              <p className="m-4 text-sm italic">
                Created On:{" "}
                <span className=" sfthin text-sm  m-auto"> {article.date}</span>{" "}
              </p>
            ) : (
              ""
            )}
            {article.content ? (
              <p className="m-4 text-black sflight text-lg font-light">
                <ReactMarkdown children={article.content} />
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      )
    case "projects":
      return (
        <div className="flex flex-col align-center w-full">
          {article.image.map((pic) => (
            <NextImage
              key={pic.id}
              image={pic}
              objectFit={"contain"}
              width={pic.width}
              height={pic.height}
            />
          ))}

          {article.body ? (
            <Link href={article.link ? article.link : "/"} passHref={true}>
              <div className="text-5xl m-4 sflight text-black">
                {article.title ? article.title : ""}
              </div>
            </Link>
          ) : (
            ""
          )}
          {article.body ? (
            <p className="m-4 text-black sflight text-lg font-light">
              <ReactMarkdown children={article.body} />
            </p>
          ) : (
            ""
          )}
        </div>
      )
    case "links":
      return ""
    default:
      return ""
  }
}

export default Display
