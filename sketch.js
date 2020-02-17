// requiring javascript library using Nodejs require syntax
const canvasSketch = require("canvas-sketch");
//lerp is a func for linear interpalation between min and max using the t parameter.
const { lerp } = require("canvas-sketch-util/math");
//random is a super powered math.random
const random = require("canvas-sketch-util/random");

// define parameters for artwork (size, export settings, etc.)
const settings = {
	dimensions: [2048, 2048]
	// orientation: "landscape",
	// units: "cm",
	// pixelPerInch: 300
};

// capture artwork in single function, returns render function
const sketch = () => {
	// create local state
	const createGrid = () => {
		const points = [];
		const count = 40;
		for (let x = 0; x < count; x++) {
			for (let y = 0; y < count; y++) {
				//divides grid between 0 and 1
				const u = count <= 1 ? 0.5 : x / (count - 1);
				const v = count < +1 ? 0.5 : y / (count - 1);
				points.push([u, v]);
			}
		}
		return points;
	};

	// sets deterministic seed so that the random number string stays the same and the image doesn't change on reload
	random.setSeed(512);
	const points = createGrid().filter(() => random.value() > 0.5);

	const margin = 200;

	return ({ context, width, height }) => {
		context.fillStyle = "pink";
		context.fillRect(0, 0, width, height);

		points.forEach(([u, v]) => {
			const x = lerp(margin, width - margin, u);
			const y = lerp(margin, height - margin, v);

			//draw a circle
			context.beginPath();
			context.arc(x, y, 10, Math.PI * 2, false);
			context.strokeStyle = "white";
			context.lineWidth = "10";
			context.stroke();
		});
	};
};

// built in - uses sketch function to set up canvas
canvasSketch(sketch, settings);
