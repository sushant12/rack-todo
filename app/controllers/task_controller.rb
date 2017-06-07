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
