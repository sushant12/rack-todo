document.getElementById("new-task-name").addEventListener('keyup', checkEmpty);
document.getElementById("save-new-task").addEventListener('click', function(e){ makeRequest(e);});
document.getElementById("update-task").addEventListener('click', function(e){ updateTask(e);});

function checkEmpty(){
	var task_length = document.getElementById("new-task-name").value.length,
        save_btn = document.getElementById("save-new-task");
	if(task_length > 0)
	{
        save_btn.removeAttribute("disabled");
	}else{
        save_btn.setAttribute("disabled","disabled");
	}
}

function makeRequest(e) {
    e.preventDefault();
    var param = document.getElementById("new-task-name").value,
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
}

var del_tasks = document.getElementsByClassName('del-task');

for(var i =0; i < del_tasks.length; i++){
	del_tasks[i].addEventListener('click',function(e){deleteTask(e);});
}

function deleteTask(e){
	e.preventDefault();
	var param = e.currentTarget.href.split("/")[e.currentTarget.href.split("/").length -1];
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', '/delete/'+param, true);
	httpRequest.onreadystatechange = function() {
		if(httpRequest.readyState == 4 && httpRequest.status == 200) {
			var parent = e.target.parentNode
			var list = document.getElementById("task-list");
			list.removeChild(parent);
		}
	}
	httpRequest.send();
}

var edit_tasks = document.getElementsByClassName('edit-task');
var task_ref = "";
for(var i =0; i < edit_tasks.length; i++){
	edit_tasks[i].addEventListener('click',function(e){ editTask(e);});
}

function editTask(e) {
	e.preventDefault();
	var form = document.getElementById("edit-form");
	form.style.display = "block";
	task_ref = e.target.parentElement;
	var param = e.currentTarget.href.split("/")[e.currentTarget.href.split("/").length -1];
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

function updateTask(e){
	e.preventDefault();
	var edit_task_name = document.getElementById('edit-task-name').value;
	var id = document.getElementById('task-id').value;
	var finished = document.getElementById('finished-task');
	var finished_value = 0;

	if(finished.checked){
		finished_value = 1;
	}

	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', '/update/'+id, true);
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
	httpRequest.send("task="+edit_task_name+"&finished="+finished_value);
}


