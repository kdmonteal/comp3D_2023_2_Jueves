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
