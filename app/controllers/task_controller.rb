class TaskController < ApplicationController
  get '/' do
    @tasks = Task.all
    erb :index
  end

  post '/save' do
    content_type :json
    task = Task.create(name: params[:task])
    task.to_json
  end

  get '/delete/:id' do
    task = Task.find_by(id: params[:id])
    task.destroy
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
  end
end
