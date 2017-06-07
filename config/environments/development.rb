ActiveRecord::Base.establish_connection(
  adapter:  'postgresql',
  host:     'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'testdb'
)
