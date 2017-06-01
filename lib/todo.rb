require_relative 'todo/application'
require_relative 'todo/base_controller'

module Todo
  autoload :Application, 'todo/application'
  autoload :BaseController, 'todo/base_controller'
end