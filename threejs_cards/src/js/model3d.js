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