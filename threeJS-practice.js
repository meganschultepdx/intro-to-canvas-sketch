// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const eases = require("eases");
const BezierEasing = require("bezier-easing");

const settings = {
	dimensions: [512, 512],
	// frames per second
	fps: 24,
	duration: 4,
	// Make the loop animated
	animate: true,
	// Get a WebGL canvas rather than 2D
	context: "webgl",
	// Turn on MSAA
	attributes: { antialias: false }
};

const sketch = ({ context }) => {
	// Create a renderer
	const renderer = new THREE.WebGLRenderer({
		canvas: context.canvas
	});

	// WebGL background color
	renderer.setClearColor("hsl(0, 0%, 10%)", 1.0);

	// Setup a camera
	const camera = new THREE.OrthographicCamera(45, 1, 0.01, 100);
	// next two lines are good for perspective camera
	// camera.position.set(2, 2, -4);
	// camera.lookAt(new THREE.Vector3());

	// // Setup camera controller
	// const controls = new THREE.OrbitControls(camera, context.canvas);

	// Setup your scene
	const scene = new THREE.Scene();

	// Setup a geometry
	const geometry = new THREE.SphereGeometry(1, 32, 16);

	// Setup a material
	const material = new THREE.MeshStandardMaterial({
		color: "red",
		wireframe: true
	});

	const palette = random.pick(palettes);

	// create the box geometry only once then reuse for each mesh for more efficient code
	const box = new THREE.BoxGeometry(1, 1, 1);
	for (let i = 0; i < 40; i++) {
		// Setup a mesh with geometry + material
		const mesh = new THREE.Mesh(
			box,
			new THREE.MeshStandardMaterial({
				color: random.pick(palette)
				// roughness: 0.75,
				// flatShading: true
			})
		);
		mesh.position.set(
			random.range(-1, 1),
			random.range(-1, 1),
			random.range(-1, 1)
		);
		mesh.scale.set(
			random.range(-1, 1),
			random.range(-1, 1),
			random.range(-1, 1)
		);
		// multiplyScalar is multiplying the x, y, z by this value
		mesh.scale.multiplyScalar(0.5);
		scene.add(mesh);
	}

	scene.add(new THREE.AmbientLight("hsl(1, 0%, 60%)"));

	const light = new THREE.DirectionalLight("white", 1);
	light.position.set(0, 0, 4);
	scene.add(light);

	// making custom Bezier curve from cubic-bezier.com
	const easeFn = BezierEasing(0.4, 0, 0, 0.6);

	// // Specify an ambient/ulit color
	// scene.add(new THREE.AmbientLight("#59314f"));

	// // Add some light
	// const light = new THREE.PointLight("#45caf7", 1, 15.5);
	// light.position.set(2, 2, -4).multiplyScalar(1.5);
	// scene.add(light);

	// draw each frame
	return {
		// Handle resize events here for changes in browser size
		resize({ pixelRatio, viewportWidth, viewportHeight }) {
			renderer.setPixelRatio(pixelRatio);
			renderer.setSize(viewportWidth, viewportHeight);

			// isometric threeJS Camera in cheat sheet
			const aspect = viewportWidth / viewportHeight;

			//Ortho zoom
			const zoom = 1.5;

			// Bounds
			camera.left = -zoom * aspect;
			camera.right = zoom * aspect;
			camera.top = zoom;
			camera.bottom = -zoom;

			// Near/Far
			camera.near = -100;
			camera.far = 100;

			// Set position & look at world center
			camera.position.set(zoom, zoom, zoom);
			camera.lookAt(new THREE.Vector3());

			// Update the camera
			camera.updateProjectionMatrix();

			camera.aspect = viewportWidth / viewportHeight;
			camera.updateProjectionMatrix();
		},
		// Update & render your scene here
		render({ playhead }) {
			const t = Math.sin(playhead * Math.PI);
			scene.rotation.x = easeFn(t);
			renderer.render(scene, camera);
			// mesh.rotation.y = time * ((10 * Math.PI) / 180);
			// controls.update();
			renderer.render(scene, camera);
		},
		// Dispose of events & renderer for cleaner hot-reloading
		unload() {
			// controls.dispose();
			renderer.dispose();
		}
	};
};

canvasSketch(sketch, settings);
