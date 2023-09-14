class UIElement{
	image = null;
	x = 0;
	y = 0;
	size = 0;
	action = () => {};

	constructor(src, x, y, size, callback, action){
		this.image = new Image();
		this.image.src = src;
		this.image.onload = callback;
		
		this.x = x;
		this.y = y;
		this.size = size;
		this.action = action;
	}
}