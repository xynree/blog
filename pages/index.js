import React, { createContext, useState} from "react"
import { fetchAPI } from "../lib/api"
import { useMediaQuery } from "react-responsive/dist/react-responsive"

import MemoArticles from "../components/Articles/Articles"
import AboutContainer from "../components/AboutContainer"
import Seo from "../components/Seo"
import SiteHeader from "../components/SiteHeader"
import MemoForce from "../components/Force/Force"
import ThumbnailPreviews from "../components/ThumbnailPreviews"
import ContentDisplay from "../components/ContentDisplay"
import About from '../components/About'

export const MyContext = createContext({})

const Home = ({ articles, homepage, homes, notes, links, projects }) => {
  const defaultDir = {
    title: "home",
    dirTitles: ["directory", "", "description", ""],
    directory: homes,
  }

  const [currentDirectory, setCurrentDirectory] = useState(defaultDir)
  const [thumbnails, setThumbnails] = useState([])
  const [currentPage, setCurrentPage] = useState('')
  const [isAboutPageVisible, setAboutPageStatus] = useState(true)
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })


  const switchDirectory = (title, e) => {
    e.preventDefault()
    switch (title) {
      case "home":
        setCurrentDirectory(defaultDir)
        break
      case "blog":
        setCurrentDirectory({
          title: "blog",
          dirTitles: ["year", "title", "date", "category"],
          directory: articles,
        })
        break
      case "notes":
        setCurrentDirectory({
          title: "notes",
          dirTitles: ["year", "title", "date", "category"],
          directory: notes,
        })
        break
      case "links":
        setCurrentDirectory({
          title: "links",
          dirTitles: ["title", "", "description", ""],
          directory: links,
        })
        break
      case "projects":
        setCurrentDirectory({
          title: "projects",
          dirTitles: ["year", "title", "description", ""],
          directory: projects,
        })
        break
      case "about":
        setAboutPageStatus((isAboutPageVisible) => !isAboutPageVisible)
      default:
        break
    }
  }

  if (isMobile) {
  return (
  <MyContext.Provider
    value={{
      currentDirectory: currentDirectory,
      switchDirectory: switchDirectory,
      addThumbs: [thumbnails, setThumbnails],
      aboutPageStatus: [isAboutPageVisible, setAboutPageStatus],
      switchPage: [currentPage, setCurrentPage],
      isMobile: isMobile
  }}>
      
    <div className="top-0 flex flex-col w-full h-full flex-none overflow-scroll nodisplay justify-evenly divide-x divide-gray-700 divide-dotted basebg">
      <div className='flex-none w-full h-1/3'>
      <Seo seo={homepage.seo} />
        <div className="w-full flex-none">
          <SiteHeader title={homepage.hero.title} />
          <About description={homepage.hero.description}/>
        </div>
        <MemoArticles
          currentDirectory={currentDirectory}
          switchDirectory={switchDirectory}
        />
        </div>
      
      <div className="flex justify-between h-2/3 flex-none w-full  divide-x divide-gray-600 border-dotted  basebg overflow-scroll nodisplay">
        {
        currentPage === '' ? 
        '' 
        :  
        <><ContentDisplay/></>
        }
      </div>
    </div>
  </MyContext.Provider>
  )
}

else return (
  <MyContext.Provider
    value={{
      currentDirectory: currentDirectory,
      switchDirectory: switchDirectory,
      addThumbs: [thumbnails, setThumbnails],
      aboutPageStatus: [isAboutPageVisible, setAboutPageStatus],
      switchPage: [currentPage, setCurrentPage],
    }}
  >
    <div className="absolute flex justify-evenly divide-x divide-gray-700 divide-dotted w-full h-full">
      <Seo seo={homepage.seo} />
      <div className="flex flex-col w-full h-full float-left cursor-pointer overflow-scroll nodisplay justify-start align-start p-0">
        <div className="h-28 flex-none">
          <SiteHeader title={homepage.hero.title} />
        </div>
        <div className="relative flex justify-center align-center flex-none">
          <MemoForce switchDirectory={switchDirectory} />
        </div>
        <div className="h-7 flex-none"></div>
        <MemoArticles
          currentDirectory={currentDirectory}
          switchDirectory={switchDirectory}
        />
      </div>
      <div className="flex justify-between h-full w-full  divide-x divide-gray-600 border-dotted float-right overflow-scroll nodisplay">
      {currentPage === '' ? 
        <>
          <ThumbnailPreviews />
          <AboutContainer homepage={homepage} />
        </>
        :  
        <>
        <ContentDisplay />
        <AboutContainer homepage={homepage} />
        </>}
      
      </div>
    </div>
  </MyContext.Provider>
  )
}

// API call gets made here and all props get sent down to children components:

export async function getStaticProps() {
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
