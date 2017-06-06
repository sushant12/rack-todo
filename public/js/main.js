function checkEmpty(){
	var task_length = document.getElementById("new-task-name").value.length;
	if(task_length > 0)
	{
		document.getElementById("save-new-task").removeAttribute("disabled");
	}else{
		document.getElementById("save-new-task").setAttribute("disabled","disabled");
	}
}