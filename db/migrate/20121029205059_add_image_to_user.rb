class AddImageToUser < ActiveRecord::Migration
  def change
    add_column :users, :fb_image, :string
  end
end
