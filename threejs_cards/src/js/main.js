/* Author(A): Kelly Daniella Marin Montealegre
   Date of Creation: 24/8/23 9:33
   Last Modification: 24/8/23 ¿?
*/
// Variables
var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    builds = 0,
    cube = null,
    light = null,
    stats = null;

// To Move Player
var myPlayerCollider = null,
    myPlayerMesh = null,
    input = {left:0, right:0, up:0, down:0},
    rotSpeed = 0.05,
    speed = 0.5;

const size = 50,
      divisions = 50;

window.addEventListener( 'resize', onWindowResize, false );

function createThreeJs() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdedede);
    camera = new THREE.PerspectiveCamera( 
                                    75,    // Field of view (arriba o abajo)
                                    window.innerWidth / window.innerHeight, // Aspect Ratio 16:9 
                                    0.1, // Near 
                                    1000 ); // Far

    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("app")});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    // camera.position.set(8,4,-0.2);
    camera.position.set(0,7,30);
    // camera.rotation.x = Math.PI*-1;
    // controls.update();

    // Grid Helper
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    // Axes Helper
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    // To call
    createLights("AmbientLight");
    createLights("PointLight");
    animate();

    loadObjMtl("../models/OBJ_MTL/personaje/", "Rupert.mtl", "Rupert.obj");
    loadGLTF();

    createCollectibles(10);

    // Establecer la duración del temporizador en segundos (por ejemplo, 60 segundos)
    const duration = 60;
    startTimer(duration);

    createPlayerCollider();
    // stats = new Stats();
    // document.getElementById('app').appendChild(stats.dom);
}

function animate() {
	requestAnimationFrame( animate );
    // controls.update();
	renderer.render( scene, camera );
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function CreateGeometry() {
    let floorNumbers = document.getElementById("floors").value;
    let floorColor = document.getElementById("colorpicker").value;
    for(var i=0; i<floorNumbers; i++ ){
        const geometry = new THREE.CubeGeometry(2, 1.5, 2);
        // const material = new THREE.MeshBasicMaterial( {color : floorColor,
        //                                                 opacity: 0.5,
        //                                                 transparent: true,
        //                                                 wireframe: false});
        const material = new THREE.MeshStandardMaterial( {color : floorColor,
                                                            roughness: 0.5,
                                                            metalness:1});

        //material.color.setHex( floorColor );
        cube = new THREE.Mesh( geometry, material );
      

        //Outline Shader
        var geo = new THREE.EdgesGeometry( cube.geometry );
        var mat = new THREE.LineBasicMaterial( { color: 0x000000 } );
        var wireframe = new THREE.LineSegments( geo, mat );

        cube.add(wireframe);
        scene.add(cube);
        cube.position.y = (1.5) * (i+0.5);
        cube.position.x = builds * 2.5
    }
    builds += 1;
    camera.position.z = 5;
}

function createLights(typeLight) {
    // PointLight, SpotLight, AmbientLight
    switch(typeLight) {
        case "PointLight":
            // PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
            light = new THREE.PointLight( 0xFFFFFF, 1, 100 );
            light.position.set( 0, 10, 0 );
            scene.add( light );

            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
            scene.add( pointLightHelper );
          break;
        case "AmbientLight":
            // AmbientLight( color : Integer, intensity : Float )
            light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
            scene.add( light );
          break;
        case "SpotLight":
            // SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
            light = new THREE.SpotLight( 0xFFFFFF );
            light.position.set( 100, 1000, 100 );
            scene.add( light );
          break;
    }
}

