import Logo from "./Logo"
import Topic from "./Topic"

const LeftSection = () => {
  
  const closeleftbar = () => {
    let lw = document.querySelector(".app-menu");
    lw.classList.add("hideleftbar");
  }

  return (
    <div className="app-menu navbar-menu">            
      <div className="closebtn" onClick={() => closeleftbar()}>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
      <Logo />
      <Topic /> 
    </div>
  )
}

export default LeftSection