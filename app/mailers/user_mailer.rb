class UserMailer < ActionMailer::Base
  default from: "dave@gamesfreelancers.com"

  def new_job_email(job)
    @url  = "http://gamesfreelancers.com/jobs/#{job.id}"
    @job = job
    mail(:to => "davedx@gmail.com", :subject => "New Job Posting")
  end
end
