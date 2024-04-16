class Api::V1::ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :update, :destroy, :edit,:users]
  # before_action :authorize_project, except: [:index, :create,:current_user_role]

  def index
    projects = policy_scope(Project)
    authorize projects
    # projects = Project.all
    render json: projects
  end




  def users
    render json: @project.users.where(role:'developer')
  end
  def current_user_email
    render plain: current_user.email
  end
  def current_user_role
    render plain: current_user.role
  end

  def current_user_info
    render json: current_user
  end

  def developers
    users = User.where(role: 'developer')
    render json: users
  end

  def quality_assurance
    users = User.where(role: 'quality_assurance')
    render json: users
  end

  def create
    project = Project.new(project_params)
    authorize project
    project.created_by = current_user.id
    Rails.logger.debug "Received parameters: #{params.inspect}"

    user_ids = params[:user_ids]

    if user_ids.nil?
      puts "No user_ids parameter provided"
    else
      if project.save
        # Associate selected users with the project
        project.users << User.where(id: user_ids)
        render json: project, status: :created
      else
        render json: project.errors, status: :unprocessable_entity
      end
    end
  end





  def bugs
    bugs = @project.bugs.all
    render json: bugs
  end

  def update
    authorize @project
    Rails.logger.debug "Received parameters: #{params.inspect}"

    user_ids = project_params[:user_ids] # Access user_ids from project_params

    if user_ids.nil?
      puts "No user_ids parameter provided"
    else
      # Save the project with updated attributes
      if @project.update(project_params)
        # Sync the associated users with the project based on the provided user_ids
        @project.user_ids = user_ids

        render json: @project, status: :ok
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end
  end


  def destroy
    @project&.destroy
    render json: { message: 'Project deleted!' }
  end

  def show
    authorize @project
    if current_user.role == "manager" || current_user.role=="quality_assurance"
      bugs = @project.bugs.where(created_by: current_user.id)
    else
      bugs = @project.bugs.all
    end
    users = @project.users
    render json: { users: users, project: @project, bugs: bugs }
  end


  def edit
    authorize @project
    render json: @project
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.require(:project).permit(:name,:description,:created_by,user_ids:[])
  end

  def authorize_project
    authorize @project
  end
end
