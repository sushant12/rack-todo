"use strict";

var Task = {};
var tasks = m.prop({});

Task.list_task = function(){
    return m.request({method: "GET", url: "/tasks"}).then(tasks);
};

Task.save_task = function(data){
    return m.request({
        method: "POST",
        url: "/save",
        data: data,
        serialize: function(data) {
            return data;
        }
    });
};

var app = document.getElementById('application');
var home_view = {
  controller: function(){
     var that = this;
      that.tasks = Task.list_task();
      that.save = function(data) {
        Task.save_task(data).then(function(data){
            that.tasks = Task.list_task();
        });
    }
  },
   view: function(ctrl, args){
       return [
           m.component(task_form,{onsave: ctrl.save}),
           m.component(task_list,{tasks: ctrl.tasks})
       ]
   }
};

var task_form = {
    view: function(ctrl, args){
       return m('form[method=post][action=/save]', {
                onsubmit: function (e) {
                    e.preventDefault();
                    var form = document.querySelector("form");
                    args.onsave(new FormData(form));
                },
            }, [
            m('label[for=task]', 'Name: '),
            m('input[type=text][name=task]#new-task-name'),
            m('button[type=submit][disabled]#save-new-task', "Save")
        ]);
    }
};

var task_list = {
    view: function(ctrl, args){
        return m('#tasks-wrapper',[
            m("h1",'Tasks'),
            m("ol",[
                args.tasks().map(function(task){
                   return m(`li#${task.name}-${task.id}`,[
                       `${task.name} `
                   ])
                }),
            ])
        ]);
    }
};

m.mount(app,home_view);