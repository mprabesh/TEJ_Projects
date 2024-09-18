/* eslint-disable no-alert */

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  // your code here
  let myCoffeeCounter=document.getElementById("coffee_counter")
  myCoffeeCounter.innerText=coffeeQty
}

function clickCoffee(data) {
  data.coffee++
  updateCoffeeView(data.coffee)
  renderProducers(data) // test case for this line comes into the last section
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  // your code here
    producers.filter((val)=>{
    return coffeeCount >=(val.price/2)
    }).map(val=> val.unlocked=true)
    // for(let i=0;i<producers.length;i++){
    //   if(coffeeCount>=(producers[i].price/2)){
    //     producers[i].unlocked=true
    //   }
    // }
}

function getUnlockedProducers(data) {
  // your code here
  unlockProducers(data.producers,data.coffee)
  return data.producers.filter(val=> val.unlocked===true)
}

function makeDisplayNameFromId(id) {
  // your code here
  return id.split('_').map(val=> val[0].toUpperCase()+val.slice(1,val.length)).join(" ")
}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  // your code here
  while(parent.firstChild){
    parent.removeChild(parent.firstChild)
  }

}

function renderProducers(data) {
  // your code here
  let showProducers=document.querySelector("#producer_container")
  deleteAllChildNodes(showProducers) //required to delete all the childNodes
  let final_producers=getUnlockedProducers(data)
  for(key of final_producers){
    showProducers.appendChild(makeProducerDiv(key))
  }
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
  // your code here
  return data.producers.filter((element)=>{
    return element.id===producerId
  })[0]
}

function canAffordProducer(data, producerId) {
  // your code here
  // check for coffee price is greater than tha selected coffee price
  return data.coffee>=(getProducerById(data,producerId).price)? true:false

}

function updateCPSView(cps) {
  // your code here
  document.getElementById('cps').innerText=cps
}

function updatePrice(oldPrice) {
  // your code here
  return Math.floor(oldPrice*1.25) // use floor instead of round as it may cause error in further processes

}

function attemptToBuyProducer(data, producerId) {
  // your code here
  if(canAffordProducer(data,producerId)){
    getProducerById(data,producerId).qty += 1
    data.coffee -= getProducerById(data,producerId).price
    getProducerById(data,producerId).price=updatePrice(getProducerById(data,producerId).price)
    data.totalCPS += getProducerById(data,producerId).cps
    return true
  }else{
    window.alert("Not enough coffee!")
    return false
  }
}

function buyButtonClick(event, data) {
  // your code here
  if(event.target.tagName==="BUTTON"){
    let productID=event.target.id.slice(4,event.target.id.length)
    let canBuy=attemptToBuyProducer(data,productID)
    if(canBuy){
      renderProducers(data)
      updateCPSView(data.totalCPS)
      updateCoffeeView(data.coffee)
    }
  }
  
}

function tick(data) {
  // your code here
  data.coffee += data.totalCPS
  updateCoffeeView(data.coffee)
  renderProducers(data)
}


function saveToLocalStorage(data){
  localStorage.setItem("data",JSON.stringify(data))
}

function getLocalStorage(){
  if(localStorage.getItem("data")){
    return JSON.parse(localStorage.getItem("data"))
  }else{
    return window.data
  }
}

function getDataFromSource(data){
  updateCoffeeView(data.coffee);
  updateCPSView(data.totalCPS);
  renderProducers(data);
}


/*************************
 *  Start your engines!
 *************************/

// You don't need to edit any of the code below
// But it is worth reading so you know what it does!

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === 'undefined') {
  // Get starting data from the window object
  // (This comes from data.js)
  // const data = window.data; // (This is replaced with getLocalStorage)

  let data=getLocalStorage()
  getDataFromSource(data)

  // Add an event listener to the giant coffee emoji
  const bigCoffee = document.getElementById('big_coffee');
  bigCoffee.addEventListener('click', () => clickCoffee(data));

  // Add an event listener to the container that holds all of the producers
  // Pass in the browser event and our data object to the event listener
  const producerContainer = document.getElementById('producer_container');
  producerContainer.addEventListener('click', event => {
    buyButtonClick(event, data);
  });

  // Call the tick function passing in the data object once per second
  setInterval(() => tick(data), 1000);
  setInterval(()=>saveToLocalStorage(data),1000)
}
// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick
  };
}
