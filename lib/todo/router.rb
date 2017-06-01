module Todo
  class Router
    attr_reader :app

    ROUTES => {
        '/' => {'controller' => 'tasks', 'action' => 'index'}
    }

    def initialize(app)
      @app = app
    end
  end
end