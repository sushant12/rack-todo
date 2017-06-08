"use strict";

var Todo = {};

document.getElementById("new-task-name").addEventListener('keyup', function(){ Todo.checkEmpty(); });
document.getElementById("save-new-task").addEventListener('click', function(e){ Todo.makeRequest(e);});
document.getElementById("update-task").addEventListener('click', function(e){ Todo.updateTask(e);});

var del_tasks = document.getElementsByClassName('del-task'),
    edit_tasks = document.getElementsByClassName('edit-task'),
    task_ref = "";

// number of edit and del tasks are same
for(var i =0; i < edit_tasks.length; i++){
    edit_tasks[i].addEventListener('click',function(e){ Todo.editTask(e);});
    del_tasks[i].addEventListener('click',function(e){Todo.deleteTask(e);});
}

Todo.checkEmpty = function (){
	var task_length = document.getElementById("new-task-name").value.length,
        save_btn = document.getElementById("save-new-task");
	if(task_length > 0) {
        save_btn.removeAttribute("disabled");
	}else{
        save_btn.setAttribute("disabled","disabled");
	}
};

// saves to db
Todo.makeRequest = function (e) {
    e.preventDefault();
    var task_name = document.getElementById("new-task-name").value,
        httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/save', true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200) {
            var res = JSON.parse(httpRequest.response),
             ul = document.getElementById("task-list"),
             li = document.createElement("li"),
             a_edit = document.createElement("a"),
             a_del = document.createElement("a");

            a_edit.setAttribute('href','/edit/'+res.id);
            a_edit.setAttribute("class","edit-task");
            a_edit.addEventListener("click",function(e){
                Todo.editTask(e);
            }, false);
            a_edit.innerHTML = "Edit";

            a_del.setAttribute('href','/delete/'+res.id);
            a_del.setAttribute("class","del-task");
            a_del.addEventListener("click",function(e){
                Todo.deleteTask(e);
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
    httpRequest.send("task="+task_name);
}

Todo.deleteTask = function (e){
	e.preventDefault();
	var id = e.currentTarget.href.split("/")[e.currentTarget.href.split("/").length -1],
	    httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', '/delete', true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4 && httpRequest.status == 200) {
			var parent = e.target.parentNode,
                list = document.getElementById("task-list");
			list.removeChild(parent);
		}
	}
	httpRequest.send("id="+id);
}

// fetch from db to show value in the form
Todo.editTask = function (e) {
	e.preventDefault();
	var form = document.getElementById("edit-form"),
        id = e.currentTarget.href.split("/")[e.currentTarget.href.split("/").length -1],
        httpRequest = new XMLHttpRequest(),
        finished = document.getElementById('finished-task'),
        finished_value = 0;
	form.style.display = "block";
	task_ref = e.target.parentElement;

	httpRequest.open('GET', '/edit/'+id, true);

	httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4 && httpRequest.status == 200) {
			var res = JSON.parse(httpRequest.response),
			    task = document.getElementById('edit-task-name');
			    task.value = res.name;
			
			if(res.finished){
				finished.checked = true;
			}else{
				finished.checked = false;
			}
			var task_id = document.getElementById('task-id');
            task_id.value = id;
		}
	}
	httpRequest.send();
}

// updates the db
Todo.updateTask = function (e){
	e.preventDefault();
	var edit_task_name = document.getElementById('edit-task-name').value,
	    id = document.getElementById('task-id').value,
	    finished = document.getElementById('finished-task'),
	    finished_value = 0;

	if(finished.checked){
		finished_value = 1;
	}

	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', '/update/'+id, true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4 && httpRequest.status == 200) {
			var res = JSON.parse(httpRequest.response),
			    a_edit = document.createElement("a"),
                a_del = document.createElement("a");

            a_edit.setAttribute('href','/edit/'+res.id);
            a_edit.setAttribute("class","edit-task");
            a_edit.addEventListener("click",function(e){
                Todo.editTask(e);
            }, false);
             a_edit.innerHTML = "Edit";

            a_del.setAttribute('href','/delete/'+res.id);
            a_del.setAttribute("class","del-task");
            a_del.addEventListener("click",function(e){
                Todo.deleteTask(e);
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
	httpRequest.send("task="+edit_task_name+"&finished="+finished_value);
}
