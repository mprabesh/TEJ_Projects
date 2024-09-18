// Your code here
let gameTable=document.getElementsByTagName("table")[0]
let addButton=document.querySelector('#add-row')
let selectColour=document.getElementsByTagName('select')[0]
let choosenColor='blue'

document.addEventListener('keydown',(e)=>{
  if(e.key==="Escape"){
    location.reload()
  }
})


selectColour.addEventListener('change',pickColor)
gameTable.addEventListener('click',colorize)

addButton.addEventListener('click',(e)=>{
    addRow()
})

// understand the table tag in HTML
//Generate Rows
function addRow(){
    let row=document.createElement('tr')
    for(let i=0;i<20;i++){
        let td=document.createElement('td')
        row.appendChild(td)
    }
    gameTable.appendChild(row)
}


function colorize (event) {
    const target = event.target
    if (target.tagName !== 'TD') {
      return
    }
    if (target.className === choosenColor) {
      target.className = ''
    } else {
      target.className = choosenColor
    }
  }

  function pickColor (event) {
    choosenColor = event.target.value
  }


  
  /*
    first listen for click event then inside its callback
    listen for mouseover Event and paint the grids.

    In next block of the code listen for mouseup 
    event to stop painting the grid.

  */