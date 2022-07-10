//? Joueur de musique de fond + bouton play pause
const musicPlayer = document.getElementById("playpause");
const audio = document.getElementById("audio");

audio.volume = 0.2; //? Audio trop fort de base
/** Fonction mettant en marche la musique */
function playMusic() {
  musicPlayer.classList.remove("pause");
  musicPlayer.classList.add("play");
  audio.play();
}
/** Fonction mettant en pause la musique */
function pauseMusic() {
  musicPlayer.classList.remove("play");
  musicPlayer.classList.add("pause");
  audio.pause();
}

//? démarre la musique quand la page est charger
window.onload = playMusic();

//? Ecoute si un clique est fait sur le bouton play/pause
musicPlayer.addEventListener("click", () => {
  const isPlaying = musicPlayer.classList.contains("play");
  if (isPlaying) {
    pauseMusic();
  } else playMusic();
});

//? Mets sur pause la musique si l'utilisateur change d'onglet
document.onvisibilitychange = function () {
  if (document.visibilityState === "hidden") {
    pauseMusic();
  } else playMusic();
};