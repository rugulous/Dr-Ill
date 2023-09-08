class UIElement{
	image = null;
	x = 0;
	y = 0;
	size = 0;

	constructor(src, x, y, size, callback = null){
		this.image = new Image();
		this.image.src = src;
		if(callback != null){
			this.image.onload = callback;
		}

		this.x = x;
		this.y = y;
		this.size = size;
	}
}