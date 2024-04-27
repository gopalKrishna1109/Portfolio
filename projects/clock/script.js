// Calculate rotation for hour hand
// 12 hours = 360deg
// 1 hour = 360/12 = 30deg
// h hours = 30h + (Hour hand always moves some negligible amount)

// 60 mins = 30deg
// 1 min = 30/60 = 1/2
// m mins = (1/2)m

// h hours = 30h + (1/2)m

// Now calculate rotation for min hand
// 60 min = 360deg
// 1 min = 360/60 = 6deg
// m min = 6m 

// Finally, calculate the rotation for sec hand
// 60 sec = 360deg
// 1 sec = 360/60 = 6deg
// s sec = 6s deg

let hr = document.getElementById("hour")                        
let min = document.getElementById("min")                        
let sec = document.getElementById("sec")

function displayTime(){
    let date = new Date();   //Date gives the wholr timestamp
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotation = (30*hh)+(mm/2)
    let mRotation = 6*mm
    let sRotation = 6*ss

    hr.style.transform = `rotate(${hRotation}deg)`
    min.style.transform = `rotate(${mRotation}deg)`
    sec.style.transform = `rotate(${sRotation}deg)`
}

setInterval(displayTime,1000)