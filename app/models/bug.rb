class Bug < ApplicationRecord
  belongs_to :user
  belongs_to :project
  validates :title , presence: true
  validates :description, presence: true
  validates :user_id, presence: true
end
