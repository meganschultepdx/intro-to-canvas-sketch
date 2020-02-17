// requiring javascript library using Nodejs require syntax
const canvasSketch = require("canvas-sketch");

// define parameters for artwork (size, export settings, etc.)
const settings = {
	dimensions: [2048, 2048]
	// orientation: "landscape",
	// units: "cm",
	// pixelPerInch: 300
};

// capture artwork in single function, returns render function
const sketch = () => {
	return ({ context, width, height }) => {
		console.log(width, height);
		context.fillStyle = "orange";
		context.fillRect(0, 0, width, height);

		//begin by rendering path, then everything after will be part of that path operation
		context.beginPath();
		context.arc(width / 2, height / 2, width * 0.2, 0, Math.PI * 2, false);
		context.fillStyle = "red";
		context.fill();
		//take whatever path you have before it and outline in a black stroke
		context.lineWidth = width * 0.05;
		// context.strokeStyle = "yellow";
		context.stroke();
	};
};

// built in - uses sketch function to set up canvas
canvasSketch(sketch, settings);
