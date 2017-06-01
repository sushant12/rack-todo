 class Task
   # DB = PG.connect :hostaddr => "127.0.0.1", :port => 5432, :dbname => 'testdb', :user => "postgres", :password => "postgres"
   DB = PG.connect :hostaddr => ENV['Host'], :port => 5432, :dbname => ENV['Database'], :user => ENV['USER'], :password => ENV['Password']
   # uncomment to create pg database
   # DB = PG.connect(hostaddr: "127.0.0.1", port: 5432, dbname: 'postgres', user: 'postgres', password: "postgres")
   # DB.exec("CREATE DATABASE testdb")

   # uncomment to create table
   DB.exec "DROP TABLE IF EXISTS tasks"
   DB.exec "CREATE TABLE tasks(Id SERIAL PRIMARY KEY, Name VARCHAR(20), Finished INT)"

   class << self
     def all()
       DB.exec("select * from tasks")
     end

     def update(task, finish, id)
       DB.exec("UPDATE tasks set name = '#{task}', finished = '#{finish}' where id='#{id}'")
     end

     def save(task_name)
       DB.exec("INSERT INTO tasks (name, finished) VALUES ('#{task_name}',0)")
     end

     def delete(id)
       DB.exec("delete from tasks where id='#{id}'")
     end

     def where(id)
       DB.exec("select * from tasks where id = '#{id}'")
     end
   end

  #  DB = SQLite3::Database.new "test.db"
  # class << self
  #    def all()
  #      DB.execute("select rowid, * from tasks")
  #    end
  #
  #    def update(task, finish, id)
  #      DB.execute("UPDATE tasks set name = '#{task}', finished = '#{finish}' where rowid='#{id}'")
  #    end
  #
  #    def save(task_name)
  #      DB.execute("INSERT INTO tasks (name, finished) VALUES (?, ?)", [task_name,0])
  #    end
  #
  #    def delete(id)
  #      DB.execute("delete from tasks where rowid='#{id}'")
  #    end
  #
  #     def where(id)
  #       DB.execute("select rowid, * from tasks where rowid = #{id}")
  #     end
  # end

 end