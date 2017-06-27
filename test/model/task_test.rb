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

  test "should save task with title but no finished" do
    task = FactoryGirl.build(:task, name: 'John')
    task.save
    assert_equal "John", task.reload.name
    assert_equal 0, task.reload.finished
  end

  test "should save task with title and finished" do
    task = FactoryGirl.build(:task, name: 'John', finished: 1)
    task.save
    assert_equal "John", task.reload.name
    assert_equal 1, task.reload.finished
  end

end

