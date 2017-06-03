require 'active_record'
require 'pg'
require 'sinatra'

ActiveRecord::Base.establish_connection(
    adapter:  'postgresql',
    host:     'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'testdb'
)

class Task < ActiveRecord::Base
  validates :name, presence: true
end

get '/' do
  @tasks = Task.all
  erb :index
  # erb :index, locals: {tasks: Task.all}
end

post '/save' do
  Task.create(name: params[:task])
  redirect '/'
end

get '/delete/:id' do
  task = Task.find_by(id: params[:id])
  task.destroy
  redirect '/'
end

get '/edit/:id' do
  @task = Task.find_by(id: params[:id])
  erb :edit
end

post '/update/:id' do
  p params
  task = Task.find_by(id: params[:id])
  task.name = params[:task]
  task.finished = params[:finished]
  task.save
  redirect '/'
end

