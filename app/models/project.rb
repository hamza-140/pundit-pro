class Project < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :bugs, dependent: :destroy
  validates :name, presence: true
  validates :description, presence: true ,length: {minimum:10}
end
