class ApplicationController < ActionController::Base
  include Pagy::Backend
  include Pundit::Authorization
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized!."
    redirect_back(fallback_location: root_path)
  end
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params[:role] = user_params[:role].to_i
      user_params.permit(:name, :email, :password, :password_confirmation, :role)
    end
  end
end
