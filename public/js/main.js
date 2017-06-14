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

Task.get_task = function(id){
    return m.request({
        method: "GET",
        url: `/api/edit/${id}`
    });
};

Task.update_task = function(data){
    return m.request({
        method: "POST",
        url: "/update",
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
       };
      that.delete_task = function(id){
          Task.delete_task(id).then(function(id){
              that.tasks = Task.list_task();
          });
      };
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
            m('button[type=submit]#save-new-task', "Save")
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
                       `${task.name}`, task.finished ?"(finished)" : "",[
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
    controller: function(args){
        var that = this;
        that.get_task = function(id){
            return Task.get_task(id).then(tasks);
        };
        that.update_task = function(data){
            Task.update_task(data).then(function(e){
                m.route('/');
            });
        };
    },
    view: function(ctrl, args){
        return [
            m.component(edit_task_form, {get_task: ctrl.get_task, onupdate: ctrl.update_task})
        ]
    }
};

var edit_task_form = {
    controller: function(args){
        this.id = m.route.param("id");
        this.task = args.get_task(this.id);
    },
    view: function(ctrl,args){
        return m('.edit-wrapper',[
            m('h1','Edit'),
            m('form[method=post][action=/update]', {
                onsubmit: function (e) {
                    e.preventDefault();
                    var form = document.querySelector("form");
                    args.onupdate(new FormData(form));
                },
            },[
                m(`input[type=hidden][name=id][value=${ctrl.task().id}]`),
                m(`input[type=text][name=task][value=${ctrl.task().name}]`),
                ctrl.task().finished ? m('input[type=checkbox][name=finished][checked=checked][value=1]'): m('input[type=checkbox][name=finished][value=1]'),
                m('button[type=submit]','Update')
            ])
        ]);
    }
}

m.route.mode = 'pathname';
m.route(app, "/", {
    "/": home_view,
    "/edit/:id": edit_view
});