class TasksController < Todo::BaseController

  def index
    @tasks = Task.all
    render("tasks/index")
  end

  def edit
    @task = Task.where(params["id"])
    render("tasks/edit")
  end

  def update
    Task.update(params['task'], params['finished'], params['id'])
    redirect_to '/'
  end

  def destroy
    Task.delete(params['id'])
    redirect_to '/'
  end

  def save
    Task.save(params["task"])
    redirect_to "/"
  end

end