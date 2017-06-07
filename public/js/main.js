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
	var param = document.getElementById("new-task-name").value;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/save', true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.onreadystatechange = function() {
	    if(httpRequest.readyState == 4 && httpRequest.status == 200) {
	      var res = JSON.parse(httpRequest.response);
	      var ul = document.getElementById("task-list");
		  var li = document.createElement("li");
		  var a_edit = document.createElement("a");
		  a_edit.setAttribute('href','/edit/'+res.id);
		  a_edit.setAttribute("class","edit-task");
		  a_edit.addEventListener("click",function(event){
		  	editTask(event);
		  }, false);
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
	var param = event.currentTarget.href.split("/")[event.currentTarget.href.split("/").length -1];
	var httpRequest = new XMLHttpRequest();
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
var edit_tasks = document.getElementsByClassName('edit-task');
var task_ref = "";
for(var i =0; i < edit_tasks.length; i++){
	edit_tasks[i].addEventListener('click',function(event){
		editTask(event);
	});
}

function editTask(event)
{
	event.preventDefault();
	var form = document.getElementById("edit-form");
	form.style.display = "block";
	task_ref = event.target.parentElement;
	var param = event.currentTarget.href.split("/")[event.currentTarget.href.split("/").length -1];
	var httpRequest = new XMLHttpRequest();
	var finished = document.getElementById('finished-task');
	var finished_value = 0;
	httpRequest.open('GET', '/edit/'+param, true);

	httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4 && httpRequest.status == 200) {
			var res = JSON.parse(httpRequest.response);
			var task = document.getElementById('edit-task-name');
			task.value = res.name;
			
			if(res.finished){
				finished.checked = true;
			}else{
				finished.checked = false;
			}
			var id = document.getElementById('task-id');
			id.value = param;
		}
	}
	httpRequest.send();
}

document.getElementById("update-task").addEventListener('click', function(event){
	updateTask(event);
});

function updateTask(event){
	event.preventDefault();
	var edit_task_name = document.getElementById('edit-task-name').value;
	var id = document.getElementById('task-id').value;
	var finished = document.getElementById('finished-task');
	var finished_value = 0;

	if(finished.checked){
		finished_value = 1;
	}

	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', '/update/'+id);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4 && httpRequest.status == 200) {
			var res = JSON.parse(httpRequest.response);
			var a_edit = document.createElement("a");
			a_edit.setAttribute('href','/edit/'+res.id);
			a_edit.setAttribute("class","edit-task");
			a_edit.addEventListener("click",function(event){
			  editTask(event);
			}, false);
			 a_edit.innerHTML = "Edit";

			var a_del = document.createElement("a");
			a_del.setAttribute('href','/delete/'+res.id);
			a_del.setAttribute("class","del-task");
			a_del.addEventListener("click",function(event){
			  deleteTask(event);
			}, false);
			a_del.innerHTML = "Delete";
			task_ref.innerText = "";
			task_ref.appendChild(document.createTextNode(res.name+" "));
			if(res.finished){
				task_ref.appendChild(document.createTextNode("(Finished)"));
			}
			task_ref.appendChild(a_edit);
			task_ref.appendChild(document.createTextNode(" | "));
			task_ref.appendChild(a_del);
			task_ref.setAttribute("id", res.name+"-"+res.id); 
			var form = document.getElementById("edit-form");
			form.style.display = "none";
		}
	}
	console.log(finished_value);
	httpRequest.send("task="+edit_task_name+"&finished="+finished_value);

}


