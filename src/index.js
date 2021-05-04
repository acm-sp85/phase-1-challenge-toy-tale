let addToy = false;
const toyCollection = document.getElementById("toy-collection")
const toyCollectionArray = []



document.addEventListener("DOMContentLoaded", () => {
  
  
  getStuff()
  const addBtn = document.querySelector("#new-toy-btn");
  
  
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    
  });
  
  
  

  const submitButton = document.querySelector(".add-toy-form")

  submitButton.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputText = document.querySelector('[name="name"]')
    const inputImg = document.querySelector('[name="image"]')


    const objectRequest = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${inputText.value}`,
        "image": `${inputImg.value}`,
        "likes": 0
      })
    }

    fetch(`http://localhost:3000/toys`, objectRequest)




  });
})
//DOM LOADED






const getStuff = () => {
  fetch(`http://localhost:3000/toys`)
  .then((result) => result.json())
  .then((data) => {
    
    data.forEach(element => {
      toyCollectionArray.push(element)
      
      
      const div = document.createElement('div')
      const p = document.createElement('p')
      const h2 = document.createElement('h2')
      const button = document.createElement('button')
      const img = document.createElement('img')
      
      
      div.className = "card"
      p.innerHTML = `${element.likes} Likes`
      h2.innerHTML = `${element.name}`
      button.className = "like-btn"
      button.id = `${element.id}`
      button.innerHTML = "Like"
      img.src = `${element.image}`
      img.className = "toy-avatar"
      
      
    
      button.addEventListener('click', (event) =>{
        event.preventDefault()

        const objectPatch = {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": element.likes+1
          })
        }
    
        fetch(`http://localhost:3000/toys/${element.id}`, objectPatch)



      })
      
      div.append(h2)
      div.append(img)
      div.append(p)
      div.append(button)
      toyCollection.append(div)
      

      });
      return data

    })
  }
  
  
  
  






