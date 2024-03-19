# app/policies/project_policy.rb
class ProjectPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.present? && (user.role == "manager" || record.users.include?(user))
  end

  def edit?
    user.present? && user.role == "manager"
  end

  def destroy?
    user.present? && user.role == "manager"
  end

  def create?
    user.present? && user.role == "manager"
  end

  def bugs?
    user.present?
  end

  def update?
    user.present? && user.role == "manager" && record.users.include?(user)
  end

  def destroy?
    user.present? && user.role == "manager" && record.users.include?(user)
  end
end
