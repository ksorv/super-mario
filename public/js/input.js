import KeyBoard from "./keyboardState.js";

const SPACE = 'Space'
const RIGHT = 'ArrowRight'
const LEFT = 'ArrowLeft'

export default function setupKeyboard(entity) {
	const input = new KeyBoard()
	input.addMapping(SPACE, keyState => {
		if(keyState){
			entity.jump.start()
		} else {
			entity.jump.cancel()
		}
	})
	input.addMapping(RIGHT, keyState => {
		entity.go.dir = keyState
	})
	input.addMapping(LEFT, keyState => {
		entity.go.dir = -keyState
	})
	return input;
}