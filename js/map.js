import { inventory } from "./inventory.js";
import addItemToInventory from "./inventory.js";
import { Player } from "./Player.js";
import { Viewport } from "./Viewport.js";

let place;
let world;

let scaled_size = 32; // Taille voulu pour le perso
let columns = 40;
let rows = 30;

let sprite_size = 16;
let map = [];

let title = document.getElementById("location-title");
let description = document.getElementById("location-desc");

const renderMap = (place) => {
  if (place == "overworld") {
    scaled_size = 32; // Taille voulu pour le perso
    columns = 40;
    rows = 30;
    //* ça nous à pris + 3 heures à remplir les 1200 cases à la main
    //* Au cas où vous nous prendriez pour des tricheurs ayant utiliser un program tierse pour faire cette map, vous pourrez trouvez dans le zip une vidéo
    //* Vous montrant les débuts de l'écriture de la map
    //* Nous n'avons pas enregistrer la totalité de l'écriture de la map car il y a eu beaucoup de pause.
    //* Liste complète des tuiles dans img/gameAssets/v2/tiles.txt
    //* Level design par Veljko
    map = [
      /// Ligne 1
      41, 42, 43, 4, 4, 4, 4, 32, 33, 34, 28, 4, 32, 33, 34, 68, 4, 4, 29, 17,
      15, 19, 19, 19, 19, 19, 19, 20, 28, 35, 36, 37, 69, 69, 35, 36, 37, 69, 4,
      4,
      // Ligne 2
      44, 45, 46, 32, 33, 34, 14, 35, 36, 37, 14, 14, 35, 36, 37, 14, 32, 33,
      34, 15, 25, 19, 19, 19, 19, 19, 27, 33, 34, 38, 39, 40, 66, 29, 14, 13,
      14, 14, 14, 66,
      // Ligne 3
      47, 48, 49, 35, 36, 37, 14, 38, 39, 40, 67, 14, 38, 39, 40, 66, 35, 36,
      37, 25, 19, 19, 19, 19, 19, 16, 35, 36, 37, 14, 14, 13, 14, 14, 31, 14,
      14, 14, 13, 28,
      // Ligne 4
      50, 51, 52, 38, 39, 40, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 38, 39,
      15, 19, 19, 19, 19, 19, 19, 19, 38, 39, 40, 29, 21, 16, 16, 16, 16, 16,
      16, 16, 16, 16,
      // Ligne 5
      5, 72, 72, 72, 6, 7, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 41, 42, 43,
      19, 19, 19, 19, 19, 19, 19, 19, 19, 13, 25, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19,
      // Ligne 6
      14, 1, 2, 72, 72, 72, 6, 7, 14, 14, 14, 32, 33, 34, 14, 14, 44, 45, 46,
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19,
      // Ligne 7
      14, 14, 14, 64, 28, 72, 72, 72, 6, 14, 14, 35, 36, 37, 14, 14, 47, 48, 49,
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19,
      // Ligne 8
      16, 17, 14, 14, 14, 14, 2, 72, 72, 72, 6, 38, 39, 40, 7, 14, 50, 51, 52,
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19,
      // Ligne 9
      19, 20, 53, 58, 58, 58, 55, 2, 72, 72, 72, 6, 7, 8, 72, 72, 72, 72, 72,
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19,
      // Ligne 10
      19, 20, 56, 14, 13, 14, 56, 13, 1, 2, 72, 72, 72, 72, 72, 0, 1, 1, 1, 26,
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 27, 22, 22, 22, 22, 22, 22, 22,
      22, 22,
      // Ligne 11
      19, 20, 56, 14, 14, 14, 57, 59, 64, 14, 1, 28, 14, 5, 72, 3, 14, 14, 14,
      14, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14,
      // Ligne 12
      19, 20, 56, 14, 14, 14, 67, 14, 56, 14, 14, 14, 14, 5, 72, 6, 7, 31, 14,
      30, 14, 14, 14, 14, 14, 14, 14, 14, 14, 8, 72, 72, 64, 14, 14, 70, 14, 14,
      14, 14,
      // Ligne 13
      19, 20, 56, 14, 14, 14, 14, 14, 56, 14, 14, 67, 14, 5, 72, 72, 72, 6, 7,
      7, 14, 14, 29, 32, 33, 34, 29, 14, 5, 72, 72, 0, 14, 14, 14, 31, 14, 70,
      14, 14,
      // Ligne 14
      19, 20, 57, 60, 61, 62, 58, 58, 59, 14, 14, 14, 14, 14, 1, 2, 72, 72, 72,
      72, 6, 7, 14, 35, 36, 37, 14, 14, 8, 72, 0, 14, 14, 14, 32, 33, 34, 14,
      14, 14,
      // Ligne 15
      19, 20, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 64, 14, 14, 15, 16, 1, 2,
      72, 72, 72, 3, 38, 39, 40, 14, 8, 72, 72, 3, 14, 69, 14, 35, 36, 37, 14,
      14, 14,
      // Ligne 16
      19, 24, 17, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 16, 25, 19, 24,
      17, 1, 2, 72, 6, 14, 14, 14, 8, 72, 72, 0, 346, 14, 14, 14, 38, 39, 40, 70,
      14, 14,
      // Ligne 17
      19, 19, 24, 17, 14, 14, 14, 14, 14, 14, 14, 14, 15, 25, 19, 19, 19, 19,
      24, 17, 5, 72, 72, 6, 7, 8, 72, 72, 0, 14, 14, 14, 69, 32, 33, 34, 14, 14,
      14, 14,
      // Ligne 18
      19, 19, 19, 24, 17, 14, 69, 14, 14, 15, 16, 16, 25, 19, 19, 19, 19, 19,
      19, 24, 17, 2, 72, 72, 72, 72, 72, 0, 32, 33, 34, 14, 14, 35, 36, 37, 14,
      14, 14, 14,
      // Ligne 19
      19, 19, 19, 19, 24, 16, 16, 16, 16, 25, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 27, 14, 14, 2, 72, 72, 72, 0, 14, 35, 36, 37, 69, 69, 38, 39, 40, 14,
      14, 14, 14,
      // Ligne 20
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 27,
      22, 14, 14, 14, 14, 1, 2, 72, 3, 14, 38, 39, 40, 32, 33, 34, 32, 33, 34,
      14, 14, 14,
      // Ligne 21
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 27, 22, 14,
      14, 32, 33, 34, 28, 14, 14, 1, 14, 14, 14, 14, 65, 35, 36, 37, 35, 36, 37,
      32, 33, 34,
      // Ligne 22
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 27, 67, 30, 32, 33,
      34, 35, 36, 37, 14, 14, 14, 28, 32, 33, 34, 14, 14, 38, 39, 40, 38, 39,
      40, 35, 36, 37,
      // Ligne 23
      19, 19, 19, 19, 19, 19, 27, 30, 22, 22, 22, 22, 22, 14, 14, 14, 35, 36,
      37, 38, 39, 40, 32, 33, 34, 14, 35, 36, 37, 14, 14, 14, 14, 14, 63, 14,
      14, 38, 39, 40,
      // Ligne 24
      19, 19, 19, 19, 19, 19, 24, 17, 67, 14, 14, 67, 30, 14, 14, 30, 38, 39,
      40, 14, 14, 14, 35, 36, 37, 14, 38, 39, 40, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 64, 14,
      // Ligne 25
      19, 19, 19, 19, 19, 19, 19, 24, 16, 17, 30, 14, 14, 14, 14, 14, 14, 14,
      32, 33, 34, 14, 38, 39, 40, 32, 33, 34, 32, 33, 34, 32, 33, 34, 14, 14,
      14, 14, 14, 14,
      // Ligne 26
      19, 19, 19, 19, 19, 19, 19, 19, 19, 24, 16, 16, 17, 14, 30, 67, 14, 14,
      35, 36, 37, 14, 32, 33, 34, 35, 36, 37, 35, 36, 37, 35, 36, 37, 14, 14,
      14, 14, 14, 14,
      // Ligne 27
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 24, 16, 16, 16, 17, 14,
      38, 39, 40, 14, 35, 36, 37, 38, 39, 40, 38, 39, 40, 38, 39, 40, 14, 14,
      14, 73, 14, 14,
      // Ligne 28
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 24, 16,
      16, 16, 16, 16, 38, 39, 40, 14, 14, 14, 14, 32, 33, 34, 32, 33, 34, 32,
      33, 34, 64, 14,
      // Ligne 29
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19, 19, 24, 16, 16, 16, 16, 17, 14, 35, 36, 37, 35, 36, 37, 35,
      36, 37, 14, 14,
      // Ligne 30
      19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
      19, 19, 19, 19, 19, 19, 19, 19, 19, 24, 17, 38, 39, 40, 38, 39, 40, 38,
      39, 40, 14, 14,
    ];
    console.log(map.length == columns * rows);
    title.textContent = "La prairie calme du monde valtina";
    description.textContent = "Mon ptit chez moi";
    world = place;
    return columns, rows, map, world;
  } else if (place == "house") {
    scaled_size = 24;
    columns = 17;
    rows = 16;
    map = [];
    //* Génération semi-procédurale à cause du PTSD de la map overworld
    //* level design par Arsène
    for (let index = 0; index <= columns * rows; index++) {
      map.push(74 + index);
    }
    console.log(map.length == columns * rows);
    title.textContent = "La maison de Frodon";
    description.textContent = "....Pourquoi je suis rentré déjà ?";
    world = place;
    return columns, rows, map, world;
  }
};

//? Le contexte du canvas
let context = document.querySelector("canvas").getContext("2d");

//? Largeur && hauteur du canvas feront la hauteur et la largeur de la page peut import la taill de l'écran
let height = window.innerHeight;
let width = window.innerWidth;

//? Appel des classes faites dans Player.js && Viewport.js
let player = new Player(250, 250);
let viewport = new Viewport(200, 200, 750, 750);

//? Position initial du perso
let pointer = { x: 80, y: 115 };
place = "overworld";
window.onload = renderMap(place);

export default function loop() {
  //? Fonction qui loop pour mettre à jour le contenu du canvas
  window.requestAnimationFrame(loop);
  let height = window.innerHeight;
  let width = window.innerWidth;

  //? Change la taille du canvas toute les secondes
  context.canvas.height = height;
  context.canvas.width = width;

  //? Enlève l'antialiasing des images affiché
  context.imageSmoothingEnabled = false;

  player.moveTo(pointer.x, pointer.y);
  viewport.scrollTo(player.x, player.y);

  //? Récupère le min et max de chaque ligne et colonne.
  //? Pour le min des lignes et colonne on utilise floor pour arrondir vers le bas
  //? et pour le max on utilise ceil pour arrondir vers le haut

  let x_min = Math.floor(viewport.x / scaled_size);
  let y_min = Math.floor(viewport.y / scaled_size);
  let x_max = Math.ceil((viewport.x + viewport.w) / scaled_size);
  let y_max = Math.ceil((viewport.y + viewport.h) / scaled_size);

  //? Empêche le background repeat du canvas si les tuiles dépassent la première/dernière ligne/colonnes
  if (x_min < 0) x_min = 0;
  if (y_min < 0) y_min = 0;
  if (x_max > columns) x_max = columns;
  if (y_max > rows) y_max = rows;

  //? Loop à travers les tuiles dans la carte, mais seulement entre le min
  //? et max les colonnes et les lignes que la limite du Viewport.On utilise deux
  //? boucles, une pour les colonnes (x) et une pour les lignes (y) de la carte.
  for (let x = x_min; x < x_max; x++) {
    for (let y = y_min; y < y_max; y++) {
      let value = map[y * columns + x]; //? Valeur de la tuile
      let tile_x = Math.floor(
        x * scaled_size - viewport.x + width * 0.5 - viewport.w * 0.5
      ); //? Destination de la tuile sur l'axe x
      let tile_y = Math.floor(
        y * scaled_size - viewport.y + height * 0.5 - viewport.h * 0.5
      ); //? Destination de la tuile sur l'axe y

      //? Render la map tuile par tuile
      context.drawImage(
        tile_sheet,
        value * sprite_size,
        0,
        sprite_size,
        sprite_size,
        tile_x,
        tile_y,
        scaled_size,
        scaled_size
      );
    }
  }

  //? Code pour récup la tuile sur laquelle le joueur se trouve
  let player_index =
    Math.floor((player.y + scaled_size * 0.5) / scaled_size) * columns +
    Math.floor((player.x + scaled_size * 0.5) / scaled_size);

  //? Ajout des event quand on marche sur une tuile spécifique

  //* Coffre
  if (map[player_index] == 73) {
    map[player_index] = 14;
    addItemToInventory("House_Key");
  }

  //* Retirer coffre si item déjà présent dans l'inventaire
  if (inventory.includes("House_Key")) {
    let chest = map.indexOf(73);
    map[chest] = 14;
  }
  //* Maisons

  //* Maison 1
  if (pointer.x > 70 && pointer.x < 80 && pointer.y > 80 && pointer.y < 120) {
    description.textContent =
      "Désolé ptite chou je suis partie la maison est fermé à clefs - Maman";
  }
  //* Maison 2
  window.addEventListener("keydown", (e) => {
    if (e.key == "e") {
      if (
        pointer.x > 570 &&
        pointer.x < 595 &&
        pointer.y > 190 &&
        pointer.y < 230
      ) {
        if (inventory.includes("House_Key")) {
          description.textContent =
            "La porte est dévérouiller mais je suis débile je sais pas ouvrir les portes";
          renderMap("house");
          pointer.x = 0;
        } else {
          description.textContent = "La porte est fermé à clef.";
        }
      }
      if (pointer.y >= 230) {
        pointer.x = 570;
        pointer.y = 231;
        renderMap("overworld");
      }
    }
  });
  //* Autres tuiles

  //* Champignon
  if (map[player_index] == 68 || map[player_index] == 67) {
    description.textContent = "EUUUURGGHHH ! des champignon";
  }

  //* Pancarte
  if (map[player_index] == 65) {
    description.textContent =
      "Vous vous trouvez dans le fin fond de mon fion - by Frodon";
  }

  //* Pierre
  if (map[player_index] == 30 || map[player_index] == 31) {
    let trip_counter = Math.floor(Math.random() * 6);
    switch (trip_counter) {
      case 0:
        trip_counter += 1;
        description.textContent = "Ah un caillou";
        break;
      case 1:
        description.textContent = "Encore un caillou";
        trip_counter += 1;
        break;
      case 2:
        description.textContent = "C'putain de caillou";
        trip_counter += 1;
        break;
      case 3:
        description.textContent = "Caillou de merde";
        trip_counter += 1;
        break;
      default:
        description.textContent = "Le joueur est caillouphile";
        break;
    }
    pointer.x += Math.floor(Math.random() * 5);
    pointer.y += Math.floor(Math.random() * 5);
  }

  //* Feu de camp
  if (map[player_index] == 63) {
    description.textContent = "Je ne suis pas un roti connard";
    pointer.x += Math.floor(Math.random() * 5);
    pointer.y += Math.floor(Math.random() * 5);
  }
  //* Buisson
  if (map[player_index] == 28 || map[player_index] == 29) {
    let random_msg = Math.floor(Math.random() * 5);
    switch (random_msg) {
      case 0:
        description.textContent = `Anh yêu bộ ngực em bé của em`;
        pointer.y += Math.floor(Math.random() * 5);
        pointer.x += Math.floor(Math.random() * 5);
        break;
      case 1:
        description.textContent = `К черту тебя сука`;
        pointer.y += Math.floor(Math.random() * 5);
        pointer.x += Math.floor(Math.random() * 5);
        break;
      case 2:
        description.textContent = `ああ、たわごと爆弾`;
        pointer.y += Math.floor(Math.random() * 5);
        pointer.x += Math.floor(Math.random() * 5);
        break;
      case 3:
        description.textContent = `الله أكبر`;
        pointer.y += Math.floor(Math.random() * 5);
        pointer.x += Math.floor(Math.random() * 5);
        break;
      case 4:
        description.textContent = `Aku suka ayam besarmu`;
        pointer.y += Math.floor(Math.random() * 5);
        pointer.x += Math.floor(Math.random() * 5);
        break;
      default:
        description.textContent = `Duża kiełbasa w tyłku`;
        pointer.y += Math.floor(Math.random() * 5);
        pointer.x += Math.floor(Math.random() * 5);
        break;
    }
  }

  //! Barrière de collision
  //? Pour l'eau
  if (map[player_index] == 19) {
    description.textContent = "Je sais pas nager bordel !";
    pointer.x = 80;
    pointer.y = 115;
  }
  //? Pour la map
  if (world == "overworld") {
    if (pointer.y < 0) {
      pointer.y = 5;
    } else if (pointer.x < 0) {
      pointer.x = 5;
    } else if (pointer.y > 950) {
      pointer.y = 945;
    } else if (pointer.x > 1250) {
      pointer.x = 1245;
    }
  } else if (world == "house") {
    if (pointer.y < 0) {
      pointer.y = 5;
    } else if (pointer.x < 0) {
      pointer.x = 5;
    } else if (pointer.y > 370) {
      pointer.y = 360;
    } else if (pointer.x > 390) {
      pointer.x = 380;
    }
  }

  /* dialogue avec maman */
  if(map[player_index] == 346){
    pointer.x += Math.floor(Math.random() * 8);
    pointer.y += Math.floor(Math.random() * 8);
    description.textContent = "Maman : Laisse moi cueillir mes fleurs, tu as trouvé la clé ?";
    var div = document.getElementById("HideDiv");
    if (div.style.display === "none") {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
    var rYes = document.getElementById("rYes");
    var rNo = document.getElementById("rNo");
    rNo.addEventListener("click", function() {
      description.textContent = "Maman : Cherche mieux dans la fôret !";
      div.style.display = "none";
    });
    rYes.addEventListener("click", function() {
      description.textContent = "Maman : C'est bien ! Rentre à la maison.";
      div.style.display = "none";
    });
  }

  //? Dessine le joueur. */
  context.drawImage(
    tile_sheet,
    16 * 71,
    0,
    sprite_size,
    sprite_size,
    Math.round(player.x - viewport.x + width * 0.5 - viewport.w * 0.5),
    Math.round(player.y - viewport.y + height * 0.5 - viewport.h * 0.5),
    40,
    40
  );
  console.log("in :", world, "pos.x", pointer.x, "pos.y", pointer.y);
}
export let tile_sheet = new Image();

//* Mouvement du joueur

//? 1. Par clique
context.canvas.addEventListener("click", (event) => {
  pointer.x = event.pageX + viewport.x - width * 0.5 + viewport.w * 0.5;
  pointer.y = event.pageY + viewport.y - height * 0.5 + viewport.h * 0.5;
});

//? 2. Par ZQSD ou WASD ou ArrowUp/Down/Left/Right
let movSpeed = 15;
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      pointer.y -= movSpeed;
      break;
    case "z":
      pointer.y -= movSpeed;
      break;
    case "ArrowUp":
      pointer.y -= movSpeed;
      break;
    case "s":
      pointer.y += movSpeed;
      break;
    case "ArrowDown":
      pointer.y += movSpeed;
      break;
    case "a":
      pointer.x -= movSpeed;
      break;
    case "q":
      pointer.x -= movSpeed;
      break;
    case "ArrowLeft":
      pointer.x -= movSpeed;
      break;
    case "d":
      pointer.x += movSpeed;
      break;
    case "ArrowRight":
      pointer.x += movSpeed;
      break;

    default:
      break;
  }
});
