import Image from './Image.js';

const imgDiv = document.querySelector('.imgs');

const ctaHeight = document.querySelector('.cta').getBoundingClientRect().height;
const isViewFull = () => {
	const currHeight = imgDiv.getBoundingClientRect().height;
	return ctaHeight + currHeight >= window.innerHeight;
};

export default class Button {
	constructor(container, text, cb) {
		this.cb = cb;

		this.element = document.createElement('button');
		this.element.innerText = text;
		this.element.addEventListener('click', this.onClick);
		container.appendChild(this.element);
	}

	onClick = async event => {
		event.preventDefault();
		this.element.setAttribute('disabled', '');

		const { urls, title } = await this.cb();
		const imgs = [];
		urls.forEach(url => {
			if (url !== null) {
				const img = new Image(url, title);
				imgs.push(img.element);
			}
		});

		if (imgs.length === 0) {
			this.onClick(event);
			return;
		}

		if (isViewFull()) {
			imgDiv.replaceChildren(...imgs);
		} else {
			imgs.forEach(img => imgDiv.appendChild(img));
		}

		this.element.removeAttribute('disabled');
	};
}
