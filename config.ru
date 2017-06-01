require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)

require_relative 'lib/todo'
require_relative 'app/controllers/tasks_controller'
require_relative 'app/models/task'

use Rack::ContentLength
use Rack::Reloader, 0

run Todo::Application
# DB = SQLite3::Database.new "test.db"
#uncomment it to create a table task
# rows = db.execute <<-SQL
#   create table tasks (
#     name varchar(30),
#     finished int
#   );
# SQL

# module TemplateView
#   def self.home_view
#     home_view = <<-HTML
#     <html>
#       <head>
#         <title> Home </title>
#       </head>
#       <body>
#         <form method="post" action="save_task">
#           Task Name: <input type="text" name="task">
#           <input type="submit" value="save" >
#         </form>
#         <h1>Tasks</h1>
#         <ol>
#           <% DB.execute( "select rowid, * from tasks" ) do |row| %>
#             <li><%= row[1] %> <% if(row[2] == 1) %>(finished) <% end %><a href="/edit?id=<%= row[0]%>">edit </a>  <a href="/delete?id=<%= row[0]%>"> del</a></li>
#           <% end %>
#         </ol>
#       </body>
#     </html>
#     HTML
#   end
#
#   def self.edit_view(id)
#     edit_view = <<-HTML
#     <html>
#       <head>
#         <title> Edit </title>
#       </head>
#       <body>
#         <% DB.execute("select rowid, * from tasks where rowid = #{id}") do |row| %>
#         <form method="post" action="/update?id=<%= row[0]%>">
#           Task Name: <input type="text" name="task" value="<%= row[1] %>">
#           Finished?: <input type="checkbox" name="finished" value="1" <% if(row[2] == 1) %> checked <% end%>>
#           <input type="submit" value="Update" >
#         </form>
#         <% end %>
#       </body>
#     </html>
#     HTML
#   end
# end
#
# module Todo
#   class Application
#     include TemplateView
#     class << self
#       def call(env)
#         if(env['PATH_INFO'] == '/')
#           view = TemplateView.home_view
#         elsif(env['PATH_INFO'] == '/edit')
#           req = Rack::Request.new(env)
#           id = req.params['id']
#           view = TemplateView.edit_view(id)
#         elsif(env['PATH_INFO'] == '/save_task' && env['REQUEST_METHOD'] == "POST")
#           req =  Rack::Request.new(env)
#           task_name = req.params["task"]
#           DB.execute("INSERT INTO tasks (name, finished) VALUES (?, ?)", [task_name,0])
#           return [ 302, {'Location' =>"/"}, [] ]
#         elsif(env['PATH_INFO'] =='/update' && env['REQUEST_METHOD'] == "POST")
#           req = Rack::Request.new(env)
#           id = req.params["id"]
#           task = req.params["task"]
#           finish = 0
#           if(req.params.include? 'finished')
#             finish = 1
#           end
#           DB.execute("UPDATE tasks set name = '#{task}', finished = '#{finish}' where rowid='#{id}'")
#           return [ 302, {'Location' =>"/"}, [] ]
#         elsif(env['PATH_INFO'] =='/delete')
#           req = Rack::Request.new(env)
#           id = req.params["id"]
#           DB.execute("delete from tasks where rowid='#{id}'")
#           return [ 302, {'Location' =>"/"}, [] ]
#         else
#           return [ 400, {}, ['Not found'] ]
#         end
#         Rack::Response.new(ERB.new(view).result)
#       end
#     end
#   end
# end
