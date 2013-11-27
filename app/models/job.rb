class Job < ActiveRecord::Base
  attr_accessible :application, :billing, :company, :description,
					:remote, :title, :duration, :location, :approved
end
