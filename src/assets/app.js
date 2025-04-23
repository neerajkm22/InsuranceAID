export const toggleLeftMenu = () => {
	let mc = document.querySelector(".main-content");
	let pt = document.querySelector("#page-topbar");
	let lw = document.querySelector(".app-menu");
	let hi = document.querySelector(".hamburger-icon");
	let ft = document.querySelector(".footer");
	
	if(lw.classList.contains("hideleftbar") == true){ 
		lw.classList.remove("hideleftbar");
	}
	
	if(hi.classList.contains("open") == false){		
		mc.classList.add("expand-main-content");
		pt.classList.add("expand-page-topbar");
		lw.classList.add("hide-app-menu");
		hi.classList.add("open");
		ft.classList.add("expand-footer");
	} else {
		mc.classList.remove("expand-main-content");
		pt.classList.remove("expand-page-topbar");
		lw.classList.remove("hide-app-menu");
		hi.classList.remove("open");
		ft.classList.remove("expand-footer");
	}	
  }

export const checkViewPort = () => {
	let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	let lw = document.querySelector(".app-menu");
	
	if(vw <= 767.98) {		
        lw.classList.add("hideleftbar");
	} else {
        if(lw?.classList.contains("hideleftbar") == true){ 
			lw.classList.remove("hideleftbar");
		}
	}
}