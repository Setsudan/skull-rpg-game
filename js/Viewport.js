//? class du viewport
/* 
La raison pour laquelle on a décidé que la map ne devait pas être enièrement visible est pour qu'elle paraisse grande
Prend 4 argument, x,y position | w,h largeur & hauteur
*/
export const Viewport = function(x, y, w, h) {

    this.x = x; this.y = y; this.w = w; this.h = h;
    
    };
    
    Viewport.prototype = {
    
    scrollTo:function(x, y) {
    
    this.x = x - this.w * 0.5;
    this.y = y - this.w * 0.5;
    }
    
    };
    