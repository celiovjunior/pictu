import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.resource('/posts', 'PostsController').apiOnly()

  Route.post('/posts/:postId/comments', 'CommentsController.store')
}).prefix('/api')
