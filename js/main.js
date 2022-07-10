// TODO List (pour comprendre et voir plus simplement installez Better Comments)
//* 1 - Génération du canvas + chargement de l'image (Livrables)
//* 2 - Ajout du personnage (Livrables)
//* 3 - Ajout des collisions et des events sur la map 
//* 3.5 - Ajouter une description suite à un événement (e.g: parler à un pnj) (Livrables)
//* 4 - Ajout de l'inventaire et d'items, ainsi que l'utilisation de ces derniers (Livrables)
// TODO 5 - Ajout des zones nécéssitant un item dans l'inventaire (Livrables)
// TODO 6 - Ajouter le changement de zone changement de zone (Livrables)



import loop, {tile_sheet} from "./map.js";
tile_sheet.addEventListener("load", () => { loop(); });
tile_sheet.src = "img/gameAssets/tiles.png";