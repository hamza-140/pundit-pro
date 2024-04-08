# app/policies/bug_policy.rb
class BugPolicy < ApplicationPolicy
  def create?
    user.manager? || user.developer?
  end

  def update?
    user.manager? || (user.developer? && user == record.creator)
  end

  def destroy?
    user.manager? || (user.developer? && user == record.creator)
  end
end
