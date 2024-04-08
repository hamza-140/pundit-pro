class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy, :edit]
  # before_action :authorize_project, except: [:index, :create,:current_user_role]

  def index
    projects = Project.all
    render json: projects
  end
  def current_user_role
    render plain: current_user.role
  end
  def create
    project = Project.new(project_params)
    authorize project
    if project.save
      render json: project, status: :created
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def bugs
    bugs = @project.bugs.all
    render json: bugs
  end

  def update
    if @project.update(project_params)
      render json: @project, status: :ok
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @project&.destroy
    render json: { message: 'Project deleted!' }
  end

  def show
    bugs = @project.bugs.all
    render json: { project: @project, bugs: bugs }
  end

  def edit
    render json: @project
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name, :description)
  end

  def authorize_project
    authorize @project
  end
end
