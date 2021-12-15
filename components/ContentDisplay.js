import NextImage from "./other/image"
import React, {useContext} from "react"
import { MyContext } from "../pages"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

const ContentDisplay = () => {
  const currentDirectory = useContext(MyContext).currentDirectory
  const [currentPage] = useContext(MyContext).switchPage

  switch (currentDirectory.title) {
    case "blog":
      return (
        <div className="flex flex-col align-center w-full">
          {currentPage.image
            ? currentPage.image.map((pic) => (
                <NextImage key={pic.id} image={pic} objectFit={"cover"} />
              ))
            : ""}
          <div className="mr-16">
            <div className="text-5xl m-4 sftext text-black">
              {currentPage.title}
            </div>
            {currentPage.date ? (
              <p className="m-4 text-sm italic">
                Created On:{" "}
                <span className=" sfthin text-sm  m-auto"> {currentPage.date}</span>{" "}
              </p>
            ) : (
              ""
            )}
            {currentPage.content ? (
              <p className="m-4 text-black sflight text-lg font-light">
                <ReactMarkdown children={currentPage.content} />
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
          {currentPage.image
            ? currentPage.image.map((pic) => (
                <NextImage key={pic.id} image={pic} objectFit={"cover"} />
              ))
            : ""}
          <div className="mr-16">
            <div className="text-5xl m-4 sftext text-black">
              {currentPage.title}
            </div>
            {currentPage.date ? (
              <p className="m-4 text-sm italic">
                Created On:{" "}
                <span className=" sfthin text-sm  m-auto"> {currentPage.date}</span>{" "}
              </p>
            ) : (
              ""
            )}
            {currentPage.content ? (
              <p className="m-4 text-black sflight text-lg font-light">
                <ReactMarkdown children={currentPage.content} />
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
          {currentPage.image.map((pic) => (
            <NextImage
              key={pic.id}
              image={pic}
              objectFit={"contain"}
              width={pic.width}
              height={pic.height}
            />
          ))}

          {currentPage.body ? (
            <Link href={currentPage.link ? currentPage.link : "/"} passHref={true}>
              <div className="text-5xl m-4 sflight text-black">
                {currentPage.title ? currentPage.title : ""}
              </div>
            </Link>
          ) : (
            ""
          )}
          {currentPage.body ? (
            <p className="m-4 text-black sflight text-lg font-light">
              <ReactMarkdown children={currentPage.body} />
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

export default ContentDisplay
