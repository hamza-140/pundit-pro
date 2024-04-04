class Project < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :bugs, dependent: :destroy
  validates :name, presence: true
  validates :description, presence: true ,length: {minimum:10}
  accepts_nested_attributes_for :bugs,allow_destroy:true,
                                reject_if: :all_blank
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "created_by", "description", "id", "id_value", "name", "updated_at"]
  end
end
