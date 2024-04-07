class ChangeUserIdNullableInBugs < ActiveRecord::Migration[7.1]
  def change
    change_column_null :bugs, :user_id, true
  end
end
