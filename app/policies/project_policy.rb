# app/policies/project_policy.rb
class ProjectPolicy < ApplicationPolicy
  def create?
    user.manager?
  end

  def update?
    user.manager? && user.projects.include?(record)
  end

  def destroy?
    user.manager? && user.projects.include?(record)
  end
end
