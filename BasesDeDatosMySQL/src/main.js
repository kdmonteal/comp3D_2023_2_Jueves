function insertData() {
    var nicknameGet = document.getElementById("nicknameGet").value,
        pointsGet   = document.getElementById("pointsGet").value;

    $.ajax({
		//type: 'POST',
		//url: 'http://localhost:8888/dbClass_2/facade/user_facade.php?action=insert', // Your Url
		/*data:{
            nickname: nicknameGet,
            points:   pointsGet
        }*/
	}).done(function(data){
         window.location="http://localhost:8888/dbClass_2/views/playScreen.html";
    })
}

function getUserByOrder() {
    $.ajax({
		type: 'POST',
		url: 'http://localhost:8888/dbClass_2/facade/user_facade.php?action=select', 
		data:{}
	}).done(function(data){
        //  window.location="http://localhost/dbClass_2/views/playScreen.html";
        // alert(data); // /</br>
        var arrayTotal = data.split("/</br>");

        for (let index = 0; index < arrayTotal.length; index++) {
            // alert(arrayTotal[index]);
            // write on screen
            var node = document.createElement("p");                 // Create a <p> node
            node.innerHTML = arrayTotal[index];                            // Append the text to <li>
            document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with
        }
    })
}