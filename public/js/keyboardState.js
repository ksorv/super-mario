const PRESSED = 1
const RELEASED = 0

export default class KeyboardState {
	constructor() {

		// Holds the current state of a given key
		this.keyStates = new Map()

		// Hold a cb fn for a code
		this.keyMap = new Map()
	}

	addMapping(code, cb){
		this.keyMap.set(code, cb)
	}

	handleEvent(event){
		const {code} = event
		if(!this.keyMap.has(code)){
			return;
		}

		event.preventDefault()
		const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

		if(this.keyStates.get(code) === keyState){
			return;
		}

		this.keyStates.set(code, keyState)
		this.keyMap.get(code)(keyState)
	}

	listenTo(window){
		['keydown', 'keyup'].forEach(eventName => {
		window.addEventListener(eventName, event => {
			this.handleEvent(event)
		})})
	}
}