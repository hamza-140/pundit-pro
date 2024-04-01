# app/mailers/notification_mailer.rb
class NotificationMailer < ApplicationMailer
  def bug_assignment_notification(user, bug)
    @user = user
    @bug = bug
    mail(to: @user.email, subject: 'Bug Assignment Notification')
  end

  def project_assignment_notification(user, assignment)
    @user = user
    @project = assignment
    mail(to: @user.email, subject: 'You have been added to a project')
    end
end
