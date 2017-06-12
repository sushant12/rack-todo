"use strict";

var Todo = {};

var app = document.getElementById('application');

var Task = {};
var Tasks = m.prop({});
Task.listTasks = function(){
  return m.request({method: "GET", url: "/tasks"}).then(Tasks);
};
Task.saveTask = function(data){
    var xhrConfig = function(xhr) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    }
  return m.request({
      method: "POST",
      url: "/save",
      data: data,
      serialize: function(data) {
          return m.route.buildQueryString(data)
      },
      config: xhrConfig}).then(function(res){
      console.log(res);
  });
};

var HomeView    = {
    controller: function(){
      this.tasks = Task.listTasks();
      this.save = function(data){
          Task.saveTask(data);
      }
    },
    view: function(ctrl, args){
        return [
            m.component(TaskForm,{onsave: ctrl.save}),
            m.component(TaskList,{tasks: ctrl.tasks})
        ]
    }
};

var TaskForm = {
    controller: function(){
      this.task = m.prop("")
    },
    view: function(ctrl, args){
        var task = ctrl.task();
        return m('form[method=post]',[
           m('label','Name: '),
           m('input[type=text][name="task"]#new-task-name', {
               oninput: m.withAttr("value", ctrl.task),
               value: ctrl.task()
           }),
           m('button[type=button][disabled]#save-new-task',{
               onclick: args.onsave.bind(this,task)
           },"Save")
        ]);
    }
}

var TaskList = {
    view: function(ctrl, args){
        return m('#tasks-wrapper',[
            m("h1",'Tasks'),
            m("ol",[
                args.tasks().map(function(task){
                    return m(`li#${task.name}-${task.id}`,[
                        `${task.name} `,
                        m(`a[href="/edit/${task.id}"].edit-task`,'Edit'),
                        " | ",
                        m(`a[href="/delete/${task.id}"].del-task`,'Delete')
                    ])
                })
            ])
        ]);
    }
};

m.route.mode = 'pathname';
m.route(app, '/', {
    '/' : HomeView
});
