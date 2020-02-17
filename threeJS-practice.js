// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
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
	renderer.setClearColor("#000", 1);

	// Setup a camera
	const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
	camera.position.set(2, 2, -4);
	camera.lookAt(new THREE.Vector3());

	// Setup camera controller
	const controls = new THREE.OrbitControls(camera, context.canvas);

	// Setup your scene
	const scene = new THREE.Scene();

	// Setup a geometry
	const geometry = new THREE.SphereGeometry(1, 32, 16);

	// Setup a material
	const material = new THREE.MeshBasicMaterial({
		color: "red",
		wireframe: true
	});

	// Setup a mesh with geometry + material
	const mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.MeshPhysicalMaterial({
			color: "white",
			roughness: 0.75,
			flatShading: true
		})
	);
	scene.add(mesh);

	// Specify an ambient/ulit color
	scene.add(new THREE.AmbientLight("#59314f"));

	// Add some light
	const light = new THREE.PointLight("#45caf7", 1, 15.5);
	light.position.set(2, 2, -4).multiplyScalar(1.5);
	scene.add(light);

	// draw each frame
	return {
		// Handle resize events here for changes in browser size
		resize({ pixelRatio, viewportWidth, viewportHeight }) {
			renderer.setPixelRatio(pixelRatio);
			renderer.setSize(viewportWidth, viewportHeight);
			camera.aspect = viewportWidth / viewportHeight;
			camera.updateProjectionMatrix();
		},
		// Update & render your scene here
		render({ time }) {
			mesh.rotation.y = time * ((10 * Math.PI) / 180);
			controls.update();
			renderer.render(scene, camera);
		},
		// Dispose of events & renderer for cleaner hot-reloading
		unload() {
			controls.dispose();
			renderer.dispose();
		}
	};
};

canvasSketch(sketch, settings);
