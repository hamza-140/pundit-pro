class Api::V1::BugsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project
  before_action :set_bug, only: [:show, :update, :destroy]

  # GET /api/v1/projects/:project_id/bugs
  def index
    @bugs = @project.bugs.all
    render json: @bugs
  end

  def create
    @bug = @project.bugs.new(bug_params)
    @bug.created_by = current_user.id
    @bug.project_id = @project.id
    authorize @bug
    if @bug.save
      render json: @bug, status: :created
    else
      render json: @bug.errors, status: :unprocessable_entity
    end
  end

  # POST /api/v1/projects/:project_id/bugs
  # def create
  #   @bug = @project.bugs.new(bug_params)
  #   @bug.created_by = 1

  #   if @bug.save
  #     user_id = params[:bug][:user_id]
  #     unless user_id.blank?
  #       SendNotificationJob.perform_later([user_id], :bug_assignment, @bug)
  #     end
  #     render json: @bug, status: :created
  #   else
  #     render json: @bug.errors, status: :unprocessable_entity
  #   end
  # end

  # GET /api/v1/projects/:project_id/bugs/:id
  def show
    render json: @bug
  end

  # PUT /api/v1/projects/:project_id/bugs/:id
  # def update
  #   if @bug.update(bug_params)
  #     user_id = params[:bug][:user_id]
  #     unless user_id.blank?
  #       SendNotificationJob.perform_later([user_id], :bug_assignment, @bug)
  #     end
  #     if params[:bug][:remove_screenshot].present?
  #       @bug.screenshot = nil
  #       @bug.save
  #     end
  #     render json: @bug
  #   else
  #     render json: @bug.errors, status: :unprocessable_entity
  #   end
  # end
  def update
    Rails.logger.debug "Received parameters: #{params.inspect}"

    if @bug.update(bug_params)
      render json: @bug, status: :ok
    else
      render json: @bug.errors, status: :unprocessable_entity
    end
  end
  # DELETE /api/v1/projects/:project_id/bugs/:id
  def destroy
    @bug.destroy
    head :no_content
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_bug
    @bug = @project.bugs.find(params[:id])
  end

  def bug_params
    params.require(:bug).permit(:title, :description, :user_id, :deadline, :screenshot, :bug_type, :status, :remove_screenshot)
  end
end
