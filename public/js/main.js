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

Task.delete_task = function(id){
    return m.request({
       method: "POST",
       url: "/delete",
       data: id,
       serialize: function(id) {
           return m.route.buildQueryString(id);
       },
       config:  function(xhr){
           xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
           xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
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
      that.delete_task = function(id){
          Task.delete_task(id).then(function(id){
              that.tasks = Task.list_task();
          });
      }
  },
   view: function(ctrl, args){
       return [
           m.component(task_form,{onsave: ctrl.save}),
           m.component(task_list,{tasks: ctrl.tasks, delete_task: ctrl.delete_task})
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
                       `${task.name} `,[
                           m(`a[href="/edit/${task.id}"]`,{config: m.route}, "Edit"),
                           " | ",
                           m(`a[href="/delete"][data-delete-id="${task.id}"]`,{
                               onclick: function(e){
                                    e.preventDefault();
                                    var id = e.target.dataset.deleteId;
                                    args.delete_task({id: id});
                               }
                           }, "Delete")
                       ]
                   ])
                }),
            ])
        ]);
    }
};

var edit_view = {
    view: function(){
        return m("h1", "hey thgere");
    }
};

m.route.mode = 'pathname';
m.route(app, "/", {
    "/": home_view,
    "/edit/:id": edit_view
});