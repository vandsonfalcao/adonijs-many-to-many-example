import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Product from './product.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import ShopProduct from './shop_product.js'

export default class Shop extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column({ serializeAs: 'id' })
  declare uuid: string

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Product, {
    pivotTable: 'shop_products',
  })
  declare products: ManyToMany<typeof Product>

  @hasMany(() => ShopProduct)
  declare productPrices: HasMany<typeof ShopProduct>
}
