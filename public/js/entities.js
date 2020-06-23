import Entity from './Entity.js';
import {loadMarioSprite} from './sprites.js';
import Velocity from "./Traits/velocity.js";
import Jump from "./Traits/jump.js";
import Go from "./Traits/go.js";

export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(14, 16)

        mario.addTrait(new Go())
        mario.addTrait(new Jump())
        mario.addTrait(new Velocity())

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        return mario;
    });
}