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
	// make palette random number of colors each reload
	const colorCount = random.rangeFloor(2, 6);
	const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
	console.log(palette);
	// create local state
	const createGrid = () => {
		const points = [];
		const count = 30;
		for (let x = 0; x < count; x++) {
			for (let y = 0; y < count; y++) {
				//divides grid between 0 and 1
				const u = count <= 1 ? 0.5 : x / (count - 1);
				const v = count <= 1 ? 0.5 : y / (count - 1);
				const radius = Math.abs(random.noise2D(u, v)) * 0.2;
				//give circles different radius
				// object
				points.push({
					color: random.pick(palette),
					radius,
					rotation: random.noise2D(u, v) * 1,
					//0.01 give start value for circles then adding to that
					// radius: Math.abs(0.01 + random.gaussian() * 0.01),
					position: [u, v]
				});
			}
		}
		return points;
	};

	// sets deterministic seed so that the random number string stays the same and the image doesn't change on reload
	// random.setSeed(512);
	const points = createGrid().filter(() => random.value() > 0.5);
	const margin = 400;

	return ({ context, width, height }) => {
		// const { position, radius } = data;

		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		// destructuring data
		points.forEach(data => {
			const { position, radius, color, rotation } = data;

			//destructure value for u and v
			const [u, v] = position;
			const x = lerp(margin, width - margin, u);
			const y = lerp(margin, height - margin, v);

			// //draw a circle
			// context.beginPath();
			// context.arc(x, y, radius * width, Math.PI * 2, false);
			// context.fillStyle = color;
			// context.lineWidth = "20";
			// context.fill();

			context.save();
			context.fillStyle = color;
			context.font = `${radius * width}px "Helvetica"`;
			context.translate(x, y);
			context.rotate(rotation);
			context.fillText("=", 0, 0);

			context.restore();
		});
	};
};

// built in - uses sketch function to set up canvas
canvasSketch(sketch, settings);
