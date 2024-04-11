# app/policies/bug_policy.rb
class BugPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.present? && (user.role == "manager" ||user.role == "developer" || user.role == "quality_assurance" || record.exists?(user_id: user.id) || record.exists?(created_by: user.id))
  end

  def create?
    user.present? && (user.role == "quality_assurance"||user.role == "manager")
  end

  def update?
    user.present? && (
      user.role == "developer" ||
      record.created_by == user.id
    )
  end

  def edit?
    user.present? && (
      user.role == "developer" ||
      record.created_by == user.id
    )
  end


  def destroy?
    user.present? && ( user.role == "quality_assurance")
  end

  class Scope < Scope
    def resolve
      if user.present? && user.role == "manager"
        scope.where(created_by: user.id)
      elsif user.present? && user.role == "developer"
        scope.all
      elsif user.present? && user.role == "quality_assurance"
        scope.where(created_by: user.id)
      else
        scope.none
      end
    end
  end
end
