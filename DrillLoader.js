class DrillLoader{
	#file = "";
	#currentLine = 0;
	separator = "-----";

	#maxX = 0;
	#maxY = 0;

	constructor(file){
		this.#file = file;
	}

	async load(){
		let lines = await fetch(this.#file).then(res => res.text());
		lines = lines.split("\r\n");

		this.#currentLine = 2;
		const sets = this.#extractSets(lines);
		const performers = this.#extractPerformers(lines);

		return {
			name: lines[0],
			bpm: parseInt(lines[1]),
			sets,
			performers,
			width: this.#maxX,
			height: this.#maxY
		};
;
	}

	#extractSets(lines){
		let i;
		const sets = [];
		for (i = this.#currentLine; i < lines.length; i += 2) {
			if (lines[i] == this.separator) {
				break;
			}

			sets.push({
				identifier: lines[i],
				counts: parseInt(lines[i + 1])
			});
		}

		this.#currentLine = i;
		return sets;
	}

	#extractPerformers(lines){
		const performers = [];
		let performer = null;

		while (this.#currentLine < lines.length - 2) {
			if (lines[this.#currentLine] == "-----") {
				if (performer != null) {
					performers.push(performer);
				}

				performer = {
					name: lines[this.#currentLine + 1],
					symbol: lines[this.#currentLine + 2],
					dots: []
				};

				this.#currentLine += 3;
				continue;
			}

			const coords = lines[this.#currentLine].split(",");
			let dot = {
				x: parseFloat(coords[0]) * -1,
				y: parseFloat(coords[1])
			};

			
			if (isNaN(dot.x) || isNaN(dot.y)) {
				dot = performer.dots[performer.dots.length - 1];
			}

			if(Math.abs(dot.x) > this.#maxX){
				this.#maxX = Math.abs(dot.x);
			}

			if(dot.y > this.#maxY){
				this.#maxY = dot.y;
			}
			
			performer.dots.push(dot);
			this.#currentLine++;
		}

		return performers;
	}
}