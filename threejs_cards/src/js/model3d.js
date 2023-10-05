/* Author(A): Kelly Daniella Marin Montealegre
   Date of Creation: 21/9/23 9:33
   Last Modification: 21/9/23 ¿?
*/

function loadObjMtl(path, nameMTL, nameOBJ) {
    // 1. Load MTL (Texture)
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setResourcePath(path);
    mtlLoader.setPath(path);
    mtlLoader.load(nameMTL, function (material) {
        material.preload();

        // 2. Load OBJ (Mesh)
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath(path);
        objLoader.setMaterials(material);
        objLoader.load(nameOBJ, function (object) {
            scene.add(object);
            // object.rotation.y = -1*Math.PI/2;
            myPlayerMesh = object;
        });

    });
}

function loadGLTF() {
    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('../models/GLTF/');
    loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
        // resource URL
        '../models/GLTF/Duck.gltf',
        // called when the resource is loaded
        function (gltf) {

            scene.add(gltf.scene);

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            gltf.scene.position.set(0,0,2);

        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );
}

function createCollectibles(quantity) {

    var min = -15;
    var max = 15;

    for (var i = 0; i < quantity; i++) {
        var texture = new THREE.TextureLoader().load("../img/collectible.jpg");

        const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
        const material = new THREE.MeshStandardMaterial( {color: 0xffffff,
                                                        map: texture} ); 
        const cube = new THREE.Mesh( geometry, material ); 
        scene.add( cube );

        cube.position.set(Math.floor(Math.random() * (max - min + 1) + min),
                          0.5,
                          Math.floor(Math.random() * (max - min + 1) + min));
      }
}


function gameStates(caseSituation) {
    // game, win, lose
    switch(caseSituation) {
        case "win":
          document.getElementById("winnerScreen").style.display = "block";
          break;
        case "lost":
            document.getElementById("LoserScreen").style.display = "block";
          break;
        default:
            document.getElementById("winnerScreen").style.display = "none";
            document.getElementById("LoserScreen").style.display = "none";
      }
}

// Define una función para iniciar el temporizador
function startTimer(duration) {
    let timer = duration;
    const countdown = document.getElementById('countdown');

    function updateTimer() {
        countdown.textContent = timer;
        if (timer <= 0) {
            // Detener el temporizador
            clearInterval(interval);
            // Mostrar #losepage
            gameStates("lost");
        }
        timer--;
    }

    // Actualizar el temporizador inicialmente
    updateTimer();

    // Establecer un intervalo para actualizar el temporizador cada 1000 milisegundos (1 segundo)
    const interval = setInterval(updateTimer, 1000);
}

// Create Player with movement (Without)
function createPlayerCollider() {
    const geometry = new THREE.BoxGeometry( 2, 5, 3 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} ); 
    myPlayerCollider = new THREE.Mesh( geometry, material ); 
    myPlayerCollider.position.y = 2.5;
    scene.add( myPlayerCollider );
}

function movementPlayer() {
    if(input.right == 1){ // Rotation Right
        myPlayerCollider.rotation.y -= rotSpeed;
        myPlayerMesh.rotation.y -= rotSpeed;
    } else if(input.left == 1) { // Rotation left
        myPlayerCollider.rotation.y += rotSpeed;
        myPlayerMesh.rotation.y += rotSpeed;
    } else if(input.up == 1){ // movement up
        myPlayerCollider.position.z -= Math.cos(myPlayerCollider.rotation.y) * speed;
        myPlayerCollider.position.x -= Math.sin(myPlayerCollider.rotation.y) * speed;
        myPlayerMesh.position.z -= Math.cos(myPlayerMesh.rotation.y) * speed;
        myPlayerMesh.position.x -= Math.sin(myPlayerMesh.rotation.y) * speed;
    } else if(input.down == 1){ // movement down
        myPlayerCollider.position.z += Math.cos(myPlayerCollider.rotation.y) * speed;
        myPlayerCollider.position.x += Math.sin(myPlayerCollider.rotation.y) * speed;
        myPlayerMesh.position.z += Math.cos(myPlayerMesh.rotation.y) * speed;
        myPlayerMesh.position.x += Math.sin(myPlayerMesh.rotation.y) * speed;
    }
}

function initSound3D() {
    
}

document.addEventListener('keydown', (e)=>{
    console.log("Undio: "+e.key);
    switch(e.key) {
        case "d":  // Right
            input.right = 1;
          break;
        case "a": // Left
            input.left = 1;
          break;
        case "w": // Up
            input.up = 1;
          break;
        case "s": // Down
            input.down = 1;
          break;
      }
      
});

document.addEventListener('keyup', (e)=>{
    switch(e.key) {
        case "d":  // Right
            input.right = 0;
          break;
        case "a": // Left
            input.left = 0;
          break;
        case "w": // Up
            input.up = 0;
          break;
        case "s": // Down
            input.down = 0;
          break;
      }
});