class TaskController < ApplicationController
  get '/' do
    erb :index
  end

  get '/tasks' do
    content_type :json
    tasks = Task.all
    tasks.to_json
  end

  post '/save' do
    task = Task.create(name: params[:task])
    task.to_json
  end

  post '/delete' do
    begin
      task = Task.find_by(id: params[:id])
      task.destroy
    rescue => e
    end

  end

  get '/edit/:id' do
    content_type :json
    task = Task.find_by(id: params[:id])
    task.to_json
  end

  post '/update/:id' do
    content_type :json
    task = Task.find_by(id: params[:id])
    task.name = params[:task]
    task.finished = params[:finished]
    task.save
    task.to_json
  end
end
