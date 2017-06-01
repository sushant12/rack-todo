require_relative 'todo/application'
require_relative 'todo/base_controller'
require_relative 'todo/router'

module Todo
  autoload :Application, 'todo/application'
  autoload :BaseController, 'todo/base_controller'
  autoload :Router, 'todo/router'
end