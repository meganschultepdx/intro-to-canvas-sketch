// requiring javascript library using Nodejs require syntax
const canvasSketch = require("canvas-sketch");
//lerp is a func for linear interpalation between min and max using the t parameter.
const { lerp } = require("canvas-sketch-util/math");
//random is a super powered math.random
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

// define parameters for artwork (size, export settings, etc.)
const settings = {
	dimensions: [2048, 2048]
	// orientation: "landscape",
	// units: "cm",
	// pixelPerInch: 300
};

// capture artwork in single function, returns render function
const sketch = () => {
	const palette = random.pick(palettes);
	console.log(palette);
	// create local state
	const createGrid = () => {
		const points = [];
		const count = 30;
		for (let x = 0; x < count; x++) {
			for (let y = 0; y < count; y++) {
				//divides grid between 0 and 1
				const u = count <= 1 ? 0.5 : x / (count - 1);
				const v = count < +1 ? 0.5 : y / (count - 1);
				//give circles different radius
				points.push({
					color: random.pick(palette),
					//0.01 give start value for circles then adding to that
					radius: Math.abs(0.01 + random.value() * 0.01),
					position: [u, v]
				});
			}
		}
		return points;
	};

	// sets deterministic seed so that the random number string stays the same and the image doesn't change on reload
	random.setSeed(512);
	const points = createGrid().filter(() => random.gaussian() > 0.01);

	const margin = 100;

	return ({ context, width, height }) => {
		// const { position, radius } = data;

		context.fillStyle = "pink";
		context.fillRect(0, 0, width, height);

		// destructuring data
		points.forEach(data => {
			const { position, radius, color } = data;

			//destructure value for u and v
			const [u, v] = position;

			const x = lerp(margin, width - margin, u);
			const y = lerp(margin, height - margin, v);

			//draw a circle
			context.beginPath();
			context.arc(x, y, radius * width, Math.PI * 2, false);
			context.fillStyle = "red";
			context.lineWidth = "10";
			context.fill();
		});
	};
};

// built in - uses sketch function to set up canvas
canvasSketch(sketch, settings);
