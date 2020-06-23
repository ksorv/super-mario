import Compositor from "./Compositor.js";
import {Matrix} from './math.js'
import TileCollider from "./tileCollider.js";

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
		})
	}
}

export default Level