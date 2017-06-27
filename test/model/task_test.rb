require_relative File.expand_path '../../test_helper',__FILE__

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

  test "should save task with title" do
    task = FactoryGirl.build(:task)
    task.save
    assert_equal "testinga again", task.reload.name
  end

end

