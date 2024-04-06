class Api::V1::ProjectsController < ApplicationController
      before_action :set_project, only: [:show, :edit, :update, :destroy]
      before_action :set_recipe, only: %i[show destroy]

      def index
        # puts params.inspect # Add this line for debugging
        # @projects = policy_scope(Project)
        # @query = params[:q]
        # @items = @projects.where("name LIKE ?", "%#{@query}%")
        # @pagy, @items = pagy(@items)
        # authorize @projects
        project = Project.all
        render json: project
      end

      def bugs
        @projects = current_user.projects
        authorize @projects
        render json: @projects
      end

      def create
        @project = Project.new(project_params)
        @project.users << current_user
        @project.created_by = current_user.id

        authorize @project

        if @project.save
          if params[:user_ids].present?
            user_ids = params[:user_ids].reject(&:empty?)
            user_ids.each do |user_id|
              @project.users << User.find(user_id)
            end
          end
          SendNotificationJob.perform_later(@project.users.pluck(:id), :project_assignment, @project)
          render json: @project, status: :created
        else
          @users = User.all
          render json: { errors: @project.errors }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotUnique => e
        @project.errors.add(:base, "A bug with the same title already exists.")
        render json: { errors: @project.errors }, status: :unprocessable_entity
      end

      def update
        authorize @project

        current_user_ids = @project.user_ids

        if @project.update(project_params)
          new_user_ids = @project.user_ids - current_user_ids
          new_user_ids.each do |user_id|
            SendNotificationJob.perform_later([user_id], :project_assignment, @project)
          end
          render json: @project, status: :ok
        else
          render json: { errors: @project.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        @project.destroy
        head :no_content
      end

      def show
        # @bug = Bug.new(project: @project)

        # if current_user.role == "quality_assurance"
        #   @bugs = policy_scope(@project.bugs)
        # else
        #   @bugs = @project.bugs.all
        # end

        # authorize @bugs
        # render json: @project
        if @project
          render json: @project
        else
          render json: @project.errors
        end
      end

      def new
        @project = Project.new
        @users = User.all
        @bug = Bug.new(project: @project)
        @project.bugs.build
        @bug.created_by = current_user.id
        authorize @project
      end

      def edit
        authorize @project
        render json: @project
      end

      def users
        @pagy, @users = pagy(User.all)
        render json: @users
      end

      private

      def set_project
        @project = Project.find(params[:id])
      end
      def set_recipe
        @project = Project.find(params[:id])
      end
      def project_params
        params.require(:project).permit(:name,:description)
        end
end
