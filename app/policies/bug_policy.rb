# app/policies/bug_policy.rb
class BugPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.present? && (user.role == "manager" || user.role == "quality_assurance" || record.user.id == user.id || record.created_by == user.id)
  end

  def create?
    user.present? && (user.role == "quality_assurance" || user.role == "manager")
  end

  def update?
    user.present? && (user.role == "manager" || user.role == "quality_assurance")
  end

  def destroy?
    user.present? && (user.role == "manager" || user.role == "quality_assurance")
  end
end
