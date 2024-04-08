# app/policies/user_policy.rb
class UserPolicy < ApplicationPolicy
  def index?
    user.manager?
  end

  def show?
    user.manager? || user == record
  end

  def update?
    user.manager? || user == record
  end

  def destroy?
    user.manager? && user != record
  end
end
