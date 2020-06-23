import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import setupKeyboard from "./input.js";
import {createCollisionLayer} from "./layers.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {
    mario.pos.set(64,180);

    level.compositor.layers.push(createCollisionLayer(level))
    level.entities.add(mario)

    const input = setupKeyboard(mario)
    input.listenTo(window)

    const mouse = ['mousedown', 'mousemove']
    mouse.forEach((eventName) => {
        canvas.addEventListener(eventName, event => {
            if(event.buttons === 1){
                mario.vel.set(0, 0)
                mario.pos.set(event.offsetX, event.offsetY)
            }
        })
    })

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.compositor.draw(context);
    }

    timer.start();
});
