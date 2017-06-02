module Todo
  class Application
    class << self
      attr_accessor :env
      def call(env)
        self.env = env
        Rack::Response.new(*dispatch)
        # if(env['PATH_INFO'] == '/')
        #   Rack::Response.new(TasksController.new.index)
        # end
      end

      def dispatch
        controller.new(env).public_send(env['action'])
      end

      def controller
        Object.const_get(env['controller'].capitalize + 'Controller')
      end
    end
  end
end
