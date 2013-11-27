class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :title
      t.string :description
      t.boolean :remote
      t.string :billing
      t.string :application

      t.timestamps
    end
  end
end
