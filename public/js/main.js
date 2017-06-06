function checkEmpty(){
	var task_length = document.getElementById("new-task-name").value.length;
	if(task_length > 0)
	{
		document.getElementById("save-new-task").removeAttribute("disabled");
	}else{
		document.getElementById("save-new-task").setAttribute("disabled","disabled");
	}
}

// save
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
		  a_del.setAttribute("class","del-task");
		  a_del.addEventListener("click",function(event){
		  	deleteTask(event);
		  }, false);
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

// del task
var del_tasks = document.getElementsByClassName('del-task');

for(var i =0; i < del_tasks.length; i++){
	del_tasks[i].addEventListener('click',function(event){
		deleteTask(event);
	});
}

function deleteTask(event){
	event.preventDefault();
	param = event.currentTarget.href.split("/")[event.currentTarget.href.split("/").length -1];
	httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', '/delete/'+param, true);
	httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4 && httpRequest.status == 200) {
			var parent = event.target.parentNode
			var list = document.getElementById("task-list");
			list.removeChild(parent);
		}
	}
	httpRequest.send();
}

// edit task


