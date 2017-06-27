require_relative File.expand_path '../../test_helper',__FILE__
OUTER_APP = Rack::Builder.parse_file("config.ru").first
class TaskControllerTest < Test::Unit::TestCase
  include Rack::Test::Methods
  # include FactoryGirl::Syntax::Methods

  def app
    # ApplicationController
    OUTER_APP
  end

  test "should return task list" do
    get '/tasks'
   	p last_response.body
  end

  # test "should save tasks" do
  #   task = FactoryGirl.create(:task)
  #   assert_equal attributes_for(:task), task
  # end

  # test "should list all task" do
  #   tasks = Task.all
  #   assert_equal false, tasks
  # end
  
end