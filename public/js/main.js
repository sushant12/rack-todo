"use strict";

var Todo = {};

var app = document.getElementById('application');

var HomeView    = {
    view: function(){
        return [
            m.component(TaskForm),
            m.component(TaskList)
        ]
    }
};
var TaskForm = {
    view: function(){
        return m('form[method=post]',[
           m('label','Name: '),
           m('input[type=text][name="task"]#new-task-name',{config: checkEmpty}),
           m('button[type=button][disabled=disabled]#save-new-task',"Save")
        ]);
    }
}
function checkEmpty(el){
    el.addEventListener('keyup', function (event) {
        var task_length = document.getElementById("new-task-name").value.length,
            save_btn = document.getElementById("save-new-task");
        if(task_length > 0) {
            save_btn.removeAttribute("disabled");
        }else{
            save_btn.setAttribute("disabled","disabled");
        }
    });

}

var TaskList = {
    controller: function(){

    },
    view: function(){
        return m('#tasks-wrapper',[
            m("h1",'Tasks'),
            m("ol",[
                m('li#test-1',[
                    "Test ",
                    m('a[href="/edit"].edit-task','Edit'),
                    " | ",
                    m('a[href="/delete"].del-task','Delete')
                ])
            ])
        ]);
    }
};

m.route.mode = 'pathname';
m.route(app, '/', {
    '/' : HomeView
});
