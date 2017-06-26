require 'test/unit'
require 'rack/test'
ENV['RACK_ENV'] = 'test'

OUTER_APP = Rack::Builder.parse_file("config.ru").first

class TaskControllerTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    OUTER_APP
  end

  def test_list_tasks
    get '/tasks'

  end
end