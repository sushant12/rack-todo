class TasksController < Todo::BaseController

  def index
    @tasks = Task.all
    render("tasks/index")
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def save
  end

end