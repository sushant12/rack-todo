require_relative '../test_helper'

FactoryGirl.define do
  factory :task do
    name "testinga again"
    finished  0
  end
end


class TaskTest < Test::Unit::TestCase

  include FactoryGirl::Syntax::Methods

  test "should not save tasks without title" do
    task = Task.new
    assert_equal false, task.save
  end

  test "should save tasks" do
    task = FactoryGirl.create(:task)
    assert_equal attributes_for(:task), task
  end  

end
