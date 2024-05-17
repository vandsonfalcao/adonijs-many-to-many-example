import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'shop_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('shop_id')
      table.integer('product_id')
      table.integer('price').unique().notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
