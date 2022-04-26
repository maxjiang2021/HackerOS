size("fv")
size("cmd")
size("term")
size("code")
size("prog")
size("hax")
size("help")
size("crack")

function size(id){
    makeResizable(document.getElementById(id),0,0,10)
    dragElement(document.getElementById(id))
}

var allowmove = true
var czx = 999

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    for (a of document.querySelectorAll("iframe")){
        a.style.pointerEvents = "none"
    }
    onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    onmousemove = elementDrag;
    // document.body.appendChild(elmnt)
    elmnt.style.zIndex = ++czx;
  }

  function elementDrag(e) {
    if (allowmove == false){
        return
    }
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    onmouseup = null;
    for (a of document.querySelectorAll("iframe")){
        a.style.pointerEvents = "auto"
    }
    onmousemove = null;
  }
}


onload=()=>{
    for (b of document.querySelectorAll("div.buttons")){
        b.addEventListener("click",(e)=>{
            console.log(e.clientX-e.target.getBoundingClientRect().left,e.target.offsetWidth)
            if (e.clientX-e.target.getBoundingClientRect().left>e.target.offsetWidth-15){
                e.target.parentElement.hidden = true
                console.log(e.target.parentElement.id)
                tbp(e.target.parentElement.id,false,'lol')
                return
            }
            if (e.clientX-e.target.getBoundingClientRect().left>e.target.offsetWidth-35){
                if (e.target.parentElement.getAttribute("data-fullscreen")){
                    let rects = JSON.parse(e.target.parentElement.getAttribute("data-fullscreen"))
                    e.target.parentElement.style.top = rects.y+"px"
                    e.target.parentElement.style.left = rects.x+"px"
                    e.target.parentElement.style.width = rects.width+"px"
                    e.target.parentElement.style.height = rects.height+"px"
                    e.target.parentElement.removeAttribute("data-fullscreen")
                    e.target.removeAttribute("fsc")
                } else{
                    e.target.parentElement.setAttribute("data-fullscreen",JSON.stringify(e.target.parentElement.getBoundingClientRect()))
                    e.target.parentElement.style.top = "0px"
                    e.target.parentElement.style.left = "0px"
                    e.target.parentElement.style.width = "calc(100vw - 10px)"
                    e.target.parentElement.style.height = "calc(100vh - 38px)"
                    e.target.setAttribute("fsc","true")
                }
                return
            }
            if (e.clientX-e.target.getBoundingClientRect().left>e.target.offsetWidth-55){
                e.target.parentElement.hidden = true;
                return
            }
        }
        )
    }

    for (c of document.querySelectorAll("div.desktop")){
        c.addEventListener("click",(e)=>{
            console.log("Clickx")
            e.target.style.color = "lightblue"
            e.target.style.border = "1px solid lightblue"
            e.target.setAttribute("selected","true")
            setTimeout(()=>{            
                addEventListener("click",(j)=>{
                    console.log("Click2")
                    for (d of document.querySelectorAll("div.desktop")){
                        if (d==j.target){
                            continue
                        }
                        d.style.color = "black"
                        d.style.border = "1px solid transparent"
                        d.setAttribute("selected","false")
                    }
                },{once:true})
            },1)
        })
    }
}