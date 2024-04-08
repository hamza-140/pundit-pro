class ApplicationController < ActionController::Base
    before_action :authenticate_user!
    include Pundit
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_back(fallback_location: root_path)
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params[:role] = user_params[:role].to_i
      user_params.permit(:name, :email, :password, :password_confirmation, :role)
    end
  end

end
