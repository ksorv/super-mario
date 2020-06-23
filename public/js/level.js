import Compositor from "./Compositor.js";
import {Matrix} from './math.js'
import TileCollider from "./tileCollider.js";

const gravity = 2000;

class Level {
	constructor() {
		this.entities = new Set()
		this.compositor = new Compositor()
		this.tiles = new Matrix()

		this.tileCollider = new TileCollider(this.tiles)
	}

	update(deltaTime) {
		this.entities.forEach(entity => {
			entity.update(deltaTime)
			this.tileCollider.test(entity)

			entity.pos.x += entity.vel.x * deltaTime;
			this.tileCollider.checkX(entity)

			entity.pos.y += entity.vel.y * deltaTime;
			this.tileCollider.checkY(entity)

			entity.vel.y += gravity*deltaTime;
		})
	}
}

export default Level