module Todo
  class Router
    attr_reader :app

    ROUTES = {
        '/' => { 'controller' => 'tasks', 'action' => 'index' },
        '/save_task' => { 'controller' => 'tasks', 'action' => 'save' },
        '/edit' => { 'controller' => 'tasks', 'action' => 'edit' },
        '/update' => { 'controller' => 'tasks', 'action' => 'update' },
        '/delete' => { 'controller' => 'tasks', 'action' => 'destroy' }
    }

    def initialize(app)
      @app = app
    end

    def call(env)
      if (mapping = ROUTES[env['PATH_INFO']])
        env.merge!(mapping)
        app.call(env)
      else
        Rack::Response.new('Not found', 404)
      end
    end
  end
end
