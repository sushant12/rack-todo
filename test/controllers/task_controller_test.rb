# # ENV['RACK_ENV'] = 'test'

# # require 'test/unit'
# # require 'factory_girl'
# # # require 'rack/test'

# # require_relative '../../boot.rb'

# # OUTER_APP = Rack::Builder.parse_file("config.ru").first
# FactoryGirl.define do
#   factory :task do
#     name "testinga again"
#     finished  0
#   end
# end
# # class TaskControllerTest < ActiveSupport::TestCase
# class TaskControllerTest < Test::Unit::TestCase
#   # include Rack::Test::Methods
#   include FactoryGirl::Syntax::Methods

#   def app
#     ApplicationController
#   end

#   # test "should not save tasks without title" do
#   #   task = Task.new
#   #   assert_equal false, task.save
#   # end

#   # test "should save tasks" do
#   #   task = FactoryGirl.create(:task)
#   #   assert_equal attributes_for(:task), task
#   # end

#   # test "should list all task" do
#   #   tasks = Task.all
#   #   assert_equal false, tasks
#   # end
  
# end