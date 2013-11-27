class ChangeJobDescriptionToText < ActiveRecord::Migration
  def up
	  change_column :jobs, :description, :text
  end

  def down
	  change_column :jobs, :description, :string
  end
end
