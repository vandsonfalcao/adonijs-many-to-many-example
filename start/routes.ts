/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Product from '#models/product'
import Shop from '#models/shop'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { randomUUID } from 'node:crypto'

router.get('/create', async ({ response }: HttpContext) => {
  const shops = await Shop.create({
    name: 'shop',
    uuid: randomUUID(),
  })
  const products = await Product.createMany(
    Array(10)
      .fill(0)
      .map((_, index) => ({
        name: 'produto' + index,
        uuid: randomUUID(),
      }))
  )
  return response.ok({
    shops,
    products,
  })
})

router.get('/relate', async ({ response }: HttpContext) => {
  const shop = await Shop.findOrFail(1)
  const products = await Product.all()
  const values: Record<number, { price: number }> = {}
  products.forEach((product) => {
    values[product.id] = {
      price: Math.random() * 9999 + 1,
    }
  })
  await shop.related('products').sync(values)
  await shop.load('products')
  return response.ok(shop)
})

router.get('/', async ({ response }: HttpContext) => {
  const shop = await Shop.query()
    .where('id', 1)
    .preload('productPrices', (builder) => builder.preload('product'))
    .paginate(1, 10)
  return response.ok(shop)
})
/**

shop
shop_product -> price
productos

 */
