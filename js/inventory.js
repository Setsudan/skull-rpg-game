//? Liste vide pour représenter l'inventaire de base du perso
export const inventory = [];

//? Séléctionne une div dans le DOM qui affichera la liste des items
let visualInventory = document.getElementById("inventory")

//? Fonction pour ajouter un item à l'inventaire && l'afficher sur le dom
export default function addItemToInventory(itemUID){
  inventory.push(itemUID)
  inventory.forEach(item => {
    let box = document.createElement("div")
    box.classList.add("item")
    box.classList.add(item)
    visualInventory.appendChild(box)
  });
}