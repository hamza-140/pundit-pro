class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  def index
    @pagy, @users = pagy(User.all)
    @projects = current_user.projects
    authorize @projects
  end

  def bugs
    @projects = current_user.projects
    authorize @projects
  end

  def create
    @project = Project.new(project_params)
    @project.users << current_user

    authorize @project

    if @project.save
      if params[:user_ids].present?
        user_ids = params[:user_ids].reject(&:empty?)
        user_ids.each do |user_id|
          @project.users << User.find(user_id)
        end
      end
      redirect_to @project, notice: "Project created successfully."
    else
      @users = User.all
      render :new
    end
  end

  def update
    authorize @project

    if @project.update(project_params)
      redirect_to @project, notice: "Project updated successfully."
    else
      render :edit
    end
  end

  def destroy
    authorize @project

    @project.destroy
    redirect_to projects_url, notice: "Project deleted successfully."
  end

  def show
    authorize @project

    @bug = Bug.new(project: @project)
    @bugs = @project.bugs.where("user_id = ? OR created_by = ?", current_user.id, current_user.id)
  end

  def new
    @project = Project.new
    @users = User.all
    @bug = Bug.new(project: @project)

    authorize @project
  end

  def edit
    authorize @project
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :description, user_ids: [])
  end
end
