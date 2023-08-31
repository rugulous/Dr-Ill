class Canvas {
	#el = null;
	#ctx = null;
	#scale = 0;
	#targetW = 0;
	#targetH = 0;

	constructor(id, targetW, targetH) {
		this.#el = document.getElementById(id);
		this.#ctx = this.#el.getContext("2d");
		this.#el.addEventListener("click", this.#el.requestFullscreen);

		this.#targetW = targetW;
		this.#targetH = targetH;
	}

	setScale(scale) {
		console.log(scale);

		const w = this.#targetW * scale;
		const h = this.#targetH * scale;
		const ratio = Math.ceil(window.devicePixelRatio);

		this.#el.width = w * ratio;
		this.#el.height = h * ratio;

		this.#ctx.scale(ratio, ratio);

		this.#el.style.width = `${w}px`;
		this.#el.style.height = `${h}px`;

		this.#scale = scale * ratio;
	}

	setFont(font) {
		this.#ctx.font = font;
	}

	setTextAlign(alignment) {
		this.#ctx.textAlign = alignment;
	}

	setFill(fill) {
		this.#ctx.fillStyle = fill;
	}

	drawRect(x, y, w, h, colour = null) {
		if (colour != null) {
			this.setFill(colour);
		}

		this.#ctx.fillRect(Math.round(x * this.#scale), Math.round(y * this.#scale), Math.round(w * this.#scale), Math.round(h * this.#scale));
	}

	drawCircle(x, y, radius, colour = null) {
		if (colour != null) {
			this.setFill(colour);
		}

		this.#ctx.arc(Math.round((x + (radius / 2)) * this.#scale), Math.round(y * this.#scale), Math.round(radius * this.#scale), 0, Math.PI * 2);
		this.#ctx.fill();
	}

	drawText(text, x, y, { 
		colour = null, 
		alignment = null, 
		font = null 
	} = {}) {
		if (colour != null) {
			this.setFill(colour);
		}

		if (alignment != null) {
			this.setTextAlign(alignment);
		}

		if(font != null){
			this.setFont(font);
		}

		this.#ctx.fillText(text, Math.round(x * this.#scale), Math.round(y * this.#scale));
	}
}