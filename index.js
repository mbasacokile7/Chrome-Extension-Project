// Create actions that happen using the addEventListener method

//If possible use const, if not use let

//Philosophy: Make it work, and then make it better.

//DOM Manipulation has a cost. Computational Cost

// To check if a value is truthy or falsey, use Boolean()

// The Chrome Extension must be deployed in order for it to function properly.
//Particularly the save-tab button, which uses chrome.tabs.query method from the Chrome API to find the active tab in the currentWindow

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
//Get leads from localStorage
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//Check to see if there are any leads
if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  render(myLeads)
}


// leads in the function below is a parameter
// When the function is called, myLeads is an argument
function render(leads){
  listItems = ""
    for (let i = 0; i < leads.length; i++){

       listItems += `<li><a  href='${leads[i]}' target = '_blank' > ${leads[i]} </a></li>`
       //console.log(listItems)
    }
  ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })

})

deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

// First argument is the type of event,  which in this case is a click
// Second Argument is the function that will do what we want
inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value)
  inputEl.value = ""
  //Save myLeads to Localstorage, JSON.stringify is used to convert an array to a string
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
  //console.log(localStorage.getItem("myLeads"))
})
