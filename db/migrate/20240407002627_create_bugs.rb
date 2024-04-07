class CreateBugs < ActiveRecord::Migration[7.1]
  def change
    create_table :bugs do |t|
      t.string :title
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true
      t.integer :created_by
      t.datetime :deadline
      t.string :screenshot
      t.string :bug_type
      t.string :status

      t.timestamps
    end
  end
end
