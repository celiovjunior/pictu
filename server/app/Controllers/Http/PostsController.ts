import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { v4 as uuidv4 } from 'uuid'

export default class PostsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const image = request.file('image', this.validationOptions)

    if (image) {
      const imageName = `${uuidv4()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      body.image = imageName
    }

    const post = await Post.create(body)

    response.status(201)

    return {
      message: 'post created',
      data: post,
    }
  }

  public async index() {
    const allPosts = await Post.query().preload('comments')

    return {
      data: allPosts,
    }
  }

  public async show({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.load('comments')

    return {
      data: post,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()

    return {
      message: 'post deleted',
      data: post,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const post = await Post.findOrFail(params.id)

    post.title = body.title
    post.description = body.description

    if (post.image !== body.image || !post.image) {
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        })

        post.image = imageName
      }
    }

    await post.save()

    return {
      message: 'post upgraded',
      data: post,
    }
  }
}
