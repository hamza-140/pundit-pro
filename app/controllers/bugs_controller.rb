class BugsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project
  before_action :set_bug, only: [:show, :edit, :update, :destroy]

  def index
    authorize @project, :show?
    @bugs = @project.bugs.all
  end

  def create
    @bug = @project.bugs.new(bug_params)
    @bug.created_by = current_user.id

    if @bug.save
      user_id = params[:bug][:user_id]
    unless user_id.blank?
      SendNotificationJob.perform_later([user_id], :bug_assignment, @bug)
    end
      redirect_to project_bug_path(@project, @bug), notice: "Bug created successfully."
    else
      render :new , status: :unprocessable_entity
    end
  end



  def update
    authorize @bug
    if @bug.update(bug_params)
      user_id = params[:bug][:user_id]
    unless user_id.blank?
      SendNotificationJob.perform_later([user_id], :bug_assignment, @bug)
    end
      redirect_to project_bug_path(@project, @bug), notice: "Bug updated successfully."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @bug
    @bug.destroy
    redirect_to project_path(@project), notice: "Bug deleted successfully."
  end

  def show
  end

  def new
    @bug = @project.bugs.new
    authorize @bug
  end

  def edit
    authorize @bug
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_bug
    @bug = @project.bugs.find(params[:id])
  end

  def bug_params
    params.require(:bug).permit(:title, :description, :user_id, :deadline, :screenshot, :bug_type, :status)
  end

end
