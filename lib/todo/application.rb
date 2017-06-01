module Todo
  class Application
    class << self
      def call(env)
        if(env['PATH_INFO'] == '/')
          Rack::Response.new(TasksController.new.index)
        end
      end
    end
  end
end