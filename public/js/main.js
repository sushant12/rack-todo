function checkEmpty(){
	var task_length = document.getElementById("new-task-name").value.length;
	if(task_length > 0)
	{
		document.getElementById("save-new-task").removeAttribute("disabled");
	}else{
		document.getElementById("save-new-task").setAttribute("disabled","disabled");
	}
}

document.getElementById("save-new-task").addEventListener('click', function makeRequest(event) {
	event.preventDefault();
	param = document.getElementById("new-task-name").value;
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/save', true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.onreadystatechange = function() {
	    if(httpRequest.readyState == 4 && httpRequest.status == 200) {
	      	      var res = JSON.parse(httpRequest.response);
	      var ul = document.getElementById("task-list");
		  var li = document.createElement("li");
		  var a_edit = document.createElement("a");
		  a_edit.setAttribute('href','/edit/'+res.id);
		  a_edit.innerHTML = "Edit";
		  var a_del = document.createElement("a");
		  a_del.setAttribute('href','/delete/'+res.id);
		  a_del.innerHTML = "Delete";
		  li.appendChild(document.createTextNode(res.name+" "));
		  li.appendChild(a_edit);
		  li.appendChild(document.createTextNode(" | "));
		  li.appendChild(a_del);
		  li.setAttribute("id", res.name+"-"+res.id); 
		  ul.appendChild(li);
	    }
	}
    httpRequest.send("task="+param);
  });


// task = document.getElementById("task-list");
// task.removeChild(document.getElementById('s-14'));