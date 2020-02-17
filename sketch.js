// requiring javascript library using Nodejs require syntax
const canvasSketch = require("canvas-sketch");
//lerp is a func for linear interpalation between min and max using the t parameter.
const { lerp } = require("canvas-sketch-util/math");

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
		const count = 5;
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

	const points = createGrid();

	const margin = 400;

	return ({ context, width, height }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		points.forEach(([u, v]) => {
			const x = lerp(margin, width - margin, u);
			const y = lerp(margin, height - margin, v);

			//draw a circle
			context.beginPath();
			context.arc(x, y, 150, Math.PI * 2, false);
			context.strokeStyle = "black";
			context.lineWidth = "25";
			context.stroke();
		});
	};
};

// built in - uses sketch function to set up canvas
canvasSketch(sketch, settings);
