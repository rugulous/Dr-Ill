class Canvas {
	#el = null;
	#ctx = null;
	#scale = 0;
	#targetW = 0;
	#targetH = 0;

	constructor(id, targetW, targetH) {
		this.#el = document.getElementById(id);
		this.#ctx = this.#el.getContext("2d");
		
		this.#targetW = targetW;
		this.#targetH = targetH;
	}

	resize(targetW, targetH, scale){
		this.#targetW = targetW;
		this.#targetH = targetH;

		this.setScale(scale);
	}

	setScale(scale) {
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
		this.#ctx.textBaseline = "middle";
	}

	setTextAlign(alignment) {
		this.#ctx.textAlign = alignment;
	}

	setFill(fill) {
		this.#ctx.fillStyle = fill;
	}

	clear(){
		this.#ctx.clearRect(0, 0, this.#el.width, this.#el.height);
	}

	drawRect(x, y, w, h, colour = null) {
		if (colour != null) {
			this.setFill(colour);
		}

		this.#ctx.fillRect(x * this.#scale, y * this.#scale, w * this.#scale, h * this.#scale);
	}

	strokeRect(x, y, w, h, colour = null){
		if(colour != null){
			this.setFill(colour);
		}

		this.#ctx.strokeRect(x * this.#scale, y * this.#scale, w * this.#scale, h * this.#scale)
	}

	drawCircle(x, y, radius, colour = null) {
		if (colour != null) {
			this.setFill(colour);
		}

		this.#ctx.beginPath();
		this.#ctx.arc((x + (radius / 2)) * this.#scale, y * this.#scale, radius * this.#scale, 0, Math.PI * 2);
		this.#ctx.fill();
	}

	drawText(text, x, y, { 
		colour = null, 
		alignment = null, 
		font = null,
		maxWidth = null
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

		maxWidth = (maxWidth) ? maxWidth * this.#scale : undefined;
		this.#ctx.fillText(text, x * this.#scale, (y * this.#scale) + 1.5, maxWidth);
	}
}