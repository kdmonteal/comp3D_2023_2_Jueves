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

loadObjMtl("../models/OBJ_MTL/personaje/", "Rupert.mtl", "Rupert.obj");

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

loadGLTF();