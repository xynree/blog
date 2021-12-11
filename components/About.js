import { useContext} from "react"
import { MyContext } from "../pages"

const About = ({ description }) => {

  const isMobile = useContext(MyContext).isMobile

  if (isMobile) {
    return (
    <div className="relative h-full text-xl sflight p-12 flex-none">
      {description}
      </div>)
  }

  else return (
    <div className="m-5 pl-12 pt-36 sflight text-5xl w-96 flex-none">
      {description}
    </div>
  )
}

export default About
