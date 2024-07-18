import Image from './Image.js';

const imgDiv = document.querySelector('.imgs');

// Drag n' Drop / sorting functionality
let draggedImg = null;
imgDiv.addEventListener('dragstart', e => {
	draggedImg = e.target;
	e.dataTransfer.effectAllowed = 'move';
});
imgDiv.addEventListener('dragover', e => {
	e.preventDefault();
});
const indexOfImg = img => {
	return Array.prototype.indexOf.call(imgDiv.children, img) + 1;
};
const swapImgs = (a, b, aInd) => {
	imgDiv.insertBefore(a, b);
	imgDiv.insertBefore(b, imgDiv.children[aInd]);
	imgDiv.appendChild;
};
imgDiv.addEventListener('drop', e => {
	e.preventDefault();
	if (e.target.tagName === 'IMG' && e.target !== draggedImg) {
		const draggedInd = indexOfImg(draggedImg);
		const targetInd = indexOfImg(e.target);
		if (draggedInd > targetInd) swapImgs(draggedImg, e.target, draggedInd);
		else swapImgs(e.target, draggedImg, targetInd);
	}
});

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
