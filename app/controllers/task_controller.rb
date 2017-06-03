class TaskController < ApplicationController
  set :views, Proc.new { File.join(root, "../views/") }

  get '/' do
    @tasks = Task.all
    erb :index
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
    task = Task.find_by(id: params[:id])
    task.name = params[:task]
    task.finished = params[:finished]
    task.save
    redirect '/'
  end
end