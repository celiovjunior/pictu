import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'

export default class CommentsController {
  public async store({ request, params, response }: HttpContextContract) {
    const body = request.body()
    const postId = params.postId

    await Post.findOrFail(postId)

    body.postId = postId

    const comment = await Comment.create(body)

    response.status(201)

    return {
      message: 'comment added',
      data: comment,
    }
  }
}
