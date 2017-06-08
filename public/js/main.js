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
    var task_name = document.getElementById("new-task-name").value;
        // httpRequest = new XMLHttpRequest();
    Todo.ajaxify('POST','/save',Todo.saveTaskHTML,"task="+task_name,e);
}

Todo.saveTaskHTML = function(e, httpRequest){
    var res = JSON.parse(httpRequest.response),
        ul = document.getElementById("task-list"),
        li = document.createElement("li");
    var a_edit = document.createElement("a"),
        a_del = document.createElement("a");
    link_html(e,res,a_edit,a_del);
    li.appendChild(document.createTextNode(res.name+" "));
    li.appendChild(a_edit);
    li.appendChild(document.createTextNode(" | "));
    li.appendChild(a_del);
    li.setAttribute("id", res.name+"-"+res.id);
    ul.appendChild(li);
}

// deletes task
Todo.deleteTask = function (e){
	e.preventDefault();
	var id = e.currentTarget.href.split("/")[e.currentTarget.href.split("/").length -1];
    Todo.ajaxify('POST','/delete',Todo.removeTaskHTML,"id="+id,e);
}

Todo.removeTaskHTML = function(e){
    var parent = e.target.parentNode,
        list = document.getElementById("task-list");
    list.removeChild(parent);
}

// fetch from db to show value in the form
Todo.editTask = function (e) {
	e.preventDefault();
	var form = document.getElementById("edit-form"),
        id = e.currentTarget.href.split("/")[e.currentTarget.href.split("/").length -1],
        finished_value = 0;
	form.style.display = "block";
	task_ref = e.target.parentElement;
    Todo.ajaxify('GET', '/edit/'+id,Todo.viewDataInForm ,'',e);
}

Todo.viewDataInForm = function(e, httpRequest) {
        var res = JSON.parse(httpRequest.response),
            finished = document.getElementById('finished-task'),
            task = document.getElementById('edit-task-name');
        task.value = res.name;
        if(res.finished){
            finished.checked = true;
        }else{
            finished.checked = false;
        }
        var task_id = document.getElementById('task-id');
        task_id.value = res.id;
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
    Todo.ajaxify('POST', '/update/'+id,Todo.updateTaskHTML,"task="+edit_task_name+"&finished="+finished_value,e);
}

Todo.updateTaskHTML = function(e, httpRequest){
    var res = JSON.parse(httpRequest.response),
        a_edit = document.createElement("a"),
        a_del = document.createElement("a");
    link_html(e,res,a_edit,a_del);
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

/*
 * verb shud be POST, GET , DELETE ..
 */
Todo.ajaxify = function(verb,url,orsc_func,param,e){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open(verb, url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200) {
            orsc_func(e,httpRequest);
        }
    }
    httpRequest.send(param);
}

function link_html(e, res,a_edit,a_del){
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
}