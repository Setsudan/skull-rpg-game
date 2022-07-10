let scaled_size = 32; // Taille voulu pour le perso
//? Création du class avec l'argument x,y pour sa position
export const Player = function(x, y) {

    this.x = x; this.y = y;

    };

    Player.prototype = {

    moveTo:function(x, y) {

      /* Gradually moves the player closer to x, y every time moveTo is called. */
      this.x += (x - this.x - scaled_size * 0.5) * 0.05;
      this.y += (y - this.y - scaled_size * 0.5) * 0.05;

    }

    };
