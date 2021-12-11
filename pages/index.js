import React, { createContext, useState} from "react"
import { fetchAPI } from "../lib/api"
import { useMediaQuery } from "react-responsive/dist/react-responsive"

import MemoArticles from "../components/Articles/articles"
import Info from "../components/Info"
import Seo from "../components/Seo"
import Profile from "../components/Profile"
import MemoForce from "../components/Force/Force"
import View from "../components/View"
import Display from "../components/Display"
import About from '../components/About'

export const MyContext = createContext({})

const Home = ({ articles, homepage, homes, notes, links, projects }) => {
  const defaultDir = {
    title: "home",
    dirTitles: ["directory", "", "description", ""],
    directory: homes,
  }

  const [currentPage, setCurrentPage] = useState(defaultDir)
  const [thumbnails, setThumbnails] = useState([])
  const [page, setPage] = useState()
  const [clicked, setClicked] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  const switchDirectory = (title, e) => {
    e.preventDefault()
    switch (title) {
      case "home":
        setCurrentPage(defaultDir)
        break
      case "blog":
        setCurrentPage({
          title: "blog",
          dirTitles: ["year", "title", "date", "category"],
          directory: articles,
        })
        break
      case "notes":
        setCurrentPage({
          title: "notes",
          dirTitles: ["year", "title", "date", "category"],
          directory: notes,
        })
        break
      case "links":
        setCurrentPage({
          title: "links",
          dirTitles: ["title", "", "description", ""],
          directory: links,
        })
        break
      case "projects":
        setCurrentPage({
          title: "projects",
          dirTitles: ["year", "title", "description", ""],
          directory: projects,
        })
        break
      case "about":
        setClicked((clicked) => !clicked)
      default:
        break
    }
  }

if (isMobile) {
  return (<MyContext.Provider
    value={{
      currentPage: currentPage,
      switchDirectory: switchDirectory,
      addThumbs: [thumbnails, setThumbnails],
      about: [clicked, setClicked],
      switchPage: [page, setPage],
      isMobile: isMobile
    }}
  >
    <div className="top-0 flex flex-col w-full h-full flex-none overflow-scroll justify-evenly divide-x divide-gray-700 divide-dotted basebg">
      <div className='flex-none w-full h-1/3'>
      <Seo seo={homepage.seo} />
        <div className="w-full flex-none">
          <Profile title={homepage.hero.title} />
          <About description={homepage.hero.description}/>
        </div>
        <MemoArticles
          currentPage={currentPage}
          switchDirectory={switchDirectory}
        />
        </div>
      
      <div className="flex justify-between h-2/3 flex-none w-full  divide-x divide-gray-600 border-dotted  basebg overflow-scroll">
        {page ? (
          <>
            <Display />
          </>
        ) : (
''        )}
      </div>
    </div>
  </MyContext.Provider>)

}

else return (
    <MyContext.Provider
      value={{
        currentPage: currentPage,
        switchDirectory: switchDirectory,
        addThumbs: [thumbnails, setThumbnails],
        about: [clicked, setClicked],
        switchPage: [page, setPage],
      }}
    >
      <div className="absolute flex justify-evenly divide-x divide-gray-700 divide-dotted w-full h-full">
        <Seo seo={homepage.seo} />
        <div className="flex flex-col w-full h-full float-left cursor-pointer overflow-scroll justify-start align-start p-0">
          <div className="h-28 flex-none">
            <Profile title={homepage.hero.title} />
          </div>
          <div className="relative flex justify-center align-center flex-none">
            <MemoForce switchDirectory={switchDirectory} />
          </div>
          <div className="h-7 flex-none"></div>
          <MemoArticles
            currentPage={currentPage}
            switchDirectory={switchDirectory}
          />
        </div>
        <div className="flex justify-between h-full w-full  divide-x divide-gray-600 border-dotted float-right overflow-scroll">
          {page ? (
            <>
              {" "}
              <Display />
              <Info homepage={homepage} />
            </>
          ) : (
            <>
              <View />
              <Info homepage={homepage} />
            </>
          )}
        </div>
      </div>
    </MyContext.Provider>
  )
}

// API call gets made here and all props get sent down to children components:

export async function getServerSideProps() {
  // Run API calls in parallel
  const [articles, categories, homepage, homes, notes, links, projects] =
    await Promise.all([
      fetchAPI("/articles"),
      fetchAPI("/categories"),
      fetchAPI("/homepage"),
      fetchAPI("/homes"),
      fetchAPI("/notes"),
      fetchAPI("/links"),
      fetchAPI("/projects"),
    ])

  return {
    props: { articles, categories, homepage, homes, notes, links, projects },
  }
}

export default Home
