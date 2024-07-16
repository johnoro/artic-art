export default class Button {
	constructor(container, text, cb) {
		this.cb = cb;

		this.element = document.createElement('button');
		this.element.classList.add('gen-btn');
		this.element.innerText = text;
		this.element.addEventListener('click', this.onClick);
		container.appendChild(this.element);
	}

	onClick = event => {
		event.preventDefault();
		const { urls, title } = this.cb();
		// create title in something like a p tag
		// create image elements / img tag
	};
}
