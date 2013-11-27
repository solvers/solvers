class AddApprovedToJob < ActiveRecord::Migration
  def change
    add_column :jobs, :approved, :boolean
  end
end
