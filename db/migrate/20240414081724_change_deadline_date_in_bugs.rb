class ChangeDeadlineDateInBugs < ActiveRecord::Migration[7.1]
  def change
    change_column :bugs, :deadline, :date


  end
end
