import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ShopProduct extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column({ serializeAs: null })
  declare shopId: number

  @column({ serializeAs: null })
  declare productId: number

  @column()
  declare price: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
